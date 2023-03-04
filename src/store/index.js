import { atom } from "jotai";

export const isAuthenticatedAtom = atom(false);
export const isShowedPasswordAtom = atom(false);
export const openModalAtom = atom(false);
export const profileAtom = atom({ email: "", avatar: "", fullname: "" });
