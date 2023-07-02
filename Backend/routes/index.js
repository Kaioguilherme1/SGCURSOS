const express = require("express");
const users = require("./users")
const courses = require("./courses")
const register = require("./registration")
const category = require("./Category")
const router = express.Router()

router.use("/users", users )
router.use("/courses", courses )
router.use("/register", register)
router.use("/category", category)

module.exports = router