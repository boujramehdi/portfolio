import heroImage from '../assets/hero-architecture.jpg';
import portraitImage from '../assets/portrait-placeholder.svg';
import zaynaImage from '../assets/project-zayna-photo.jpg';
import ouiImage from '../assets/project-oui-photo.jpg';
import maisonAtlasImage from '../assets/project-maison-atlas-photo.jpg';
import eventPostersImage from '../assets/project-event-posters-photo.jpg';
import perfumeImage from '../assets/project-perfume-photo.jpg';
import restaurantImage from '../assets/project-restaurant-photo.jpg';
import digitalImage from '../assets/project-digital-photo.jpg';

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  type: string;
  image: string;
  alt: string;
  brief: string;
  direction: string;
  deliverables: string[];
  gallery: {
    label: string;
    image: string;
    alt: string;
  }[];
};

export type Service = {
  icon: 'brand' | 'package' | 'print' | 'digital' | 'campaign' | 'art';
  title: string;
  summary: string;
};

export const assets = {
  heroImage,
  portraitImage
};

export const contact = {
  email: '',
  behance: '',
  instagram: '',
  linkedin: ''
};

export const services: Service[] = [
  {
    icon: 'brand',
    title: 'Brand Identity',
    summary: 'Logos, visual identity and brand guidelines.'
  },
  {
    icon: 'package',
    title: 'Packaging Design',
    summary: 'Product packaging, labels and box design.'
  },
  {
    icon: 'print',
    title: 'Print Design',
    summary: 'Business cards, menus, brochures and posters.'
  },
  {
    icon: 'digital',
    title: 'Digital Design',
    summary: 'Social media, websites and digital assets.'
  },
  {
    icon: 'campaign',
    title: 'Campaigns & Posters',
    summary: 'Event posters, advertising campaigns and visuals.'
  },
  {
    icon: 'art',
    title: 'Art Direction',
    summary: 'Creative direction, photoshoot art direction and visual systems.'
  }
];

export const projects: Project[] = [
  {
    id: 'zayna',
    number: '01',
    title: 'ZAYNA',
    category: 'Beauty & Wellness Identity',
    type: 'Independent Concept',
    image: zaynaImage,
    alt: 'Zayna concept packaging and skincare identity mockup',
    brief:
      'A Moroccan beauty and wellness concept shaped around botanical care, tactile packaging and refined typography.',
    direction:
      'Warm ivory surfaces, deep black contrast and botanical color cues create a calm but memorable skincare world.',
    deliverables: ['Logo direction', 'Packaging system', 'Label design', 'Typography palette', 'Brand applications'],
    gallery: [
      { label: 'Packaging system', image: zaynaImage, alt: 'Zayna packaging system detail' },
      { label: 'Skincare products', image: zaynaImage, alt: 'Zayna skincare product mockup' },
      { label: 'Identity applications', image: zaynaImage, alt: 'Zayna identity applications' }
    ]
  },
  {
    id: 'oui-design',
    number: '02',
    title: 'OUI DESIGN',
    category: 'Architecture & Interiors Brand',
    type: 'Independent Concept',
    image: ouiImage,
    alt: 'Oui Design architecture identity mockup',
    brief:
      'A confident visual identity for an architecture, renovation, interiors and construction brand.',
    direction:
      'Structured grids, precise plan drawings and bold signage give the brand a direct, architectural character.',
    deliverables: ['Identity system', 'Architectural applications', 'Site signage', 'Stationery', 'Print collateral'],
    gallery: [
      { label: 'Identity system', image: ouiImage, alt: 'Oui Design identity system detail' },
      { label: 'Signage direction', image: ouiImage, alt: 'Oui Design signage mockup' },
      { label: 'Stationery', image: ouiImage, alt: 'Oui Design stationery mockup' }
    ]
  },
  {
    id: 'maison-atlas',
    number: '03',
    title: 'MAISON ATLAS',
    category: 'Hospitality & Lifestyle Identity',
    type: 'Independent Concept',
    image: maisonAtlasImage,
    alt: 'Maison Atlas private members club identity mockup',
    brief:
      'A private members club and lifestyle concept in Marrakech with a hospitality-led visual language.',
    direction:
      'A restrained palette, arch-inspired shapes and tactile member materials create a composed sense of place.',
    deliverables: ['Brand identity', 'Membership materials', 'Wayfinding', 'Signage', 'Hospitality atmosphere'],
    gallery: [
      { label: 'Members materials', image: maisonAtlasImage, alt: 'Maison Atlas membership materials' },
      { label: 'Hospitality signage', image: maisonAtlasImage, alt: 'Maison Atlas signage direction' },
      { label: 'Brand atmosphere', image: maisonAtlasImage, alt: 'Maison Atlas hospitality atmosphere' }
    ]
  },
  {
    id: 'event-posters',
    number: '04',
    title: 'EVENT POSTERS',
    category: 'Campaign Artwork Collection',
    type: 'Independent Concept',
    image: eventPostersImage,
    alt: 'Event posters and nightclub flyer concept collection',
    brief:
      'A collection of nightclub flyers, event posters and campaign artwork built for bold recognition.',
    direction:
      'High contrast poster systems, large serif typography and dramatic compositions make each event feel immediate.',
    deliverables: ['Poster series', 'Flyer layouts', 'Campaign artwork', 'Social crops', 'Typography direction'],
    gallery: [
      { label: 'Poster series', image: eventPostersImage, alt: 'Bold event poster series' },
      { label: 'Nightclub flyers', image: eventPostersImage, alt: 'Nightclub flyer design detail' },
      { label: 'Campaign artwork', image: eventPostersImage, alt: 'Campaign artwork detail' }
    ]
  },
  {
    id: 'perfume-campaigns',
    number: '05',
    title: 'PERFUME CAMPAIGNS',
    category: 'Fragrance Advertising',
    type: 'Independent Concept',
    image: perfumeImage,
    alt: 'Luxury fragrance advertising and product photography concept',
    brief:
      'Luxury-inspired fragrance advertising concepts for launch visuals, product photography and social campaigns.',
    direction:
      'Dramatic shadows, restrained copy space and warm highlights create a polished campaign mood.',
    deliverables: ['Product visuals', 'Advertising concepts', 'Social campaign assets', 'Promotional layouts', 'Art direction'],
    gallery: [
      { label: 'Product photography', image: perfumeImage, alt: 'Fragrance product photography concept' },
      { label: 'Social campaign', image: perfumeImage, alt: 'Perfume social campaign layout' },
      { label: 'Launch visuals', image: perfumeImage, alt: 'Perfume launch visual direction' }
    ]
  },
  {
    id: 'restaurant-cafe',
    number: '06',
    title: 'RESTAURANT & CAFE',
    category: 'Moroccan Hospitality Brand',
    type: 'Independent Concept',
    image: restaurantImage,
    alt: 'Moroccan restaurant and cafe visual identity mockup',
    brief:
      'A fictional Moroccan hospitality brand with a logo, menu, packaging, cups and visual identity.',
    direction:
      'Tile-inspired geometry, direct menu typography and warm packaging colors make the system practical and inviting.',
    deliverables: ['Logo system', 'Menu design', 'Cup artwork', 'Packaging', 'Hospitality identity'],
    gallery: [
      { label: 'Menu system', image: restaurantImage, alt: 'Restaurant menu identity mockup' },
      { label: 'Cafe packaging', image: restaurantImage, alt: 'Cafe cup and packaging mockup' },
      { label: 'Visual identity', image: restaurantImage, alt: 'Restaurant visual identity detail' }
    ]
  },
  {
    id: 'digital-design',
    number: '07',
    title: 'DIGITAL DESIGN',
    category: 'Premium E-Commerce Concept',
    type: 'Independent Concept',
    image: digitalImage,
    alt: 'Premium ecommerce website concept on desktop and mobile mockups',
    brief:
      'A premium e-commerce website concept with desktop and mobile mockups for a refined product experience.',
    direction:
      'Editorial product blocks, clean navigation and controlled contrast keep the shopping experience polished and usable.',
    deliverables: ['Website concept', 'Desktop mockup', 'Mobile mockup', 'Product modules', 'Digital assets'],
    gallery: [
      { label: 'Desktop concept', image: digitalImage, alt: 'Desktop ecommerce website concept' },
      { label: 'Mobile screens', image: digitalImage, alt: 'Mobile ecommerce website concept' },
      { label: 'Digital assets', image: digitalImage, alt: 'Digital design asset system' }
    ]
  }
];

export const processSteps = [
  {
    number: '01',
    title: 'Understand',
    summary: 'Discuss the business, goals, audience and vision so the design starts with the right questions.'
  },
  {
    number: '02',
    title: 'Create',
    summary: 'Explore concepts, shape the strongest direction and refine it into a coherent visual system.'
  },
  {
    number: '03',
    title: 'Deliver',
    summary: 'Provide the agreed final design files, exports and brand assets in clear, organized formats.'
  },
  {
    number: '04',
    title: 'Support',
    summary: 'Handle agreed revisions and follow-up so the work can move smoothly into the real world.'
  }
];
