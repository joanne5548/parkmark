import logoImg from "../../assets/parkmark-logo.jpg";
import { IoSearch } from "react-icons/io5";
import Login from "./Login";

const NavBar = () => {

    const handleLogoClick = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-row justify-between gap-4">
            <div className="flex flex-row gap-4 items-center">
                <img
                    src={logoImg}
                    className="size-8 md:size-12 bg-cover rounded-3xl"
                />
                <div
                    onClick={handleLogoClick}
                    className="font-semibold text-2xl md:text-4xl font-sriracha hover:underline underline-offset-4 hover:cursor-pointer"
                >
                    ParkMark
                </div>
            </div>
            {/* if the page is too tight, disable the search bar */}
            <div className="flex flex-row items-center pl-2.5 w-5/12 max-h-10 gap-3 bg-slate-200 rounded-md">
                <IoSearch className="size-5 text-slate-500" />
                <div className="text-slate-500">
                    What's your favoriate park?
                </div>
            </div>

            <Login />
        </div>
    );
};

export default NavBar;
