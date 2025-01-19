import { useState } from "react";
import UserInfoTile from "./UserInfoTile";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GoogleLoginCredential, UserData } from "../../lib/Interfaces";
import { getUser, handleApiError, postNewUser } from "../../lib/UserDataApi";

const Login = () => {
    const [logInUserData, setLogInUserData] = useState<UserData | null>(null);

    const handleLoginSuccess = async (response: CredentialResponse) => {
        const credentialJson: GoogleLoginCredential = jwtDecode(
            response.credential!
        );
        console.log(credentialJson);

        const sub_id = credentialJson.sub;

        try {
            const userData: UserData = await getUser(sub_id);

            setLogInUserData(userData);
            return;
        } catch (error) {
            // How do I MAKE SURE that the error is from duplicate key?
            console.log(
                "user possibly does not exist in database. try creating new user"
            );
        }

        const userData: UserData = {
            sub_id: sub_id,
            name: credentialJson.name,
            email: credentialJson.email,
            profile_picture_url: credentialJson.picture,
        };
        console.log(userData);

        try {
            await postNewUser(userData);

            setLogInUserData(userData);
        } catch (error) {
            handleApiError(error);
        }
    };

    const resetLogInUser = () => {
        setLogInUserData(null);
    };

    return (
        <div>
            {logInUserData ? (
                <UserInfoTile
                    logInUserData={logInUserData}
                    resetLogInUser={resetLogInUser}
                />
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
