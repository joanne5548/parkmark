import { UserData } from "./Interfaces";

export async function postNewUser(userData: UserData) {
    const response = await fetch("http://localhost:5000/userdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error(`[Backend] Network response error: ${response.status}`);
    }
}

export async function getUser(sub_id: string) {
    const response = await fetch(`http://localhost:5000/userdata/${sub_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error(`[Backend] Network response error: ${response.status}`);
    }

    const userData: UserData = await response.json();
    return userData;
}

export function handleApiError(error: any) {
    console.error({
        error: error instanceof Error ? error.message : "Default error message",
    });
}
