import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const Signup = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="h-screen w-full">
                <Nav />
                <div className="flex flex-col h-4/6 w-fit gap-6 mx-auto justify-center items-start">
                    <h1 className="text-2xl">Create a new account</h1>
                    <form action="" className="flex flex-col p-4 gap-4">
                        <input
                            type="text"
                            placeholder="username"
                            className="border-2 border-orange-200 p-2 rounded-xl outline-orange-400"
                        />
                        <input
                            type="number"
                            placeholder="phone number"
                            className="border-2 border-orange-200 p-2 rounded-xl outline-orange-400"
                        />
                        <input
                            type="password"
                            placeholder="password"
                            className="border-2 border-orange-200 p-2 rounded-xl outline-orange-400"
                        />
                        <input
                            type="password"
                            placeholder="confirm password"
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
                            navigate("/");
                        }}
                    >
                        Already have an account? Log In
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
