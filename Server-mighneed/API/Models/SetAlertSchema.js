import mongoose from "mongoose";

const SetAlertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true
    },
    employeeNo: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

export default SetAlertSchema;
