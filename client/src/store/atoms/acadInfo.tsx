import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const academicInfo = atom({
  key: "academicInfo",
  default: false,
  effects_UNSTABLE: [persistAtom]
})
