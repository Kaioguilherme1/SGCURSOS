const express = require("express");
const users = require("./users")
const courses = require("./courses")

const router = express.Router()

router.get('/', (req, res) => {
    res.json({Hello: 'World'})
})

router.use("/users", users )
router.use("/courses", courses )

module.exports = router