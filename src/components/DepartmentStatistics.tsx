import React, { useEffect, useState } from "react";
import { roundShadow } from "../utils.ts";

const DepartmentStatistics = ({ active, data }) => {
  const [lightRot, setLightRot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Set light rotation randomly
      setLightRot(Math.random() * 7 - 5);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const lightRot_rt = active ? lightRot : -5;

  const departDesc =
    data.joinedDepartments.length == 0
      ? "咦？你还没加入任何部门？代码出错了吗？"
      : data.joinedDepartments.length == 1
      ? "专注一个部门，深耕细作，你就是我们团队里的‘一把手’！"
      : data.joinedDepartments.length == 2
      ? "手忙脚乱？不，是你太能干！已经同时掌握了两个部门的关键。"
      : "部门大管家！分队里的‘万金油’，无论在哪个岗位都能轻松驾驭。";

  return (
    <div
      className="section"
      style={{
        backgroundImage: "url(/image/part2_background.jpg)",
        position: "relative",
      }}
    >
      <img
        src="/image/part2_light.png"
        alt="Light"
        style={{
          mixBlendMode: "soft-light",
          transform: `rotate(${lightRot_rt}deg)`,
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
            textShadow: roundShadow(1, "#eee") + ", 1px 1px 5px #fff",
          }}
        >
          你一共加入了 {data.joinedDepartments.length} 个部门，
          {data.joinedDepartments.length > 1 ? "分别" : ""}是
          {data.joinedDepartments.join("、")}。<br />
          {departDesc}
        </div>
      </div>
    </div>
  );
};

export default DepartmentStatistics;
