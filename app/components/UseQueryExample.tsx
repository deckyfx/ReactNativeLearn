import React from 'react';

import {View, Text, TouchableOpacity} from 'react-native';

import getPosts from '../query/GetPosts';
import useReactQuerySubscription from '../query/WebSocket';

const UseQueryExample = () => {
  const {data, error, isLoading, isSuccess, isFetching} = getPosts();

  const send = useReactQuerySubscription();

  const loadData = (): void => {
    // refetch();
    send({operation: 'invalidate', entity: ['posts', 'list']});
  };

  return (
    <View>
      <TouchableOpacity onPress={loadData}>
        <Text>Click To Load</Text>
      </TouchableOpacity>

      {isLoading ? <Text>Loading...</Text> : null}

      {error ? <Text>Error Occured...</Text> : null}

      {isFetching ? <Text>isFetching...</Text> : null}

      {isSuccess ? (
        <View>
          <Text>all posts</Text>
          {data.slice(0, 5).map(post => (
            <Text>{post.title}</Text>
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default UseQueryExample;
