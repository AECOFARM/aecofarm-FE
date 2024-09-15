import { atom } from "recoil";
import { AlarmListData } from "@/types/alarm";

export const alarmListState = atom<AlarmListData>({
  key: "alarmListState",
  default: {
    lending: [],
    borrowing: [],
  },
});
