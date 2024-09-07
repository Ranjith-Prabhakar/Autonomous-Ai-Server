import mongoose, { Model, Schema } from "mongoose";
import { IGitHubUser } from "../../types/userModal";

type TMutualFriend = {
  userName: string;
  friends: [string];
};
const mutualFriendSchema: Schema<TMutualFriend> = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    friends: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const mutualFriendsModel: Model<TMutualFriend> = mongoose.model(
  "mutualFriends",
  mutualFriendSchema
);
export default mutualFriendsModel;
