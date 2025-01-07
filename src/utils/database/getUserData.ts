import OAuth from "discord-oauth2";
import User from "../../models/User";

function randomStr(length: number) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }
    return result;
}

export default async function getUserData(userId: string, userInfo: OAuth.User) {
    let userData = await User.findById(userId);
    if (!userData) {
        const findName = await User.findOne({ profileOptions: { displayName: userInfo.global_name} });
        let name = findName ? userInfo.global_name + randomStr(3) : userInfo.global_name
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