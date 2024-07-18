const Router = require("express").Router;
const router = Router();
const {
  getLyrics,
  searchResults,
} = require("../contollers/songControllers.js");

router.get("/get_lyrics", getLyrics);
router.post("/search", searchResults);

module.exports = router;
