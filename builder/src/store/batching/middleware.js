import rafUpdateBatcher from "./rafUpdateBatcher";
import State from "./state";

const shouldBatch = (action) => action.meta && action.meta.batch;

export default () => (next) => (action) => {
  const resolved = next(action);

  if (State.notify && !shouldBatch(action)) {
    State.notify();
  } else {
    rafUpdateBatcher();
  }

  return resolved;
};
