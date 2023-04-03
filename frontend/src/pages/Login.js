import React from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full">
            <Nav />
            <div className="flex flex-col h-4/6 gap-6 w-fit mx-auto justify-center items-start">
                <h1 className="text-2xl">Login to your account</h1>
                <form action="" className="flex flex-col p-10 gap-4">
                    <input
                        type="text"
                        placeholder="username"
                        className="border-2 border-orange-200 p-2 rounded-xl outline-orange-400"
                    />
                    <input
                        type="password"
                        placeholder="password"
                        className="border-2 border-orange-200 p-2 rounded-xl outline-orange-400"
                    />
                    <button
                        type="submit"
                        className="bg-orange-400 text-white px-4 py-2 rounded-xl"
                    >
                        Log In
                    </button>
                </form>
                <p
                    className="text-slate-400 cursor-pointer"
                    onClick={() => {
                        navigate("/signup");
                    }}
                >
                    Create Account?
                </p>
            </div>
        </div>
    );
};

export default Login;
