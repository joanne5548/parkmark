import { useNavigate } from "react-router-dom";
import Login from "./Login";
import SearchBar from "./SearchBar";
import logoImg from "@assets/parkmark-logo.jpg";

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-row justify-between gap-2 sm:gap-4">
            <div className="hidden sm:flex flex-row gap-4 items-center">
                <img
                    src={logoImg}
                    className="size-8 sm:size-12 bg-cover rounded-3xl"
                />
                <div
                    onClick={handleLogoClick}
                    className="font-semibold text-2xl sm:text-4xl font-sriracha hover:underline underline-offset-4 hover:cursor-pointer"
                >
                    ParkMark
                </div>
            </div>
            <SearchBar />
            <Login />
        </div>
    );
};

export default NavBar;
