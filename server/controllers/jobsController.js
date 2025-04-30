const { default: axios } = require("axios")
const loginApi = require("../helpers/loginApi")


module.exports = class JobsController {
    static async getJobs(req, res, next) {
        try{
            const token = await loginApi()
            console.log(token)

            const response = await axios.get(`${process.env.BASE_URL_API}/apis/career-portal/jobs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            res.status(200).json(response.data)
        } catch(err) {
            next(err)
        }
    }
}