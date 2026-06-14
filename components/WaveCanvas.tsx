"use client";

import { useEffect, useRef } from "react";

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 110;
    };

    setSize();
    window.addEventListener("resize", setSize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      ctx.moveTo(0, H);

      for (let x = 0; x <= W; x++) {
        const y = Math.sin((x / W) * Math.PI * 1.4 + t) * 18 + 55;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = "#FAF0CA";
      ctx.fill();

      t += 0.008;
      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 pointer-events-none"
      style={{ width: "100%", height: "110px", display: "block" }}
      aria-hidden="true"
    />
  );
}
