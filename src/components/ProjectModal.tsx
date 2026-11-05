import { useEffect, useRef, type RefObject } from 'react';
import { projects, type Project } from '../data/site';

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
  onNavigate: (offset: number) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

export function ProjectModal({ project, onClose, onNavigate, triggerRef }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const projectIndex = project ? projects.findIndex((item) => item.id === project.id) : -1;
  const nextProject = project ? projects[projectIndex + 1] : undefined;
  const hasPresentation = Boolean(project?.presentationImage);
  const galleryGroups = project?.galleryGroups ?? [];
  const hasGallery = galleryGroups.length > 0;
  const galleryItems = galleryGroups.flatMap((group) => group.items);
  const coverItems = galleryGroups.flatMap((group) => group.items.slice(0, 1)).slice(0, 3);
  const groupOffsets = galleryGroups.map((_, groupIndex) =>
    galleryGroups.slice(0, groupIndex).reduce((total, group) => total + group.items.length, 0)
  );

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    if (dialogRef.current) dialogRef.current.scrollTop = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowRight' && projectIndex < projects.length - 1) {
        event.preventDefault();
        onNavigate(1);
        return;
      }

      if (event.key === 'ArrowLeft' && projectIndex > 0) {
        event.preventDefault();
        onNavigate(-1);
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]')
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      triggerRef.current?.focus();
    };
  }, [project, projectIndex, onClose, onNavigate, triggerRef]);

  if (!project) return null;

  return (
    <div
      className="modal-shell"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article
        className="project-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${project.id}-modal-title`}
        tabIndex={-1}
      >
        <header className="case-nav" aria-label="Project controls">
          <button className="case-back" type="button" onClick={onClose}>
            <span aria-hidden="true">←</span> All work
          </button>
          <p className="case-index">
            <strong>{project.number}</strong><span> / {String(projects.length).padStart(2, '0')}</span>
            <span className="case-index-type"> · {project.type}</span>
          </p>
          <div className="case-nav-actions">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              disabled={projectIndex === 0}
              aria-label="Previous project"
            >
              <span aria-hidden="true">←</span><span className="case-nav-word">Previous</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              disabled={projectIndex === projects.length - 1}
              aria-label="Next project"
            >
              <span className="case-nav-word">Next</span><span aria-hidden="true">→</span>
            </button>
            <button className="case-close" type="button" onClick={onClose} ref={closeRef} aria-label="Close project">
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </header>

        <section
          className={hasGallery ? 'case-cover case-cover-branded case-cover-mosaic' : project.coverImage ? 'case-cover case-cover-branded' : 'case-cover'}
          aria-labelledby={`${project.id}-modal-title`}
        >
          {hasGallery ? (
            <div className="case-cover-gallery" aria-hidden="true">
              {coverItems.map((item) => <img key={item.title} src={item.image} alt="" />)}
            </div>
          ) : (
            <img
              src={project.coverImage ?? project.image}
              alt={project.coverAlt ?? project.alt}
              style={{ objectPosition: project.coverPosition ?? 'center' }}
            />
          )}
          <div className="case-cover-shade" aria-hidden="true" />
          <div className="case-cover-topline">
            <span>{project.type}</span>
            <span>{project.number}</span>
          </div>
          <div className="case-cover-title">
            <p>{project.category}</p>
            <h2 id={`${project.id}-modal-title`}>{project.title}</h2>
          </div>
          <button
            className="case-scroll"
            type="button"
            onClick={() => dialogRef.current?.querySelector('#case-overview')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Scroll to explore <span aria-hidden="true">↓</span>
          </button>
        </section>

        <section id="case-overview" className="case-overview">
          <div className="case-section-label">
            <span>01</span>
            <span>The brief</span>
          </div>
          <div className="case-overview-content">
            <h3>{project.brief}</h3>
            <dl className="case-facts">
              <div>
                <dt>Field</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>
                  {project.presentationCount
                    ? `${project.presentationCount} brand touchpoints`
                    : hasGallery
                      ? `${galleryItems.length} posters · ${galleryGroups.length} collections`
                    : project.deliverables.join(' · ')}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {project.presentationImage && (
          <section className="case-presentation" aria-labelledby={`${project.id}-presentation-title`}>
            <div className="case-presentation-heading">
              <div>
                <div className="case-section-label">
                  <span>02</span>
                  <span>Full identity</span>
                </div>
                <h3 id={`${project.id}-presentation-title`}>
                  {project.presentationHeading ?? 'One identity. Every touchpoint.'}
                </h3>
              </div>
              <a href={project.presentationImage} target="_blank" rel="noreferrer">
                View full board <span aria-hidden="true">↗</span>
              </a>
            </div>
            <figure className="case-presentation-figure">
              <img
                src={project.presentationImage}
                alt={project.presentationAlt ?? `${project.title} identity presentation`}
                loading="eager"
                decoding="async"
              />
              <figcaption>
                <span>{project.title}</span>
                <span>Visual identity · Complete presentation</span>
              </figcaption>
            </figure>
          </section>
        )}

        {hasGallery && (
          <section className="case-poster-showcase" aria-labelledby={`${project.id}-gallery-title`}>
            <div className="case-presentation-heading">
              <div>
                <div className="case-section-label">
                  <span>02</span>
                  <span>Selected posters</span>
                </div>
                <h3 id={`${project.id}-gallery-title`}>
                  {project.galleryHeading ?? 'A closer look at the campaigns.'}
                </h3>
              </div>
              <span className="case-gallery-total">
                {String(galleryItems.length).padStart(2, '0')} pieces <span aria-hidden="true">/</span> {String(galleryGroups.length).padStart(2, '0')} collections
              </span>
            </div>

            <nav className="case-poster-index" aria-label="Jump to a poster collection">
              {galleryGroups.map((group, groupIndex) => (
                <button
                  key={group.title}
                  type="button"
                  onClick={() => document.getElementById(`${project.id}-collection-${groupIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  <span className="case-poster-index-number">0{groupIndex + 1}</span>
                  <span className="case-poster-index-title">{group.title}</span>
                  <span className="case-poster-index-count">{String(group.items.length).padStart(2, '0')}</span>
                </button>
              ))}
            </nav>

            <div className="case-poster-groups">
              {galleryGroups.map((group, groupIndex) => (
                <section
                  className="case-poster-group"
                  key={group.title}
                  id={`${project.id}-collection-${groupIndex}`}
                  aria-labelledby={`${project.id}-gallery-group-${groupIndex}`}
                >
                  <header className="case-poster-group-heading">
                    <div className="case-section-label">
                      <span>{String(groupIndex + 1).padStart(2, '0')}</span>
                      <span>{String(group.items.length).padStart(2, '0')} posters</span>
                    </div>
                    <h4 id={`${project.id}-gallery-group-${groupIndex}`}>{group.title}</h4>
                  </header>
                  <div className="case-poster-grid" data-count={group.items.length}>
                    {group.items.map((item, itemIndex) => {
                      return (
                        <figure className="case-poster-card" key={item.title}>
                          <a href={item.image} target="_blank" rel="noreferrer" aria-label={`Open full poster: ${item.title}`}>
                            <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                            <span className="case-poster-open" aria-hidden="true">↗</span>
                          </a>
                          <figcaption>
                            <span>{String(groupOffsets[groupIndex] + itemIndex + 1).padStart(2, '0')}</span>
                            <strong>{item.title}</strong>
                          </figcaption>
                        </figure>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </section>
        )}

        {hasPresentation ? (
          <section className="case-signature" aria-labelledby={`${project.id}-direction-title`}>
            <div className="case-section-label">
              <span>03</span>
              <span>Brand signature</span>
            </div>
            <h3 id={`${project.id}-direction-title`}>{project.direction}</h3>
          </section>
        ) : (
          <section className={hasGallery ? 'case-direction case-direction-compact' : 'case-direction'} aria-labelledby={`${project.id}-direction-title`}>
            <div className="case-direction-heading">
              <div className="case-section-label">
                <span>{hasGallery ? '03' : '02'}</span>
                <span>Creative direction</span>
              </div>
              {!hasGallery && <span className="case-direction-note">A visual language in four tones</span>}
            </div>
            <h3 id={`${project.id}-direction-title`}>{project.direction}</h3>
            {!hasGallery && (
              <div className="case-palette">
                <div className="case-palette-heading">
                  <span>Colour mood</span>
                  <span>01 — 04</span>
                </div>
                <ul>
                  {project.palette.map((swatch, index) => (
                    <li key={swatch.name}>
                      <span className="case-swatch" style={{ backgroundColor: swatch.value }} aria-hidden="true" />
                      <span className="case-swatch-index">0{index + 1}</span>
                      <span className="case-swatch-name">{swatch.name}</span>
                      <span className="case-swatch-value">{swatch.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        <section className="case-scope" aria-labelledby={`${project.id}-scope-title`}>
          <div className="case-section-label">
            <span>{hasPresentation || hasGallery ? '04' : '03'}</span>
            <span id={`${project.id}-scope-title`}>
              {hasPresentation ? 'Across every touchpoint' : hasGallery ? `Across ${galleryGroups.length} collections` : 'Built as a system'}
            </span>
          </div>
          <ol>
            {project.deliverables.map((item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                <strong>{item}</strong>
                <span aria-hidden="true">↗</span>
              </li>
            ))}
          </ol>
          <a className="case-discuss" href="#contact" onClick={onClose}>
            Discuss a similar project <span aria-hidden="true">↗</span>
          </a>
        </section>

        {nextProject ? (
          <button className="case-next" type="button" onClick={() => onNavigate(1)}>
            <img src={nextProject.image} alt="" loading="lazy" />
            <span className="case-next-shade" aria-hidden="true" />
            <span className="case-next-copy">
              <span>Next project · {nextProject.number}</span>
              <strong>{nextProject.title}</strong>
              <span className="case-next-link">Keep exploring <span aria-hidden="true">↗</span></span>
            </span>
          </button>
        ) : (
          <section className="case-endcap">
            <p>Have a project in mind?</p>
            <a href="#contact" onClick={onClose}>
              Let’s make something memorable <span aria-hidden="true">↗</span>
            </a>
          </section>
        )}
      </article>
    </div>
  );
}
