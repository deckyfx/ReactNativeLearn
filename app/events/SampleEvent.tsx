import {E} from './EventBus';

export const SampleEvent = {
  channel: 'channel',
  event: 'event',
};

export const SampleEventMatcher = () =>
  E.isMatching(SampleEvent.channel, SampleEvent.event);
