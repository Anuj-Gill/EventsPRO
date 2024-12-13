import { atom } from "recoil";
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist();

export const roleState = atom({
  key: "roleState",
  default: "User",
  effects_UNSTABLE: [persistAtom]
})
