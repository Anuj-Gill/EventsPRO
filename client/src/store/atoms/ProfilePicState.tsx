
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const profilePicState = atom({
  key: "profilePicState",
  default: "",
  effects_UNSTABLE: [persistAtom]

})  
