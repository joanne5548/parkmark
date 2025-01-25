import logoImg from "../../assets/parkmark-logo.jpg";
import Login from "./Login";
import SearchBar from "./SearchBar";

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
            <SearchBar />
            <Login />
        </div>
    );
};

export default NavBar;
