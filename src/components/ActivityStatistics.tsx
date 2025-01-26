import React, { useEffect, useState } from "react";
import { roundShadow } from "../utils.ts";

const ActivityStatistics = ({ active, data, subpage }) => {
  const [libraOffset, setLibraOffset] = useState(10 * data.joinedActivities);

  useEffect(() => {
    setLibraOffset(10 * data.joinedActivities); // Set to desired offset when active
  }, [data.joinedActivities]);

  const libraOffset_rt = active ? Math.max(-50, Math.min(50, libraOffset)) : 0;

  const activityDesc =
    data.joinedActivities <= 1
      ? "温暖的分队大家庭，期待你加入更多活动，别让等待成为遗憾。"
      : `活动达人，${data.joinedActivities}次的参与，你是分队的灵魂人物。`;

  return (
    <div
      className="section"
      style={{
        backgroundImage: "url(/image/part3_background.jpg)",
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

      <div
        style={{
          opacity: subpage < 1 ? 1 : 0,
          transform: subpage < 1 ? "translateX(0)" : "translateX(-100%)",
          transition: "opacity 0.8s, transform 0.8s",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "3%",
            right: "3%",
            textAlign: "center",
            fontSize: "2em",
            color: "#495A4C",
            textShadow: roundShadow(2),
            transition: "transform 1s",
          }}
        >
          你一共参加了 {data.joinedActivities} 次
          <span style={{ whiteSpace: "nowrap" }}>分队活动</span>
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
        >
          {activityDesc}
        </div>
      </div>
      <div
        style={{
          opacity: subpage >= 1 ? 1 : 0,
          transform: subpage >= 1 ? "translateX(0)" : "translateX(100%)",
          transition: "opacity 0.8s, transform 0.8s",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "3%",
            right: "3%",
            textAlign: "center",
            fontSize: "2em",
            color: "#495A4C",
            textShadow: roundShadow(2),
            transition: "transform 1s",
          }}
        >
          在秋季的考核中，你的成绩
        </div>
      </div>
    </div>
  );
};

export default ActivityStatistics;
