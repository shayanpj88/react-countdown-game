import { useRef, useState } from "react";
import ResultModule from "./resultModule";

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const dialog = useRef();
  let timer = useRef();

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function resetTime() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModule
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={resetTime}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running" : "Timer is inactive"}
        </p>
      </section>
    </>
  );
}
