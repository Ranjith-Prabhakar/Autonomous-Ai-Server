import { config } from "../config";
import axios from "axios";
import { TMutualFriends } from "../types/mutualFriends";

export async function fetchMutualFriendsService(
  userName: string,
  followingCount: string,
  followersCount: string
) {
  try {
    // Function to fetch either 'followers' or 'following' list
    async function usersList(url: string, count: string): Promise<string[]> {
      let allUsers: string[] = [];

      const paginationCount = Math.ceil(parseInt(count) / 100);
      let promiseAll = [];

      for (let i = 1; i <= paginationCount; i++) {
        // Push the promise from axios call
        promiseAll.push(
          axios.get(
            `${config.BASE_URL}/users/${userName}/${url}?per_page=100&page=${i}`
          )
        );
      }

      // Wait for all Axios promises to resolve
      const responses = await Promise.all(promiseAll);

      // Access the data in each response and extract the 'login' property
      responses.forEach((response) => {
        const logins = response.data.map(
          (user: { login: string }) => user.login
        ); // Extract only 'login'
        allUsers = allUsers.concat(logins); // Concatenate the logins from each page
      });

      return allUsers;
    }

    // Fetch followings and followers concurrently
    const [followings, followers] = await Promise.all([
      usersList("following", followingCount),
      usersList("followers", followersCount),
    ]);

    // Find mutual friends: users present in both followings and followers
    const mutualFriends = followings.filter((user) => followers.includes(user));

    return mutualFriends;
  } catch (error: any) {
    if (error.response?.statusText === "Not Found") {
      return "Not Found";
    } else {
      throw error;
    }
  }
}
