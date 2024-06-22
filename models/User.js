import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },

    verified: {
        type: Boolean,
        default: false
    },
      gender: { type: String },
    age: { type: Date },
    goal: { type: String },
    height: { type: Number },
    weight: { type: Number },
    experience: { type: String },
    workoutPlace: { type: String },
    workoutFrequency: { type: String },




},

    {
    timestamps: true
});


const User = mongoose.model('UserCollection', UserSchema);


export default User;
