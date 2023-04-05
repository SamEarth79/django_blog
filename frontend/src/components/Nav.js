import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
const Nav = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    return (
        <div className="w-full bg-orange-400 flex justify-between items-center px-10 py-10">
            <h1
                className="text-white text-3xl font-semibold font-mono cursor-pointer"
                onClick={(e) => navigate("/")}
            >
                Lions Circuit File Manager
            </h1>
            <div className="flex justify-center items-center gap-4">
                <Link to="/">
                    <span className="text-xl text-white font-semibold hover:underline-offset-4 p-6 hover:underline">
                        Portal
                    </span>
                </Link>
                <Link to="/upload">
                    <span className="text-xl text-white font-semibold hover:underline-offset-4 p-6 hover:underline">
                        Upload
                    </span>
                </Link>
                {user ? (
                    <CgProfile
                        className="text-4xl text-white cursor-pointer"
                        onClick={(e) => navigate("/profile")}
                    />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Nav;
