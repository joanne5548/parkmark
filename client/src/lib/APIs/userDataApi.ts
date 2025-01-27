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

    const userData: UserData | null = await response.json();
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

export function handleApiError(error: any) {
    console.error({
        error: error instanceof Error ? error.message : "Default error message",
    });
}
