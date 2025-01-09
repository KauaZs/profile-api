import DiscordOauth2 from 'discord-oauth2'
import dotenv from 'dotenv'

dotenv.config()
export const DiscordAuth = new DiscordOauth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: `${process.env.API_URL}/api/auth/callback`,
})