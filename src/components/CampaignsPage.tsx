import { useEffect, useRef, useState, type MouseEvent } from 'react';
import maisonAtlasAfterDark from '../assets/posters/maison-atlas-after-dark.jpg';
import maisonAtlasPoolParty from '../assets/posters/maison-atlas-pool-party.jpg';
import maisonAtlasRooftopSessions from '../assets/posters/maison-atlas-rooftop-sessions.jpg';
import casablancaBirthdayBash from '../assets/posters/casablanca-birthday-bash.jpg';
import casablancaClubNight from '../assets/posters/casablanca-club-night.jpg';
import casablancaViernes from '../assets/posters/casablanca-viernes-guachafita.jpg';
import businessPlanWorkshop from '../assets/posters/business-plan-workshop.jpg';
import alfadilaBabyShower from '../assets/posters/alfadila-baby-shower.jpg';
import alfadilaCommunityBabyShower from '../assets/posters/alfadila-community-baby-shower.jpg';
import alfadilaDisabilityGala from '../assets/posters/alfadila-disability-gala.jpg';
import alfadilaTenantRights from '../assets/posters/alfadila-tenant-rights.jpg';
import studioImage from '../assets/marrakech-studio.jpg';
import { useReveal } from '../hooks/useReveal';

type Poster = {
  title: string;
  image: string;
  alt: string;
};

const nightlifePosters: Poster[] = [
  {
    title: 'Birthday Bash',
    image: casablancaBirthdayBash,
    alt: 'Casablanca Nightclub Birthday Bash poster with two performers and gold lettering'
  },
  {
    title: 'Viernes de Guachafita',
    image: casablancaViernes,
    alt: 'Red Viernes de Guachafita nightclub flyer with a featured performer'
  },
  {
    title: 'Club Night',
    image: casablancaClubNight,
    alt: 'Purple Casablanca Nightclub event poster for a guest DJ and bottle promotion'
  }
];

const commercialPoster: Poster = {
  title: 'Business Plan Workshop',
  image: businessPlanWorkshop,
  alt: 'Business Plan workshop poster with speaker Taoufiq Lakhssass'
};

const associationPosters: Poster[] = [
  {
    title: 'Community Baby Shower',
    image: alfadilaBabyShower,
    alt: 'Teal and yellow Alfadila Community Services baby shower event poster'
  },
  {
    title: 'Baby Shower',
    image: alfadilaCommunityBabyShower,
    alt: 'Purple illustrated Alfadila Community Services baby shower poster'
  },
  {
    title: 'Disability Fundraising Gala',
    image: alfadilaDisabilityGala,
    alt: 'Disability Fundraising Gala poster with a disco theme and community portrait'
  },
  {
    title: 'Tenant’s Rights',
    image: alfadilaTenantRights,
    alt: 'Tenant’s Rights information session poster in teal and green'
  }
];

const maisonPosters: Poster[] = [
  {
    title: 'Pool Party',
    image: maisonAtlasPoolParty,
    alt: 'Pool Party event poster for Maison Atlas in Marrakech, set against a sunset poolside scene'
  },
  {
    title: 'Atlas After Dark',
    image: maisonAtlasAfterDark,
    alt: 'Atlas After Dark poster for Maison Atlas, featuring a rooftop gathering at sunset'
  },
  {
    title: 'Rooftop Sessions',
    image: maisonAtlasRooftopSessions,
    alt: 'Rooftop Sessions event poster for Maison Atlas with Marrakech views and a poolside DJ'
  }
];

export function CampaignsPage() {
  const [activePoster, setActivePoster] = useState<Poster | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useReveal();

  useEffect(() => {
    if (!activePoster) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActivePoster(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      triggerRef.current?.focus();
    };
  }, [activePoster]);

  const openPoster = (poster: Poster, event: MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = event.currentTarget;
    setActivePoster(poster);
  };

  return (
    <div className="campaigns-page">
      <section className="campaigns-hero section-pad" aria-labelledby="campaigns-title">
        <div className="campaigns-hero-copy" data-reveal>
          <a className="campaigns-back" href="#work">
            <span aria-hidden="true">←</span> Back to projects
          </a>
          <h1 id="campaigns-title">
            Campaigns<br />
            <em>&amp;</em> Posters.
          </h1>
          <p>Bold visual campaigns and posters that communicate ideas with impact.</p>
          <dl className="campaigns-facts" aria-label="Campaigns and posters overview">
            <div>
              <dt>11</dt>
              <dd>Pieces</dd>
            </div>
            <div>
              <dt>04</dt>
              <dd>Categories</dd>
            </div>
          </dl>
        </div>

        <div className="campaigns-hero-art" data-reveal>
          <span className="campaigns-orbit campaigns-orbit--top" aria-hidden="true" />
          <span className="campaigns-orbit campaigns-orbit--bottom" aria-hidden="true" />
          <span className="campaigns-paper campaigns-paper--one" aria-hidden="true" />
          <span className="campaigns-paper campaigns-paper--two" aria-hidden="true" />
          <button
            className="campaigns-hero-poster"
            type="button"
            onClick={(event) => openPoster(nightlifePosters[1], event)}
            aria-label="View Viernes de Guachafita poster larger"
          >
            <img src={nightlifePosters[1].image} alt={nightlifePosters[1].alt} />
          </button>
          <p className="campaigns-art-note">Selected<br />print work</p>
        </div>
      </section>

      <section className="campaigns-story campaigns-story--nightlife section-pad" aria-labelledby="nightlife-title">
        <div className="campaigns-story-copy" data-reveal>
          <p className="eyebrow line-label">Nightlife</p>
          <h2 id="nightlife-title">Events<br />that <em>hit.</em></h2>
          <p>Vibrant visuals for unforgettable nights.</p>
          <a className="campaigns-text-link" href="#nightlife-posters">View projects <span aria-hidden="true">↗</span></a>
        </div>
        <div id="nightlife-posters" className="poster-trio poster-trio--nightlife" data-reveal>
          {nightlifePosters.map((poster, index) => (
            <PosterCard key={poster.title} poster={poster} className={`poster-trio-card poster-trio-card--${index + 1}`} onOpen={openPoster} />
          ))}
        </div>
      </section>

      <section className="campaigns-story campaigns-story--commercial section-pad" aria-labelledby="commercial-title">
        <PosterCard poster={commercialPoster} className="commercial-poster" onOpen={openPoster} reveal id="commercial-poster" />
        <div className="campaigns-story-copy campaigns-story-copy--right" data-reveal>
          <p className="eyebrow line-label">Commercial</p>
          <h2 id="commercial-title">Brands<br />in <em>style.</em></h2>
          <p>Eye-catching designs for businesses and shops.</p>
          <a className="campaigns-text-link" href="#commercial-poster">View project <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="campaigns-story campaigns-story--association section-pad" aria-labelledby="association-title">
        <div className="campaigns-story-copy" data-reveal>
          <p className="eyebrow line-label">Association</p>
          <h2 id="association-title">Together<br />for a bigger<br /><em>impact.</em></h2>
          <p>Designs that inform, engage and unite.</p>
          <a className="campaigns-text-link" href="#association-posters">View projects <span aria-hidden="true">↗</span></a>
        </div>
        <div id="association-posters" className="association-display" data-reveal>
          <PosterCard poster={associationPosters[3]} className="association-standing" onOpen={openPoster} />
          <div className="association-grid">
            {associationPosters.slice(0, 3).map((poster) => (
              <PosterCard key={poster.title} poster={poster} className="association-card" onOpen={openPoster} />
            ))}
          </div>
        </div>
      </section>

      <section className="campaigns-story campaigns-story--maison section-pad" aria-labelledby="maison-title">
        <div id="maison-posters" className="poster-trio poster-trio--maison" data-reveal>
          {maisonPosters.map((poster, index) => (
            <PosterCard key={poster.title} poster={poster} className={`poster-trio-card poster-trio-card--${index + 1}`} onOpen={openPoster} />
          ))}
        </div>
        <div className="campaigns-story-copy campaigns-story-copy--right" data-reveal>
          <p className="eyebrow line-label">Maison Atlas</p>
          <h2 id="maison-title">Events<br />with <em>elegance.</em></h2>
          <p>Sophisticated visuals for exclusive experiences.</p>
          <a className="campaigns-text-link" href="#maison-posters">View projects <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="campaigns-closing" aria-labelledby="campaigns-closing-title">
        <img src={studioImage} alt="Hands sketching on paper in a warm studio" loading="lazy" />
        <div className="campaigns-closing-shade" aria-hidden="true" />
        <div className="campaigns-closing-inner">
          <h2 id="campaigns-closing-title">Let’s bring your<br />next <em>campaign</em> to life.</h2>
          <a className="campaigns-closing-button" href="#contact">Start a project <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      {activePoster ? (
        <div className="poster-lightbox" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActivePoster(null)}>
          <div className="poster-lightbox-dialog" role="dialog" aria-modal="true" aria-label={`${activePoster.title} full-size poster`}>
            <button className="poster-lightbox-close" type="button" onClick={() => setActivePoster(null)} ref={closeRef} aria-label="Close poster preview">
              <span aria-hidden="true">×</span>
            </button>
            <img src={activePoster.image} alt={activePoster.alt} />
            <p>{activePoster.title}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type PosterCardProps = {
  poster: Poster;
  className: string;
  onOpen: (poster: Poster, event: MouseEvent<HTMLButtonElement>) => void;
  reveal?: boolean;
  id?: string;
};

function PosterCard({ poster, className, onOpen, reveal = false, id }: PosterCardProps) {
  return (
    <button
      id={id}
      className={`poster-card ${className}`}
      type="button"
      onClick={(event) => onOpen(poster, event)}
      aria-label={`View ${poster.title} poster larger`}
      data-reveal={reveal || undefined}
    >
      <img src={poster.image} alt={poster.alt} loading="lazy" />
      <span className="poster-card-view" aria-hidden="true">View <b>↗</b></span>
    </button>
  );
}
