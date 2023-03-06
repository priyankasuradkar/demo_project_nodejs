const express = require('express')
const bcrypt = require('bcrypt')
const mailSender = require('../utils/mailSender')
const user = require('../model/user')

//signup
const signUp = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, countryCode } = req.body
        const isEmailExists = await user.findOne({ "email": email }).lean()
        if (isEmailExists) {
            return res.status(404).json({ error: 'Email Already Exists!!' })
        }

        const encryptPassword = bcrypt.hash(password, 12)
        const userObject = {
            name,
            email,
            password: encryptPassword
        }
        mailSender(email)//or otp verification
        const userRegistration = new user(userObject)
        const isUserSaved = userRegistration.save()

        if (!isUserSaved)
            return res.status(404).json({ err: "user not saved" })

        else
            return res.status(200).json({ success: " registration successful" })

    }
    catch (err) {
        return res.status(404).json({ err: " Internal server error" })
    }
}
//verifyMobileNumber//

const verifyMobileNumber = async (req, res) => {
    try {
        const { phoneNumber, email } = req.body
        await user.updateOne({ "email": email }, {
            $set: {
                "phoneNumber": phoneNumber
            }
        })
        //otp verification api
    }
    catch {
        return res.status(500).json({ error: err })
    }
}
//login//
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const isUserExists = await user.findOne({ email: email }).lean()
        if (!isUserExists) {
            return res.status(404).json({ err: "user does not  exists!!" })
        }

        if (isUserExists.password !== password) {
            return res.status(403).json({ err: "incorrect Password" })
        }
        else {
            return res.status(200).json({ success: "successful login!!" })
        }
    }
    catch (err) {
        return res.status(403).json({ err: "internal server error" })
    }
}///

//login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const isUserExists = await user.findOne({ email: email }).lean()

        if (!isUserExists)
            return res.status(403).json({ error: "Account not found!!" })

        if (isUserExists.accountStatus !== "ACTIVE")
            return res.status(403).json({ error: "please verify your account" })

        const isPasswordMatched = await bcrypt.compare(
            password,
            isUserExists.password
        )
        if (!isPasswordMatched)
            return res.status(403).json({ err: "Incorrect Password" })


        //jwt token
        const token = jwt.sign({
            data: {
                email: email
            },
            JWT_KEY,
            // { expiresIn: "2d" })/{ expiresIn: "2d" }
        },
        )
        return res.status(200).json({
            token: token,
            email: userExistsOrNot.email
        })
    }
    catch {
        return res.status(500).json({ error: err })
    }
}


///otpVerification
const otpVerification = async (req, res) => {
    try {
        const { otp, email } = req.body
        const isUserExistsOrNot = await user.findOne({ email: email }).lean()

        if (!isUserExistsOrNot)
            return res.status(403).json({ err: "User not found!!" })
        console.log(otp, isUserExistsOrNot.verificationCode)

        if (otp === isUserExistsOrNot.verificationCode) {
            await user.updateOne({ email: email }, {
                $set: {
                    accountStatus: "ACTIVE"
                }
            })
            return res.status().json({ success: "account is activated!!" })
        }
    }
    catch (err) {
        return res.status(403).json({ err: "Internal server error!!!" })
        //console.log("error  : : :", err)
    }
}

//resend otp
const resendOTP = async (req, res) => {
    try {
        const { email, phoneNumber } = req.body
        //mobileverification middleware//

        return res.status(200).json({ success: "OTP Resent on your number!" })
    }
    catch {
        return res.status(403).json({ err: "Internal server error!!" })
    }
}

//forget password//
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const isUserExistsOrNot = await user.findOne({ email: email }).lean()
        if (isUserExistsOrNot)
            return res.status(403).json({ err: "user not found!!" })

        //send otp password middleware
        return res.status(200).json({ success: "Please check your mail to reset password" })
    }
    catch {
        return res.status(403).json({ err: "Internal server error!" })
    }
}

//reset Password//
const resetPassword = async (req, res) => {
    try {
        const { password, email } = req.body
        const isUserExistsOrNot = await user.findOne({ email: email }).lean()

        if (!isUserExistsOrNot) {
            return res.status(403).json({ error: "User does not exsits!!" })
        }

        const isPasswordMatched = await bcrypt.compare(
            password,
            isUserExistsOrNot.password
        )

        if (isPasswordMatched)
            return res.status(403).json({ error: "New password cannot match to old password!!" })

        const encryptPassword = await bcrypt.hash(password, 12)
        await user.updateOne({ "email": email }, {
            $set: {
                password: encryptPassword
            }
        })

        return res.status(200).json({ success: "password reset successfully!!" })
    }
    catch {
        return res.status(500).json({ error: err })
    }

    //updatedProfileDetails 
    const updatedProfileDetails = async (req, res) => {
        try {
            const { fullName, phoneNumber } = req.body
            const email = req.user.email

            if (fullName)
                await user.updateOne({ "email": email }, {
                    $set: {
                        fullName: fullName
                    }
                })

            if (phoneNumber)
                await user.updateOne({ phoneNumber: phoneNumber }, {
                    $set: {
                        phoneNumber: phoneNumber
                    }
                })
            return res.status(200).json({ success: "Updated profile!!" })
        }
        catch (err) {
            return res.status(403).json({ err: err })
        }
    }

    //mineleaf
    //     const mineLeaf = async (req, res) => {
    //         try {
    //             const email = req.user.email
    //             const { le }
    //         }
    //         catch {

    //         }
    //     }
}
module.exports = {
    signUp,
    login,
    otpVerification,
    resendOTP,
    forgotPassword,
    resetPassword
}