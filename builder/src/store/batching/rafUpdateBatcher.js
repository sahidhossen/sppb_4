import { debounce } from "lodash";
import State from "./state";

function delayedNotify() {
  State.notify();
}

export default function rafUpdateBatcher() {
  let debounceBatch = debounce(delayedNotify);
  debounceBatch();
}
