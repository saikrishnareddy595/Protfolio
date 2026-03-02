"use client";

import { useEffect, useRef } from "react";

interface AIAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AIAvatar({ size = "md", className = "" }: AIAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const sizeMap = { sm: 44, md: 80, lg: 140 };
  const px = sizeMap[size];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = px * dpr;
    canvas.height = px * dpr;
    ctx.scale(dpr, dpr);

    const cx = px / 2;
    const cy = px / 2;
    const r = px * 0.38;

    function drawFrame(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, px, px);

      // Outer glow ring
      const grad = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 1.4);
      grad.addColorStop(0, "rgba(124,58,237,0.15)");
      grad.addColorStop(0.5, "rgba(6,182,212,0.08)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Animated orbit ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.6);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.15, r * 0.45, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(124,58,237,0.35)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
      // Orbit dot
      ctx.beginPath();
      ctx.arc(r * 1.15, 0, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#7C3AED";
      ctx.fill();
      ctx.restore();

      // Second orbit ring (opposite tilt)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 0.4 + Math.PI / 3);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.1, r * 0.42, Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(6,182,212,0.25)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 7]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(r * 1.1, 0, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#06B6D4";
      ctx.fill();
      ctx.restore();

      // Face base circle
      const faceGrad = ctx.createRadialGradient(cx - r * 0.15, cy - r * 0.2, r * 0.05, cx, cy, r);
      faceGrad.addColorStop(0, "rgba(40,20,80,0.95)");
      faceGrad.addColorStop(0.6, "rgba(20,10,50,0.97)");
      faceGrad.addColorStop(1, "rgba(10,5,30,0.98)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = faceGrad;
      ctx.fill();

      // Face border gradient
      const borderGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
      borderGrad.addColorStop(0, "rgba(124,58,237,0.7)");
      borderGrad.addColorStop(0.5, "rgba(6,182,212,0.5)");
      borderGrad.addColorStop(1, "rgba(124,58,237,0.3)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = borderGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Eyes — glowing dots
      const eyePulse = 0.85 + 0.15 * Math.sin(t * 2.5);
      const blinkFactor = Math.abs(Math.sin(t * 0.4)) > 0.97 ? 0.15 : 1; // blink
      const eyeY = cy - r * 0.08;
      const eyeSpacing = r * 0.32;

      for (let side = -1; side <= 1; side += 2) {
        const ex = cx + side * eyeSpacing;
        const eyeR = r * 0.12 * eyePulse;

        // Eye glow
        const eyeGlow = ctx.createRadialGradient(ex, eyeY, 0, ex, eyeY, eyeR * 2.5);
        eyeGlow.addColorStop(0, `rgba(124,58,237,${0.4 * blinkFactor})`);
        eyeGlow.addColorStop(1, "rgba(124,58,237,0)");
        ctx.beginPath();
        ctx.ellipse(ex, eyeY, eyeR * 2.5, eyeR * 2.5 * blinkFactor, 0, 0, Math.PI * 2);
        ctx.fillStyle = eyeGlow;
        ctx.fill();

        // Eye iris
        ctx.beginPath();
        ctx.ellipse(ex, eyeY, eyeR, eyeR * blinkFactor, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${0.9 * blinkFactor})`;
        ctx.fill();

        // Eye pupil
        ctx.beginPath();
        ctx.ellipse(ex, eyeY, eyeR * 0.45, eyeR * 0.45 * blinkFactor, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.85 * blinkFactor})`;
        ctx.fill();
      }

      // Nose — subtle triangle indicator
      ctx.beginPath();
      ctx.moveTo(cx, cy + r * 0.06);
      ctx.lineTo(cx - r * 0.07, cy + r * 0.22);
      ctx.lineTo(cx + r * 0.07, cy + r * 0.22);
      ctx.strokeStyle = "rgba(124,58,237,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Smile — dynamic curve
      const smilePulse = 0.5 + 0.08 * Math.sin(t * 1.2);
      ctx.beginPath();
      ctx.arc(cx, cy + r * 0.18, r * 0.25, Math.PI * smilePulse, Math.PI * (1 - smilePulse));
      ctx.strokeStyle = "rgba(6,182,212,0.6)";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.stroke();

      // Neural circuit lines on forehead
      const circuitY = cy - r * 0.55;
      ctx.strokeStyle = `rgba(124,58,237,${0.2 + 0.1 * Math.sin(t * 3)})`;
      ctx.lineWidth = 0.8;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * r * 0.3, circuitY);
        ctx.lineTo(cx + i * r * 0.3, circuitY - r * 0.12);
        ctx.lineTo(cx + i * r * 0.3 + (i === 0 ? r * 0.15 : i * r * 0.12), circuitY - r * 0.12);
        ctx.stroke();
        // Node dot
        ctx.beginPath();
        ctx.arc(cx + i * r * 0.3, circuitY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${0.5 + 0.3 * Math.sin(t * 2 + i)})`;
        ctx.fill();
      }

      // Scanning line effect
      const scanY = cy - r + ((t * 40) % (r * 2));
      const scanGrad = ctx.createLinearGradient(cx - r, scanY, cx + r, scanY);
      scanGrad.addColorStop(0, "rgba(6,182,212,0)");
      scanGrad.addColorStop(0.5, "rgba(6,182,212,0.15)");
      scanGrad.addColorStop(1, "rgba(6,182,212,0)");
      ctx.beginPath();
      ctx.rect(cx - r, scanY, r * 2, 1.5);
      ctx.save();
      ctx.clip();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = scanGrad;
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      timeRef.current += 0.016;
      drawFrame(timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [px]);

  return (
    <canvas
      ref={canvasRef}
      width={px}
      height={px}
      className={className}
      style={{ width: px, height: px }}
      aria-label="Krishna's AI avatar"
    />
  );
}

// Smaller avatar for chat header
export function AIAvatarSmall() {
  return <AIAvatar size="sm" />;
}

// Hero-size avatar
export function AIAvatarHero() {
  return <AIAvatar size="lg" />;
}
