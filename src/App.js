import "./App.css";
import useInterval from "./useInterval";
import { useState } from "react";
import moment from "moment";

function App() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(25);
  const [rapArray, setRapArray] = useState([]);
  const [runningTime, setRunningTime] = useState(false);

  useInterval(
    () => {
      if (second === 0) {
        setSecond(60);
        setMinute(() => minute - 1);
      }
      setSecond((second) => second - 1);
      if (minute === 0 && second === 0) {
        alert("Times up! Rest 5minutes! you good!");
        handleRestart();
        setRapArray([
          ...rapArray,
          {
            rap: rapArray.length + 1,
            time: moment().format("HH:mm:ss"),
          },
        ]);
      }
    },
    runningTime ? 10 : null
  );

  const handleStartStop = () => {
    setRunningTime(!runningTime);
  };

  const handleRestart = () => {
    setRunningTime(false);
    setSecond(0);
    setMinute(25);
  };

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/images/pomodoro.webp" alt="" style={{ width: "1%" }} />
        <span>뽀모도로 ver 1.0</span>
      </header>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={handleStartStop}>start / stop</button>
          <button onClick={handleRestart}>restart</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {minute < 10 ? `0${minute}` : minute}:
          {second < 10 ? `0${second}` : second}
        </div>
        {rapArray.map((elem, idx) => {
          return (
            <div
              key={idx}
              style={{ display: "flex", justifyContent: "center" }}
            >
              회차: {elem.rap} / 시간: {elem.time}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
