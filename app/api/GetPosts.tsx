import axios from 'axios';
import Post from '../models/Post';

const getPosts = async (): Promise<Post[]> => {
  const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

export default getPosts;
