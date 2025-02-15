import { Route, Routes } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/profile/:userSubId" element={<ProfilePage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </>
    );
}

export default App;
