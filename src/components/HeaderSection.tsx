import React from 'react';
import SectionTitle from './SectionTitle';
import TextContent from './TextContent';

interface HeaderSectionProps {
    title: string;
    text: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ title, text }) => {
    return (
        <div className="relative mb-12 text-right">
            <SectionTitle title={title} center={true} />
            <TextContent
                text={text}
                center={true}
                className="mx-auto max-w-3xl"
            />
            <div className="inline-flex w-full items-center justify-center">
                <hr className="my-4 h-1 w-64 rounded border-0 bg-gray-200 dark:bg-gray-700" />
                <div className="absolute left-1/2 -translate-x-1/2 bg-white px-4 dark:bg-gray-900">
                    <svg className="h-4 w-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default HeaderSection;