'use client';

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export const MagneticCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const dampen = 20;
    const x = useSpring(useTransform(mouseX, [0, 1], [-dampen, dampen]), {
        stiffness: 300,
        damping: 20,
    });
    const y = useSpring(useTransform(mouseY, [0, 1], [-dampen, dampen]), {
        stiffness: 300,
        damping: 20,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) return;
        const px = (e.clientX - bounds.left) / bounds.width;
        const py = (e.clientY - bounds.top) / bounds.height;
        mouseX.set(px);
        mouseY.set(py);
    };

    const reset = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x, y }}
            className="will-change-transform"
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    );
};
