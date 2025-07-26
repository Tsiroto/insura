import { Box, type BoxProps, keyframes } from '@mui/material';

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
`;

type PageFadeProps = BoxProps & {
    durationMs?: number;
    delayMs?: number;
};

export default function PageFade({
                                     children,
                                     durationMs = 180,
                                     delayMs = 0,
                                     sx,
                                     ...rest
                                 }: PageFadeProps) {
    return (
        <Box
            sx={{
                opacity: 0,
                animation: `${fadeIn} ${durationMs}ms ease-out ${delayMs}ms forwards`,
                '@media (prefers-reduced-motion: reduce)': {
                    animation: 'none',
                    opacity: 1,
                    transform: 'none',
                },
                ...sx,
            }}
            {...rest}
        >
            {children}
        </Box>
    );
}
