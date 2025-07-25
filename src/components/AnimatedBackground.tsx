import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const dropStyles = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '10px 10px 60px -8px rgba(0, 0, 0, 0.2)',
  position: 'absolute',
  transition: 'all 3s ease',
};

const circleDropStyles = {
  ...dropStyles,
  borderRadius: '50%',
};

interface AnimatedElementProps {
  size: number;
  isCircle?: boolean;
  initialPosition: { top: string; left: string };
  zIndex?: number;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  size, 
  isCircle = false, 
  initialPosition,
  zIndex = 0
}) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const moveRandomly = () => {
      const newTop = `${Math.random() * 100}%`;
      const newLeft = `${Math.random() * 100}%`;
      
      setPosition({ top: newTop, left: newLeft });
    };

    const initialTimeout = setTimeout(() => {
      moveRandomly();
    }, Math.random() * 2000);

    const intervalId = setInterval(() => {
      moveRandomly();
    }, 3000 + Math.random() * 6000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box
      sx={{
        ...(isCircle ? circleDropStyles : dropStyles),
        width: size,
        height: size,
        top: position.top,
        left: position.left,
        zIndex,
      }}
    />
  );
};

interface AnimatedBackgroundProps {
  elementCount?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  elementCount = 2
}) => {
  const elements = Array.from({ length: elementCount }, (_, index) => {
    const size = 20 + Math.random() * 60;
    const isCircle = Math.random() > 0.5;
    const initialPosition = {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    };

    return (
      <AnimatedElement
        key={index}
        size={size}
        isCircle={isCircle}
        initialPosition={initialPosition}
        zIndex={1}
      />
    );
  });

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
          zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {elements}
    </Box>
  );
};

export default AnimatedBackground;