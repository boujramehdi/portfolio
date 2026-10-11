import { useEffect, useRef } from 'react';
import type { Project } from '../data/site';

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  return (
    <div className="modal-shell" role="presentation" onMouseDown={onClose}>
      <section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${project.id}-modal-title`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} ref={closeRef} aria-label="Close project">
          Close
        </button>

        <div className="modal-hero">
          <div>
            <p className="eyebrow">{project.number} / {project.type}</p>
            <h2 id={`${project.id}-modal-title`}>{project.title}</h2>
            <p>{project.category}</p>
          </div>
          <img src={project.image} alt={project.alt} loading="lazy" />
        </div>

        <div className="modal-content">
          <div className="modal-copy">
            <span>Brief</span>
            <p>{project.brief}</p>
          </div>
          <div className="modal-copy">
            <span>Creative Direction</span>
            <p>{project.direction}</p>
          </div>
          <div className="modal-copy">
            <span>Deliverables</span>
            <ul>
              {project.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="modal-gallery" aria-label={`${project.title} image gallery`}>
          {project.gallery.map((item) => (
            <figure key={item.label}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
