import React from 'react';
import SectionTitle from '../../../components/SectionTitle';

const AboutUsTitle: React.FC = () => {
    return (
        <SectionTitle
            title="من نحن"
            center={true}
            isHeader={true}
            subtitle="شريكك في تمكين العمل عن بعد."
        />
    );
};

export default AboutUsTitle;