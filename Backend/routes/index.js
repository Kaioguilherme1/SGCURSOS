const express = require("express");
const {users} = require("./users.js")

const router = express.Router()

router.get('/', (req, res) => {
    res.json({Hello: 'World'})
})

router.use("/users", users )

module.exports = router