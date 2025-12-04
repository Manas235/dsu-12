export interface NavItem {
  label: string;
  href: string;
  isPrimary?: boolean;
  isHighlight?: boolean;
  children?: NavItem[];
  pageId?: string; // Unique identifier for the page content
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
}

export interface StatItem {
  id: number;
  value: string;
  label: string;
  icon: string; // Changed from React.ComponentType to string for JSON serialization
}

export interface Accreditation {
  id: number;
  name: string;
  type: string;
}

export interface EnquiryRequest {
  name: string;
  email: string;
  phone: string;
  course: string;
}

export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  program: string;
  course: string;
  city: string;
  state: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string; // Changed from React.ComponentType to string for JSON serialization
  image: string;
}

export interface DetailsPageData {
  title: string;
  category: string;
  content: string;
  image?: string;
  date?: string;
}