
const Roadmap = (props) => {
    const { step } = props;
    return (
        <>
            <div className="mb-6 p-4 border rounded shadow-sm bg-gray-50">
                <h3 className="text-xl font-bold mb-2">Step {step.step}: {step.title}</h3>
                <p className="mb-2 text-gray-700">{step.description}</p>
                <p className="mb-2 text-sm text-gray-500">Durasi: {step.duration}</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                    {step.skills.map((skill, i) => (
                        <li key={i}>{skill}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Roadmap;