export const handleApiError = (error: any) => {
    console.error({
        error: error instanceof Error ? error.message : "Default error message",
    });
}

export const getAuthToken = () => {
    return localStorage.getItem("authToken");
}