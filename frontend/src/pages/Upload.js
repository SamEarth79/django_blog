import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const Upload = () => {
    const [filename, setFilename] = useState("");
    const [files, setFiles] = useState([]);

    const uploadFile = async () => {
        let formData = new FormData();
        formData.append("FILE", filename);

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
                setFiles(data);
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
                        Uploaded files
                    </h1>
                    <div className="w-fit mx-auto py-10">
                        {files.map((file, index) => {
                            let split = String(file.FILE).split("/");
                            let filename = split[split.length - 1];
                            // console.log(filename);
                            // console.log(typeof filename);
                            return (
                                <div className="" key={index}>
                                    <h1
                                        onClick={(e) => {
                                            downloadFile(file.FILE, file.id);
                                        }}
                                    >
                                        {filename}
                                    </h1>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
