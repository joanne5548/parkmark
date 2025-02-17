import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import ProfileTile from "../components/ProfilePage/ProfileTile";
import ProfileTabs from "../components/ProfilePage/ProfileTabs";
import RatingCard from "../components/Ratings/Display/RatingCard";
import { ReviewWithUserData, UserData } from "@lib/interfaces";
import { getUser } from "@lib/APIs/userDataApi";
import { logInUserAtom } from "@lib/atoms/atoms";
import {
    fetchReviewsCreatedByUser,
    fetchReviewsLikedByUser,
} from "@lib/APIs/reviewApi";
import { useAtomValue } from "jotai";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { userSubId } = useParams<{ userSubId: string }>(); // is this ok?
    const [userData, setUserData] = useState<UserData | null>(null);
    const [reviewsCreatedByUser, setReviewsCreatedByUser] = useState<
        ReviewWithUserData[]
    >([]);
    const [reviewsLikedByUser, setReviewsLikedByUser] = useState<
        ReviewWithUserData[]
    >([]);

    const logInUser: UserData | null = useAtomValue(logInUserAtom);

    const fetchUser = async (userSubId: string) => {
        const fetchedUserData: UserData | null = await getUser(userSubId);

        if (!fetchedUserData) {
            throw new Error("Fetched user is null!");
        }

        setUserData(fetchedUserData);
    };

    const fetchReviewPostedByUser = async () => {
        const fetchedReviewsCreatedByUser = await fetchReviewsCreatedByUser(
            userSubId!,
            logInUser?.sub_id ?? ""
        );

        if (!fetchedReviewsCreatedByUser) {
            throw new Error(
                "Something wrong with the review list created by user"
            );
        }

        setReviewsCreatedByUser(fetchedReviewsCreatedByUser);
    };

    const fetchReviewLikedByUser = async () => {
        const fetchedReviewsLikedByUser = await fetchReviewsLikedByUser(
            userSubId!,
            logInUser?.sub_id ?? ""
        );

        if (!fetchedReviewsLikedByUser) {
            throw new Error(
                "Something went wrong with fetched reviews liked by a user"
            );
        }

        setReviewsLikedByUser(fetchedReviewsLikedByUser);
    };

    useEffect(() => {
        if (!userSubId || userSubId === "") {
            navigate("/error");
            return;
        }

        fetchUser(userSubId);
        fetchReviewPostedByUser();
        fetchReviewLikedByUser();
    }, [logInUser]);

    return (
        <div className="flex flex-col gap-1 sm:gap-5 p-4 sm:p-6 sm:pr-3 sm:pb-3 h-screen">
            <NavBar showSearchBar={false} />
            <div className="min-h-0 flex-1 flex flex-col sm:flex-row justify-center gap-4 sm:gap-24 pb-4 sm:py-4">
                <ProfileTile
                    userData={userData}
                    reviewCount={reviewsCreatedByUser.length}
                />
                <div className="min-h-0 flex-1 sm:flex-initial w-full sm:w-1/2">
                    <ProfileTabs
                        tabs={[
                            {
                                title: "Reviews",
                                component: (
                                    <div
                                        key="reviewsTab"
                                        className="flex flex-col gap-2 pr-1 sm:pr-4 w-full max-w-[49rem] overflow-y-auto"
                                    >
                                        {reviewsCreatedByUser.map((review) => {
                                            return (
                                                <RatingCard
                                                    key={`reviewsTabRating-${review.review_id}`}
                                                    review={review}
                                                    fetchReviews={
                                                        fetchReviewPostedByUser
                                                    }
                                                    initialThumbsUpBool={
                                                        review.thumbs_up_id
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            );
                                        })}
                                    </div>
                                ),
                                fetchFunction: fetchReviewPostedByUser,
                                length: reviewsCreatedByUser.length,
                            },
                            {
                                title: "Likes",
                                component: (
                                    <div
                                        key="likesTab"
                                        className="flex flex-col gap-2 pr-1 sm:pr-4 w-full max-w-[49rem] overflow-y-auto"
                                    >
                                        {reviewsLikedByUser.map((review) => {
                                            return (
                                                <RatingCard
                                                    key={`likedTabRating-${review.review_id}`}
                                                    review={review}
                                                    fetchReviews={
                                                        fetchReviewLikedByUser
                                                    }
                                                    initialThumbsUpBool={
                                                        review.thumbs_up_id
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            );
                                        })}
                                    </div>
                                ),
                                fetchFunction: fetchReviewLikedByUser,
                                length: reviewsLikedByUser.length,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
