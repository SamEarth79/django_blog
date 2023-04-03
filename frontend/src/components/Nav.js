import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-orange-400 flex justify-between items-center px-10 py-10">
            <h1 className="text-white text-3xl font-semibold font-mono">
                Lions Circuit File Manager
            </h1>
        </div>
    );
};

export default Nav;
