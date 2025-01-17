import React from 'react';
import RemoteWorkTitle from './sections/RemoteWorkTitle';
import RemoteFeaturesSection from './sections/RemoteFeaturesSection';
import RemoteWorkExplain from "./sections/RemoteWorkExplain";
const RemoteWork: React.FC = () => {
    return (
        <div className="container mx-auto mt-16">
            <RemoteWorkTitle />
            <RemoteFeaturesSection />
            <RemoteWorkExplain />
        </div>
    );
};

export default RemoteWork;