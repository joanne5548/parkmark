import { Route, Routes } from "react-router-dom";
import FrontPage from "./components/Pages/FrontPage";
import NationalParkPage from "./components/Pages/NationalParkPage";
import ErrorPage from "./components/Pages/ErrorPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/park/:parkname" element={<NationalParkPage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </>
    );
}

export default App;
