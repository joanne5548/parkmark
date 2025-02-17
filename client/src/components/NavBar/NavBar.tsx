import { useNavigate } from "react-router-dom";
import Login from "./Login";
import SearchBar from "./SearchBar";
import logoImg from "@assets/parkmark-logo.jpg";
import clsx from "clsx";

interface NavBarProps {
    showSearchBar: boolean;
}

const NavBar = ({ showSearchBar }: NavBarProps) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-row justify-between gap-2 sm:gap-4 mb-3">
            <div className={clsx(
                "flex-row gap-2 sm:gap-4 items-center",
                showSearchBar ? "hidden sm:flex" : "flex"
            )}>
                <img
                    src={logoImg}
                    className="size-9 sm:size-12 bg-cover rounded-3xl"
                />
                <div
                    onClick={handleLogoClick}
                    className="font-semibold text-[1.75rem] sm:text-4xl font-sriracha hover:underline underline-offset-4 hover:cursor-pointer"
                >
                    ParkMark
                </div>
            </div>
            <SearchBar showSearchBar={showSearchBar} />
            <Login />
        </div>
    );
};

export default NavBar;
