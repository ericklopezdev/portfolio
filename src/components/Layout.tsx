import { Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';
import { nav, site } from '../data/site';

function isActive(path: string, href: string) {
  if (href.includes('#')) return path === '/';
  return href === '/' ? path === '/' : path.startsWith(href);
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') ?? 'light');

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid h-9 w-9 place-items-center text-[var(--muted)] transition hover:text-[var(--accent)]"
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}

export function Layout({ children, path }: PropsWithChildren<{ path: string }>) {
  const [open, setOpen] = useState(false);
  const hideFooter = path === '/projects';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--text)] hover:text-[var(--accent)]">
            {site.name.toLowerCase().replaceAll(' ', '-')}
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-6 md:flex" aria-label="Principal">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-xs uppercase tracking-[0.16em] transition hover:text-[var(--accent)]"
                style={{ color: isActive(path, item.href) ? 'var(--accent)' : 'var(--muted)' }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="grid h-9 w-9 place-items-center text-[var(--muted)] md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="container flex flex-col gap-1 py-3 md:hidden">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-3 text-sm font-medium"
                style={{ color: isActive(path, item.href) ? 'var(--accent)' : 'var(--muted)' }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main className={`relative min-h-screen ${path === '/projects' ? 'pt-16' : 'pt-24'}`}>{children}</main>

      {!hideFooter && <footer id="contacto" className="mt-16 border-t py-10" style={{ borderColor: 'var(--border)' }}>
        <div className="container flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <p className="font-serif text-xl">{site.fullName}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{site.role} - {site.location}</p>
          </div>
          <div className="flex gap-3">
            <a className="grid h-10 w-10 place-items-center rounded-lg border text-[var(--muted)] hover:text-[var(--accent)]" style={{ borderColor: 'var(--border)' }} href={site.socials.github} target="_blank" rel="noreferrer" title="GitHub"><Github size={18} /></a>
            <a className="grid h-10 w-10 place-items-center rounded-lg border text-[var(--muted)] hover:text-[var(--accent)]" style={{ borderColor: 'var(--border)' }} href={site.socials.linkedin} target="_blank" rel="noreferrer" title="LinkedIn"><Linkedin size={18} /></a>
            <a className="grid h-10 w-10 place-items-center rounded-lg border text-[var(--muted)] hover:text-[var(--accent)]" style={{ borderColor: 'var(--border)' }} href={`mailto:${site.email}`} title="Email"><Mail size={18} /></a>
          </div>
        </div>
        <div className="container mt-8 font-mono text-xs text-[var(--faint)]">(c) {new Date().getFullYear()} - built with React, Tailwind and GSAP</div>
      </footer>}
    </>
  );
}
