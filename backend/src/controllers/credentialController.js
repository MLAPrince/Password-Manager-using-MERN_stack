
import Credential from "../models/credentialModel.js";
import { encrypt, decrypt } from "../utils/encryption.js"; // <-- import our functions

export async function getAllCredentials(req, res) {
    try {
        const credentials = await Credential.find().sort({ createdAt: -1 });

        // Optionally decrypt password before sending (not recommended for production)
        const decryptedCreds = credentials.map(cred => ({
            ...cred._doc,
            password: decrypt(cred.password)
        }));

        res.status(200).json(decryptedCreds);
    } catch (error) {
        console.log("Error (in getAllCredentials controller):", error);
        res.status(500).json({ message: "Error fetching credentials. Internal server Error" });
    }
}

export async function getCredentialById(req, res) {
    try {
        const credential = await Credential.findById(req.params.id);
        if (!credential) return res.status(404).send(`Credential with id ${req.params.id} not found`);

        // Decrypt password before sending
        const decrypted = {
            ...credential._doc,
            password: decrypt(credential.password)
        };

        res.status(200).json(decrypted);
    } catch (error) {
        console.log("Error (in getCredentialById controller):", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid credential ID format." });
        }
        res.status(500).json({ message: "Error fetching credential. Internal server Error" });
    }
}

export async function createNewCredential(req, res) {
    try {
        const { title, websiteURL, email, username, password } = req.body;
        const encryptedPassword = encrypt(password);

        const newCredential = new Credential({
            title,
            websiteURL,
            email,
            username,
            password: encryptedPassword
        });

        const savedCredential = await newCredential.save();

        // Don't send password in response
        const credentialResponse = {
            _id: savedCredential._id,
            title: savedCredential.title,
            websiteURL: savedCredential.websiteURL,
            email: savedCredential.email,
            username: savedCredential.username
        };

        res.status(201).json(credentialResponse);
    } catch (error) {
        console.error("Error creating new credential:", error);
        if (error.code === 11000) {
            return res.status(409).json({ message: "Credential already exits." });
        }
        res.status(500).json({ message: "Error creating credential. Internal server error." });
    }
}

export async function updateCredential(req, res) {
    try {
        const { id } = req.params;
        let updateData = { ...req.body };

        if (updateData.password) {
            updateData.password = encrypt(updateData.password);
        }

        const updatedCredential = await Credential.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedCredential) return res.status(404).send(`Credential with id ${id} not found`);
        const response = {
            _id: updatedCredential._id,
            title: updatedCredential.title,
            websiteURL: updatedCredential.websiteURL,
            email: updatedCredential.email,
            username: updatedCredential.username
        };
        res.status(200).json(response);
    } catch (error) {
        console.log("Error (in updateCredential controller):", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: `Error updating credential with id ${id}. Internal Server Error` });
    }
}

export async function deleteCredential(req, res) {
    try {
        const deletingCredential = await Credential.findByIdAndDelete(req.params.id);
        if (!deletingCredential) return res.status(404).send(`Credential with id ${req.params.id} not found`);
        res.status(200).json(`Successfully deleted credential with id ${req.params.id}`);
    } catch (error) {
        console.log("Error (in deleteCredential controller):", error);
        res.status(500).json({ message: `Error deleting credential with id ${req.params.id}. Internal Server Error` });
    }
}
