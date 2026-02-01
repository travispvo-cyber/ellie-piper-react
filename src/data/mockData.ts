// Storybook scenes
export const storybookScenes = [
  { id: 0, src: '/images/storybook/scene-00-cover.png', alt: 'Cover' },
  { id: 1, src: '/images/storybook/scene-01.png', alt: 'Page 1' },
  { id: 2, src: '/images/storybook/scene-02.png', alt: 'Page 2' },
  { id: 3, src: '/images/storybook/scene-03.png', alt: 'Page 3' },
  { id: 4, src: '/images/storybook/scene-04.png', alt: 'Page 4' },
  { id: 5, src: '/images/storybook/scene-05.png', alt: 'Page 5' },
  { id: 6, src: '/images/storybook/scene-06.png', alt: 'Page 6' },
  { id: 7, src: '/images/storybook/scene-07.png', alt: 'Page 7' },
  { id: 8, src: '/images/storybook/scene-08.png', alt: 'Page 8' },
  { id: 9, src: '/images/storybook/scene-09.png', alt: 'Page 9' },
  { id: 10, src: '/images/storybook/scene-10.png', alt: 'Page 10' },
];

// Color palettes
export interface Palette {
  id: string;
  name: string;
  colors: {
    gold: string;
    goldText: string;
    blush: string;
    mauve: string;
    text: string;
    white: string;
  };
  swatches: string[];
}

export const palettes: Palette[] = [
  {
    id: 'blush-gold',
    name: 'Blush + Gold',
    colors: {
      gold: '#d4af37',
      goldText: '#8a6914',
      blush: '#FFF8FA',
      mauve: '#F4B8C7',
      text: '#2D2926',
      white: '#ffffff',
    },
    swatches: ['#d4af37', '#F4B8C7', '#FFF8FA'],
  },
  {
    id: 'rosegold-cream',
    name: 'Rose Gold',
    colors: {
      gold: '#B86B77',
      goldText: '#8B4D57',
      blush: '#FFE8E5',
      mauve: '#EABFB9',
      text: '#2D2926',
      white: '#ffffff',
    },
    swatches: ['#B86B77', '#EABFB9', '#F0DBC1'],
  },
  {
    id: 'muted-rose',
    name: 'Muted Rose',
    colors: {
      gold: '#D58D8D',
      goldText: '#A06565',
      blush: '#F0EEE9',
      mauve: '#F4BBC9',
      text: '#2A2B2A',
      white: '#FEFEFE',
    },
    swatches: ['#D58D8D', '#F4BBC9', '#F0EEE9'],
  },
  {
    id: 'pink-sage',
    name: 'Pink + Sage',
    colors: {
      gold: '#D3B238',
      goldText: '#337357',
      blush: '#F4B8C7',
      mauve: '#EC839E',
      text: '#2A2B2A',
      white: '#ffffff',
    },
    swatches: ['#D3B238', '#EC839E', '#6D9F71'],
  },
];

// Hero sections data
export const heroSections = {
  shop: {
    id: 'shop',
    tagline: 'Bespoke Celebrations',
    title: 'The Shop',
    description: 'Premium party supplies for your most beautiful moments.',
    cta: 'Shop Now',
    ctaLink: 'https://ellieandpiper.com',
    backgroundImage: '/images/hero-shop.svg',
    bgColor: 'bg-[#F0EEE9]',
  },
  studio: {
    id: 'studio',
    tagline: 'Bespoke Styling',
    title: 'The Studio',
    description: 'Balloon installations and creative event design.',
    cta: 'Inquire',
    ctaLink: 'https://ellieandpiper.com/pages/contact',
    backgroundImage: '/images/hero-balloons.svg',
    bgColor: 'bg-soft-pink',
  },
};

// Navigation links
export const navLinks = [
  { label: 'Shop', href: 'https://ellieandpiper.com' },
  { label: 'Contact', href: 'https://ellieandpiper.com/pages/contact' },
];

export const instagramUrl = 'https://www.instagram.com/ellieandpiperparty/';
