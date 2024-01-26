const { Schema, model } = require('mongoose');

//Schema to create a User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
        ], 
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
);

const User = model('user', userSchema);

module.exports = User;