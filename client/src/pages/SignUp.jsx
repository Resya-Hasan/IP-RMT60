import { useState } from "react";
import http from "../helpers/http";
import handleError from "../helpers/handleError";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const SignUpPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await http({
                method: 'POST',
                url: '/register',
                data: {
                    username,
                    email,
                    password
                }
            })
            console.log(data)
            localStorage.setItem('access_token', data.access_token)
            Swal.fire({
                title: "Sign Up Success",
                icon: "success",
                draggable: true
              });
            navigate('/signin')
        } catch (err) {
            handleError(err)
        }
    }

    return (
        <>
            <div className="w-screen h-screen flex">
                <div className="w-1/2 flex items-center justify-center bg-stone-100">

                    <img src="https://img.freepik.com/free-photo/young-man-working-office_23-2147643038.jpg?t=st=1746081115~exp=1746084715~hmac=87f1fff0d1c9801c6669578d56448a73a64fe7760ad09ff4774737dd1e19630c&w=996"
                        alt="Sign Up"
                        className="h-full object-cover text-black"
                    />
                    <div className="w-full h-full bg-black opacity-70">

                    </div>
                </div>
                <div className="w-1/2 h-full flex items-center justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white w-full h-full flex flex-col items-center justify-center "
                    >
                        <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
                        <div className="flex flex-col mb-4 gap-2">
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="w-75 py-1 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col mb-4 gap-2">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-75 py-1 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col mb-4 gap-2">
                            <label>Password</label>
                            <input
                                type="password"
                                className="w-75 py-1 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit"
                            className="bg-purple-500 text-white py-1 px-4 rounded w-75 cursor-pointer hover:bg-purple-600 transition duration-300 ease-in-out"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUpPage;