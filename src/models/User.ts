import  mongoose, { Schema } from "mongoose";

interface ISocials {
    github: string,
    discord: string
}

interface Stats {
    views: number
}

interface profilePreferences {
    displayName: string, 
    avatar: string,
    banner: string,
    aboutme: string,
    colorBakcground: string,
    colorCard: string,
    effectSpace: boolean,
    socials: ISocials,
    stats: Stats
}

interface Cooldowns {
    updateUsername: number
}

interface userProps {
    _id: string,
    accountCreatedAt: Date,
    profileOptions: profilePreferences,
    cooldowns: Cooldowns
}

const userModel = new Schema<userProps>({
    _id: { type: String, required: true, unique: true },
    accountCreatedAt: { type: Date, default: new Date() },
    cooldowns: {
        updateUsername: { type: Number, default: 0 }
    },
    profileOptions: {
        displayName: { type: String },
        avatar: { type: String },
        banner: { type: String },
        aboutme: { type: String, default: 'Hello, welcome to my profile' },
        colorBackground: { type: String, default: '#111827' },
        colorCard: { type: String, default: '#1f2937' },
        effectSpace: { type: Boolean, default: false },
        socials: {
            github: { type: String, default: '' },
            discord: { type: String, default: '' }
        },
        stats: {
            views: { type: Number, default: 0 }
        }
    },  
}, {
    versionKey: false
})

export default mongoose.model('Users', userModel);