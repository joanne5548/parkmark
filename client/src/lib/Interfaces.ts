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

export interface Review {
    id: string;
    user_sub_id: string;
    park_id: string;
    rating: number;
    content: string;
    img_url_list: JSON;
    created_at: string;
}