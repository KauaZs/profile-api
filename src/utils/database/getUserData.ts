import OAuth from "discord-oauth2";
import User from "../../models/User";

export default async function getUserData(userId: string, userInfo: OAuth.User) {
    let userData = await User.findById(userId);
    if (!userData) {
        userData = await User.create({
            _id: userId,
            profileOptions: {
                displayName: userInfo.global_name,
                avatar: userInfo.avatar ? `https://cdn.discordapp.com/avatars/${userId}/${userInfo.avatar}` : 'https://i.imgur.com/d59oXV7.png',
                banner: userInfo.banner ? `https://cdn.discordapp.com/banners/${userId}/${userInfo.banner}` : 'https://i.imgur.com/j0HU99K.gif',
            }
        })
    }

    return userData;
}