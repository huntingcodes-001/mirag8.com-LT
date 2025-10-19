export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  hardwareSpecs: {
    display: string;
    processor: string;
    ram: string;
    storage: string;
    connectivity: string;
  };
  features: string[];
  price: number;
  category: string;
  images: string[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerTitle?: string;
  rating: number;
  content: string;
  imageUrl?: string;
}

export interface Inquiry {
  productName: string;
  customerName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface NewsletterSubscription {
  email: string;
}
