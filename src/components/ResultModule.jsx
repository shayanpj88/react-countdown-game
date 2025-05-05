import { useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export default function ResultModule({
  ref,
  targetTime,
  remainingTime,
  onReset,
}) {
  const userLost = remainingTime <= 0;
  const formatterRamainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // to access a method in this component from outside of this
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>You Score: {score}</h2>}
      <p>The target time was {targetTime} seoconds</p>
      <p>
        You stopped timer with{" "}
        <strong> {formatterRamainingTime} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
