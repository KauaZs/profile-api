import  mongoose, { Schema } from "mongoose";

interface ISocials {
    github: string,
    discord: string
}

interface profilePreferences {
    displayName: string, 
    avatar: string,
    banner: string,
    aboutme: string,
    colorBakcground: string,
    colorCard: string,
    effectSpace: boolean,
    socials: ISocials
}

interface userProps {
    _id: string,
    accountCreatedAt: Date,
    profileOptions: profilePreferences
}

const userModel = new Schema<userProps>({
    _id: { type: String, required: true, unique: true },
    accountCreatedAt: { type: Date, default: new Date() },
    profileOptions: {
        displayName: { type: String },
        avatar: { type: String },
        banner: { type: String },
        aboutme: { type: String, default: 'Hello, welcome to my profile' },
        colorBakckground: { type: String, default: '#111827' },
        colorCard: { type: String, default: '#1f2937' },
        effectSpace: { type: Boolean, default: true },
        socials: {
            github: { type: String, default: '' },
            discord: { type: String, default: '' }
        }
    }
}, {
    versionKey: false
})

export default mongoose.model('Users', userModel);