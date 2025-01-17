import React from 'react';
import RemoteWorkTitle from '../components/remote/RemoteWorkTitle';
import RemoteFeaturesSection from '../components/remote/RemoteFeaturesSection';
import RemoteWorkExplain from "../components/remote/RemoteWorkExplain";
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