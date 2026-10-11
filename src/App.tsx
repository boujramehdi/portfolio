import { FormEvent, useCallback, useMemo, useState } from 'react';
import { ProjectModal } from './components/ProjectModal';
import { assets, contact, processSteps, projects, services, type Project, type Service } from './data/site';
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: 'idle', message: '' });

  useReveal();

  const serviceOptions = useMemo(() => services.map((service) => service.title), []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const budget = String(formData.get('budget') || '').trim();
    const description = String(formData.get('description') || '').trim();

    if (!name || !email || !company || !service || !description) {
      setFormStatus({
        type: 'error',
        message: 'Please complete every required field before sending your inquiry.'
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    if (!contact.email) {
      setFormStatus({
        type: 'error',
        message: "Mehdi's email has not been added yet. Add it in src/data/site.ts to enable the mailto inquiry."
      });
      return;
    }

    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company or brand: ${company}`,
        `Service required: ${service}`,
        budget ? `Estimated budget: ${budget}` : 'Estimated budget: Not provided',
        '',
        'Project description:',
        description
      ].join('\n')
    );

    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setFormStatus({
      type: 'success',
      message: 'Opening your email app with the project inquiry prepared.'
    });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Mehdi Boujra home" onClick={closeMenu}>
          MEHDI BOUJRA*
        </a>
        <button
          className="nav-toggle"
          type="button"
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
            LET'S WORK TOGETHER <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow dot-label">Freelance graphic designer</p>
            <h1 id="hero-title">
              BRANDS
              <span>WITH PURPOSE</span>
              <em>AND IMPACT.</em>
            </h1>
            <p className="hero-lede">
              I create distinctive brand identities, packaging and visual experiences for ambitious businesses.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button button-dark" href="#work">
                VIEW MY WORK <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-quiet" href="#contact">
                LET'S TALK
              </a>
            </div>
            <dl className="hero-highlights">
              <div>
                <dt>Brand</dt>
                <dd>Identity</dd>
              </div>
              <div>
                <dt>Packaging</dt>
                <dd>&amp; Print</dd>
              </div>
              <div>
                <dt>Digital</dt>
                <dd>Design</dd>
              </div>
              <div>
                <dt>Campaigns</dt>
                <dd>&amp; Posters</dd>
              </div>
              <div>
                <dt>Art</dt>
                <dd>Direction</dd>
              </div>
            </dl>
          </div>
          <figure className="hero-media" data-reveal>
            <img src={assets.heroImage} alt="Warm Marrakech studio interior with Moroccan architectural details" />
            <figcaption>
              <span>Ideas</span>
              <span>Brands</span>
              <span>Visuals</span>
              <span>Results</span>
            </figcaption>
            <a className="scroll-cue" href="#work">
              Scroll <span aria-hidden="true">↓</span>
            </a>
          </figure>
        </section>

        <section id="work" className="work section-pad" aria-labelledby="work-title">
          <div className="work-heading" data-reveal>
            <div>
              <p className="eyebrow line-label">Featured Work</p>
              <h2 id="work-title">Selected concept projects and visual systems.</h2>
            </div>
            <a className="view-all" href="#contact">
              View all projects <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id} data-reveal>
                <button type="button" onClick={() => setSelectedProject(project)} className="project-image-button" aria-label={`View ${project.title} project`}>
                  <img src={project.image} alt={project.alt} loading="lazy" />
                  <span className="project-overlay" aria-hidden="true">
                    <span className="project-number">{project.number}</span>
                    <span className="project-name">{project.title}</span>
                    <span className="project-category">{project.category}</span>
                    <span className="project-type">{project.type}</span>
                    <span className="project-view">VIEW PROJECT ↗</span>
                  </span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="services section-pad" aria-labelledby="services-title">
          <div className="services-layout">
            <div className="services-title" data-reveal>
              <p className="eyebrow line-label">Services</p>
              <h2 id="services-title">
                Everything you need to build a strong visual identity <span aria-hidden="true">.</span>
              </h2>
            </div>
            <div className="service-list">
              {services.map((service) => (
                <article className="service-item" key={service.title} data-reveal>
                  <ServiceIcon icon={service.icon} />
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about section-pad" aria-labelledby="about-title">
          <div className="about-media" data-reveal>
            <img src={assets.portraitImage} alt="Editorial portrait placeholder for Mehdi Boujra" loading="lazy" />
          </div>
          <div className="about-copy" data-reveal>
            <p className="eyebrow">About</p>
            <h2 id="about-title">Independent design shaped by strategy, typography and atmosphere.</h2>
            <p>
              I help ambitious businesses turn ideas into distinctive visual identities. My approach combines strategic
              thinking, thoughtful typography, and considered art direction to create design that feels memorable,
              coherent, and ready for the real world.
            </p>
            <p>
              Based in Marrakech, Morocco, I build brand visuals that feel intentional across packaging, print, campaign
              systems and digital touchpoints.
            </p>
          </div>
        </section>

        <section className="process section-pad" aria-labelledby="process-title">
          <div className="process-heading" data-reveal>
            <p className="eyebrow line-label">My Process</p>
            <h2 id="process-title">A clear path from first idea to final files.</h2>
          </div>
          <div className="process-grid">
            {processSteps.map((step) => (
              <article className="process-step" key={step.title} data-reveal>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="conversion section-pad" aria-labelledby="conversion-title">
          <div className="conversion-background" aria-hidden="true">
            <img src={assets.heroImage} alt="" loading="lazy" />
          </div>
          <div className="conversion-copy" data-reveal>
            <p className="eyebrow dot-label">Design philosophy</p>
            <h2 id="conversion-title">“Distinctive design should feel clear, intentional and ready to live in the real world.”</h2>
            <p>
              Have a project in mind? Tell me what you're building, and let's create something distinctive together.
            </p>
          </div>
          <div className="conversion-panel" data-reveal>
            <p>
              Useful design is more than decoration. It gives a business a visual language people can recognize, trust
              and remember.
            </p>
            <a className="button button-light" href="#contact">
              GET IN TOUCH <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section id="contact" className="contact section-pad" aria-labelledby="contact-title">
          <div className="contact-intro" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Tell me what you are building.</h2>
            <p>
              Share the essentials: the brand, the service you need, the timing and what the design has to achieve.
            </p>
            <div className="contact-links" aria-label="Contact links">
              <ContactLink label="Email" value={contact.email} email />
              <ContactLink label="Behance" value={contact.behance} />
              <ContactLink label="Instagram" value={contact.instagram} />
              <ContactLink label="LinkedIn" value={contact.linkedin} />
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
              <label htmlFor="company">Company or brand *</label>
              <input id="company" name="company" type="text" autoComplete="organization" required />
            </div>
            <div className="form-row">
              <label htmlFor="service">Service required *</label>
              <select id="service" name="service" required defaultValue="">
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
            <div className="form-row">
              <label htmlFor="budget">Estimated budget, optional</label>
              <input id="budget" name="budget" type="text" inputMode="text" />
            </div>
            <div className="form-row full">
              <label htmlFor="description">Project description *</label>
              <textarea id="description" name="description" rows={6} required />
            </div>
            <button className="button button-dark full-button" type="submit">
              SEND PROJECT INQUIRY
            </button>
            {formStatus.message ? (
              <p className={`form-status ${formStatus.type}`} role={formStatus.type === 'error' ? 'alert' : 'status'}>
                {formStatus.message}
              </p>
            ) : null}
          </form>
        </section>
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
        <div className="footer-social">
          <ContactLink label="Behance" value={contact.behance} />
          <ContactLink label="Instagram" value={contact.instagram} />
          <ContactLink label="LinkedIn" value={contact.linkedin} />
        </div>
        <p className="copyright">Copyright {new Date().getFullYear()} Mehdi Boujra. All rights reserved.</p>
      </footer>

      <ProjectModal project={selectedProject} onClose={closeProject} />
    </>
  );
}

function ContactLink({ label, value, email = false }: { label: string; value: string; email?: boolean }) {
  if (!value) {
    return (
      <span className="contact-link is-disabled" aria-disabled="true">
        {label} TBC
      </span>
    );
  }

  return (
    <a className="contact-link" href={email ? `mailto:${value}` : value} target={email ? undefined : '_blank'} rel="noreferrer">
      {label}
    </a>
  );
}

function ServiceIcon({ icon }: { icon: Service['icon'] }) {
  const commonProps = {
    width: 32,
    height: 32,
    viewBox: '0 0 32 32',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true
  };

  switch (icon) {
    case 'brand':
      return (
        <svg className="service-icon" {...commonProps}>
          <path d="M16 4l4.5 7.5L28 16l-7.5 4.5L16 28l-4.5-7.5L4 16l7.5-4.5L16 4z" />
          <path d="M16 10l2.2 3.8L22 16l-3.8 2.2L16 22l-2.2-3.8L10 16l3.8-2.2L16 10z" />
        </svg>
      );
    case 'package':
      return (
        <svg className="service-icon" {...commonProps}>
          <path d="M8 11l8-4 8 4-8 4-8-4z" />
          <path d="M8 11v10l8 4 8-4V11" />
          <path d="M16 15v10" />
        </svg>
      );
    case 'print':
      return (
        <svg className="service-icon" {...commonProps}>
          <path d="M10 5h12v8H10z" />
          <path d="M8 13h16a3 3 0 013 3v7h-5v4H10v-4H5v-7a3 3 0 013-3z" />
          <path d="M10 21h12" />
        </svg>
      );
    case 'digital':
      return (
        <svg className="service-icon" {...commonProps}>
          <rect x="5" y="7" width="22" height="15" rx="2" />
          <path d="M12 27h8M16 22v5" />
          <path d="M9 17h5l2-4 2 4h5" />
        </svg>
      );
    case 'campaign':
      return (
        <svg className="service-icon" {...commonProps}>
          <path d="M8 20l11-10 5 12-5-2-5 6-3-3 5-6-8 3z" />
          <path d="M21 8l4-3M24 13h4M17 6V3" />
        </svg>
      );
    case 'art':
      return (
        <svg className="service-icon" {...commonProps}>
          <path d="M16 4c5 5 7.5 9 7.5 13.5a7.5 7.5 0 01-15 0C8.5 13 11 9 16 4z" />
          <path d="M16 9v18" />
          <path d="M12 18h8" />
        </svg>
      );
    default:
      return null;
  }
}

export default App;
