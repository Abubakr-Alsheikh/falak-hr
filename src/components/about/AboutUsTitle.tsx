import React from 'react';
import SectionTitle from '../SectionTitle';

const AboutUsTitle: React.FC = () => {
    return (
        <SectionTitle
            title="من نحن"
            center={true}
            isHeader={true}
            subtitle="فلك للموارد البشرية: شريكك في تمكين العمل عن بعد."
        />
    );
};

export default AboutUsTitle;