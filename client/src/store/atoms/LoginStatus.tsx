import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loggedinStatusState = atom({
  key: "loggedinStatusState",
  default: false,
  effects_UNSTABLE: [persistAtom]

})  
