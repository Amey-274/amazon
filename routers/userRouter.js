const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { genrateToken, isAuth } = require('../utils')
const userRouter = express.Router()


userRouter.post('/', expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const rs = await User.findOne({ email }, (err) => { if (err) { console.log(err) } })
        if (rs) {
            if (rs.password == password) {
                const token = genrateToken(rs)
                res.send({
                    id: rs._id,
                    name: rs.name,
                    email: rs.email,
                    isAdmin: rs.isAdmin,
                    password: '',
                    token,
                })
            } else {
                res.status(401).send({ message: 'Invalid email and password' })

            }

        } else {
            res.status(401).send({ message: 'Invalid email and password' })
        }

    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}))

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const rs = new User({
            name,
            email,
            password,
        })
        if (rs) {
            try {
                const rs1 = await rs.save()
                res.status(200).send({
                    name: rs1.name,
                    email: rs1.email,
                    password: '',
                    isAdmin: rs1.isAdmin,

                    token: genrateToken(rs1)
                })
            } catch (err) {
                res.status(500).send({ message: err.message })

            }
        } else {
            res.status(500).send({ message: "Invalid data " })

        }
    } catch (err) {
        res.status(500).send({ message: err.message })

    }

}))

userRouter.put('/update', isAuth, expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const { _id } = req.user
    try {
        const rs1 = await User.updateOne({ _id }, {
            name,
            email,
            password
        })
        const rs = await User.findById(_id)
        if (rs) {

            res.status(200).send({
                name: rs.name,
                email: rs.email,
                password: '',
                isAdmin: rs.isAdmin,

                token: genrateToken(rs)
            })
        } else {
            res.status(500).send({ message: "Invalid data " })

        }
    } catch (err) {
        res.status(500).send({ message: `${err.message} error Found` })

    }


}))

module.exports = userRouter;

