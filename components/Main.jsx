'use client';

import { useTransform, useScroll } from 'framer-motion';
import { useEffect, useRef } from "react";


const Main = () => {
    const targetRef = useRef(null);
    useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });
    useEffect(() => {
        const updateMousePosition = (ev) => {
            if (!targetRef.current) return;
            const { clientX, clientY } = ev;
            targetRef.current.style.setProperty("--x", `${clientX}px`);
            targetRef.current.style.setProperty("--y", `${clientY}px`);
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);
    return (
        <section
            ref={targetRef}
            className="main before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--color-text)_0%,_transparent_100%)] before:opacity-50"
        >
        </section>
    )
}

export default Main

