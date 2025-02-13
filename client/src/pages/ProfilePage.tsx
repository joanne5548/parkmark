import ProfileTile from "../components/ProfilePage/ProfileTile";
import NavBar from "../components/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import ProfileTabs from "../components/ProfilePage/ProfileTabs";
import { useEffect, useState } from "react";
import { ReviewWithUserData, UserData } from "@lib/interfaces";
import { getUser } from "@lib/APIs/userDataApi";
import { useAtomValue } from "jotai";
import { logInUserAtom } from "@lib/atoms/atoms";
import { fetchReviewsCreatedByUser } from "@lib/APIs/reviewApi";
import RatingCard from "../components/Ratings/Display/RatingCard";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { userSubId } = useParams<{ userSubId: string }>(); // is this ok?
    const [userData, setUserData] = useState<UserData | null>(null);
    const [reviewsCreatedByUser, setReviewsCreatedByUser] = useState<
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
            userSubId!, // dumb..
            logInUser?.sub_id ?? ""
        );

        if (!fetchedReviewsCreatedByUser) {
            throw new Error(
                "Something wrong with the review list created by user"
            );
        }

        console.log(fetchedReviewsCreatedByUser);
        setReviewsCreatedByUser(fetchedReviewsCreatedByUser);
    };

    useEffect(() => {
        if (!userSubId) {
            navigate("/error");
            return;
        }

        fetchUser(userSubId);
        fetchReviewPostedByUser();
    }, []);

    return (
        <div className="flex flex-col gap-4 sm:gap-8 p-2 sm:p-6">
            <NavBar />
            <div className="flex flex-row gap-12 p-4 pr-0">
                <ProfileTile userData={userData} />
                <ProfileTabs tabs={[
					{
						"title": "Reviews",
						"component": <div className="flex flex-col gap-2 max-w-[45rem]">
							{reviewsCreatedByUser.map((review) => {
								return <RatingCard
									review={review}
									fetchReviews={fetchReviewPostedByUser}
									initialThumbsUpBool={review.thumbs_up_id ? true : false} />
							})}
						</div>,
						"length": reviewsCreatedByUser.length
					},
					{
						"title": "Likes",
						"component": <div></div>,
						"length": 0
					}
				]}/>
            </div>
        </div>
    );
};

export default ProfilePage;
