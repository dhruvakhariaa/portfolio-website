'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

/* ── shape definitions ──────────────────────────────────── */
interface ShapeConfig {
    type: 'rectangle' | 'circle';
    width?: number;
    height?: number;
    radius?: number;
    label: string;
    fontSize?: number;
    variant: 'filled' | 'outline';
    image?: string; // optional SVG/image path for circle logos
}

const DESKTOP_SHAPES: ShapeConfig[] = [
    { type: 'rectangle', width: 380, height: 55, label: 'BUILDING PRODUCTS & EXPERIENCES', fontSize: 14, variant: 'outline' },
    { type: 'circle', radius: 52, label: '', variant: 'filled', image: '/Group 13.svg' },
    { type: 'rectangle', width: 260, height: 50, label: 'FULL STACK DEVELOPER', fontSize: 14, variant: 'filled' },
    { type: 'circle', radius: 48, label: '', variant: 'filled', image: '/Group 14.svg' },
    { type: 'rectangle', width: 320, height: 50, label: 'CREATIVE PROBLEM SOLVER', fontSize: 14, variant: 'outline' },
    { type: 'circle', radius: 48, label: '', variant: 'filled', image: '/Group 15.svg' },
    { type: 'rectangle', width: 230, height: 50, label: 'LET\u2019S COLLABORATE!', fontSize: 14, variant: 'filled' },
];

const MOBILE_SHAPES: ShapeConfig[] = [
    { type: 'rectangle', width: 230, height: 45, label: 'FULL STACK DEVELOPER', fontSize: 12, variant: 'filled' },
    { type: 'circle', radius: 40, label: '', variant: 'filled', image: '/Group 13.svg' },
    { type: 'rectangle', width: 200, height: 45, label: 'LET\u2019S COLLABORATE!', fontSize: 12, variant: 'outline' },
];

/* ── component ──────────────────────────────────────────── */
export default function PhysicsPlayground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const shapeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const cleanupRef = useRef<(() => void) | null>(null);
    const [activeShapes, setActiveShapes] = useState<ShapeConfig[]>([]);

    /* determine shape set (client-only) */
    useEffect(() => {
        setActiveShapes(window.innerWidth < 768 ? MOBILE_SHAPES : DESKTOP_SHAPES);
    }, []);

    /* initialise Matter.js when DOM shapes exist */
    useEffect(() => {
        if (activeShapes.length === 0 || !containerRef.current) return;

        let cancelled = false;

        import('matter-js').then((Matter) => {
            if (cancelled || !containerRef.current) return;

            const container = containerRef.current;
            const { width, height } = container.getBoundingClientRect();

            /* ── engine ─────────────────────────────────── */
            const engine = Matter.Engine.create({ enableSleeping: true });
            engine.gravity.y = 1;
            engine.gravity.scale = 0.001;

            /* ── walls (5 000 px long, so resize only repositions) */
            const wo: Matter.IChamferableBodyDefinition = { isStatic: true, friction: 0.5, restitution: 0.3 };
            const walls = [
                Matter.Bodies.rectangle(width / 2, height + 30, 5000, 60, wo),   // bottom
                Matter.Bodies.rectangle(width / 2, -30, 5000, 60, wo),            // top
                Matter.Bodies.rectangle(-30, height / 2, 60, 5000, wo),            // left
                Matter.Bodies.rectangle(width + 30, height / 2, 60, 5000, wo),     // right
            ];

            /* ── dynamic bodies ─────────────────────────── */
            const bodies = activeShapes.map((s, i) => {
                const spread = width / (activeShapes.length + 1);
                const x = spread * (i + 1) + (Math.random() - 0.5) * spread * 0.4;
                const y = 50 + Math.random() * (height * 0.3); // start in top third, visible immediately

                const opts: Matter.IChamferableBodyDefinition = {
                    restitution: 0.5,
                    friction: 0.4,
                    frictionAir: 0.015,
                    density: 0.001,
                    angle: (Math.random() - 0.5) * 0.8,
                    sleepThreshold: 60,
                };

                return s.type === 'circle'
                    ? Matter.Bodies.circle(x, y, s.radius!, opts)
                    : Matter.Bodies.rectangle(x, y, s.width!, s.height!, {
                        ...opts,
                        chamfer: { radius: Math.floor(s.height! / 2) },
                    });
            });

            /* ── exclusion zone around CTA buttons ──────── */
            const btnEl = document.getElementById('hero-cta-buttons');
            let btnGuard: Matter.Body | null = null;
            if (btnEl) {
                const containerRect = container.getBoundingClientRect();
                const btnRect = btnEl.getBoundingClientRect();
                const pad = 100;
                const cx = btnRect.left - containerRect.left + btnRect.width / 2;
                const cy = btnRect.top - containerRect.top + btnRect.height / 2;
                btnGuard = Matter.Bodies.rectangle(
                    cx, cy,
                    btnRect.width + pad * 2,
                    btnRect.height + pad * 2,
                    { isStatic: true, restitution: 0.5, friction: 0 } as Matter.IChamferableBodyDefinition
                );
            }

            Matter.Composite.add(engine.world, [
                ...walls,
                ...bodies,
                ...(btnGuard ? [btnGuard] : []),
            ]);

            /* ── custom drag (does NOT break page scroll) ── */
            let dragConstraint: Matter.Constraint | null = null;
            const INSET = 30; // match wall thickness — keep drag inside walls

            const pos = (e: MouseEvent | Touch): Matter.Vector => {
                const r = container.getBoundingClientRect();
                const rawX = e.clientX - r.left;
                const rawY = e.clientY - r.top;
                return {
                    x: Math.max(INSET, Math.min(rawX, r.width - INSET)),
                    y: Math.max(INSET, Math.min(rawY, r.height - INSET)),
                };
            };

            const startDrag = (point: Matter.Vector) => {
                const hit = Matter.Query.point(bodies, point);
                if (hit.length === 0) return false;

                const body = hit[0];
                Matter.Sleeping.set(body, false);

                dragConstraint = Matter.Constraint.create({
                    pointA: { x: point.x, y: point.y },
                    bodyB: body,
                    pointB: {
                        x: point.x - body.position.x,
                        y: point.y - body.position.y,
                    },
                    stiffness: 0.6,
                    damping: 0.3,
                    length: 0,
                });
                Matter.Composite.add(engine.world, dragConstraint);
                container.style.cursor = 'grabbing';
                return true;
            };

            const moveDrag = (point: Matter.Vector) => {
                if (!dragConstraint) return;
                dragConstraint.pointA = { x: point.x, y: point.y };
            };

            const endDrag = () => {
                if (!dragConstraint) return;
                Matter.Composite.remove(engine.world, dragConstraint);
                dragConstraint = null;
                container.style.cursor = '';
            };

            /* mouse listeners — only preventDefault when dragging a shape */
            const onMouseDown = (e: MouseEvent) => {
                if (startDrag(pos(e))) e.preventDefault();
            };
            const onMouseMove = (e: MouseEvent) => moveDrag(pos(e));
            const onMouseUp = () => endDrag();

            /* touch listeners — only preventDefault when dragging a shape */
            const onTouchStart = (e: TouchEvent) => {
                if (startDrag(pos(e.touches[0]))) e.preventDefault();
            };
            const onTouchMove = (e: TouchEvent) => {
                if (dragConstraint) {
                    moveDrag(pos(e.touches[0]));
                    e.preventDefault();
                }
            };
            const onTouchEnd = () => endDrag();

            container.addEventListener('mousedown', onMouseDown);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            container.addEventListener('touchstart', onTouchStart, { passive: false });
            container.addEventListener('touchmove', onTouchMove, { passive: false });
            container.addEventListener('touchend', onTouchEnd);

            /* ── runner ─────────────────────────────────── */
            const runner = Matter.Runner.create();
            Matter.Runner.run(runner, engine);

            /* ── rAF: sync physics → DOM ────────────────── */
            let raf = 0;
            const sync = () => {
                bodies.forEach((body, i) => {
                    const el = shapeRefs.current[i];
                    if (!el) return;
                    const s = activeShapes[i];
                    const hw = s.type === 'circle' ? s.radius! : s.width! / 2;
                    const hh = s.type === 'circle' ? s.radius! : s.height! / 2;
                    el.style.transform = `translate(${body.position.x - hw}px, ${body.position.y - hh}px) rotate(${body.angle}rad)`;
                    el.style.opacity = '1';
                });
                raf = requestAnimationFrame(sync);
            };
            raf = requestAnimationFrame(sync);

            /* ── resize → reposition walls ──────────────── */
            let resizeTimer: ReturnType<typeof setTimeout>;
            const onResize = () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    if (!containerRef.current) return;
                    const { width: w, height: h } = containerRef.current.getBoundingClientRect();
                    Matter.Body.setPosition(walls[0], { x: w / 2, y: h + 30 });
                    Matter.Body.setPosition(walls[1], { x: w / 2, y: -30 });
                    Matter.Body.setPosition(walls[2], { x: -30, y: h / 2 });
                    Matter.Body.setPosition(walls[3], { x: w + 30, y: h / 2 });

                    /* reposition button exclusion zone */
                    if (btnGuard && btnEl) {
                        const cRect = containerRef.current.getBoundingClientRect();
                        const bRect = btnEl.getBoundingClientRect();
                        const bx = bRect.left - cRect.left + bRect.width / 2;
                        const by = bRect.top - cRect.top + bRect.height / 2;
                        Matter.Body.setPosition(btnGuard, { x: bx, y: by });
                    }

                    bodies.forEach((b) => Matter.Sleeping.set(b, false));
                }, 200);
            };
            window.addEventListener('resize', onResize);

            /* ── cleanup ────────────────────────────────── */
            cleanupRef.current = () => {
                container.removeEventListener('mousedown', onMouseDown);
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
                container.removeEventListener('touchstart', onTouchStart);
                container.removeEventListener('touchmove', onTouchMove);
                container.removeEventListener('touchend', onTouchEnd);
                window.removeEventListener('resize', onResize);
                clearTimeout(resizeTimer);
                cancelAnimationFrame(raf);
                Matter.Runner.stop(runner);
                Matter.Composite.clear(engine.world, false);
                Matter.Engine.clear(engine);
            };
        });

        return () => {
            cancelled = true;
            cleanupRef.current?.();
            cleanupRef.current = null;
        };
    }, [activeShapes]);

    /* ── render ──────────────────────────────────────────── */
    return (
        <div ref={containerRef} className="absolute inset-0" style={{ zIndex: 0 }}>
            {activeShapes.map((shape, i) => {
                const isFilled = shape.variant === 'filled';
                const isCircle = shape.type === 'circle';

                return (
                    <div
                        key={`physics-shape-${i}`}
                        ref={(el) => { shapeRefs.current[i] = el; }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: isCircle ? shape.radius! * 2 : shape.width,
                            height: isCircle ? shape.radius! * 2 : shape.height,
                            borderRadius: isCircle ? '50%' : '999px',
                            border: isFilled
                                ? 'none'
                                : '2.5px solid rgba(255, 255, 255, 0.35)',
                            background: (isCircle && shape.image)
                                ? 'transparent'
                                : (isFilled ? (isCircle ? '#111' : '#fff') : 'transparent'),
                            color: isFilled
                                ? (isCircle ? '#fff' : '#111')
                                : 'rgba(255, 255, 255, 0.7)',
                            overflow: 'hidden',
                            willChange: 'transform',
                            opacity: 0,
                            cursor: 'grab',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: isCircle ? 0 : '0 24px',
                            fontSize: shape.fontSize || 14,
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase' as const,
                            whiteSpace: 'nowrap' as const,
                            userSelect: 'none' as const,
                            fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                        }}
                    >
                        {isCircle && shape.image ? (
                            <Image
                                src={shape.image}
                                alt={shape.label || 'skill logo'}
                                width={shape.radius! * 2}
                                height={shape.radius! * 2}
                                style={{
                                    borderRadius: '50%',
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                    width: '100%',
                                    height: '100%',
                                }}
                                draggable={false}
                            />
                        ) : (
                            shape.label
                        )}
                    </div>
                );
            })}
        </div>
    );
}
