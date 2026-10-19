import React from "react";
import { Composition } from "remotion";
import { Showreel } from "./Showreel";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Showreel"
      component={Showreel}
      durationInFrames={360}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
