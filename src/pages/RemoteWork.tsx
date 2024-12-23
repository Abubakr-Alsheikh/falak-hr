import React from 'react';
import RemoteWorkTitle from '../components/remote/RemoteWorkTitle';
import RemoteFeaturesSection from '../components/remote/RemoteFeaturesSection';
import RemoteWorkExplain from "../components/remote/RemoteWorkExplain";
const RemoteWork: React.FC = () => {
    return (
        <div className="container mx-auto py-8">
            <RemoteWorkTitle />
            <RemoteFeaturesSection />
            <RemoteWorkExplain />
        </div>
    );
};

export default RemoteWork;