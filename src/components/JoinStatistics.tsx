import React, { useEffect, useState } from "react";
import { roundShadow, calculateTransformOrigin } from "../utils.ts";

const JoinStatistics = ({
  active,
  data,
  joinTimeDesc,
}) => {
  // Calulate the time difference between now and the time the user joined the team
  const joinTime = new Date(data.joinYear, data.joinMonth - 1);
  const currentTime = new Date();
  const joinedDuration = Math.floor(currentTime.getTime() - joinTime.getTime());
  const joinedYears = Math.floor(joinedDuration / (1000 * 60 * 60 * 24 * 365));
  const joinedMonths = Math.floor(
    (joinedDuration % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );

  const [clockHandRot, setClockHandRot] = useState(0); // -46 to point to 12 o'clock
  const imageAspectRatio = 2 / 1; // Original image aspect ratio

  // Calculate the transform origin for the clock hand
  const [clockHandRotOrigin, setClockHandRotOrigin] = useState(
    calculateTransformOrigin(0.66, 0.386, imageAspectRatio)
  );

  useEffect(() => {
    setClockHandRot(360 * (joinedYears / 12));
  }, [joinedYears]);

  useEffect(() => {
    const handleResize = () => {
      setClockHandRotOrigin(calculateTransformOrigin(0.66, 0.386, imageAspectRatio));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const clockHandRot_rt = active ? clockHandRot : -46;

  return (
    <div
      className="section active"
      style={{
        backgroundImage: "url(/image/part1_background.png)",
        position: "relative",
      }}
    >
      <img
        src="/image/part1_clockhand.png"
        alt="Clock Hand"
        style={{
          transform: `rotate(${clockHandRot_rt}deg)`,
          transition: "transform 1s",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: `${clockHandRotOrigin[0] * 100}% ${
            clockHandRotOrigin[1] * 100
          }%`,
        }}
      />

      <div>
        <div
          style={{
            fontSize: "2em",
            position: "absolute",
            top: "5%",
            left: "7%",
            color: "#415c54",
            textShadow: roundShadow(1.5),
          }}
        >
          你在{data.joinYear}年{data.joinSemester}季学期 <br />
          加入了分队
        </div>

        <div
          style={{
            fontSize: "1.7em",
            position: "absolute",
            top: "54%",
            right: "5%",
            textAlign: "right",
            color: "#415c54",
            textShadow: roundShadow(1, "#eee"),
          }}
        >
          你加入分队已经有 <br />
          {joinedYears > 0 ? `${joinedYears} 年 ` : ""}
          {joinedMonths > 0 ? `${joinedMonths} 个月` : "整"}了
        </div>

        <div
          style={{
            fontSize: "2em",
            position: "absolute",
            bottom: "5%",
            left: "7%",
            color: "#213c34",
            textShadow: roundShadow(1),
          }}
        >
          {joinTimeDesc}
        </div>
      </div>
    </div>
  );
};

export default JoinStatistics;
