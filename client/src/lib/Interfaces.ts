export interface GoogleLoginCredential {
    sub: string;
    name: string;
    email: string;
    picture: string;
}

export interface UserData {
    sub_id: string;
    name: string;
    email: string;
    profile_picture_url: string;
}

export interface NationalPark {
    id: string;
    name: string;
    park_info: {
        coordinates: {
            longitude: number;
            latitude: number;
        };
    };
}
