import React, { useEffect } from "react";
import { roundShadow } from "../utils.ts";

interface MixBackgroundProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  opacity?: number;
}

const MixBackground: React.FC<MixBackgroundProps> = (props) => {
  const opacity = props.opacity === undefined ? 1 : props.opacity;
  const { opacity: _, alt, ...rest } = props;

  return (
    <img
      {...rest}
      alt={alt}
      style={{
        mixBlendMode: "screen",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: opacity,
        transition: "opacity 3s ease-in-out",
        ...props.style,
      }}
    />
  );
};

const End = ({ active }) => {
  const [opacityProgress, setOpacityProgress] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacityProgress((prev) => prev + Math.random() * Math.PI);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="section"
      style={{
        backgroundImage: "url(/image/end_background.jpg)",
        position: "relative",
      }}
    >
      <MixBackground
        src="/image/end_light1.png"
        alt="Light 1"
        opacity={active ? Math.max(Math.sin(opacityProgress), 0) : 0}
      />
      <MixBackground
        src="/image/end_light2.png"
        alt="Light 2"
        opacity={
          active ? Math.max(Math.sin(opacityProgress + Math.PI / 4), 0) : 0
        }
      />
      <MixBackground
        src="/image/end_light3.png"
        alt="Light 3"
        opacity={
          active
            ? Math.max(Math.sin(opacityProgress + (Math.PI / 4) * 6), 0)
            : 0
        }
      />
      <MixBackground
        src="/image/end_light4.png"
        alt="Light 4"
        opacity={
          active
            ? Math.max(Math.sin(opacityProgress + (Math.PI / 4) * 3), 0)
            : 0
        }
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            margin: "7%",
            marginBottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            gap: "0.5em",
            fontSize: "2em",
            color: "#ddd",
            textShadow: roundShadow(1, "#000"),
            flex: 1,
          }}
        >
          <div>年度报告筹备组</div>
          <div style={{ fontSize: "0.75em" }}>
            <p>数据统计：李华</p>
            <p>文案设计：王舞</p>
            <p>美工设计：赵柳</p>
            <p>前端制作：84634E1A607A</p>
          </div>
          <div style={{ flex: 1 }}></div>
          <div style={{ fontSize: "0.5em" }}>
            <p>
              源代码：
              <a
                href="https://github.com/84634E1A607A/thusns-annual-report"
                className="link"
              >
                GitHub
              </a>
            </p>
            <p>
              前端框架：
              <a href="https://react.dev/" className="link">
                React
              </a>; &nbsp;
              <a href="https://alvarotrigo.com/fullPage/" className="link">
                fullPage.js
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default End;
