import { invalidDataError, notFoundProfileError, userIdNotExist } from '../errors/errors';
import { InputPosts } from '../protocols';
import { postsRepository } from '../repositories/posts-repositories';

async function createPost(userId: number, description: string) {
 
  const postData: InputPosts = {userId, description};

  const userIdExist = await postsRepository.findSessionByUserId(userId);
  if(!userIdExist) throw userIdNotExist("userId does not exist")

  const userPost = await postsRepository.createPost(postData);
//  console.log("user post service", userPost)
  return userPost;
}

async function findAllPosts() {
  const allPosts = await postsRepository.findAllPosts();
  return allPosts;
}

async function getAllPostsById(id: number) {
  if (!id || isNaN(id)) throw invalidDataError('id does not exist');
  const userPostsData = await postsRepository.findUserPostsById(id);
  if (!userPostsData) throw notFoundProfileError("Not able to find the profile");
  return userPostsData;
}

export const postsService = {
  createPost,
  findAllPosts,
  getAllPostsById
};
