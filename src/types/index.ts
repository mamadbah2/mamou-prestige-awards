export interface KeyFigure {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  description?: string;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  avatarUrl?: string;
  edition?: number;
}

export interface MpaEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
