import {useRef, useEffect} from 'react';

import {useQueryClient} from '@tanstack/react-query';

type InvalidateEvent = {
  operation: 'invalidate';
  entity: Array<string>;
  id?: number;
};

type UpdateEvent = {
  operation: 'update';
  entity: Array<string>;
  id: number;
  payload: any;
};

type WebSocketEvent = InvalidateEvent | UpdateEvent;

const useReactQuerySubscription = () => {
  const queryClient = useQueryClient();

  const websocket = useRef<WebSocket>();

  useEffect(() => {
    websocket.current = new WebSocket('wss://echo.websocket.org/');
    websocket.current.onmessage = event => {
      console.log('received event', event);
      const data: WebSocketEvent = JSON.parse(event.data);
      switch (data.operation) {
        case 'invalidate':
          queryClient.invalidateQueries(
            [...data.entity, data.id].filter(Boolean),
          );
          break;
        case 'update':
          queryClient.setQueriesData(data.entity, (oldData: any) => {
            const update = (entity: Record<string, unknown>) =>
              entity.id === data.id ? {...entity, ...data.payload} : entity;
            return Array.isArray(oldData)
              ? oldData.map(update)
              : update(oldData as Record<string, unknown>);
          });
          break;
      }
    };
    websocket.current.onerror = (event: WebSocketErrorEvent) => {
      console.log(event);
    };

    websocket.current.onopen = () => {
      console.log('open');
    };

    websocket.current.onclose = () => {
      console.log('close');
    };

    return () => {
      websocket.current?.close();
    };
  }, [queryClient]);

  return (input: WebSocketEvent) => {
    console.log(websocket.current?.readyState);
    websocket.current?.send(JSON.stringify(input));
  };
};

export default useReactQuerySubscription;
