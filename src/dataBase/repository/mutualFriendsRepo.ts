import mutualFriendsModel from "../model/mutualFriendsModal";

export async function isMutualFriendsExist(userName: string) {
  try {
    let mutualFriends = await mutualFriendsModel.findOne({ userName });
    return mutualFriends;
  } catch (error) {
    throw error;
  }
}

export async function createMutualFriends(userName: string, mutualFriends: string[]) {
  try {
    let saveMutualFriends = await mutualFriendsModel.create({
      userName,
      friends: mutualFriends,
    });
    await saveMutualFriends.save();
    return true;
  } catch (error) {
    throw error;
  }
}
