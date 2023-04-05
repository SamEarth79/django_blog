import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import axios from "axios";

const Portal = () => {
    const [files, setFiles] = useState([]);
    const [extCount, setExtCount] = useState([]);
    const [userCount, setUserCount] = useState([]);
    const user = useSelector((state) => state.user.user);

    const getFiles = async () => {
        axios
            .get("http://127.0.0.1:8000/files/")
            .then(async (res) => {
                const data = res.data;
                console.log(data);
                await setFiles(data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const getExtCount = () => {
        let extMap = new Map();
        files.forEach((file) => {
            const fileExtension = String(file.FILE).split(".").slice(-1)[0];
            console.log(fileExtension);
            if (!extMap.has(fileExtension)) {
                extMap.set(fileExtension, 1);
            } else {
                let curr = extMap.get(fileExtension);
                extMap.set(fileExtension, curr + 1);
            }
        });
        console.log(extMap);
        let extensionMapArr = [];
        extMap.forEach((v, k) => {
            extensionMapArr.push([k, v]);
        });
        console.log(extensionMapArr);
        setExtCount(extensionMapArr);
    };

    const getUserCount = () => {
        let userMap = new Map();
        files.forEach((file) => {
            const email = file.user;
            if (!userMap.has(email)) userMap.set(email, 1);
            else {
                let curr = userMap.get(email);
                userMap.set(email, curr + 1);
            }
        });
        let userMapArr = [];
        userMap.forEach((v, k) => {
            userMapArr.push([k, v]);
        });
        setUserCount(userMapArr);
    };

    useEffect(() => {
        getFiles();
    }, []);

    useEffect(() => {
        getExtCount();
        getUserCount();
    }, [files]);

    return (
        <div>
            <Nav />
            <div className="p-10">
                <h1 className="text-6xl font-semibold text-gray-500">Portal</h1>
                <p className="italic text-slate-400">
                    Here are some uploaded files statistics
                </p>
                <div className="mt-10 flex flex-col gap-8">
                    <div className="">
                        <h2 className="text-4xl font-medium text-gray-700 flex items-center gap-2">
                            Number of files uploaded:{" "}
                            <span className="text-5xl drop-shadow-xl text-orange-500">
                                {files.length}
                            </span>
                        </h2>
                    </div>
                    <div className="">
                        <h2 className="text-4xl font-medium text-gray-700 flex items-center gap-2">
                            Number of files uploaded of each type
                        </h2>
                        <table className="m-5">
                            <tr className="text-lg text-orange-500 bg-orange-100">
                                <th className="px-2 border-t-2 border-b-2 border-orange-300">
                                    Extension
                                </th>
                                <th className="px-2 border-t-2 border-b-2 border-orange-300">
                                    Count
                                </th>
                            </tr>
                            {extCount.map((ele) => {
                                return (
                                    <tr className="text-lg">
                                        <td className="px-1 text-center border-b border-orange-300">
                                            {ele[0]}
                                        </td>
                                        <td className="px-1 text-center border-b border-orange-300">
                                            {ele[1]}
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                    <div className="">
                        <h2 className="text-4xl font-medium text-gray-700 flex items-center gap-2">
                            Number of files uploaded by each user
                        </h2>
                        <table className="m-5">
                            <tr className="text-lg text-orange-500 bg-orange-100">
                                <th className="px-2 border-t-2 border-b-2 border-orange-300">
                                    User
                                </th>
                                <th className="px-2 border-t-2 border-b-2 border-orange-300">
                                    Count
                                </th>
                            </tr>
                            {userCount.map((ele) => {
                                return (
                                    <tr className="text-lg">
                                        <td className="px-1 text-left border-b border-orange-300">
                                            {ele[0]}
                                        </td>
                                        <td className="px-1 text-center border-b border-orange-300">
                                            {ele[1]}
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portal;
