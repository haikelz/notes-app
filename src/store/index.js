import { atom } from "jotai";

export const isAuthenticatedAtom = atom(false);
export const isShowedPasswordAtom = atom(false);
export const profileAtom = atom({ email: "", avatar: "", fullname: "" });
export const isOpenAtom = atom(false);
export const errMsgAtom = atom("");
