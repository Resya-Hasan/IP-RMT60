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

            const top50 = response.data.data.slice(0, 50)

            res.status(200).json(top50)
        } catch(err) {
            next(err)
        }
    }

    static async getJobsById(req, res, next) {
        try{
            const token = await loginApi()
            console.log(token)

            const { id } = req.params

            const response = await axios.get(`${process.env.BASE_URL_API}/apis/career-portal/jobs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const jobDetails = response.data.data

            res.status(200).json(jobDetails)
        } catch(err) {
            next(err)
        }
    }
}