const express = require("express");
const users = require("./users")
const courses = require("./courses")

const router = express.Router()

router.use("/users", users )
router.use("/courses", courses )

module.exports = router