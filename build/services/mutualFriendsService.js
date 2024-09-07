"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMutualFriendsService = fetchMutualFriendsService;
const config_1 = require("../config");
const axios_1 = __importDefault(require("axios"));
function fetchMutualFriendsService(userName, followingCount, followersCount) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // Function to fetch either 'followers' or 'following' list
            function usersList(url, count) {
                return __awaiter(this, void 0, void 0, function* () {
                    let allUsers = [];
                    const paginationCount = Math.ceil(parseInt(count) / 100);
                    let promiseAll = [];
                    console.time(`Fetching ${url}`);
                    for (let i = 1; i <= paginationCount; i++) {
                        // Push the promise from axios call
                        promiseAll.push(axios_1.default.get(`${config_1.config.BASE_URL}/users/${userName}/${url}?per_page=100&page=${i}`));
                    }
                    // Wait for all Axios promises to resolve
                    const responses = yield Promise.all(promiseAll);
                    console.timeEnd(`Fetching ${url}`);
                    // Access the data in each response and extract the 'login' property
                    responses.forEach((response) => {
                        const logins = response.data.map((user) => user.login); // Extract only 'login'
                        allUsers = allUsers.concat(logins); // Concatenate the logins from each page
                    });
                    console.log(`${url} logins:`, allUsers.length, allUsers);
                    return allUsers;
                });
            }
            // Fetch followings and followers concurrently
            const [followings, followers] = yield Promise.all([
                usersList("following", followingCount),
                usersList("followers", followersCount),
            ]);
            // Find mutual friends: users present in both followings and followers
            const mutualFriends = followings.filter((user) => followers.includes(user));
            console.log("Mutual Friends:", mutualFriends);
            return mutualFriends;
        }
        catch (error) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.statusText) === "Not Found") {
                return "Not Found";
            }
            else {
                throw error;
            }
        }
    });
}
