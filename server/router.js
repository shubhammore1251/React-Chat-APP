const express = require("express");
const { checkAuth } = require("./middleware/auth");
const catchAsyncErrors = require("./middleware/catchAsyncErrors");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("server is up and running");
});

router.get(
  "/keep-awake",
  checkAuth,
  catchAsyncErrors((req, res) => {
    console.log(`server kept awake - ${new Date()}`);
    res.status(200).json({
      success: true,
      message: `server kept awake - ${new Date()}`,
    });
  })
);

module.exports = router;
