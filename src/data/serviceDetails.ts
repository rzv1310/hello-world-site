import { FileText, Search, TrendingUp, ShieldCheck } from 'lucide-react';
import type { ServiceDetailPageContent } from '@/types';

export const detailedServicePages: ServiceDetailPageContent[] = [
  {
    path: '/servicii/audit-financiar',
    title: 'Audit financiar',
    desc: 'Audit voluntar conform standardelor locale și internaționale aplicabile. Creștem credibilitatea financiară a companiei în fața investitorilor și partenerilor.',
    icon: FileText,
    eyebrow: 'Audit financiar',
    intro: 'Auditul financiar devine esențial atunci când compania are nevoie de situații financiare credibile, de confort pentru acționari sau de un dialog mai solid cu băncile, investitorii și partenerii comerciali. Intervenim cu o abordare riguroasă, dar pragmatică, astfel încât auditul să ofere claritate și nu doar conformitate formală.',
    idealFor: [
      'companii care au nevoie de situații financiare auditate pentru relația cu bănci, investitori sau parteneri',
      'organizații care vor o opinie independentă asupra raportării financiare și a controalelor existente',
      'echipe financiare care au nevoie de un proces de audit bine structurat, fără blocaje inutile',
      'acționari sau management care vor mai multă încredere în cifrele pe baza cărora iau decizii',
    ],
    scope: [
      {
        title: 'Planificare și evaluare inițială',
        description: 'Începem prin înțelegerea modelului de business, a fluxurilor financiare și a zonelor cu risc ridicat, pentru a calibra corect intervenția.',
      },
      {
        title: 'Testare și validare',
        description: 'Verificăm tranzacții, solduri, estimări contabile și controale-cheie, astfel încât concluziile să fie susținute de probe de audit relevante.',
      },
      {
        title: 'Observații utile pentru management',
        description: 'Semnalăm punctual zonele care pot crea distorsiuni, întârzieri sau vulnerabilități în procesul de raportare financiară.',
      },
      {
        title: 'Raportare clară',
        description: 'Livrăm concluzii structurate și o comunicare directă pe parcurs, astfel încât managementul să știe din timp ce trebuie clarificat.',
      },
    ],
    process: [
      {
        title: 'Stabilim cadrul misiunii',
        description: 'Definim obiectivele, calendarul, setul de documente și persoanele-cheie implicate din partea clientului.',
      },
      {
        title: 'Executăm testele de audit',
        description: 'Analizăm datele financiare și documentația suport, cu accent pe riscurile semnificative și pe zonele unde apar frecvent ajustări.',
      },
      {
        title: 'Concluzionăm și comunicăm',
        description: 'Discutăm constatările relevante, clarificăm punctele deschise și finalizăm raportarea într-un format ușor de urmărit.',
      },
    ],
    outcomes: [
      'credibilitate mai mare a situațiilor financiare',
      'dialog mai bun cu finanțatori și investitori',
      'vizibilitate asupra zonelor sensibile din raportare',
      'un proces de audit predictibil și mai puțin disruptiv pentru echipa internă',
    ],
  },
  {
    path: '/servicii/due-diligence',
    title: 'Due diligence',
    desc: 'Analiză financiară detaliată pentru decizii sigure de investiții și achiziții. Identificăm riscurile ascunse și validăm ipotezele de business.',
    icon: Search,
    eyebrow: 'Due diligence',
    intro: 'În tranzacții, investiții sau reorganizări, riscul real nu stă în ceea ce este evident, ci în ceea ce nu a fost încă verificat suficient. Due diligence-ul financiar ajută managementul, investitorii sau cumpărătorii să înțeleagă mai bine calitatea cifrelor, expunerile ascunse și ipotezele de bază ale unei afaceri.',
    idealFor: [
      'investitori care analizează o companie înainte de achiziție sau intrare în acționariat',
      'antreprenori care vor să pregătească o companie pentru discuții cu potențiali cumpărători',
      'grupuri care au nevoie de claritate înainte de restructurări sau reorganizări',
      'management care vrea o imagine independentă asupra sănătății financiare a unei ținte sau divizii',
    ],
    scope: [
      {
        title: 'Analiza calității rezultatelor',
        description: 'Verificăm sustenabilitatea veniturilor, marjelor și profitabilității, astfel încât performanța raportată să poată fi interpretată realist.',
      },
      {
        title: 'Identificarea riscurilor financiare',
        description: 'Semnalăm expuneri legate de cash-flow, capital de lucru, datorii, dependențe comerciale sau politici contabile.',
      },
      {
        title: 'Validarea ipotezelor de business',
        description: 'Testăm dacă datele financiare susțin povestea de business prezentată în procesul de tranzacție.',
      },
      {
        title: 'Sinteză pentru decizie',
        description: 'Structurăm constatările într-un format util pentru negociere, decizie de investiție sau etapizare ulterioară a verificărilor.',
      },
    ],
    process: [
      {
        title: 'Clarificăm obiectivul analizei',
        description: 'Stabilim ce tranzacție sau ce decizie trebuie susținută și unde este nevoie de profunzime suplimentară.',
      },
      {
        title: 'Revizuim datele și documentele',
        description: 'Trecem prin seturile financiare și documentația suport cu accent pe consistență, ajustări și excepții relevante.',
      },
      {
        title: 'Prioritizăm concluziile',
        description: 'Separăm observațiile critice de cele secundare și formulăm recomandări practice pentru următorii pași.',
      },
    ],
    outcomes: [
      'mai mult control asupra riscului de tranzacție',
      'argumente mai bune în negociere',
      'înțelegere mai clară a expunerilor și ajustărilor potențiale',
      'decizii luate pe baza unor ipoteze validate, nu doar a prezentărilor comerciale',
    ],
  },
  {
    path: '/servicii/consultanta-financiara',
    title: 'Consultanță financiară',
    desc: 'Optimizare procese, raportare managerială și consolidarea controlului intern. Soluții practice pentru creșterea performanței financiare.',
    icon: TrendingUp,
    eyebrow: 'Consultanță financiară',
    intro: 'Consultanța financiară este utilă atunci când compania are nevoie de mai mult decât conformitate: are nevoie de procese mai bune, indicatori mai relevanți și o structură de raportare care susține decizii rapide. Lucrăm aplicat, pe probleme concrete de organizare financiară, control și vizibilitate managerială.',
    idealFor: [
      'companii în creștere care au nevoie de procese financiare mai mature și mai previzibile',
      'management care vrea raportare mai clară și indicatori relevanți pentru decizie',
      'echipe care au nevoie de ordine în fluxuri, responsabilități și controale interne',
      'organizații care pregătesc finanțări, reorganizări sau profesionalizarea funcției financiare',
    ],
    scope: [
      {
        title: 'Optimizarea proceselor financiare',
        description: 'Analizăm fluxurile existente și propunem intervenții care reduc întârzierile, erorile și zonele fără responsabilitate clară.',
      },
      {
        title: 'Raportare managerială',
        description: 'Definim structuri de raportare și indicatori care ajută managementul să urmărească performanța, lichiditatea și disciplina financiară.',
      },
      {
        title: 'Control intern',
        description: 'Mapăm punctele sensibile și recomandăm controale proporționale cu dimensiunea și complexitatea companiei.',
      },
      {
        title: 'Implementare practică',
        description: 'Nu ne oprim la diagnoză; formulăm recomandări aplicabile, ușor de integrat în activitatea echipei interne.',
      },
    ],
    process: [
      {
        title: 'Diagnoză rapidă',
        description: 'Înțelegem cum circulă informația financiară și unde apar fricțiuni, întârzieri sau lipsă de vizibilitate.',
      },
      {
        title: 'Propunem modelul țintă',
        description: 'Configurăm recomandările în funcție de echipă, ritmul operațional și nivelul de maturitate al companiei.',
      },
      {
        title: 'Susținem implementarea',
        description: 'Clarificăm prioritățile și ajutăm managementul să pună în practică măsurile care au impact real.',
      },
    ],
    outcomes: [
      'raportare internă mai utilă pentru decizie',
      'procese financiare mai clare și mai robuste',
      'control intern mai bun fără birocrație inutilă',
      'o funcție financiară mai pregătită pentru creștere și schimbare',
    ],
  },
  {
    path: '/servicii/risk-compliance',
    title: 'Risk & compliance',
    desc: 'Evaluarea riscurilor operaționale și financiare și asigurarea conformității. Protejăm valoarea companiei prin identificarea și atenuarea proactivă a riscurilor.',
    icon: ShieldCheck,
    eyebrow: 'Risk & compliance',
    intro: 'Serviciile de risk & compliance sunt utile atunci când managementul are nevoie de o imagine mai clară asupra riscurilor care pot afecta continuitatea, raportarea, relația cu autoritățile sau încrederea partenerilor. Abordarea noastră combină evaluarea vulnerabilităților cu recomandări de control și conformitate adaptate realității companiei.',
    idealFor: [
      'companii care se confruntă cu presiuni de conformitate sau cu cerințe mai stricte din partea partenerilor',
      'organizații care au crescut rapid și vor să-și reevalueze controalele și responsabilitățile',
      'management care vrea să reducă expunerile operaționale și financiare înainte să devină incidente',
      'companii care vor o abordare mai structurată a monitorizării riscurilor și obligațiilor interne',
    ],
    scope: [
      {
        title: 'Cartografierea riscurilor',
        description: 'Identificăm zonele unde procesele, controalele sau dependențele existente pot genera pierderi, blocaje sau neconformități.',
      },
      {
        title: 'Evaluarea controalelor',
        description: 'Analizăm dacă mecanismele existente sunt suficiente, aplicate consecvent și proporționale cu riscurile reale.',
      },
      {
        title: 'Conformitate operațională',
        description: 'Revizuim zonele unde lipsa de disciplină procedurală sau documentară poate afecta compania în relația cu terți sau autorități.',
      },
      {
        title: 'Plan de remediere',
        description: 'Propunem măsuri etapizate, astfel încât corecțiile să fie realiste și să poată fi implementate fără a bloca activitatea.',
      },
    ],
    process: [
      {
        title: 'Stabilim contextul de risc',
        description: 'Înțelegem activitatea, tipul expunerilor și zonele unde managementul are nevoie de mai mult control.',
      },
      {
        title: 'Analizăm punctele vulnerabile',
        description: 'Revizuim procese, documente și responsabilități pentru a identifica lipsuri de control, conformitate sau trasabilitate.',
      },
      {
        title: 'Prioritizăm măsurile',
        description: 'Livrăm recomandări în ordinea impactului, astfel încât compania să poată reduce rapid expunerile cele mai importante.',
      },
    ],
    outcomes: [
      'mai multă claritate asupra riscurilor relevante pentru companie',
      'controale interne mai bine calibrate',
      'disciplină procedurală mai bună în zonele sensibile',
      'o bază mai solidă pentru decizii și pentru relația cu partenerii externi',
    ],
  },
];

export const detailedServicePagesByPath = Object.fromEntries(
  detailedServicePages.map((page) => [page.path, page]),
) as Record<string, ServiceDetailPageContent>;
