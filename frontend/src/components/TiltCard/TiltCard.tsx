'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import React from 'react';

export const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const rotateX = useTransform(y, [0, 1], [15, -15]);
    const rotateY = useTransform(x, [0, 1], [-15, 15]);

    const springX = useSpring(rotateX, { stiffness: 300, damping: 20 });
    const springY = useSpring(rotateY, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        x.set(px);
        y.set(py);
    };

    return (
        <motion.div
            style={{
                perspective: 1000,
            }}
            className='h-full'
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                    x.set(0.5);
                    y.set(0.5);
                }}
                style={{
                    rotateX: springX,
                    rotateY: springY,
                    transformStyle: 'preserve-3d',
                }}
                className="will-change-transform h-full"
            >
                {children}
            </motion.div>
        </motion.div>
    );
};
