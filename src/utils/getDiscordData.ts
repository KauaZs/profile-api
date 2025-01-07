import OAuth from "discord-oauth2";
import jwt from 'jsonwebtoken'
export default function getDiscordData(user_access: string) {
    try {
        const user = jwt.verify(user_access, process.env.SECRET_KEY as string) as OAuth.User
        return user;
    } catch(e) {
        return false
    }
    
}