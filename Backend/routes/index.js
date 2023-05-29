const express = require("express");
const users = require("./users")
const courses = require("./courses")
const {getAllUsersInfo} = require("../controllers/UserConsultController");

const router = express.Router()

router.get('/', async (req, res) => {
    const rest = await getAllUsersInfo("token")
    res.json(rest)
})

router.use("/users", users )
router.use("/courses", courses )

module.exports = router