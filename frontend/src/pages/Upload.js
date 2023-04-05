import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import axios from "axios";

const Upload = () => {
    const [filename, setFilename] = useState("");
    const [files, setFiles] = useState([]);
    const user = useSelector((state) => state.user.user);

    const uploadFile = async () => {
        let currUser = {
            email: user.email,
            password: user.password,
            conf_password: user.conf_password,
            phone: user.phone,
        };
        console.log(currUser);

        let formData = new FormData();
        formData.append("FILE", filename);
        formData.append("user", user.email);

        const values = [...formData.entries()];
        console.log(values);

        console.log(formData);

        let axiosConfig = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };

        await axios
            .post("http://127.0.0.1:8000/files/", formData, axiosConfig)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
        getFiles();
    };

    const getFiles = async () => {
        await axios
            .get("http://127.0.0.1:8000/files/")
            .then((res) => {
                const data = res.data;
                console.log(data);
                const myFiles = data.filter((file) => {
                    return file.user === user.email;
                });
                console.log(myFiles);
                setFiles(myFiles);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const forceDownload = (response, title, fileUrl) => {
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        const split = String(fileUrl).split(".");
        const ext = split[split.length - 1];
        link.setAttribute("download", title + "." + ext);
        document.body.appendChild(link);
        link.click();
    };

    const downloadFile = (fileUrl, fileID) => {
        console.log(`${fileUrl}   ${fileID}`);

        axios
            .get(fileUrl, { responseType: "arraybuffer" })
            .then((res) => {
                console.log(res);
                forceDownload(res, fileID, fileUrl);
            })
            .catch((err) => {
                console.error(err);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getFiles();
    }, []);

    return (
        <div>
            <Nav />
            <div className="h-screen p-10">
                <h1 className="text-5xl font-semibold text-gray-500">
                    Upload your files here
                </h1>
                <div className="w-fit mx-auto mt-20">
                    <input
                        type="file"
                        name=""
                        id=""
                        onChange={(e) => setFilename(e.target.files[0])}
                    />
                    <button
                        className="bg-orange-500 px-4 py-2 rounded-lg text-white font-semibold"
                        onClick={uploadFile}
                    >
                        Upload file
                    </button>
                </div>
                <div className="mt-20">
                    <h1 className="text-5xl font-semibold text-gray-500">
                        Files uploaded by you
                    </h1>
                    <div className="w-fit mx-auto py-10">
                        <table>
                            <tr>
                                <th className="text-xl font-bold p-2 border-2 border-orange-300">
                                    Filename
                                </th>
                                <th className="text-xl font-bold p-2 border-2 border-orange-300">
                                    Extension
                                </th>
                                <th className="text-xl font-bold p-2 border-2 border-orange-300">
                                    Date
                                </th>
                            </tr>
                            {files.map((file, index) => {
                                let split = String(file.FILE).split("/");
                                let filename = split[split.length - 1];

                                let ext_split = filename.split(".");
                                let ext = ext_split[ext_split.length - 1];
                                return (
                                    <tr className="" key={index}>
                                        <td
                                            onClick={(e) => {
                                                downloadFile(
                                                    file.FILE,
                                                    file.id
                                                );
                                            }}
                                            className="p-2 border border-orange-200"
                                        >
                                            {filename}
                                        </td>
                                        <td className="p-2 border border-orange-200">
                                            {ext}
                                        </td>
                                        <td className="p-2 border border-orange-200">
                                            {`${String(file.uploaded_on).slice(
                                                0,
                                                10
                                            )}`}
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

export default Upload;
