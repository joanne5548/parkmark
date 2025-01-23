import { atom } from "jotai"
import { NationalPark, UserData } from "../interfaces";

export const selectedParkAtom = atom<NationalPark | null>(null);

export const logInUserAtom = atom<UserData | null>(null);