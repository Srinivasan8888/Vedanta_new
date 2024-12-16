const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: "Srinivasan"
            }
            const secret = process.env.JWTKEY
            const options = {}
            JWT.sign(payload, secret, options, (err, token) => {
                if(err) reject(err)
                resolve(token)
            })
        })
    }
}
