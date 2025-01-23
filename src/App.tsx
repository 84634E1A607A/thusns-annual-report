import React, { useEffect } from "react";
import "./App.css";
import "fullpage.js/dist/fullpage.css";
import fullpage from "fullpage.js";
import Mock from "./Mock.ts";

const roundShadow = (b: number, c: string = "#fff") => {
  return `${b}px ${b}px ${c}, ${b}px -${b}px ${c}, -${b}px ${b}px ${c}, -${b}px -${b}px ${c}`;
}

const App = () => {
  // A generic state to store the current page index
  const [currentPage, setCurrentPage] = React.useState(0);

  useEffect(() => {
    // @ts-ignore
    new fullpage("#fullpage", {
      autoScrolling: true,
      afterLoad: (origin, destination, direction) => {
        setCurrentPage(destination.index);
      },
    });
  }, []);

  const calculateTransformOrigin = (x: number, y: number) => {
    const imageAspectRatio = 2 / 1; // Original image aspect ratio
    const screenAspectRatio = window.innerHeight / window.innerWidth;

    if (screenAspectRatio > imageAspectRatio) {
      // Screen is taller than the image, so the edge of the image will touch the top and bottom of the screen
      const widthRatio = imageAspectRatio / screenAspectRatio;
      const originX = (x - (1 - widthRatio) / 2) / widthRatio;
      return [originX, y];
    } else {
      // Screen is wider than the image, so the edge of the image will touch the left and right of the screen
      const heightRatio = screenAspectRatio / imageAspectRatio;
      const originY = (y - (1 - heightRatio) / 2) / heightRatio;
      return [x, originY];
    }
  };

  const [clockHandRotOrigin, setClockHandRotOrigin] = React.useState(
    calculateTransformOrigin(0.66, 0.386)
  );

  useEffect(() => {
    const handleResize = () => {
      setClockHandRotOrigin(calculateTransformOrigin(0.66, 0.386));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // This is the stored state for background animations
  const [sec1_clockHandRot, sec1_setClockHandRot] = React.useState(0); // -46 to point to 12 o'clock

  // And this is the real-time value, so that the animation will always start when the page is active
  const sec1_clockHandRot_rt = currentPage === 0 ? sec1_clockHandRot : -46;

  const [sec2_lightRot, sec2_setLightRot] = React.useState(0);

  const sec2_lightRot_rt = currentPage === 1 ? sec2_lightRot : -5;

  const [sec3_libraOffset, sec3_setLibraOffset] = React.useState(0);

  const sec3_libraOffset_rt = currentPage === 2 ? sec3_libraOffset : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      // Set light rotation randomly
      sec2_setLightRot(Math.random() * 7 - 5);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [data, setData] = React.useState<object>(Mock());
  // Calulate the time difference between now and the time the user joined the team
  const joinTime = new Date(data.joinYear, data.joinMonth - 1);
  const currentTime = new Date();
  const joinedDuration = Math.floor(currentTime.getTime() - joinTime.getTime());
  const joinedYears = Math.floor(joinedDuration / (1000 * 60 * 60 * 24 * 365));
  const joinedMonths = Math.floor(
    (joinedDuration % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );

  // TODO
  const joinTimeDesc =
    "新鲜血液！欢迎加入分队，跟我们一起打拼吧！才刚起步，未来可期。";
  const departDesc = "专注一个部门，深耕细作，你就是我们团队里的‘一把手’！";
  const activityDesc = "温暖的分队大家庭，期待你加入更多活动，别让等待成为遗憾。";

  return (
    <div id="fullpage">
      {/* Section I */}

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
            transform: `rotate(${sec1_clockHandRot_rt}deg)`,
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

      {/* Section II */}

      <div
        className="section"
        style={{
          backgroundImage: "url(/image/part2_background.png)",
          position: "relative",
        }}
      >
        <img
          src="/image/part2_light.png"
          alt="Light"
          style={{
            transform: `rotate(${sec2_lightRot_rt}deg)`,
            transition: "transform 3s",
            position: "absolute",
            right: -50,
            top: -50,
            width: "150%",
            height: "150%",
            objectFit: "cover",
            transformOrigin: `100% 0`,
          }}
        />

        <div>
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              left: 0,
              margin: "0 7%",
              fontSize: "1.7em",
              color: "#415c54",
              textShadow: roundShadow(1, '#eee') + ", 1px 1px 5px #fff",
            }}
          >
            你一共加入了 {data.joinedDepartments.length} 个部门，
            {data.joinedDepartments.length > 1 ? "分别" : ""}是
            {data.joinedDepartments.join("、")}。<br />
            {departDesc}
          </div>
        </div>
      </div>

      {/* Section III */}

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
            top: -30 + sec3_libraOffset_rt,
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
            top: -30 - sec3_libraOffset_rt,
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
    </div>
  );
};

export default App;
