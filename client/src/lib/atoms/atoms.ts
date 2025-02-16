import { atom } from "jotai";
import { ParkInfoJson, ReviewWithUserData, UserData } from "@lib/interfaces";

export const selectedParkAtom = atom<ParkInfoJson | null>(null);
export const selectedParkReviewListAtom = atom<ReviewWithUserData[]>([]);

export const logInUserAtom = atom<UserData | null>(null);
