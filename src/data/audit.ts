import {
  MapPin, Users, ShieldCheck, Clock, Phone, FileText,
  FileSpreadsheet, Landmark, FolderOpen
} from 'lucide-react';
import type { TrustStripItem, ProcessStep, DocumentCategory } from '@/types';

export const trustStripItems: TrustStripItem[] = [
  { icon: MapPin, text: "Audit statutar pentru companii din România" },
  { icon: Users, text: "Suport pe parcursul întregii misiuni" },
];

export const trustStripItems2: TrustStripItem[] = [
  { icon: ShieldCheck, text: "Abordare confidențială" },
  { icon: Clock, text: "Proces structurat, cu termene definite" },
];

export const trustStripItems3: TrustStripItem[] = [
  { icon: Phone, text: "Comunicare directă cu auditorul" },
  { icon: FileText, text: "Raportare transparentă" },
];

export const risks: string[] = [
  "Amenzi și sancțiuni administrative",
  "Probleme de conformitate legală",
  "Suspendarea sau retragerea autorizării",
  "Pierderea încrederii partenerilor / investitorilor",
  "Riscuri suplimentare în caz de fraudă sau neglijență"
];

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Pregătirea misiunii",
    items: ["Înțelegem activitatea companiei", "Analizăm politicile contabile", "Evaluăm sistemul de control intern", "Stabilim documentele necesare"]
  },
  {
    num: "02",
    title: "Executarea auditului",
    items: ["Efectuăm testele de audit", "Verificăm documentele și tranzacțiile", "Analizăm controalele contabile", "Clarificăm punctual aspectele importante"]
  },
  {
    num: "03",
    title: "Concluzii și raport",
    items: ["Opinia auditorului", "Baza pentru opinie", "Aspecte cheie de audit", "Observații și conformitate legală"]
  }
];

export const benefits: string[] = [
  "Raport transparent pentru acționari",
  "Încredere sporită pentru autorități și parteneri externi",
  "Fără haos administrativ, doar structură, ritm și coordonare",
  "Vizibilitate mai bună asupra riscurilor financiare",
  "Mai puțin stres, mai mult control și fără să blochezi activitatea companiei"
];

export const documentCategories: DocumentCategory[] = [
  {
    title: "Documente Financiare & Contabile",
    icon: FileSpreadsheet,
    items: [
      "Balanțe de verificare lunare și anuale",
      "Registrul jurnal și cartea mare",
      "Situațiile financiare preliminare",
      "Evidența mijloacelor fixe și a amortizării"
    ]
  },
  {
    title: "Documente Juridice & Corporative",
    icon: Landmark,
    items: [
      "Actul constitutiv actualizat",
      "Hotărârile AGA și ale Consiliului de Administrație",
      "Contracte semnificative (clienți, furnizori, credite)",
      "Certificate constatatoare"
    ]
  },
  {
    title: "Documente Operaționale & HR",
    icon: FolderOpen,
    items: [
      "Organigrama companiei",
      "Statele de plată și declarațiile aferente",
      "Proceduri interne și manuale de politici contabile",
      "Rapoarte de inventariere anuale"
    ]
  }
];

export const targetCards = [
  {
    title: "Companii care depășesc pragurile legale",
    desc: "Și au nevoie de un partener de încredere pentru a asigura conformitatea fără stres."
  },
  {
    title: "Companii care pregătesc relația cu investitori",
    desc: "Sau finanțatori, unde situațiile financiare auditate sunt o condiție obligatorie."
  },
  {
    title: "Companii care vor un proces riguros, dar fluid",
    desc: "Care apreciază comunicarea directă cu partenerul coordonator, fără birocrație inutilă."
  }
];
