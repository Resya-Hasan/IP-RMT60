import { Link } from "react-router";

const Card = (props) => {
    const { title, jobType, address, imageUrl } = props;
    return (
        <Link className="border border-gray-200 rounded-lg shadow-md overflow-hidden w-75 hover:scale-102 transition-transform duration-300 ease-in-out cursor-pointer">
            <div className="relative">
                <img
                    src={imageUrl}
                    className="w-full h-48 object-cover"
                    alt="Product Image"
                />
            </div>

            <div className="p-4 flex flex-col justify-between h-48">
                <div>
                    <div className="mb-2 font-bold text-lg">{title}</div>
                    <h3 className="text-md font-medium text-gray-800 mb-3">{jobType}</h3>
                </div>

                <div className="flex space-x-2 mt-2">
                    <p className="text-sm font-medium text-gray-800 mb-3">{address}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;