import { Scale, FileText, Search, TrendingUp, ShieldCheck } from 'lucide-react';
import type { Service } from '@/types';

export const services: Service[] = [
  {
    title: "Audit statutar",
    desc: "Verificarea situațiilor financiare și asigurarea conformității legale conform standardelor.",
    icon: Scale,
    href: "/servicii/audit-statutar",
    highlight: true
  },
  {
    title: "Audit financiar",
    desc: "Audit statutar și voluntar conform standardelor locale și internaționale aplicabile.",
    icon: FileText,
    href: "/servicii/audit-financiar",
    highlight: false
  },
  {
    title: "Due diligence",
    desc: "Analiză financiară detaliată pentru decizii sigure de investiții și achiziții.",
    icon: Search,
    href: "/servicii/due-diligence",
    highlight: false
  },
  {
    title: "Consultanță financiară",
    desc: "Optimizare procese, raportare managerială și consolidarea controlului intern.",
    icon: TrendingUp,
    href: "/servicii/consultanta-financiara",
    highlight: false
  },
  {
    title: "Risk & compliance",
    desc: "Evaluarea riscurilor operaționale și financiare și asigurarea conformității.",
    icon: ShieldCheck,
    href: "/servicii/risk-compliance",
    highlight: false
  }
];
