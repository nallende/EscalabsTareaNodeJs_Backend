import express from "express";

const router = express.Router();
import { showMessage, registro } from "../controllers/auth"

router.get("/:message", showMessage);
router.post('/register', registro)

module.exports = router;