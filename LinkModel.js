import mongoose from "mongoose";
const LinkSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        required: false, 
        default: "" 
    },
    uniqueId:{
        type: String,
        require: true,
        unique: true
    },
    
    clicks: [{
        date: { type: Date, default: Date.now },
        ipAddress: { type: String },
        targetParamValue: { type: String, default: '' }
    }],
    targetParamName: { type: String, default: 't' },
    targetValues: [{
        name: { type: String },
        value: { type: String }
    }]
});

const Link = mongoose.model("links-table", LinkSchema);
export default mongoose.model("links-table", LinkSchema);