import React, { useEffect, useState } from "react";
import { roundShadow } from "../utils.ts";

const ActivityStatistics = ({ active, data, activityDesc }) => {
  const [libraOffset, setLibraOffset] = useState(10 * data.joinedActivities);

  useEffect(() => {
    setLibraOffset(10 * data.joinedActivities); // Set to desired offset when active
  }, [data.joinedActivities]);

  const libraOffset_rt = active ? Math.max(-50, Math.min(50, libraOffset)) : 0;

  return (
    <div
      className="section"
      style={{
        backgroundImage: "url(/image/part3_background.png)",
        position: "relative",
      }}
    >
      <img
        src="/image/part3_libra_left.png"
        alt="Libra Left"
        style={{
          position: "absolute",
          top: -30 + libraOffset_rt,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "top 1s",
        }}
      />
      <img
        src="/image/part3_libra_right.png"
        alt="Libra Right"
        style={{
          position: "absolute",
          top: -30 - libraOffset_rt,
          right: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "top 1s",
        }}
      />
      <div>
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: 0,
            margin: "0 7%",
            fontSize: "2em",
            color: "#495A4C",
            textShadow: roundShadow(2),
          }}
        >
          你一共参加了 <br /> {data.joinedActivities} 次分队活动
        </div>

        <div
          style={{
            position: "absolute",
            top: "25%",
            left: 0,
            margin: "0 7%",
            fontSize: "1.7em",
            color: "#495A4C",
            textShadow: roundShadow(1.5),
            textAlign: "right",
          }}
        >{activityDesc}</div>
      </div>
    </div>
  );
};

export default ActivityStatistics;
