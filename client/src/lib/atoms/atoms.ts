import { atom } from "jotai"
import { UserData } from "../interfaces";

export const selectedParkAtom = atom<string | null>(null);

export const logInUserAtom = atom<UserData | null>(null);