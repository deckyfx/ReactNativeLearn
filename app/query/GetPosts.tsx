import {useQuery, UseQueryResult} from '@tanstack/react-query';

import getPosts from '../api/GetPosts';
import Post from '../models/Post';

const usePosts = (): UseQueryResult<Post[]> =>
  useQuery(['posts'], getPosts, {
    enabled: false, // disable this query from automatically running
  });

export default usePosts;
