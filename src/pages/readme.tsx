import PageFade from '../components/PageFade';
import ReactMarkdown from 'react-markdown';
import readmeText from '/README.md?raw';

export default function ReadMe() {
    const markdown = readmeText;

    return (
        <PageFade
            durationMs={120}
            delayMs={0}
            sx={{
                padding: '2rem',
                maxWidth: '100%',
                margin: '0 auto 4rem auto',
                overflowY: 'auto',
                lineHeight: 1.7,
                zIndex: 1000,
                position: 'relative',
            }}
        >
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </PageFade>
    );
}
