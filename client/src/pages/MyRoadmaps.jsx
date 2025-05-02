import { useEffect, useState } from "react";
import http from "../helpers/http";
import CardRoadmap from "../component/CardRoadmap";


const MyRoadmaps = () => {
    const [roadmaps, setRoadmaps] = useState([]);

    const fetchRoadmaps = async () => {
        try {
            const { data} = await http({
                method: 'get',
                url: '/roadmaps',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            console.log(data)
            setRoadmaps(data);
        } catch (error) {
            console.error('Error fetching roadmaps:', error);
        }
    }

    useEffect(() => {
        fetchRoadmaps();
    }, []);

    return (
        <>
            <div className="flex flex-col mx-40 my-10">
                <h1 className="text-2xl font-bold mb-4">My Roadmaps</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {roadmaps.map((roadmap) => (
                        <CardRoadmap key={roadmap.id} id={roadmap.id} title={roadmap.title} description={roadmap.description} createdAt={roadmap.createdAt} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyRoadmaps