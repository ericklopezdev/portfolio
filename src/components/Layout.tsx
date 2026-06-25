import { Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useMemo, useState } from 'react';
import { navByLang, ui, type Lang } from '../data/i18n';
import { site } from '../data/site';

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

function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: Dispatch<SetStateAction<Lang>> }) {
  const toggle = () => {
    setLang((current) => {
      const next = current === 'en' ? 'es' : 'en';
      localStorage.setItem('portfolio-lang', next);
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid h-9 min-w-9 place-items-center px-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] transition hover:text-[var(--accent)]"
      aria-label={ui[lang].switchLang}
      title={ui[lang].switchLang}
    >
      {lang === 'en' ? 'ES' : 'EN'}
    </button>
  );
}

export function Layout({ children, path, lang, setLang }: PropsWithChildren<{ path: string; lang: Lang; setLang: Dispatch<SetStateAction<Lang>> }>) {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('inicio');
  const [scrollProgress, setScrollProgress] = useState(0);
  const hideFooter = path === '/projects';
  const nav = navByLang[lang];
  const sideNav = useMemo(
    () => nav
      .filter((item) => item.href.includes('#'))
      .map((item) => ({ ...item, id: item.href.split('#')[1] })),
    [nav],
  );

  useEffect(() => {
    if (path !== '/') return;

    let frame = 0;
    const update = () => {
      const sections = sideNav
        .map((item) => document.getElementById(item.id))
        .filter((section): section is HTMLElement => Boolean(section));

      if (!sections.length) return;

      const anchor = window.scrollY + window.innerHeight * 0.38;
      let currentIndex = 0;

      sections.forEach((section, index) => {
        if (section.offsetTop <= anchor) currentIndex = index;
      });

      const current = sections[currentIndex];
      const next = sections[currentIndex + 1];
      const start = current.offsetTop;
      const end = next ? next.offsetTop : document.documentElement.scrollHeight - window.innerHeight;
      const local = end > start ? (anchor - start) / (end - start) : 1;
      const total = (currentIndex + Math.min(Math.max(local, 0), 1)) / Math.max(sections.length - 1, 1);

      setActiveHash((previous) => previous === current.id ? previous : current.id);
      setScrollProgress((previous) => {
        const nextProgress = Math.min(Math.max(total, 0), 1);
        return Math.abs(previous - nextProgress) < 0.003 ? previous : nextProgress;
      });
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [path, sideNav]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 w-screen overflow-x-clip border-b border-transparent bg-[color-mix(in_srgb,var(--bg)_76%,transparent)] backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--bg)_62%,transparent)] lg:hidden" style={{ borderColor: 'color-mix(in srgb, var(--border) 62%, transparent)' }}>
        <div className="flex h-16 w-full max-w-full items-center justify-end px-4">
          <div className="flex items-center gap-2">
            <LanguageToggle lang={lang} setLang={setLang} />
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
          <nav className="flex w-full max-w-full flex-col gap-1 px-4 py-3 md:hidden">
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

      {path === '/' && (
        <nav className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block" aria-label="Section index">
          <div className="relative py-2 pl-5">
            <span className="absolute bottom-2 left-0 top-2 w-px bg-[var(--border)]" />
            <span
              className="absolute left-0 top-2 w-px bg-[var(--accent)] transition-[height] duration-500 ease-out"
              style={{ height: `calc((100% - 1rem) * ${scrollProgress})` }}
            />
            <div className="flex flex-col gap-4">
              {sideNav.map((item, index) => {
                const active = activeHash === item.id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group relative grid grid-cols-[2.5ch_1fr] items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300"
                    style={{ color: active ? 'var(--accent)' : 'var(--faint)' }}
                  >
                    <span
                      className="absolute -left-[1.46rem] h-2 w-2 rounded-full border bg-[var(--bg)] transition duration-300 group-hover:scale-125"
                      style={{ borderColor: active ? 'var(--accent)' : 'var(--border)' }}
                    />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span className="max-w-[11ch] truncate group-hover:text-[var(--accent)]">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {path === '/' && (
        <div className="fixed right-6 top-6 z-50 hidden lg:block">
          <div className="flex items-center gap-2">
            <LanguageToggle lang={lang} setLang={setLang} />
            <ThemeToggle />
          </div>
        </div>
      )}

      <main className={`relative min-h-screen ${path === '/projects' ? 'pt-16' : 'pt-24 lg:pt-8'}`}>{children}</main>

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
        <div className="container mt-8 font-mono text-xs text-[var(--faint)]">{ui[lang].footer}</div>
      </footer>}
    </>
  );
}
