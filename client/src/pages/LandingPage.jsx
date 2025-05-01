import { Link } from "react-router"
import Navbar from "../component/Navbar"


const LandingPage = () => {


    return (
        <>
            <div className="w-screen h-screen relative">
                <img src="https://img.freepik.com/free-photo/office-scene-with-laptop-top-view_23-2147626520.jpg?t=st=1746072059~exp=1746075659~hmac=22b827bfc5959b18998d6991d117b8d34a6fe6134943abae32290114af52a035&w=900"
                    alt="Finance Graphs"
                    className="w-full h-full object-cover"

                />

                <div className="absolute inset-0 bg-black opacity-70 pointer-events-none"></div>

                <div className="absolute inset-0 z-10">
                    <nav className="flex items-center justify-between p-5 px-20">
                        <h1 className="text-white text-xl font-bold">Jalurku</h1>
                        <ul className="flex space-x-4 text-white">
                            <li>
                                <Link
                                    to="/signin"
                                    className="hover:text-purple-500 transition duration-300 ease-in-out cursor-pointer"
                                >
                                    Sign in
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/signup"
                                    className="hover:text-purple-500 transition duration-300 ease-in-out cursor-pointer"
                                >
                                    Sign up
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                        Temukan Jalur Karier Aman dan Stabil
                    </h1>
                    <p className="text-white text-lg md:text-xl mb-6 max-w-2xl drop-shadow-md text-center">
                        Jalurku membantumu membangun roadmap karier, mendapatkan rekomendasi pekerjaan, dan berkonsultasi dengan AI untuk masa depan profesional yang lebih cerah.
                    </p>
                    <Link to="/home" className="bg-purple-600 w-40 h-12 text-white text-center font-bold py-2 px-3 text-lg rounded-md cursor-pointer hover:bg-purple-700 transition duration-300 ease-in-out z-10">
                        Get Started
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LandingPage