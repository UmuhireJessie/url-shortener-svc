import express from "express";
import URL from "../controller/urlController";
import isAuthenticated from "../middleware/verifyToken";

const router = express.Router();

router.post("/shorten", isAuthenticated,URL.shortenUrl);
router.get("/:shortCode", isAuthenticated, URL.redirectUrl);
router.get("/stats/:code", isAuthenticated, URL.getUrlStats);

export default router;
