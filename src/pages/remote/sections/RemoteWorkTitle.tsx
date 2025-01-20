import React from 'react';
import SectionTitle from "../../../components/SectionTitle";
import FadeIn from "../../../components/animations/FadeIn";


const RemoteWorkTitle: React.FC = () => {
    return (
        <FadeIn direction="up">
            <SectionTitle
              title="العمل عن بعد"
              center={true}
              isHeader={true}
              subtitle="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
            />
        </FadeIn>
    );
};

export default RemoteWorkTitle;