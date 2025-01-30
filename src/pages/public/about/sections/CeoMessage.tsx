import React from "react";
import ceoImage from "@assets/AboutPage/ceo-image.jpg";
import FadeIn from "@components/animations/FadeIn";
import SlideIn from "@components/animations/SlideIn";

interface CeoMessageProps {
  ceoName: string;
  ceoTitle: string;
  message: string;
  ceoImageUrl?: string;
}

const CeoMessage: React.FC<CeoMessageProps> = ({
  ceoName,
  ceoTitle,
  message,
  ceoImageUrl = ceoImage,
}) => {
  return (
    <FadeIn direction="up">
      <div className="mx-4 mb-16 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 py-16 shadow-lg md:mx-0">
        <div className="container mx-auto px-4 md:px-16">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <SlideIn direction="left">
              <div className="text-right">
                <h2 className="mb-4 text-3xl font-bold text-gray-800">
                  كلمة من الرئيس التنفيذي
                </h2>
                <p className="mb-6 leading-relaxed text-gray-700">{message}</p>
              </div>
            </SlideIn>
            <SlideIn direction="right" delay={0.2}>
              <div className="flex flex-col-reverse items-center justify-center text-center">
                <div className="mt-4">
                  <p className="font-semibold text-gray-800">{ceoName}</p>
                  <p className="text-gray-600">{ceoTitle}</p>
                </div>
                {ceoImageUrl && (
                  <div className="max-h-80 max-w-80 overflow-hidden rounded-full border border-gray-200">
                    <img
                      src={ceoImageUrl}
                      alt={`صورة ${ceoName}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default CeoMessage;
