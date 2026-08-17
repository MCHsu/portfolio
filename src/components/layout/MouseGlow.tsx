import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

export function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  const [isVisible, setIsVisible] = useState(false);

  const glowBackground = useMotionTemplate`
    radial-gradient(
      300px circle at ${smoothX}px ${smoothY}px,
      var(--color-mouse-glow),
      transparent 60%
    )
  `;
  const glowMask = useMotionTemplate`
    radial-gradient(
      300px circle at ${smoothX}px ${smoothY}px,
      black,
      transparent 60%
    )
  `;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          background: glowBackground,
        }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          WebkitMaskImage: glowMask,
          maskImage: glowMask,
        }}
      >
        <div aria-hidden="true" className="glow-noise" />
      </motion.div>
    </>
  );
}
