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
    { type: 'circle', radius: 52, label: '', variant: 'filled', image: '/ollama.webp' },
    { type: 'rectangle', width: 260, height: 50, label: 'FULL STACK DEVELOPER', fontSize: 14, variant: 'filled' },
    { type: 'circle', radius: 48, label: '', variant: 'filled', image: '/nousresearch.webp' },
    { type: 'rectangle', width: 320, height: 50, label: 'CREATIVE PROBLEM SOLVER', fontSize: 14, variant: 'outline' },
    { type: 'circle', radius: 48, label: '', variant: 'filled', image: '/Group 14.svg' },
    { type: 'rectangle', width: 230, height: 50, label: 'LET\u2019S COLLABORATE!', fontSize: 14, variant: 'filled' },
];

const MOBILE_SHAPES: ShapeConfig[] = [
    { type: 'rectangle', width: 230, height: 45, label: 'FULL STACK DEVELOPER', fontSize: 12, variant: 'filled' },
    { type: 'circle', radius: 40, label: '', variant: 'filled', image: '/Group 13.svg' },
    { type: 'rectangle', width: 200, height: 45, label: 'LET\u2019S COLLABORATE!', fontSize: 12, variant: 'outline' },
];

/* ── glass-crack overlays ────────────────────────────────
   Fractures originate from the EDGES and corners and reach only into the
   outer band, leaving the central text zone (x 26–74, y 30–70) clear.
   Each crack is drawn as a beveled groove (dark halo + bright core) and the
   overlay carries a soft drop-shadow, so it reads as real, depth-full glass
   rather than a flat scratch. */
/* One edge impact: radial fractures fanning from the top-left corner,
   tied together by a concentric stress arc — the classic struck-glass look. */
const CRACK_L1 = [
    'M2 2 L23 11',
    'M2 2 L11 23',
    'M2 2 L26 4',
    'M2 2 L5 26',
    'M23 11 Q15 15 11 23', /* concentric arc across the radials */
];
/* Two opposite edge impacts, larger, with radials + inner/outer arcs and
   small offshoots — all kept in the corners, clear of the central text. */
const CRACK_L2 = [
    /* impact A — top-left corner */
    'M2 2 L25 12',
    'M2 2 L12 25',
    'M2 2 L27 4',
    'M2 2 L4 27',
    'M2 2 L18 18',
    'M25 12 Q17 17 12 25',
    'M18 9 Q12 13 9 18',
    'M18 18 L24 22',
    /* impact B — bottom-right corner */
    'M98 98 L75 88',
    'M98 98 L88 75',
    'M98 98 L96 73',
    'M98 98 L73 96',
    'M98 98 L82 82',
    'M75 88 Q83 83 88 75',
    'M91 82 Q87 87 82 91',
    'M82 82 L76 78',
];
/* Translucent chipped-glass facets at the two impact corners (L2 only) */
const FACETS_L2 = [
    '2,2 25,12 12,25',
    '98,98 75,88 88,75',
];

function CrackSvg({ paths, facets }: { paths: string[]; facets?: string[] }) {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            {/* chipped facets catch light first, behind the cracks */}
            {facets?.map((pts, i) => (
                <polygon key={`facet-${i}`} points={pts} fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
            ))}
            {/* dark halo — gives the groove its shadowed walls (reads on light fills) */}
            <g fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={2.1} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round">
                {paths.map((d, i) => <path key={`s-${i}`} d={d} />)}
            </g>
            {/* bright core — the lit fracture line (reads on dark fills) */}
            <g fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth={0.7} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round">
                {paths.map((d, i) => <path key={`c-${i}`} d={d} />)}
            </g>
        </svg>
    );
}

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

            /* ── glass damage: crack on bounces, then shatter ───
               L1 cracks at 4 bounces, L2 at 10, shatter at 13–15.
               A "bounce" = a collision with enough speed to count
               (resting jitter is ignored). */
            const BOUNCE_SPEED = 2.6;
            const bounceCounts = new Array(bodies.length).fill(0);
            const crackLevels = new Array(bodies.length).fill(0);
            const shattered = new Array(bodies.length).fill(false);
            const shatterAt = bodies.map(() => 13 + Math.floor(Math.random() * 3)); // 13–15
            const shardEls: HTMLDivElement[] = [];

            /* Don't count the initial drop-in: a shape only starts taking damage
               once it has settled (slept) for the first time, so it appears as a
               whole shape on arrival. Fallback-arm after 4s in case one never sleeps. */
            const armed = new Array(bodies.length).fill(false);
            bodies.forEach((b, i) => {
                Matter.Events.on(b, 'sleepStart', () => { armed[i] = true; });
            });
            const armTimer = setTimeout(() => armed.fill(true), 4000);

            const randomShardClip = () =>
                `polygon(${Math.random() * 40}% 0%, 100% ${Math.random() * 50}%, ${50 + Math.random() * 45}% 100%, 0% ${45 + Math.random() * 45}%)`;

            const spawnShards = (idx: number, cx: number, cy: number) => {
                const s = activeShapes[idx];
                const base = s.type === 'circle' ? s.radius! * 2 : Math.min(s.width!, s.height!);
                const isFilledRect = s.type === 'rectangle' && s.variant === 'filled';
                const shardBg = isFilledRect ? 'rgba(255,255,255,0.95)' : 'rgba(18,18,20,0.9)';
                const count = 10 + Math.floor(Math.random() * 4);
                for (let k = 0; k < count; k++) {
                    const shard = document.createElement('div');
                    const sw = 8 + Math.random() * base * 0.4;
                    const sh = 8 + Math.random() * base * 0.4;
                    shard.style.cssText =
                        `position:absolute;left:${cx}px;top:${cy}px;width:${sw}px;height:${sh}px;` +
                        `background:${shardBg};border:1px solid rgba(255,255,255,0.55);` +
                        `pointer-events:none;z-index:6;will-change:transform,opacity;` +
                        `transform:translate(-50%,-50%);clip-path:${randomShardClip()};`;
                    container.appendChild(shard);
                    shardEls.push(shard);

                    const angle = Math.random() * Math.PI * 2;
                    const dist = 480 + Math.random() * 720;
                    const dx = Math.cos(angle) * dist;
                    const dy = Math.sin(angle) * dist + 140; // slight downward bias
                    const rot = (Math.random() - 0.5) * 1080;
                    const anim = shard.animate(
                        [
                            { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1 },
                            { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rot}deg)`, opacity: 0 },
                        ],
                        { duration: 700 + Math.random() * 450, easing: 'cubic-bezier(0.2,0.6,0.25,1)', fill: 'forwards' }
                    );
                    anim.onfinish = () => {
                        shard.remove();
                        const i = shardEls.indexOf(shard);
                        if (i >= 0) shardEls.splice(i, 1);
                    };
                }
            };

            const shatter = (idx: number) => {
                if (shattered[idx]) return;
                shattered[idx] = true;
                const body = bodies[idx];
                spawnShards(idx, body.position.x, body.position.y);
                Matter.Composite.remove(engine.world, body);
                const el = shapeRefs.current[idx];
                if (el) el.style.display = 'none';
            };

            const registerBounce = (idx: number) => {
                if (shattered[idx]) return;
                bounceCounts[idx] += 1;
                const n = bounceCounts[idx];
                if (n >= shatterAt[idx]) {
                    shatter(idx);
                    return;
                }
                if (n >= 10 && crackLevels[idx] < 2) {
                    crackLevels[idx] = 2;
                    shapeRefs.current[idx]?.setAttribute('data-crack', '2');
                } else if (n >= 4 && crackLevels[idx] < 1) {
                    crackLevels[idx] = 1;
                    shapeRefs.current[idx]?.setAttribute('data-crack', '1');
                }
            };

            const onCollision = (evt: Matter.IEventCollision<Matter.Engine>) => {
                for (const pair of evt.pairs) {
                    const ia = bodies.indexOf(pair.bodyA);
                    if (ia !== -1 && armed[ia] && bodies[ia].speed >= BOUNCE_SPEED) registerBounce(ia);
                    const ib = bodies.indexOf(pair.bodyB);
                    if (ib !== -1 && armed[ib] && bodies[ib].speed >= BOUNCE_SPEED) registerBounce(ib);
                }
            };
            Matter.Events.on(engine, 'collisionStart', onCollision);

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
                    if (shattered[i]) return;
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
                Matter.Events.off(engine, 'collisionStart', onCollision);
                clearTimeout(armTimer);
                shardEls.forEach((el) => el.remove());
                shardEls.length = 0;
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
                        className="playground-shape"
                        ref={(el) => { shapeRefs.current[i] = el; }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: isCircle ? shape.radius! * 2 : shape.width,
                            height: isCircle ? shape.radius! * 2 : shape.height,
                            borderRadius: isCircle ? '50%' : '999px',
                            /* Frosted-glass treatment so pills stay legible over the
                               bright hero photo (independent of light/dark theme). */
                            border: (isCircle && shape.image)
                                ? '1px solid rgba(255, 255, 255, 0.25)'
                                : isFilled
                                    ? '1px solid rgba(0, 0, 0, 0.12)'
                                    : '1.5px solid rgba(255, 255, 255, 0.55)',
                            background: (isCircle && shape.image)
                                ? 'rgba(17, 17, 17, 0.5)'
                                : (isFilled
                                    ? (isCircle ? 'rgba(17, 17, 17, 0.85)' : 'rgba(255, 255, 255, 0.92)')
                                    : 'rgba(17, 17, 17, 0.42)'),
                            color: isFilled
                                ? (isCircle ? '#fff' : '#111')
                                : '#ffffff',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
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

                        {/* Glass-crack overlays — revealed via data-crack on this element */}
                        <div className="crack-overlay crack-l1" aria-hidden="true">
                            <CrackSvg paths={CRACK_L1} />
                        </div>
                        <div className="crack-overlay crack-l2" aria-hidden="true">
                            <CrackSvg paths={CRACK_L2} facets={FACETS_L2} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
