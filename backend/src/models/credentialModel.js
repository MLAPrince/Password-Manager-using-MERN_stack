import mongoose from "mongoose";



const credentialSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    websiteURL: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    }   
);

credentialSchema.index(
  { websiteURL: 1, email: 1, password: 1 },
  { unique: true }
);


const Credential = mongoose.model("Credential", credentialSchema);

export default Credential;
