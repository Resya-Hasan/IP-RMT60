import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../helpers/http";
import { Link } from "react-router-dom";

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            setError(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchJobDetail();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!job) return null;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <img src={job.imgUrl} alt={job.title} className="w-full h-64 object-cover rounded-md mb-4" />
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <p className="text-gray-600 mb-1">Tipe Pekerjaan: {job.jobType}</p>
            <p className="text-gray-600 mb-1">Lokasi: {job.User?.address}</p>
            <p className="mt-4 text-gray-800 whitespace-pre-line">{job.description}</p>
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
