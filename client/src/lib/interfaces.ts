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
        states?: string;
    };
}

export interface Review {
    id?: string;
    user_sub_id: string;
    park_id: string;
    rating: number;
    content: string;
    img_url: string;
    created_at?: string;
}

export interface ThumbsUpData {
    id?: string;
    user_sub_id: string;
    review_id: string;
}

export interface ReviewWithUserData {
    review_id: string;
    park_id: string;
    rating: number;
    content: string;
    img_url: string;
    created_at: string;

    user_sub_id: string;
    user_name: string;
    user_profile_picture_url: string;
}

export interface StarRatingPercentageList {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
}