import React from "react";
import FadeIn from "@components/animations/FadeIn";

const MapSection: React.FC = () => {
  return (
    <FadeIn direction="up">
      <div className="my-8 flex items-center justify-center">
        <div className="flex h-96 w-full items-center justify-center rounded-xl bg-gray-200 p-20">
          <div className="text-center text-2xl font-bold">الخريطة</div>
        </div>
      </div>
    </FadeIn>
  );
};

export default MapSection;
