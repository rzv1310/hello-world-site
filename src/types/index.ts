import type { LucideIcon } from 'lucide-react';

export interface NavDropdownLink {
  name: string;
  href: string;
}

export interface NavLink {
  name: string;
  href: string;
  dropdown?: NavDropdownLink[];
}

export interface TrustStripItem {
  icon: LucideIcon;
  text: string;
}

export interface Service {
  title: string;
  desc: string;
  icon: LucideIcon;
  href: string;
  highlight: boolean;
}

export interface ProcessStep {
  num: string;
  title: string;
  items: string[];
}

export interface DocumentCategory {
  title: string;
  icon: LucideIcon;
  items: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ServicePageProps {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface ServiceDetailCard {
  title: string;
  description: string;
}

export interface ServiceDetailPageContent {
  path: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  eyebrow: string;
  intro: string;
  idealFor: string[];
  scope: ServiceDetailCard[];
  process: ServiceDetailCard[];
  outcomes: string[];
}

export interface LegalSection {
  title: string;
  paragraphs: string[];
  items?: string[];
}

export interface LegalPageContent {
  title: string;
  shortTitle: string;
  path: string;
  description: string;
  intro: string;
  sections: LegalSection[];
}
