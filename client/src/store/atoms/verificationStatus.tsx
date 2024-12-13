import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const verificationStatus = atom({
  key: "verificationStatus",
  default: false,
  effects_UNSTABLE: [persistAtom]
})
