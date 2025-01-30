import UserInfoTile from "./UserInfoTile";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GoogleLoginCredential, UserData } from "@lib/interfaces";
import {
    getUser,
    handleApiError,
    postNewUser,
    putUser,
} from "@lib/APIs/userDataApi";
import { useAtom } from "jotai";
import { logInUserAtom } from "@lib/atoms/atoms";
import { userDataMatchesFromDatabase } from "@lib/checkUserDataFromDb";

const Login = () => {
    const [logInUser, setLogInUser] = useAtom(logInUserAtom);

    const handleLoginSuccess = async (response: CredentialResponse) => {
        const credentialJson: GoogleLoginCredential = jwtDecode(
            response.credential!
        );
        const sub_id = credentialJson.sub;

        try {
            const userDataFromDb: UserData | null = await getUser(sub_id);

            const currentUserData: UserData = {
                sub_id: sub_id,
                name: credentialJson.name,
                email: credentialJson.email,
                profile_picture_url: credentialJson.picture,
            };

            if (!userDataFromDb) {
                await postNewUser(currentUserData);
            }
            else if (!userDataMatchesFromDatabase(userDataFromDb, currentUserData)) {
                await putUser(currentUserData);
            }

            setLogInUser(currentUserData);
        } catch (error: any) {
            handleApiError(error);
        }
    };

    return (
        <div>
            {logInUser ? (
                <UserInfoTile />
            ) : (
                <div>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={() => {
                            console.log("Login failed! :(");
                        }}
                        auto_select={true}
                        type="icon"
                        text="signin"
                        shape="circle"
                    />
                </div>
            )}
        </div>
    );
};

export default Login;
