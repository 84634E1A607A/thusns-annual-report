import React, { useEffect, useState } from "react";
import { roundShadow, calculateTransformOrigin } from "../utils.ts";

interface JoinStatisticsProps {
  active: boolean;
  subpage: number;
  data: any;
}

const JoinStatistics: React.FC<JoinStatisticsProps> = ({
  active,
  subpage,
  data,
}) => {
  // Calulate the time difference between now and the time the user joined the team
  const joinTime = new Date(data.joinYear, data.joinMonth - 1);
  const currentTime = new Date();
  const joinedDuration = Math.floor(currentTime.getTime() - joinTime.getTime());
  const joinedYears = Math.floor(joinedDuration / (1000 * 60 * 60 * 24 * 365));
  const joinedMonths = Math.floor(
    (joinedDuration % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );

  const joinTimeDesc =
    joinedYears < 1
      ? "新鲜血液！欢迎加入分队，跟我们一起打拼吧！才刚起步，未来可期。"
      : "从新鲜小白到老司机，已经在分队待了这么久，咱们的默契感越来越强了！";

  const workingHoursTotal = Object.values(data.workingHours).reduce(
    (a, b) => (a as number) + (b as number),
    0
  ) as number;
  const workingHoursCategories = Object.keys(data.workingHours).filter(
    (k, i) => data.workingHours[k] > 0
  );
  const workingHoursValues = Object.values(data.workingHours).filter(
    (v, i) => (v as number) > 0
  );

  const holidayWorkingTimesDesc =
    data.holidayWorkingTimes === 0
      ? "假期就应该好好休息~"
      : data.holidayWorkingTimes <= 3
      ? "放假了？\n来网服上班休息一下！"
      : "假期不休？你真是工作狂魔！没放过任何一个赚三倍的机会！";

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
      setClockHandRotOrigin(
        calculateTransformOrigin(0.66, 0.386, imageAspectRatio)
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imageAspectRatio]);

  const clockHandRot_rt = active ? clockHandRot : -46;

  const subpage_rot = (from: number, to: number) => {
    if (subpage < from) return "rotateX(-90deg)";
    if (subpage > to) return "rotateX(90deg)";
    return "rotateX(0deg)";
  };

  const subpage_opa = (from: number, to: number) => {
    if (subpage < from) return 0;
    if (subpage > to) return 0;
    return 1;
  };

  return (
    <div
      className="section"
      style={{
        backgroundImage: "url(/image/part1_background.jpg)",
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

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: subpage_opa(-1, 0),
          transition: "opacity 0.8s",
        }}
      >
        <div
          style={{
            fontSize: "2em",
            position: "absolute",
            top: "5%",
            left: "7%",
            right: "7%",
            color: "#415c54",
            textShadow: roundShadow(1.5),
            transformStyle: "preserve-3d",
            transform: subpage_rot(-1, 0),
            transformOrigin: "50% 50% -1.5em",
            transition: "transform 1s",
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
            transformStyle: "preserve-3d",
            transform: subpage_rot(-1, 0),
            transformOrigin: "50% 50% -1.5em",
            transition: "transform 1s",
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
            right: "7%",
            color: "#213c34",
            textShadow: roundShadow(1),
            transformStyle: "preserve-3d",
            transform: subpage_rot(-1, 0),
            transformOrigin: "50% 50% -1.5em",
            transition: "transform 1s",
          }}
        >
          {joinTimeDesc}
        </div>
      </div>

      <div
        style={{
          opacity: subpage_opa(1, 3),
          transition: "opacity 0.8s",
        }}
      >
        <div
          style={{
            fontSize: "2em",
            position: "absolute",
            top: "5%",
            left: "7%",
            color: "#415c54",
            textShadow: roundShadow(1.5),
            transformStyle: "preserve-3d",
            transform: subpage_rot(1, 3),
            transformOrigin: "50% 50% -1.5em",
            transition: "transform 1s",
          }}
        >
          在这一年里……
        </div>
      </div>

      <div
        style={{
          opacity: subpage_opa(1, 1),
          transition: "opacity 0.8s",
        }}
      >
        <div
          style={{
            fontSize: "1.7em",
            position: "absolute",
            top: "54%",
            right: "5%",
            textAlign: "right",
          }}
        >
          <div
            style={{
              color: "#415c54",
              textShadow: roundShadow(1.5, "#eee"),
              transformStyle: "preserve-3d",
              transform: subpage_rot(1, 1),
              transformOrigin: "50% 50% -1.5em",
              transition: "transform 1s",
            }}
          >
            你一共在 {workingHoursCategories.length} 个岗位上 <br />
            累计了 {workingHoursTotal} 个工时
          </div>
        </div>
        <div
          style={{
            fontSize: "1.7em",
            position: "absolute",
            bottom: "10%",
            left: "7%",
            right: "7%",
            color: "#213c34",
            textShadow: roundShadow(1),
            transformStyle: "preserve-3d",
            transform: subpage_rot(1, 1),
            transformOrigin: "50% 50% -1.5em",
            transition: "transform 1s",
          }}
        >
          其中
          {workingHoursCategories
            .map(
              (category, i) => `${category} ${workingHoursValues[i] as number}h`
            )
            .join(", ")}
        </div>
      </div>
      <div
        style={{
          opacity: subpage_opa(2, 3),
          transition: "opacity 0.8s",
        }}
      >
        <div
          style={{
            fontSize: "1.7em",
            position: "absolute",
            top: "54%",
            right: 0,
            left: 0,
            padding: "0 5%",
            textAlign: "right",
          }}
        >
          <div
            style={{
              color: "#415c54",
              textShadow: roundShadow(1.5, "#eee"),
              transformStyle: "preserve-3d",
              transform: subpage_rot(2, 3),
              transformOrigin: "50% 50% -1.5em",
              transition: "transform 1s",
            }}
          >
            你在假期上了 {data.holidayWorkingTimes} 次班
          </div>
        </div>
        <div
          style={{
            fontSize: "2em",
            position: "absolute",
            bottom: "8%",
            left: "7%",
            right: "7%",
            color: "#213c34",
            textShadow: roundShadow(1),
            transformStyle: "preserve-3d",
            transform: subpage_rot(2, 3),
            transformOrigin: "50% 50% -1.5em",
            transition: "transform 1s",
            whiteSpace: "pre-line",
          }}
        >
          {holidayWorkingTimesDesc}
        </div>
      </div>
    </div>
  );
};

export default JoinStatistics;
