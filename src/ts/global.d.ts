interface IProduct {
  alt_text: string;
  brand: string;
  category: string;
  created_at: string;
  description: string;
  featured: boolean;
  id: number;
  image: string | null;
  image_url: string;
  price: number;
  published_at: string;
  rating: number | null;
  title: string;
  updated_at: string;
}

interface IHeroBanner {
  alt_text: string;
  hero_banner: {
    alternativeText: string;
    name: string;
    url: string;
  };
  hero_banner_alt_text: string;
  hero_url: url;
  updated_at: string;
}
