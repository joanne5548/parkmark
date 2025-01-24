import { UserData } from "../interfaces";

export async function postNewUser(userData: UserData) {
    const response = await fetch("http://localhost:5000/api/userdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error(`[Backend] Network response error: ${response.status}`);
    }
}

export async function getUser(sub_id: string) {
    const response = await fetch(
        `http://localhost:5000/api/userdata/${sub_id}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    );

    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }
        throw new Error(`[Backend] Network response error: ${response.status}`);
    }

    const userData: UserData = await response.json();
    return userData;
}

// export async function createAndSetUserFromLogin(credentialJson: GoogleLoginCredential, setLoginUserDataWrapper: (userData: UserData | null) => void) {
//     const userData: UserData = {
//         sub_id: credentialJson.sub,
//         name: credentialJson.name,
//         email: credentialJson.email,
//         profile_picture_url: credentialJson.picture,
//     };

//     try {
//         await postNewUser(userData);
//     }
//     catch (error) {
//         handleApiError(error);
//     }

//     setLogInUserData(userData);
// }

export function handleApiError(error: any) {
    console.error({
        error: error instanceof Error ? error.message : "Default error message",
    });
}
