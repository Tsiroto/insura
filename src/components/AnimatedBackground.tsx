import { useMemo } from 'react';
import { Box, keyframes } from '@mui/material';

const float = keyframes`
  0%   { transform: translate3d(var(--x0), var(--y0), 0) scale(var(--s)); }
  50%  { transform: translate3d(var(--x1), var(--y1), 0) scale(var(--s)); }
  100% { transform: translate3d(var(--x0), var(--y0), 0) scale(var(--s)); }
`;

type Item = {
  id: number;
  size: number;
  circle: boolean;
  x0: string; y0: string;
  x1: string; y1: string;
  duration: number;
  delay: number;
};

function rnd(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function AnimatedBackground({ elementCount = 6 }: { elementCount?: number }) {
  const items: Item[] = useMemo(() => {
    return Array.from({ length: elementCount }, (_, id) => {
      const size = rnd(20, 80);
      return {
        id,
        size,
        circle: Math.random() > 0.5,
        x0: `${rnd(-10, 90)}vw`,
        y0: `${rnd(-10, 90)}vh`,
        x1: `${rnd(-10, 90)}vw`,
        y1: `${rnd(-10, 90)}vh`,
        duration: rnd(8, 18),     // seconds
        delay: rnd(0, 5),         // seconds
      };
    });
  }, [elementCount]);

  return (
      <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            '@media (prefers-reduced-motion: reduce)': {
              display: 'none',
            },
          }}
      >
        {items.map((el) => (
            <Box
                key={el.id}
                sx={{
                  '--x0': el.x0,
                  '--y0': el.y0,
                  '--x1': el.x1,
                  '--y1': el.y1,
                  '--s': 1,
                  position: 'absolute',
                  width: el.size,
                  height: el.size,
                  borderRadius: el.circle ? '50%' : '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  willChange: 'transform',
                  animation: `${float} ${el.duration}s ease-in-out ${el.delay}s infinite`,
                  transform: 'translate3d(var(--x0), var(--y0), 0)',
                }}
            />
        ))}
      </Box>
  );
}
