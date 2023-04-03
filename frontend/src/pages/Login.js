import React, { useState } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logIn = () => {
        let loginCred = {
            email,
            password,
        };
        axios
            .post("http://127.0.0.1:8000/login", loginCred)
            .then((res) => {
                console.log(res);
                alert("login success");
            })
            .catch((err) => {
                console.error(err);
                document.querySelector(".user_msg").innerHTML =
                    err.response.data.data.msg;
            });
    };

    return (
        <div className="h-screen w-full">
            <Nav />
            <div className="flex flex-col h-4/6 gap-6 w-fit mx-auto justify-center items-start">
                <h1 className="text-2xl">Login to your account</h1>
                <div className="flex flex-col p-10 gap-4">
                    <input
                        type="text"
                        placeholder="username"
                        className="border-2 border-orange-200 p-2 rounded-xl outline-orange-400"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        className="border-2 border-orange-200 p-2 rounded-xl outline-orange-400"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button
                        type="submit"
                        className="bg-orange-400 text-white px-4 py-2 rounded-xl"
                        onClick={logIn}
                    >
                        Log In
                    </button>
                </div>
                <p
                    className="text-slate-400 cursor-pointer"
                    onClick={() => {
                        navigate("/signup");
                    }}
                >
                    Create Account?
                </p>
                <p className="user_msg text-red-500 underline"></p>
            </div>
        </div>
    );
};

export default Login;
