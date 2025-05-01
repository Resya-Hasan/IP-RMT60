import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../helpers/http";
import { Link } from "react-router-dom";
import handleError from "../helpers/handleError";

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [roadmap, setRoadmap] = useState(null);
    const [generating, setGenerating] = useState(false);

    const fetchJobDetail = async () => {
        try {
            const { data } = await http({
                method: 'get',
                url: `/jobs/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            setJob(data);
        } catch (err) {
            handleError(err);
        }
    }

    const generateRoadmap = async () => {
        try {
            setGenerating(true);
            const { data } = await http({
                method: 'post',
                url: `/roadmaps/generate/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            setRoadmap(data.careerRoadmap);

        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchJobDetail();
    }, []);

    if (!job) return null;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <img src={job.imgUrl} alt={job.title} className="w-full h-64 object-cover rounded-md mb-4" />
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <p className="text-gray-600 mb-1">Tipe Pekerjaan: {job.jobType}</p>
            <p className="text-gray-600 mb-1">Lokasi: {job.User?.address}</p>
            <p className="mt-4 text-gray-800 whitespace-pre-line">{job.description}</p>

            <button
                onClick={generateRoadmap}
                className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                disabled={generating}
            >
                {generating ? "Generating..." : "Generate Roadmap"}
            </button>

            {roadmap && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-4">Career Roadmap</h2>
                    {roadmap.map(step => (
                        <div key={step.step} className="mb-6 p-4 border rounded shadow-sm bg-gray-50">
                            <h3 className="text-xl font-bold mb-2">Step {step.step}: {step.title}</h3>
                            <p className="mb-2 text-gray-700">{step.description}</p>
                            <p className="mb-2 text-sm text-gray-500">Durasi: {step.duration}</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                                {step.skills.map((skill, i) => (
                                    <li key={i}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            <Link
                to="/"
                className="mt-6 inline-block bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
            >
                Kembali
            </Link>
        </div>
    );
};

export default JobDetail;
