import { Route, Routes } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </>
    );
}

export default App;
