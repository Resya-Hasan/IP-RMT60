import { useParams } from "react-router"
import handleError from "../helpers/handleError"
import { useEffect, useState } from "react"
import http from "../helpers/http"
import Roadmap from "../component/Roadmap"

const DetailRoadmap = () => {
    const { id } = useParams()
    const [myRoadmap, setMyRoadmap] = useState(null)

    const fetchRoadmapById = async () => {
        try {
            const { data } = await http({
                method: 'get',
                url: `/roadmaps/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            console.log(data, 'data dari server')
            setMyRoadmap(data);
        } catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        fetchRoadmapById();
    }, []);

    console.log(myRoadmap)

    return (
        <div className="flex flex-col mx-40 my-10">
            <h1 className="text-2xl font-bold mb-4">My Roadmaps</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myRoadmap && myRoadmap.roadmap.careerRoadmap.map((roadmap) => (
                    <Roadmap key={roadmap.id} step={roadmap} />
                ))}
            </div>
        </div>
    )
}

export default DetailRoadmap