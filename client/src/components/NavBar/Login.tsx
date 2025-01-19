import { useState } from "react";
import UserInfoTile from "./UserInfoTile";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface GoogleLoginCredential {
    sub: string;
    name: string;
    email: string;
    picture: string;
}

interface UserData {
    sub_id: string;
    name: string;
    email: string;
    profile_picture_url: string;
}

const Login = () => {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);

    const handleLoginSuccess = async (response: CredentialResponse) => {
        const credentialJson: GoogleLoginCredential = jwtDecode(response.credential!);
        console.log(credentialJson);
        
        const userData: UserData = {
            sub_id: credentialJson.sub,
            name: credentialJson.name,
            email: credentialJson.email,
            profile_picture_url: credentialJson.picture
        };
        console.log(userData);
        
        try {
            const response = await fetch("http://localhost:5000/userdata", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(`Network response error: ${response.status}`);
            }

            setUserIsLoggedIn(true);
        }
        catch (error) {
            console.error({
                error:
                    error instanceof Error
                        ? error.message
                        : "Default error message",
            });
        }
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
