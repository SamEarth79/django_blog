import React, { useState } from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
    const user = useSelector((state) => state.user.user);

    const [email, setEmail] = useState(user && user.email);
    const [phone, setPhone] = useState(user && user.phone);

    const updateUser = () => {
        let updatedUser = {
            email,
            phone,
        };
        console.log(updatedUser);
        axios
            .put("http://127.0.0.1:8000/signup", updatedUser)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="h-screen">
            <Nav />
            <div className="p-10 h-full">
                <h1 className="text-6xl font-semibold">My Profile</h1>
                <div className="flex flex-col gap-4 items-start h-3/6 w-fit mx-auto justify-center">
                    <div className="flex gap-4 items-center">
                        <p className="text-xl font-semibold">Email</p>{" "}
                        <span className="text-xl text-slate-500">
                            <input type="text" value={email} className="w-80" />
                        </span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className="text-xl font-semibold">Phone</p>{" "}
                        <span className="text-xl text-slate-500">
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => {
                                    document.querySelector(
                                        ".update_button"
                                    ).disabled = false;
                                    setPhone(e.target.value);
                                }}
                            />
                        </span>
                    </div>
                    <button
                        className="update_button w-fit mx-auto text-lg border-2 border-orange-500 rounded-lg px-4 py-2 disabled:bg-slate-400 disabled:text-slate-800 disabled:border-0"
                        onClick={updateUser}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
