import "../index.scss";
import React from "react";

type GradientCircleTypes = {
  className?: string;
  linearGradientDegree: number;
  linearGradientColor1: string;
  linearGradientColor2: string;
  linearGradientStart: number;
  linearGradientEnd: number;
};

const GradientCircle = ({
  className = "",
  linearGradientDegree = 90,
  linearGradientColor1 = "rgba(252,103,103,1)",
  linearGradientColor2 = "rgba(236,0,140,1)",
  linearGradientStart = 0,
  linearGradientEnd = 100,
}: GradientCircleTypes) => {
  return (
    <div
      className={` ${className}`}
      style={{
        background: `linear-gradient(${linearGradientDegree}deg, ${linearGradientColor1} ${linearGradientStart}%, ${linearGradientColor2} ${linearGradientEnd}%)`,
        boxShadow:
          "inset -25px -15px 40px rgba(0,0,0,.3), 0px 0px 20px 1px rgba(0,0,0,0.2)",
      }}
    ></div>
  );
};

export default GradientCircle;
