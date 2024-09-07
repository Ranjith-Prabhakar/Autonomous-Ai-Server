import mutualFriendsModel from "../model/mutualFriendsModal";

export async function isMutualFriendsExist(userName: string) {
  try {
    let mutualFriends = await mutualFriendsModel.findOne({ userName });
    return mutualFriends;
  } catch (error) {
    throw error;
  }
}

export type TMutualFriendStructure = {
  userName: string;
  friends: string[];
};
export async function createMutualFriends({
  userName,
  friends,
}: TMutualFriendStructure) {
  try {
    let saveMutualFriends = await mutualFriendsModel.create({
      userName,
      friends,
    });
    await saveMutualFriends.save();
    return true;
  } catch (error) {
    throw error;
  }
}
