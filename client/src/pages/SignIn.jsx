

const SignInPage = () => {
    return (
        <>
            <div className="w-screen h-screen flex">
                <div className="w-1/2 h-full flex items-center justify-center">
                    <form className="bg-white w-full h-full flex flex-col items-center justify-center ">
                        <h1 className="text-4xl font-bold mb-4">Sign In</h1>
                        <div className="flex flex-col mb-4 gap-2">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-75 py-1 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="flex flex-col mb-4 gap-2">
                            <label>Password</label>
                            <input
                                type="password"
                                className="w-75 py-1 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <button type="submit"
                            className="bg-purple-500 text-white py-1 px-4 rounded w-75 cursor-pointer hover:bg-purple-600 transition duration-300 ease-in-out"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
                <div className="w-1/2 flex items-center justify-center bg-stone-100">

                    <img src="https://img.freepik.com/free-photo/modern-handsome-man-busy-his-work-drinking-coffee_285396-1647.jpg?t=st=1746077307~exp=1746080907~hmac=403bfc170b7c867f0d8cf1068dd51156c4c30b807b134ce9cf862b89fcec4fee&w=996"
                        alt="Sign In"
                        className="h-full object-cover text-black"
                    />
                    <div className="w-full h-full bg-black opacity-70">

                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInPage;