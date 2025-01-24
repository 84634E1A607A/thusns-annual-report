import React, { useEffect } from "react";
import "./App.css";
import "fullpage.js/dist/fullpage.css";
import fullpage from "fullpage.js";
import Mock from "./Mock.ts";
import Preface from "./components/Preface.tsx";
import JoinStatistics from "./components/JoinStatistics.tsx";
import DepartmentStatistics from "./components/DepartmentStatistics.tsx";
import ActivityStatistics from "./components/ActivityStatistics.tsx";
import End from "./components/End.tsx";

const App = () => {
  // A generic state to store the current page index
  const [currentPage, setCurrentPage] = React.useState(0);

  useEffect(() => {
    // @ts-ignore
    new fullpage("#fullpage", {
      autoScrolling: true,
      afterLoad: (origin: any, destination: { index: number; }, direction: any) => {
        setCurrentPage(destination.index);
      },
    });
  }, []);

  // --- --- --- From here on: Data acquisition and description --- --- ---

  const [data, setData] = React.useState<object>(Mock());

  // TODO
  const joinTimeDesc =
    "新鲜血液！欢迎加入分队，跟我们一起打拼吧！才刚起步，未来可期。";
  const departDesc = "专注一个部门，深耕细作，你就是我们团队里的‘一把手’！";
  const activityDesc = "温暖的分队大家庭，期待你加入更多活动，别让等待成为遗憾。";

  // --- --- --- From here on: Render --- --- ---

  return (
    <div id="fullpage">
      <Preface />
      <JoinStatistics
        active={currentPage === 1}
        data={data}
        joinTimeDesc={joinTimeDesc}
      />
      <DepartmentStatistics
        active={currentPage === 2}
        data={data}
        departDesc={departDesc}
      />
      <ActivityStatistics
        active={currentPage === 3}
        data={data}
        activityDesc={activityDesc}
      />
      <End
        active={currentPage === 4}
      ></End>
    </div>
  );
};

export default App;
