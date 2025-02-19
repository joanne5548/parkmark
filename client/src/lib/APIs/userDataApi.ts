import { handleApiError } from "@lib/apiHelpers";
import { UserData } from "@lib/interfaces";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function postNewUser(userData: UserData) {
    const response = await fetch(`${backendUrl}/api/userdata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error(`[Backend] Network response error: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
        throw new Error("Error creating new user.");
    }

    if (data.token) {
        localStorage.setItem("authToken", data.token);
    }
    else {
        throw new Error("Authentication failed");
    }
}

export async function getUser(sub_id: string) {
    const response = await fetch(
        `${backendUrl}/api/userdata/${sub_id}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    );

    if (!response.ok) {
        throw new Error(`[Backend] Network response error: ${response.status}`);
    }

    const data = await response.json();

    // If user doesn't exist
    if (!data) {
        return null;
    }
    
    // store auth token in local storage
    if (data.token) {
        localStorage.setItem("authToken", data.token);
    }
    else {
        throw new Error("Authentication failed");
    }

    const userData: UserData | null = data.userData;
    return userData;
}

export const putUser = async (userData: UserData) => {
    try {
        const response = await fetch(`${backendUrl}/api/userdata/${userData.sub_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`[Backend] Network error: ${response.status}`);
        }
    }
    catch (error) {
        handleApiError(error);
    }
}

export const deleteUser = async (subId: string) => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await fetch(`${backendUrl}/api/userdata/${subId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error(`[Backend] Network error: ${response.status}`);
        }

        return true;
    }
    catch (error) {
        handleApiError(error);
    }
}