import mongoose from "mongoose";
const {Schema} = mongoose;

const AvgTempSchema = new mongoose.Schema({
    id:{
        type:String,
    },
    AvgTemp:{
        type:String,
    },
     TIME: {
        type:String
     }
},{timestamps: true});

export default mongoose.model('AvgTemp', AvgTempSchema);