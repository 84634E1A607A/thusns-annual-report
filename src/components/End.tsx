import React, { useEffect } from "react";

const MixBackground = (props) => {
  const opacity = props.opacity === undefined ? 1 : props.opacity;

  return (
    <img
      {...props}
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
}

const End = ({active}) => {
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
        backgroundImage: "url(/image/end_background.png)",
        position: "relative",
      }}
    >
      <MixBackground src="/image/end_light1.png" alt="Light 1" opacity={active ? Math.max(Math.sin(opacityProgress), 0) : 0} />
      <MixBackground src="/image/end_light2.png" alt="Light 2" opacity={active ? Math.max(Math.sin(opacityProgress + Math.PI / 4), 0) : 0} />
      <MixBackground src="/image/end_light3.png" alt="Light 3" opacity={active ? Math.max(Math.sin(opacityProgress + Math.PI / 4 * 6), 0) : 0} />
      <MixBackground src="/image/end_light4.png" alt="Light 4" opacity={active ? Math.max(Math.sin(opacityProgress + Math.PI / 4 * 3), 0) : 0} />

      <div>

      </div>
    </div>
  );
};

export default End;