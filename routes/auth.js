import express from "express";

const router = express.Router();
import { registro } from "../controllers/auth"

router.post('/register', registro)

module.exports = router;