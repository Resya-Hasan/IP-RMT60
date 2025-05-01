

const CardRoadmap = (props) => {
    const { title, description, createdAt } = props;
    return (
        <div className="border-1 border-gray-300 p-4 rounded hover:shadow-lg hover:border-purple-600 hover:text-purple-600 cursor-pointer transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p>{description}</p>
            <p className="text-sm text-gray-500">Created on: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
    )
}

export default CardRoadmap