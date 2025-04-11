import React from "react";
import FadeIn from "@components/animations/FadeIn";

const MapSection: React.FC = () => {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15699824.07241184!2d34.93717087988294!3d23.885942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e7b33fe7952a41%3A0x5960504bc21ab69b!2sSaudi%20Arabia!5e0!3m2!1sen!2sus!4v1678888888888!5m2!1sen!2sus";

  return (
    <FadeIn direction="up">
      <div className="my-8 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="h-96 w-full max-w-4xl overflow-hidden rounded-xl shadow-lg">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            className="h-full w-full"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map of Saudi Arabia"
          ></iframe>
        </div>
      </div>
    </FadeIn>
  );
};

export default MapSection;
