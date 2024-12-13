
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const feedBackState = atom({
  key: "feedBackState",
  default: false,
  effects_UNSTABLE: [persistAtom]

})  
