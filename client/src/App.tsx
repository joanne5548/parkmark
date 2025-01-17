import { Route, Routes } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import NationalParkPage from "./components/NationalParkPage/NationalParkPage";
import ErrorPage from "./components/ErrorPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/nationalpark/:parkname" element={<NationalParkPage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </>
    );
}

export default App;
