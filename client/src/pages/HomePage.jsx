import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchJobs } from "../redux/jobSlice"
import Card from "../component/Card"

const HomePage = () => {
  const dispatch = useDispatch()
  const jobs = useSelector(state => state.jobs.data)

  useEffect(() => {
    dispatch(fetchJobs())
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4 mx-40">
      {jobs.map((job) => (
        <div key={job.id} className="flex justify-center">
          <Card
            title={job.title}
            jobType={job.jobType}
            address={job.User?.address}
            imageUrl={job.imgUrl}
          />
        </div>
      ))}
    </div>
  )
}

export default HomePage
