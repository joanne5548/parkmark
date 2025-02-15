import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import ProfileTile from "../components/ProfilePage/ProfileTile";
import ProfileTabs from "../components/ProfilePage/ProfileTabs";
import RatingCard from "../components/Ratings/Display/RatingCard";
import { ReviewWithUserData, UserData } from "@lib/interfaces";
import { getUser } from "@lib/APIs/userDataApi";
import { logInUserAtom } from "@lib/atoms/atoms";
import { fetchReviewsCreatedByUser, fetchReviewsLikedByUser } from "@lib/APIs/reviewApi";
import { useAtomValue } from "jotai";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { userSubId } = useParams<{ userSubId: string }>(); // is this ok?
    const [userData, setUserData] = useState<UserData | null>(null);
    const [reviewsCreatedByUser, setReviewsCreatedByUser] = useState<
        ReviewWithUserData[]
    >([]);
    const [reviewsLikedByUser, setReviewsLikedByUser] = useState<ReviewWithUserData[]>([]);

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
            userSubId!, // dumb..
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
        const fetchedReviewsLikedByUser = await fetchReviewsLikedByUser(userSubId!, logInUser?.sub_id ?? "");

        if (!fetchedReviewsLikedByUser) {
            throw new Error("Something went wrong with fetched reviews liked by a user");
        }

        setReviewsLikedByUser(fetchedReviewsLikedByUser);
    }

    useEffect(() => {
        if (!userSubId) {
            navigate("/error");
            return;
        }

        fetchUser(userSubId);
        fetchReviewPostedByUser();
        fetchReviewLikedByUser();
    }, [logInUser]);

    return (
        <div className="flex flex-col gap-4 sm:gap-8 p-2 sm:p-6">
            <NavBar />
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 p-4 sm:pr-0">
                <ProfileTile userData={userData} />
                <ProfileTabs tabs={[
					{
						"title": "Reviews",
						"component": <div key="reviewsTab" className="flex flex-col gap-2 max-w-[45rem]">
							{reviewsCreatedByUser.map((review, index) => {
                                console.log(review);
								return <RatingCard
                                    key={`reviewsTabRating-${index}`}
                                    review={review}
                                    fetchReviews={fetchReviewPostedByUser}
                                    initialThumbsUpBool={review.thumbs_up_id ? true : false} />
							})}
						</div>,
						"length": reviewsCreatedByUser.length
					},
					{
                        "title": "Likes",
						"component": <div key="likesTab" className="flex flex-col gap-2 max-w-[45rem]">
                            {reviewsLikedByUser.map((review, index) => {
                                return <RatingCard
                                    key={`likedTabRating-${index}`}
                                    review={review}
                                    fetchReviews={fetchReviewLikedByUser}
                                    initialThumbsUpBool={review.thumbs_up_id ? true : false} />
                            })}
                        </div>,
						"length": reviewsLikedByUser.length
					}
				]}/>
            </div>
        </div>
    );
};

export default ProfilePage;
