"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  z: number;
  r: number;
  cluster: number;
  pulse: number;
};

const CLUSTERS = 6; // the six capability pillars
const PER_CLUSTER = 7;

/**
 * Hero "operational ecosystem" — Section 6.1 / 8.1.
 *
 * Deliberately NOT WebGL. Section 8.1 asks for "3D moments, not a 3D website"
 * and Section 14.1 caps initial JS; a projected point cloud on 2D canvas gives
 * the depth and cursor reaction the spec describes with no 3D library in the
 * bundle. It pauses when off-screen and renders a single static frame under
 * prefers-reduced-motion.
 */
export function EcosystemCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let running = !reduceMotion;
    let t = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    /* ---- Build the node field: six clusters orbiting a centre ------------- */
    const nodes: Node[] = [];
    for (let c = 0; c < CLUSTERS; c++) {
      const theta = (c / CLUSTERS) * Math.PI * 2;
      const cx = Math.cos(theta) * 0.62;
      const cz = Math.sin(theta) * 0.62;
      const cy = (c % 2 === 0 ? -1 : 1) * 0.16;

      for (let i = 0; i < PER_CLUSTER; i++) {
        const spread = 0.3;
        nodes.push({
          x: cx + (Math.random() - 0.5) * spread,
          y: cy + (Math.random() - 0.5) * spread * 1.4,
          z: cz + (Math.random() - 0.5) * spread,
          r: i === 0 ? 3.4 : 1.5 + Math.random() * 1.1,
          cluster: c,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }
    // Central hub node
    nodes.push({ x: 0, y: 0, z: 0, r: 4.6, cluster: -1, pulse: 0 });

    /* ---- Sizing ----------------------------------------------------------- */
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    /* ---- Cursor parallax: 2–6px band from Section 8.1 --------------------- */
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    /* ---- Pause when off-screen (8.1 performance rule) --------------------- */
    const io = new IntersectionObserver(
      ([entry]) => {
        running = !reduceMotion && entry.isIntersecting;
        if (running) frameRef.current = requestAnimationFrame(draw);
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    /* ---- Render ----------------------------------------------------------- */
    const project = (n: Node, ry: number, rx: number) => {
      // Y rotation
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x = n.x * cosY - n.z * sinY;
      let z = n.x * sinY + n.z * cosY;
      // X rotation
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y = n.y * cosX - z * sinX;
      z = n.y * sinX + z * cosX;

      const scale = Math.min(width, height) * 0.46;
      const perspective = 1 / (2.35 - z);
      return {
        sx: width / 2 + x * scale * perspective * 2.35,
        sy: height / 2 + y * scale * perspective * 2.35,
        depth: (z + 1) / 2,
        px: perspective,
      };
    };

    const draw = () => {
      if (!running && t > 0) return;

      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      const ry = t * 0.00022 + pointer.x * 0.34;
      const rx = -0.24 + pointer.y * 0.16;

      ctx.clearRect(0, 0, width, height);

      const projected = nodes.map((n) => ({ node: n, ...project(n, ry, rx) }));

      // Connections — drawn first so nodes sit on top
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const sameCluster = a.node.cluster === b.node.cluster;
          const hubLink = a.node.cluster === -1 || b.node.cluster === -1;
          if (!sameCluster && !hubLink) continue;

          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const dist = Math.hypot(dx, dy);
          const limit = hubLink ? Math.min(width, height) * 0.55 : 110;
          if (dist > limit) continue;

          const fade = 1 - dist / limit;
          const depth = (a.depth + b.depth) / 2;
          ctx.strokeStyle = hubLink
            ? `rgba(199,154,35,${0.1 * fade * (0.35 + depth)})`
            : `rgba(139,74,51,${0.16 * fade * (0.3 + depth)})`;
          ctx.lineWidth = hubLink ? 0.7 : 0.9;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }

      // Nodes, painted back to front
      projected
        .sort((a, b) => a.depth - b.depth)
        .forEach(({ node, sx, sy, depth, px }) => {
          const pulse = reduceMotion
            ? 1
            : 0.86 + Math.sin(t * 0.0016 + node.pulse) * 0.14;
          const radius = node.r * px * 1.85 * pulse;
          const alpha = 0.2 + depth * 0.75;

          if (node.cluster === -1) {
            const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 6);
            glow.addColorStop(0, `rgba(199,154,35,${0.34 * alpha})`);
            glow.addColorStop(1, "rgba(199,154,35,0)");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(sx, sy, radius * 6, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle =
            node.cluster === -1
              ? `rgba(199,154,35,${alpha})`
              : node.r > 3
                ? `rgba(139,74,51,${alpha * 0.92})`
                : `rgba(44,39,35,${alpha * 0.55})`;
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fill();

          if (node.r > 3 && node.cluster !== -1) {
            ctx.strokeStyle = `rgba(199,154,35,${alpha * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(sx, sy, radius * 2.6, 0, Math.PI * 2);
            ctx.stroke();
          }
        });

      t += 16;
      if (running) frameRef.current = requestAnimationFrame(draw);
    };

    draw(); // paint at least one frame, including under reduced motion

    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  );
}
