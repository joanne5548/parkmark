import React, { useState } from "react";
import logoImg from "../../assets/logo.jpg";
import { IoSearch } from "react-icons/io5";
import UserInfoTile from "./UserInfoTile";

const NavBar = () => {
    const [logIn, setLogIn] = useState<boolean>(false);

    return (
        <div className="flex flex-row justify-between gap-4 my-4 mx-5">
            <div className="flex flex-row gap-4">
                <img
                    src={logoImg}
                    className="size-8 md:size-10 bg-cover rounded-md"
                />
                <div className="font-semibold text-2xl md:text-4xl font-sriracha">
                    ParkMark
                </div>
            </div>
            <div className="flex flex-row items-center pl-2.5 w-5/12 max-h-10 gap-3 bg-slate-200 rounded-md">
                <IoSearch className="size-5 text-slate-500" />
                <div className="text-slate-500">
                    What's your favoriate park?
                </div>
            </div>
            {true ? (
                <UserInfoTile />
            ) : (
                <div className="flex flex-row gap-2 items-center">
                    <button className="flex justify-center items-center px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 font-semibold">
                        Login
                    </button>
                </div>
            )}
        </div>
    );
};

export default NavBar;
