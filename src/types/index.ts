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

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  nomineeCount: number;
}

export interface Nominee {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  description: string;
  imageUrl?: string;
  edition: number;
}

export interface EditionResult {
  edition: number;
  status: "completed" | "ongoing";
  categories: CategoryResult[];
}

export interface CategoryResult {
  categoryId: string;
  categoryName: string;
  winner?: NomineeResult;
  runnerUp?: NomineeResult;
}

export interface NomineeResult {
  nomineeId: string;
  name: string;
  publicScorePercent: number;
  juryScorePercent: number;
  finalScore: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
