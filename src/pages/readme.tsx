import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import readmeText from '/README.md?raw';

const ReadMe = () => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        setMarkdown(readmeText);
    }, []);

    return (
        <div style={{ padding: '2rem', maxWidth: '100%', margin: '0 auto 4rem auto', height: 'calc(100vh - 64px', overflowY: 'auto', lineHeight: '1.7' }}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
};

export default ReadMe;