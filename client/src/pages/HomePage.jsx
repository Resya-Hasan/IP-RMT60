import { useEffect, useState } from "react"
import handleError from "../helpers/handleError"
import http from "../helpers/http"


const HomePage = () => {
    const [jobs, setJobs] = useState([])

    const fetchJobs = async () => {
        try {
            const { data } = await http({
                method: 'GET',
                url: '/jobs'
            })
            console.log(data)
        }catch(err) {
            handleError(err)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])
    return (
        <>
            <h1>halo</h1>
        </>
    )
}

export default HomePage