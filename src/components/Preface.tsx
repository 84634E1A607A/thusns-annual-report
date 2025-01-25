import React, { useEffect } from "react";
import { roundShadow, calculateTransformOrigin } from "../utils.ts";
import { fullpageApi } from "@fullpage/react-fullpage";

const Leaf = (props) => {
  const [originX, originY] = calculateTransformOrigin(
    props.originx,
    props.originy,
    2 / 1
  );

  return (
    <img
      {...props}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `rotate(${props.rotate}deg)`,
        transformOrigin: `${originX * 100}% ${originY * 100}%`,
        transition: "transform 5s",
        ...props.style,
      }}
    />
  );
};

const LoginButton = (props: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      style={{
        padding: "0.3em 1em",
        fontSize: "2em",
        fontWeight: "bold",
        backgroundColor: "#CCB697",
        color: "#415c54",
        border: "#fff 2px solid",
        borderRadius: "0.3em",
        cursor: "pointer",
      }}
    >
      登 录
    </button>
  );
};

const Preface = ({onLogin}) => {
  const [leaf1Rot, setLeaf1Rot] = React.useState(0);
  const [leaf2Rot, setLeaf2Rot] = React.useState(0);
  const [leaf3Rot, setLeaf3Rot] = React.useState(0);
  const [leaf4Rot, setLeaf4Rot] = React.useState(0);

  useEffect(() => {
    // Set leaf rotation randomly every random time ranging from 5s to 10s

    let t1: NodeJS.Timeout,
      t2: NodeJS.Timeout,
      t3: NodeJS.Timeout,
      t4: NodeJS.Timeout;
    let b1: boolean = false,
      b2: boolean = true,
      b3: boolean = false,
      b4: boolean = true;

    const f1 = () => {
      b1
        ? setLeaf1Rot(Math.random() * 5 + 2)
        : setLeaf1Rot(Math.random() * 5 - 7);
      b1 = !b1;
      t1 = setTimeout(f1, Math.random() * 5000 + 5000);
    };

    const f2 = () => {
      b2
        ? setLeaf2Rot(Math.random() * 3 + 2)
        : setLeaf2Rot(Math.random() * 3 - 5);
      b2 = !b2;
      t2 = setTimeout(f2, Math.random() * 5000 + 5000);
    };

    const f3 = () => {
      b3 ? setLeaf3Rot(Math.random() * 2 + 3) : setLeaf3Rot(Math.random() * 2);
      b3 = !b3;
      t3 = setTimeout(f3, Math.random() * 5000 + 5000);
    };

    const f4 = () => {
      b4 ? setLeaf4Rot(Math.random() * 3 + 5) : setLeaf4Rot(Math.random() * 3);
      b4 = !b4;
      t4 = setTimeout(f4, Math.random() * 5000 + 5000);
    };

    f1();
    f2();
    f3();
    f4();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div
      className="section active"
      style={{
        backgroundImage: "url(/image/index_background.jpg)",
        position: "relative",
      }}
    >
      {/* Rotate: [-10, 10] */}
      <Leaf
        src="/image/index_leaf2.png"
        alt="Leaf 2"
        originx={0.2}
        originy={0.9335}
        rotate={leaf2Rot}
      />

      {/* Rotate: [-10, 10] */}
      <Leaf
        src="/image/index_leaf1.png"
        alt="Leaf 1"
        originx={-0.03}
        originy={0.822}
        rotate={leaf1Rot}
        style={{
          left: "-2%",
        }}
      />

      {/* Rotate: [0, 5] */}
      <Leaf
        src="/image/index_leaf3.png"
        alt="Leaf 3"
        originx={0.1}
        originy={1.05}
        rotate={leaf3Rot}
      />

      {/* Rotate: [0, 8] */}
      <Leaf
        src="/image/index_leaf4.png"
        alt="Leaf 4"
        originx={-0.3}
        originy={0.8}
        rotate={leaf4Rot}
        style={{
          left: "-3%",
        }}
      />

      {/* Tsinghua Logo */}
      <img
        src="/image/tsinghua.svg"
        alt="Tsinghua University"
        style={{
          position: "absolute",
          top: "1%",
          left: "3%",
        }}
      />

      {/* THUSNS Logo */}
      <img
        src="/image/SNS_stretched.png"
        alt="THUSNS"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "13%",
          left: 0,
          right: 0,
          maxWidth: "25em",
          margin: "auto",
          padding: "0 1em",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
      >
        <div
          style={{
            fontSize: "2.5em",
            color: "#415c54",
          }}
        >
          学生网络服务队
        </div>
        <div
          style={{
            fontSize: "4em",
            color: "#415c54",
            textAlign: "right",
          }}
        >
          年度报告
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <LoginButton
          onClick={() => {
            onLogin();
          }}
         />
      </div>
    </div>
  );
};

export default Preface;
