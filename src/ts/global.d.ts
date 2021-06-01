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
type qty = {
  qty: number;
};
type size = {
  size: number;
};

interface Icart {
  product: IProduct;
  qtySize: [size, qty];
}

interface IUpdateShoe {
  title: string;
  brand: string;
  price: string;
  description: string;
  image_url: string;
  alt_text: string;
  category: string;
  id: string;
  featured: boolean;
}

interface IUpdateHeroBanner {
  hero_banner_alt_text: string;
  hero_url: string;
}
