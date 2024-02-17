const express = require('express')
const router = express.Router()

const { registerUser,
        getAllUser,
        getUser,
        removeUser,
        loginUser,
        updateUser} = require('../controllers/task.js')
                
router.route('/').get(getAllUser)
router.route('/register').post(registerUser)
router.route('/:id').get(getUser).delete(removeUser).patch(updateUser)
router.route('/login').post(loginUser)

module.exports = router