import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Portal from "./pages/Portal";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";

function App() {
    const [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState("");
    const [fileExt, setFileExt] = useState("");

    const fetchData = () => {
        axios
            .get("http://localhost:8000")
            .then((res) => {
                let data = res.data;
                setFiles(data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const addNewFile = async (e) => {
        e.preventDefault();
        let newFile = {
            filename: fileName,
            extension: fileExt,
        };
        console.log(newFile);

        await axios
            .post("http://localhost:8000", newFile)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });

        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const user = useSelector((state) => state.user.user);

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Portal /> : <Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/portal" element={<Portal />} />
                <Route exact path="/profile" element={<Profile />} />
                {/* <Route path="/login" element={<LogIn />} />
                <Route path="/admin" element={user ? <Admin /> : <Home />} />
                <Route path="/book" element={user ? <HomeBook /> : <LogIn />} />
                <Route
                    path="/thankyou"
                    element={user ? <ThankYou /> : <Home />}
                />
                <Route
                    path="/myAppointments"
                    element={user ? <MyAppointments /> : <Home />}
                /> */}
            </Routes>
        </Router>

        // <div className="App">
        //     <h1>Files</h1>
        //     {files.map((file, index) => {
        //         return (
        //             <div className="" key={index}>
        //                 <h2>{file.filename}</h2>
        //                 <h2>{file.extension}</h2>
        //             </div>
        //         );
        //     })}

        //     <div className="">
        //         <input
        //             type="text"
        //             placeholder="Enter file name"
        //             value={fileName}
        //             onChange={(e) => {
        //                 setFileName(e.target.value);
        //             }}
        //         />
        //         <input
        //             type="text"
        //             placeholder="Enter file extension"
        //             value={fileExt}
        //             onChange={(e) => {
        //                 setFileExt(e.target.value);
        //             }}
        //         />
        //         <button type="submit" onClick={addNewFile}>
        //             Add new file
        //         </button>
        //     </div>
        // </div>
    );
}

export default App;
