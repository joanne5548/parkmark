import React, { useState } from "react";
import UserInfoTile from "./UserInfoTile";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);

    const handleLoginSuccess = (response: CredentialResponse) => {
        // console.log(response);
        console.log(jwtDecode(response.credential!));
        setUserIsLoggedIn(true);
    };

    return (
        <div>
            {userIsLoggedIn ? (
                <UserInfoTile setUserIsLoggedIn={setUserIsLoggedIn} />
            ) : (
                <div>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={() => {
                            console.log("Login failed! :(");
                        }}
                        auto_select={true}
                    />
                </div>
            )}
        </div>
    );
};

export default Login;
