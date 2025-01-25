import React from "react";
import "./App.css";
import ReactFullpage from "@fullpage/react-fullpage";
import Mock from "./Mock.ts";
import Preface from "./components/Preface.tsx";
import JoinStatistics from "./components/JoinStatistics.tsx";
import DepartmentStatistics from "./components/DepartmentStatistics.tsx";
import ActivityStatistics from "./components/ActivityStatistics.tsx";
import End from "./components/End.tsx";

const App = () => {
  // A generic state to store the current page index
  const [currentSection, setCurrentSection] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [switchingSubpage, setSwitchingSubpage] = React.useState(false);

  // --- --- --- From here on: Data acquisition and description --- --- ---

  const [data, setData] = React.useState<object>(Mock());

  // TODO
  const joinTimeDesc =
    "新鲜血液！欢迎加入分队，跟我们一起打拼吧！才刚起步，未来可期。";
  const departDesc = "专注一个部门，深耕细作，你就是我们团队里的‘一把手’！";
  const activityDesc =
    "温暖的分队大家庭，期待你加入更多活动，别让等待成为遗憾。";

  // --- --- --- From here on: Render --- --- ---

  return (
    <div
      style={{
        maxWidth: "calc(100vh * 9 / 16)",
        width: "100%",
        height: "100vh",
        margin: "0 auto",
      }}
    >
      <ReactFullpage
        licenseKey=""
        onLeave={(origin, destination, direction) => {
          if (!loggedIn) return false;
          if (switchingSubpage) return false;

          let prevent = false;
          if (direction === "down") {
            if ([1].includes(currentPage)) {
              prevent = true;
            }
          } else {
            if ([2].includes(currentPage)) {
              prevent = true;
            }
          }

          setCurrentPage((prev) => {
            return direction === "down" ? prev + 1 : prev - 1;
          });

          if (prevent) {
            setSwitchingSubpage(true);
            setTimeout(() => {
              setSwitchingSubpage(false);
            }, 1000);
          }

          return !prevent;
        }}
        afterLoad={(origin, destination, direction) => {
          setCurrentSection(destination.index);
        }}
        credits={{ enabled: true }}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <Preface onLogin={() => setLoggedIn(true)} />
              <JoinStatistics
                active={currentSection === 1}
                subpage={currentPage - 1}
                data={data}
                joinTimeDesc={joinTimeDesc}
              />
              <DepartmentStatistics
                active={currentSection === 2}
                data={data}
                departDesc={departDesc}
              />
              <ActivityStatistics
                active={currentSection === 3}
                data={data}
                activityDesc={activityDesc}
              />
              <End active={currentSection === 4} />
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

export default App;
