import { userIdNotExist } from "../errors/errors";
import { followsRepository } from "../repositories/follows-repositories";

  async function followOrUnfollowUser(followerId: number, followedId: number) {

    //Verificar se quem você está qurendo seguir, se existe ou não
    const userToFollow = await followsRepository.userToFollowExist(followedId)
    if(!userToFollow) throw userIdNotExist("The person you are trying to follow does not exist")

    // Verificar se o usuário já está seguindo
    const isFollowing = await followsRepository.isFollowing(followerId, followedId);
  
    if (!isFollowing) {
      // Se não estiver seguindo, criar o relacionamento de seguir
      console.log("caiu no createFollow")
      return followsRepository.createFollow(followerId, followedId);
    } else {
      // Se já estiver seguindo, remover o relacionamento
      console.log("caiu no deleteFollow")
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
    followOrUnfollowUser
  };
  