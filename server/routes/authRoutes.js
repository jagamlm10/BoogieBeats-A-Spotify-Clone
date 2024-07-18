const express = require("express");
const Router = express.Router;
const router = Router();
const { url, callback, refresh } = require("../contollers/authContollers");

router.get("/auth_url", url);
router.post("/callback", callback);
router.post("/refresh", refresh);

module.exports = router;
