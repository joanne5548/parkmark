import { UserData } from "./interfaces";

export const userDataMatchesFromDatabase = (
    userDataFromDb: UserData,
    currentUserData: UserData
) => {
    if (
        userDataFromDb.name === currentUserData.name &&
        userDataFromDb.email === currentUserData.email &&
        userDataFromDb.profile_picture_url ===
            currentUserData.profile_picture_url
    ) {
        return true;
    }
    return false;
};
