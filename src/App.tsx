import React from "react";
import "./App.css";
import ReactFullpage from "@fullpage/react-fullpage";
import Mock from "./Mock.ts";
import Preface from "./components/Preface.tsx";
import JoinStatistics from "./components/JoinStatistics.tsx";
import DepartmentStatistics from "./components/DepartmentStatistics.tsx";
import ActivityStatistics from "./components/ActivityStatistics.tsx";
import End from "./components/End.tsx";
import keycloak from "./keycloak.js";
import { useEffect } from "react";

const App = () => {
  // A generic state to store the current page index
  const [currentSection, setCurrentSection] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [switchingSubpage, setSwitchingSubpage] = React.useState(false);

  // --- --- --- From here on: Keycloak --- --- ---

  useEffect(() => {
    keycloak.onAuthSuccess = () => {
      keycloak.loadUserProfile().then(() => setLoggedIn(true));
    };
  });
  // --- --- --- From here on: Data acquisition and description --- --- ---

  const [data, setData] = React.useState<object>(Mock());
  useEffect(() => {
    if (!loggedIn) return;

    fetch("https://example-backend-bla-bla-bla.thusns.net/data", {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [loggedIn]);

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
            if ([1, 2].includes(currentPage)) {
              prevent = true;
            }

            if ([5].includes(currentPage)) {
              prevent = true;
            }
          } else {
            if ([2, 3].includes(currentPage)) {
              prevent = true;
            }

            if ([6].includes(currentPage)) {
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
              {/* Subpage 0 */}
              <Preface
                onLogin={() => {
                  keycloak.login();
                }}
                userName={
                  loggedIn
                    ? keycloak.profile!.lastName! + keycloak.profile!.firstName!
                    : undefined
                }
              />
              {/* Subpage 1-3 */}
              <JoinStatistics
                active={currentSection === 1}
                subpage={currentPage - 1}
                data={data}
              />
              {/* Subpage 4 */}
              <DepartmentStatistics active={currentSection === 2} data={data} />
              {/* Subpage 5-6 */}
              <ActivityStatistics
                active={currentSection === 3}
                subpage={currentPage - 5}
                data={data}
              />
              {/* Subpage 7 */}
              <End active={currentSection === 4} />
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

export default App;
