import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conf_password, setconfPassword] = useState("");
    const [phone, setPhone] = useState("");

    const signUp = async () => {
        let newUser = {
            email,
            password,
            conf_password,
            phone,
        };

        await axios
            .post("http://127.0.0.1:8000/signup", newUser)
            .then((res) => {
                let data = res.data;
                console.log(data);
                document.querySelector(".user_msg").innerHTML =
                    "Account created successfully";
                document
                    .querySelector(".later_login")
                    .classList.remove("hidden");
            })
            .catch((err) => {
                console.error(err);
                document.querySelector(".user_msg").innerHTML =
                    err.response.data.data.msg;
            });
    };

    return (
        <div>
            <div className="h-screen w-full">
                <Nav />
                <div className="flex flex-col h-4/6 w-fit gap-6 mx-auto justify-center items-start">
                    <h1 className="text-2xl">Create a new account</h1>
                    <div className="flex flex-col p-4 gap-4">
                        <input
                            type="email"
                            placeholder="email"
                            className="border-2 border-orange-200 p-2 rounded-xl outline-orange-400"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                        />
                        <input
                            type="number"
                            placeholder="phone number"
                            className="border-2 border-orange-200 p-2 rounded-xl outline-orange-400"
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                            value={phone}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            className="border-2 border-orange-200 p-2 rounded-xl outline-orange-400"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                        />
                        <input
                            type="password"
                            placeholder="confirm password"
                            className="border-2 border-orange-200 p-2 rounded-xl outline-orange-400"
                            onChange={(e) => {
                                setconfPassword(e.target.value);
                            }}
                            value={conf_password}
                        />
                        <button
                            type="submit"
                            className="bg-orange-400 text-white px-4 py-2 rounded-xl"
                            onClick={signUp}
                        >
                            Sign up
                        </button>
                    </div>
                    <p
                        className="text-slate-400 cursor-pointer"
                        onClick={() => {
                            alert("here");
                            navigate("/");
                        }}
                    >
                        Already have an account? Log In
                    </p>
                    <p className="user_msg text-red-500 underline"></p>
                    <div className="flex justify-center items-center w-full">
                        <button
                            className="later_login hidden w-24 bg-orange-400 text-white px-4 py-2 rounded-xl"
                            onClick={() => navigate("/")}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
