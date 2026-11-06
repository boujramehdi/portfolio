import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CampaignsPage } from './components/CampaignsPage';
import { ProjectModal } from './components/ProjectModal';
import { assets, contact, processSteps, projects, services, type ProcessStep, type Project, type Service } from './data/site';
import { useReveal } from './hooks/useReveal';

type FormStatus = {
  type: 'idle' | 'success' | 'error';
  message: string;
};

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

const socialProfiles = [
  { label: 'WhatsApp', value: contact.whatsapp },
  { label: 'LinkedIn', value: contact.linkedin },
  { label: 'Behance', value: contact.behance }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCampaigns, setShowCampaigns] = useState(() => window.location.hash === '#campaigns');
  const [selectedService, setSelectedService] = useState('');
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const projectTriggerRef = useRef<HTMLButtonElement | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);

  useReveal();

  useEffect(() => {
    const syncRoute = () => {
      const isCampaignsPage = window.location.hash === '#campaigns';
      setShowCampaigns(isCampaignsPage);

      if (!isCampaignsPage) {
        const targetId = window.location.hash.replace('#', '');
        if (targetId) {
          window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ block: 'start' }));
        }
      }
    };

    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    document.title = showCampaigns ? 'Campaigns & Posters — Mehdi Boujra' : 'Mehdi Boujra — Graphic Designer';
  }, [showCampaigns]);

  const serviceOptions = useMemo(() => services.map((service) => service.title), []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const navigateProject = useCallback((offset: number) => {
    setSelectedProject((current) => {
      if (!current) return current;
      const currentIndex = projects.findIndex((project) => project.id === current.id);
      const nextIndex = (currentIndex + offset + projects.length) % projects.length;
      return projects[nextIndex];
    });
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const description = String(formData.get('description') || '').trim();

    if (!name || !email || !description) {
      setFormStatus({
        type: 'error',
        message: 'Add your name, email and a short note about the project.'
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus({
        type: 'error',
        message: 'That email address doesn’t look quite right.'
      });
      return;
    }

    if (!contact.email) {
      setFormStatus({
        type: 'error',
        message: 'The inquiry email is not set up yet. Please try again later.'
      });
      return;
    }

    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Brand: ${company}` : '',
        service ? `Looking for: ${service}` : '',
        '',
        'Project description:',
        description
      ].filter(Boolean).join('\n')
    );

    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setFormStatus({
      type: 'success',
      message: 'Your email app is opening with the note ready to send.'
    });
  };

  const closeMenu = () => setMenuOpen(false);

  const openCampaigns = () => {
    setMenuOpen(false);
    setSelectedProject(null);
    window.location.hash = 'campaigns';
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const renderProjectCards = (items: Project[]) => items.map((project) => (
    <article className="project-card" key={project.id} data-reveal data-project-id={project.id}>
      <button
        type="button"
        onClick={(event) => {
          projectTriggerRef.current = event.currentTarget;
          if (project.id === 'event-posters') {
            openCampaigns();
            return;
          }
          setSelectedProject(project);
        }}
        className="project-image-button"
        aria-label={`Explore ${project.title}, ${project.category}`}
      >
        <img src={project.image} alt={project.alt} loading="lazy" />
        <span className="project-overlay" aria-hidden="true">
          <span className="project-topline">
            <span className="project-number">{project.number}</span>
            <span className="project-type">{project.type}</span>
          </span>
          <span className="project-name">{project.title}</span>
          <span className="project-category">{project.category}</span>
          <span className="project-view">Explore project <span>↗</span></span>
        </span>
      </button>
    </article>
  ));

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Mehdi Boujra home" onClick={closeMenu}>
          MEHDI BOUJRA*
        </a>
        <button
          className={menuOpen ? 'nav-toggle is-open' : 'nav-toggle'}
          ref={menuToggleRef}
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-controls="site-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
          Menu
        </button>
        <nav id="site-navigation" className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            START A PROJECT <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="top">
        {showCampaigns ? (
          <CampaignsPage />
        ) : (
          <>
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow dot-label">Independent graphic designer</p>
            <h1 id="hero-title">
              Your brand
              <span>deserves more</span>
              <span>than <em>ordinary</em></span>
              <span>design.</span>
            </h1>
            <p className="hero-lede">
              I help ambitious businesses turn ideas into distinctive brands, packaging and digital experiences that connect, inspire and last.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button button-dark" href="#work">
                Explore the work <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-quiet" href="#contact">
                Let’s talk
              </a>
            </div>
            <dl className="hero-highlights">
              <div>
                <dt>07</dt>
                <dd>Projects</dd>
              </div>
              <div>
                <dt>04</dt>
                <dd>Industries</dd>
              </div>
              <div>
                <dt>100%</dt>
                <dd>Committed to impact</dd>
              </div>
            </dl>
          </div>
          <figure className="hero-collage" data-reveal>
            <div className="hero-collage-main">
              <img src={assets.heroPackaging} alt="Zayna skincare packaging and brand identity" />
            </div>
            <div className="hero-collage-identity" aria-hidden="true">
              <img src={assets.heroIdentity} alt="" />
            </div>
            <div className="hero-collage-campaign" aria-hidden="true">
              <img src={assets.heroCampaign} alt="" />
            </div>
            <div className="hero-collage-disciplines" aria-hidden="true">
              <span>Brands</span>
              <span>Packaging</span>
              <span>Print</span>
              <span>Digital</span>
            </div>
            <span className="hero-collage-compass" aria-hidden="true">+</span>
            <p className="hero-collage-note" aria-hidden="true">From strategy<br />to real results.</p>
            <a className="scroll-cue" href="#work">
              Scroll <span aria-hidden="true">↓</span>
            </a>
          </figure>
        </section>

        <section id="work" className="work section-pad" aria-labelledby="work-title">
          <div className="work-heading" data-reveal>
            <div className="work-heading-copy">
              <p className="eyebrow line-label">Selected work</p>
              <h2 id="work-title">A few worlds I’ve built.</h2>
            </div>
            <div className="work-heading-side">
              <p>Identities, campaigns and digital work.</p>
              <a className="view-all" href="#work-grid">
                All projects ({String(projects.length).padStart(2, '0')}) <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div id="work-grid" className="project-grid project-grid-featured">
            {renderProjectCards(projects.slice(0, 3))}
          </div>
          <div className="project-grid project-grid-supporting">
            {renderProjectCards(projects.slice(3))}
          </div>
        </section>

        <section id="services" className="services section-pad" aria-labelledby="services-title">
          <div className="services-layout">
            <div className="services-title" data-reveal>
              <p className="eyebrow line-label">Services</p>
              <h2 id="services-title">Design for real ambitions<span aria-hidden="true">.</span></h2>
              <p className="services-lede">Strategic and expressive design solutions to help your brand stand out and grow.</p>
              <a className="services-cta" href="#contact">
                Have a brief? Start here <span aria-hidden="true">↗</span>
              </a>
            </div>
            <figure className="services-collage" data-reveal>
              <img className="services-collage-identity" src={assets.serviceIdentity} alt="Maison Atlas identity system across brand touchpoints" loading="lazy" />
              <img className="services-collage-digital" src={assets.serviceDigital} alt="Responsive digital storefront design" loading="lazy" />
              <img className="services-collage-packaging" src={assets.servicePackaging} alt="Fragrance campaign and packaging design" loading="lazy" />
              <figcaption><span>Ideas made tangible</span><span>01—03</span></figcaption>
            </figure>
            <div className="services-catalog">
              <div className="service-list">
              {services.slice(0, 4).map((service, index) => (
                <a
                  className={`service-item service-item--${service.icon}`}
                  href="#contact"
                  key={service.title}
                  data-reveal
                  onClick={() => setSelectedService(service.title)}
                >
                  <span className="service-item-index">0{index + 1}</span>
                  <span className="service-icon-frame" aria-hidden="true">
                    <ServiceIcon icon={service.icon} />
                  </span>
                  <span className="service-item-copy">
                    <h3>{service.title}</h3>
                    <span>{service.summary}</span>
                  </span>
                  <span className="service-item-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
              </div>
              <div className="service-secondary">
                <span className="service-secondary-label">Also</span>
                {services.slice(4).map((service) => (
                  <a key={service.title} href="#contact" onClick={() => setSelectedService(service.title)}>
                    {service.title}<span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="process section-pad" aria-labelledby="process-title">
          <div className="process-background" aria-hidden="true">
            <img src={assets.processImage} alt="" loading="lazy" />
          </div>
          <div className="process-heading" data-reveal>
            <p className="eyebrow line-label">My Process</p>
            <h2 id="process-title">A clear path<br />from brief to final file.</h2>
            <p>A structured and collaborative process, designed to bring clarity and the best results.</p>
          </div>
          <ol className="process-grid">
            {processSteps.map((step) => (
              <li className="process-step" key={step.title} data-reveal>
                <div className="process-step-visual">
                  <span className="process-step-number">{step.number}</span>
                  <span className="process-step-icon" aria-hidden="true">
                    <ProcessIcon icon={step.icon} />
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="about" className="about section-pad" aria-labelledby="about-title">
          <figure className="about-media" data-reveal>
            <img src={assets.studioImage} alt="A sunlit studio table with design materials" loading="lazy" />
            <figcaption className="about-caption">Marrakech, Morocco</figcaption>
          </figure>
          <div className="about-copy" data-reveal>
            <p className="eyebrow line-label">About</p>
            <h2 id="about-title">Design, from Marrakech.</h2>
            <p>
              I’m Mehdi, an independent graphic designer. I work directly with clients and small teams on identity, packaging and digital work.
            </p>
            <p className="about-note">One point of contact, from first sketch to final file.</p>
            <a className="text-link" href="#contact">Talk through a project <span aria-hidden="true">↗</span></a>
          </div>
          <aside className="about-side-note" aria-label="Creative thinking, clear results" data-reveal>
            <img src={assets.heroIdentity} alt="OUI Design visual identity detail" loading="lazy" />
            <span className="about-seal"><span>Creative thinking</span><b aria-hidden="true">+</b><span>Clear results</span></span>
          </aside>
        </section>

        <section id="contact" className="contact section-pad" aria-labelledby="contact-title">
          <div className="contact-intro" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Let’s build<br />something great.</h2>
            <p>A few details are plenty. I’ll take it from there.</p>
            <div className="contact-links" aria-label="Contact links">
              {socialProfiles.map((profile) => (
                <ContactLink key={profile.label} label={profile.label} value={profile.value} />
              ))}
              <ContactLink label="Email" value={contact.email} email />
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate data-reveal>
            <div className="form-row">
              <label htmlFor="name">Name *</label>
              <input id="name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="form-row">
              <label htmlFor="company">Brand or business <span>optional</span></label>
              <input id="company" name="company" type="text" autoComplete="organization" />
            </div>
            <div className="form-row">
              <label htmlFor="service">What do you need? <span>optional</span></label>
              <select
                id="service"
                name="service"
                value={selectedService}
                onChange={(event) => setSelectedService(event.target.value)}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row full">
              <label htmlFor="description">Tell me about your project *</label>
              <textarea id="description" name="description" rows={5} required />
            </div>
            <button className="button button-dark full-button" type="submit">
              SEND A NOTE <span aria-hidden="true">↗</span>
            </button>
            {formStatus.message ? (
              <p className={`form-status ${formStatus.type}`} role={formStatus.type === 'error' ? 'alert' : 'status'}>
                {formStatus.message}
              </p>
            ) : null}
          </form>
        </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div>
          <strong>MEHDI BOUJRA</strong>
          <p>Freelance Graphic Designer</p>
          <p>Based in Marrakech, Morocco</p>
        </div>
        <nav aria-label="Footer">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="footer-connect">
          <p className="footer-connect-label">Let’s connect</p>
          <div className="footer-social">
            {socialProfiles.map((profile) => (
              <ContactLink key={profile.label} label={profile.label} value={profile.value} />
            ))}
            <ContactLink label="Email" value={contact.email} email />
          </div>
        </div>
        <p className="copyright">Copyright {new Date().getFullYear()} Mehdi Boujra. All rights reserved.</p>
      </footer>

      <ProjectModal
        project={selectedProject}
        onClose={closeProject}
        onNavigate={navigateProject}
        triggerRef={projectTriggerRef}
      />
    </>
  );
}

function ContactLink({ label, value, email = false }: { label: string; value: string; email?: boolean }) {
  const placeholder = !value || (!email && value.startsWith('#'));
  const href = email ? `mailto:${value}` : value || '#';

  return (
    <a
      className={`contact-link${placeholder ? ' is-disabled' : ''}`}
      href={href}
      target={!email && !placeholder ? '_blank' : undefined}
      rel={!email && !placeholder ? 'noreferrer' : undefined}
      aria-label={`${label}${placeholder ? ' profile link placeholder' : ''}`}
      aria-disabled={placeholder || undefined}
      data-tooltip={label}
      onClick={placeholder ? (event) => event.preventDefault() : undefined}
    >
      <SocialIcon label={label} />
    </a>
  );
}

function SocialIcon({ label }: { label: string }) {
  const commonProps = {
    className: 'social-icon',
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true as const
  };

  switch (label) {
    case 'Email':
      return (
        <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg {...commonProps} fill="currentColor">
          <circle cx="6.2" cy="6.2" r="1.8" />
          <rect x="4.6" y="9.2" width="3.3" height="10.3" rx="0.6" />
          <path d="M10 9.2h3.2v1.5c.8-1.1 1.9-1.8 3.5-1.8 3 0 4.1 1.9 4.1 5v5.6h-3.4v-5c0-1.7-.4-2.7-1.8-2.7-1.5 0-2.1 1.1-2.1 2.9v4.8H10z" />
        </svg>
      );
    case 'Behance':
      return (
        <svg {...commonProps} fill="currentColor">
          <text x="1.5" y="17.5" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="700" letterSpacing="-1.5">Bē</text>
        </svg>
      );
    case 'WhatsApp':
      return (
        <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.1 11.7a8.1 8.1 0 0 1-11.9 7.1L4 20l1.2-4.1a8.1 8.1 0 1 1 14.9-4.2Z" />
          <path d="M9.1 8.3c.2-.4.5-.5.8-.5h.4c.2 0 .3.1.4.3l.8 1.8c.1.2.1.4-.1.6l-.6.6c-.1.1-.2.3-.1.5.5.8 1.2 1.5 2 2 .2.1.4.1.5 0l.6-.6c.2-.2.4-.2.6-.1l1.8.8c.2.1.3.3.3.5 0 .3-.1.8-.4 1.1-.4.4-.9.6-1.6.5-1.7-.3-3.3-1.4-4.5-2.7-1.1-1.3-1.7-2.6-1.7-3.4 0-.6.2-1.1.8-1.4Z" />
        </svg>
      );
    default:
      return null;
  }
}

function ServiceIcon({ icon }: { icon: Service['icon'] }) {
  const commonProps = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true
  };

  switch (icon) {
    case 'brand':
      return (
        <svg className="service-icon" {...commonProps}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
          <circle cx="17" cy="17" r="3.5" />
        </svg>
      );
    case 'package':
      return (
        <svg className="service-icon" {...commonProps}>
          <path d="m3 7 9-4 9 4-9 4-9-4Z" />
          <path d="M3 7v10l9 4 9-4V7" />
          <path d="M12 11v10M7.5 5l9 4" />
        </svg>
      );
    case 'print':
      return (
        <svg className="service-icon" {...commonProps}>
          <path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
          <path d="M14 3.5v4h4M8 12h8M8 15.5h8M8 19h4" />
        </svg>
      );
    case 'digital':
      return (
        <svg className="service-icon" {...commonProps}>
          <rect x="3" y="4" width="18" height="13" rx="1.5" />
          <path d="M8 21h8M12 17v4M7 13h4l2-4 2 4h2" />
        </svg>
      );
    case 'campaign':
      return (
        <svg className="service-icon" {...commonProps}>
          <path d="m4 10 12-5v14L4 14v-4Z" />
          <path d="M16 8h2a3 3 0 0 1 0 6h-2M7 15l2 5h3l-1.5-4.5M20 8l2-2M20 16l2 2" />
        </svg>
      );
    case 'art':
      return (
        <svg className="service-icon" {...commonProps}>
          <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="m14.5 9.5 3-3" />
        </svg>
      );
    default:
      return null;
  }
}

function ProcessIcon({ icon }: { icon: ProcessStep['icon'] }) {
  const commonProps = {
    className: 'process-icon',
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true
  };

  switch (icon) {
    case 'compass':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2.6 4.4-4.4 2.6 2.6-4.4 4.4-2.6Z" />
        </svg>
      );
    case 'pencil':
      return (
        <svg {...commonProps}>
          <path d="m15 5 4 4M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
          <path d="M13 7l4 4" />
        </svg>
      );
    case 'check':
      return (
        <svg {...commonProps}>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
          <path d="M14 3v6h6M8 15l2.5 2.5L16 12" />
        </svg>
      );
    case 'message':
      return (
        <svg {...commonProps}>
          <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-4.9a9 9 0 1 1 16.1-4.6Z" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      );
    default:
      return null;
  }
}

export default App;
