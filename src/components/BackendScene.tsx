import gsap from 'gsap';
import { Cloud, Database, GitBranch, Lock, Server, Workflow } from 'lucide-react';
import { useEffect, useRef } from 'react';

const nodes = [
  { label: 'API', Icon: Server, x: 8, y: 42, z: 0 },
  { label: 'Auth', Icon: Lock, x: 30, y: 20, z: 54 },
  { label: 'Queue', Icon: Workflow, x: 48, y: 54, z: -30 },
  { label: 'Cloud', Icon: Cloud, x: 66, y: 18, z: 70 },
  { label: 'DB', Icon: Database, x: 78, y: 58, z: 8 },
  { label: 'CI/CD', Icon: GitBranch, x: 38, y: 76, z: 40 },
];

export function BackendScene() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.scene-plane', {
        rotateY: 10,
        rotateX: -4,
        yoyo: true,
        repeat: -1,
        duration: 5,
        ease: 'sine.inOut',
      });
      gsap.to('.scene-node', {
        y: -10,
        stagger: 0.22,
        yoyo: true,
        repeat: -1,
        duration: 1.8,
        ease: 'sine.inOut',
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative h-[360px] min-h-[320px] overflow-hidden rounded-lg border md:h-[460px]" style={{ borderColor: 'var(--border)', perspective: '900px' }}>
      <div className="scene-plane absolute inset-6" style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'linear-gradient(135deg, color-mix(in srgb, var(--panel) 72%, transparent), color-mix(in srgb, var(--panel-2) 45%, transparent))', transform: 'rotateX(64deg) translateZ(-90px)' }} />
        <svg className="absolute inset-0 h-full w-full text-[var(--accent)] opacity-45" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M12 46 C30 20 44 58 52 58 S72 20 70 23" fill="none" stroke="currentColor" strokeWidth="0.45" />
          <path d="M52 58 C68 70 75 60 82 62" fill="none" stroke="currentColor" strokeWidth="0.45" />
          <path d="M32 24 C38 44 36 72 40 78" fill="none" stroke="currentColor" strokeWidth="0.45" strokeDasharray="2 2" />
        </svg>
        {nodes.map(({ label, Icon, x, y, z }) => (
          <div
            key={label}
            className="scene-node absolute grid h-16 w-16 place-items-center rounded-lg border shadow-xl"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              borderColor: 'var(--strong)',
              background: 'var(--panel)',
              transform: `translate(-50%, -50%) translateZ(${z}px)`,
            }}
            title={label}
          >
            <Icon size={22} className="text-[var(--accent)]" />
            <span className="absolute -bottom-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
