import studioImage from '../assets/marrakech-studio.jpg';
import zaynaImage from '../assets/project-zayna-photo.jpg';
import ouiImage from '../assets/project-oui-photo.jpg';
import ouiIdentityBoard from '../assets/oui-design-identity.jpg';
import ouiCoverImage from '../assets/oui-design-cover.jpg';
import maisonAtlasIdentity from '../assets/maison-atlas-identity.jpg';
import maisonAtlasCover from '../assets/maison-atlas-cover.jpg';
import maisonAtlasPoolParty from '../assets/posters/maison-atlas-pool-party.jpg';
import maisonAtlasAfterDark from '../assets/posters/maison-atlas-after-dark.jpg';
import maisonAtlasRooftopSessions from '../assets/posters/maison-atlas-rooftop-sessions.jpg';
import casablancaBirthdayBash from '../assets/posters/casablanca-birthday-bash.jpg';
import casablancaClubNight from '../assets/posters/casablanca-club-night.jpg';
import casablancaViernes from '../assets/posters/casablanca-viernes-guachafita.jpg';
import businessPlanWorkshop from '../assets/posters/business-plan-workshop.jpg';
import alfadilaBabyShower from '../assets/posters/alfadila-baby-shower.jpg';
import alfadilaCommunityBabyShower from '../assets/posters/alfadila-community-baby-shower.jpg';
import alfadilaDisabilityGala from '../assets/posters/alfadila-disability-gala.jpg';
import alfadilaGrantWorkshop from '../assets/posters/alfadila-grant-workshop.jpg';
import alfadilaRevertIftar from '../assets/posters/alfadila-revert-iftar.jpg';
import alfadilaTenantRights from '../assets/posters/alfadila-tenant-rights.jpg';
import perfumeImage from '../assets/project-perfume-photo.jpg';
import digitalImage from '../assets/project-digital-photo.jpg';
import eventPostersImage from '../assets/project-event-posters-photo.jpg';

export type ProjectGalleryItem = {
  title: string;
  image: string;
  alt: string;
};

export type ProjectGalleryGroup = {
  title: string;
  items: ProjectGalleryItem[];
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  type: string;
  image: string;
  alt: string;
  coverImage?: string;
  coverAlt?: string;
  coverPosition?: string;
  presentationImage?: string;
  presentationAlt?: string;
  presentationCount?: number;
  presentationHeading?: string;
  galleryHeading?: string;
  galleryGroups?: ProjectGalleryGroup[];
  brief: string;
  direction: string;
  deliverables: string[];
  palette: { name: string; value: string }[];
};

export type Service = {
  icon: 'brand' | 'package' | 'print' | 'digital' | 'campaign' | 'art';
  title: string;
  summary: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
  icon: 'compass' | 'pencil' | 'check' | 'message';
};

export const assets = {
  studioImage,
  heroPackaging: zaynaImage,
  heroIdentity: ouiIdentityBoard,
  heroCampaign: maisonAtlasPoolParty,
  serviceIdentity: maisonAtlasIdentity,
  serviceDigital: digitalImage,
  servicePackaging: perfumeImage,
  processImage: studioImage
};

export const contact = {
  email: 'mehdiboujra@icloud.com',
  linkedin: '#ADD_LINKEDIN_URL',
  behance: '#ADD_BEHANCE_URL',
  whatsapp: 'https://wa.me/212623719904'
};

export const services: Service[] = [
  {
    icon: 'brand',
    title: 'Brand Identity',
    summary: 'A clear story and a system built to grow.'
  },
  {
    icon: 'package',
    title: 'Packaging Design',
    summary: 'Shelf-ready design with a point of view.'
  },
  {
    icon: 'print',
    title: 'Print Design',
    summary: 'Menus, posters and pages worth keeping.'
  },
  {
    icon: 'digital',
    title: 'Digital Design',
    summary: 'Flexible, useful experiences across screens.'
  },
  {
    icon: 'campaign',
    title: 'Campaigns & Posters',
    summary: 'Ideas that carry across formats.'
  },
  {
    icon: 'art',
    title: 'Art Direction',
    summary: 'One visual language, made to hold together.'
  }
];

export const projects: Project[] = [
  {
    id: 'zayna',
    number: '01',
    title: 'ZAYNA',
    category: 'Beauty · Identity & packaging',
    type: 'Self-initiated concept',
    image: zaynaImage,
    alt: 'Zayna concept packaging and skincare identity mockup',
    brief: 'A beauty label built around botanical care and quiet confidence.',
    direction: 'Warm materials, dark glass and a small hit of rose.',
    deliverables: ['Identity', 'Packaging', 'Art direction'],
    palette: [
      { name: 'Cocoa', value: '#38271c' },
      { name: 'Honey', value: '#c59a62' },
      { name: 'Petal', value: '#cf6473' },
      { name: 'Porcelain', value: '#f0e3cf' }
    ]
  },
  {
    id: 'oui-design',
    number: '02',
    title: 'OUI DESIGN',
    category: 'Architecture · Visual identity',
    type: 'Brand identity',
    image: ouiImage,
    alt: 'OUI Design identity mockup set within a contemporary architecture scene',
    coverImage: ouiCoverImage,
    coverAlt: 'OUI Design identity applied to a contemporary villa beside a reflecting pool',
    coverPosition: 'center 56%',
    presentationImage: ouiIdentityBoard,
    presentationAlt: 'OUI Design identity board with logo variations, colors, typography, stationery, catalogues, project presentations, workwear, construction signage, vehicle branding, website, and social media',
    presentationCount: 12,
    presentationHeading: 'One mark. Twelve touchpoints.',
    brief: 'Architecture, with comfort at its core.',
    direction: 'DESIGN · INNOVATION · CONFORT',
    deliverables: ['Logo & identity system', 'Print & project documents', 'Workwear & vehicle branding', 'Website & social media'],
    palette: [
      { name: 'Warm ivory', value: '#F4EFE7' },
      { name: 'Deep charcoal', value: '#2A2D2D' },
      { name: 'Soft sand', value: '#D7C7AC' },
      { name: 'Muted bronze', value: '#B8925F' }
    ]
  },
  {
    id: 'maison-atlas',
    number: '03',
    title: 'MAISON ATLAS',
    category: 'Hospitality · Visual identity',
    type: 'Brand identity',
    image: maisonAtlasCover,
    alt: 'Maison Atlas crest and wordmark above a palm-lined private club courtyard in Marrakech',
    coverImage: maisonAtlasCover,
    coverAlt: 'Maison Atlas crest and wordmark centered above a palm-lined private club courtyard in Marrakech',
    coverPosition: 'center center',
    presentationImage: maisonAtlasIdentity,
    presentationAlt: 'Maison Atlas identity board showing the private club story, crest and logo variations, color palette, typography, stationery, membership, packaging, signage, environment, campaign and digital design',
    presentationCount: 11,
    presentationHeading: 'One crest. Eleven touchpoints.',
    brief: 'A private club rooted in Moroccan heritage.',
    direction: 'HOSPITALITY · HERITAGE · COMMUNITY',
    deliverables: ['Logo & identity system', 'Stationery & membership', 'Packaging & signage', 'Digital & campaigns'],
    palette: [
      { name: 'Dark sienna', value: '#381517' },
      { name: 'Soft tan', value: '#C09B69' },
      { name: 'Timber wolf', value: '#E5D5C1' },
      { name: 'Pine tree', value: '#2A3326' }
    ]
  },
  {
    id: 'event-posters',
    number: '04',
    title: 'POSTERS & CAMPAIGNS',
    category: 'Events · Poster design',
    type: 'Selected client work',
    image: maisonAtlasPoolParty,
    alt: 'Maison Atlas Pool Party poster with a sunset courtyard, palm trees and a DJ set',
    galleryHeading: 'Thirteen posters. Four distinct worlds.',
    brief: 'Different audiences. One clear idea at a glance.',
    direction: 'Make the moment impossible to miss.',
    deliverables: ['Hospitality & nightlife', 'Community events', 'Workshops & fundraisers', 'Print & campaign artwork'],
    palette: [],
    galleryGroups: [
      {
        title: 'Maison Atlas',
        items: [
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
        ]
      },
      {
        title: 'Casablanca Nightclub',
        items: [
          {
            title: 'Birthday Bash',
            image: casablancaBirthdayBash,
            alt: 'Casablanca Nightclub Birthday Bash poster with two performers and gold lettering'
          },
          {
            title: 'Club Night',
            image: casablancaClubNight,
            alt: 'Purple Casablanca Nightclub event poster for a guest DJ and bottle promotion'
          },
          {
            title: 'Viernes de Guachafita',
            image: casablancaViernes,
            alt: 'Red Viernes de Guachafita nightclub flyer with a featured performer'
          }
        ]
      },
      {
        title: 'Alfadila Community Services',
        items: [
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
            title: 'Grant Management Workshop',
            image: alfadilaGrantWorkshop,
            alt: 'Grant Management Workshop poster with a group photo and coral geometric artwork'
          },
          {
            title: 'Annual Revert Iftar',
            image: alfadilaRevertIftar,
            alt: 'Annual Revert Iftar community event poster with a collage of attendees'
          },
          {
            title: 'Tenant’s Rights',
            image: alfadilaTenantRights,
            alt: 'Tenant’s Rights information session poster in teal and green'
          }
        ]
      },
      {
        title: 'Workshop',
        items: [
          {
            title: 'Business Plan',
            image: businessPlanWorkshop,
            alt: 'Business Plan workshop poster with speaker Taoufiq Lakhssass'
          }
        ]
      }
    ]
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    summary: 'We define your goals, audience and scope.',
    icon: 'compass'
  },
  {
    number: '02',
    title: 'Design',
    summary: 'I explore concepts and develop the visual direction.',
    icon: 'pencil'
  },
  {
    number: '03',
    title: 'Refine',
    summary: 'We review, iterate and fine-tune the details.',
    icon: 'message'
  },
  {
    number: '04',
    title: 'Deliver',
    summary: 'You receive final files, ready to use and grow.',
    icon: 'check'
  }
];
