import { atom } from "jotai";
import { NationalPark, ReviewWithUserData, UserData } from "@lib/interfaces";

export const selectedParkAtom = atom<NationalPark | null>(null);
export const selectedParkReviewListAtom = atom<ReviewWithUserData[]>([]);

export const logInUserAtom = atom<UserData | null>(null);
