import express, { Router } from "express";
import { getAllCredentials,  getCredentialById,  createNewCredential, updateCredential, deleteCredential } from "../controllers/credentialController.js";



const router = express.Router();



router.get("/", getAllCredentials)
router.get("/:id", getCredentialById)
router.post("/", createNewCredential)
router.put("/:id", updateCredential)
router.delete("/:id", deleteCredential)



export default router;