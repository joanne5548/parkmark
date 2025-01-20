import { useState } from "react";
import UserInfoTile from "./UserInfoTile";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GoogleLoginCredential, UserData } from "../../lib/interfaces";
import { getUser, handleApiError, postNewUser } from "../../lib/userDataApi";

const Login = () => {
    const [logInUserData, setLogInUserData] = useState<UserData | null>(null);

    const handleLoginSuccess = async (response: CredentialResponse) => {
        const credentialJson: GoogleLoginCredential = jwtDecode(
            response.credential!
        );
        const sub_id = credentialJson.sub;

        try {
            const userDataFromDb: UserData | null = await getUser(sub_id);

            if (userDataFromDb) {
                setLogInUserData(userDataFromDb);
            }
            else {
                const userData: UserData = {
                    sub_id: sub_id,
                    name: credentialJson.name,
                    email: credentialJson.email,
                    profile_picture_url: credentialJson.picture,
                };

                await postNewUser(userData);
        
                setLogInUserData(userData);
            }
        } catch (error: any) {
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
