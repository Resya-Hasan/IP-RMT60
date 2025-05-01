import { useNavigate, useParams } from "react-router"
import handleError from "../helpers/handleError"
import { useEffect, useState } from "react"
import http from "../helpers/http"
import Roadmap from "../component/Roadmap"
import Swal from "sweetalert2"

const DetailRoadmap = () => {
    const { id } = useParams()
    const [myRoadmap, setMyRoadmap] = useState(null)
    const navigate = useNavigate()

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

    const handleDelete = async () => {
        try {
            const { data } = await http({
                method: 'delete',
                url: `/roadmaps/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            console.log(data, 'data dari server')
            navigate('/my-roadmaps');
            Swal.fire({
                title: "Roadmap Deleted",
                icon: "success",
                draggable: true
            });
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
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">My Roadmaps</h1>
                <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-300 ease-in-out mb-4 cursor-pointer hover:bg-red-400"
                    onClick={handleDelete}
                >
                    delete
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myRoadmap && myRoadmap.roadmap.careerRoadmap.map((roadmap) => (
                    <Roadmap key={roadmap.id} step={roadmap} />
                ))}
            </div>
        </div>
    )
}

export default DetailRoadmap