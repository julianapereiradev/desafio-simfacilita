import { userIdNotExist } from '../errors/errors';
import { followsRepository } from '../repositories/follows-repositories';

async function followOrUnfollowUser(followerId: number, followedId: number) {
  const userToFollow = await followsRepository.userToFollowExist(followedId);
  if (!userToFollow) throw userIdNotExist('The person you are trying to follow does not exist');
  const isFollowing = await followsRepository.isFollowing(followerId, followedId);

  if (!isFollowing) {
    console.log('caiu no createFollow');
    return followsRepository.createFollow(followerId, followedId);
  } else {
    console.log('caiu no deleteFollow');
    return followsRepository.deleteFollow(followerId, followedId);
  }
}

async function getFollowers(userId: number) {
  return followsRepository.findFollowers(userId);
}

async function getFollowing(userId: number) {
  return followsRepository.findFollowing(userId);
}

export const followsService = {
  getFollowers,
  getFollowing,
  followOrUnfollowUser,
};
