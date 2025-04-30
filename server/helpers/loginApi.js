const axios = require('axios');

const loginApi = async (req, res, next) => {
    try {
        const response = await axios.post(`${process.env.BASE_URL_API}/apis/login`, {
            email: process.env.JOB_API_EMAIL,
            password: process.env.JOB_API_PASSWORD
        })
        return response.data.data.access_token
    } catch (err) {
        next(err)
    }
}

module.exports = loginApi