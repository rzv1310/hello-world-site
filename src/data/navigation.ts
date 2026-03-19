import type { NavLink } from '@/types';

export const navLinks: NavLink[] = [
  { name: 'Despre noi', href: '/despre-noi' },
  {
    name: 'Servicii',
    href: '#',
    dropdown: [
      { name: 'Audit statutar', href: '/servicii/audit-statutar' },
      { name: 'Audit financiar', href: '/servicii/audit-financiar' },
      { name: 'Due diligence', href: '/servicii/due-diligence' },
      { name: 'Consultanță financiară', href: '/servicii/consultanta-financiara' },
      { name: 'Risk & compliance', href: '/servicii/risk-compliance' }
    ]
  },
  { name: 'Contact', href: '/contact' },
];
