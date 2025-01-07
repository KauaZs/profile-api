import  mongoose, { Schema } from "mongoose";

interface profilePreferences {
    displayName: string, 
    avatar: string,
    banner: string,
    aboutme: string,
    colorBakcground: string,
    colorCard: string,
    effectSpace: boolean
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
        colorBakcground: { type: String, default: '#111827' },
        colorCard: { type: String, default: '#1f2937' },
        effectSpace: { type: Boolean, default: true }
    }
}, {
    versionKey: false
})

export default mongoose.model('Users', userModel);