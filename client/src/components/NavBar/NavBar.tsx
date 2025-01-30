import logoImg from "@assets/parkmark-logo.jpg";
import Login from "./Login";
import SearchBar from "./SearchBar";

const NavBar = () => {

    const handleLogoClick = () => {
        window.location.reload();
    };

    // do I really need to do all this to check window width?
    // https://www.google.com/search?q=javascript+check+viewport+size+react&sca_esv=c7459735fc04b658&rlz=1C1CHBF_enUS1078US1078&sxsrf=AHTn8zp__e07tDbwBX1SqkYkk0KovZlZLg%3A1738191681944&ei=QbOaZ6OsOZK1wN4Pk_LnKQ&ved=0ahUKEwjj0IPOhJyLAxWSGtAFHRP5OQUQ4dUDCBI&uact=5&oq=javascript+check+viewport+size+react&gs_lp=Egxnd3Mtd2l6LXNlcnAiJGphdmFzY3JpcHQgY2hlY2sgdmlld3BvcnQgc2l6ZSByZWFjdDIFECEYoAEyBRAhGKABMgUQIRigATIFECEYnwUyBRAhGJ8FSK8MUMwGWNQLcAF4AJABAJgBqwGgAfUFqgEDMS41uAEDyAEA-AEBmAIGoALNBcICChAAGLADGNYEGEfCAgYQABgWGB7CAgsQABiABBiGAxiKBcICCBAAGIAEGKIEwgIFEAAY7wWYAwCIBgGQBgiSBwMxLjWgB7sh&sclient=gws-wiz-serp

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
