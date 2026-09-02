'use client';

import { useState } from 'react';
import { ArrowUpRight, AtSign, Braces, Globe2, GraduationCap, Languages, Mail, MapPin, MessageCircle } from 'lucide-react';
import { VacancyMatcher } from './vacancy-matcher';
import { CompetencyMap } from './competency-map';
import { GameLab } from './game-lab';

type Language = 'ru' | 'en';
type Depth = 'brief' | 'full';

const copy = {
  ru: {
    eyebrow: 'Senior .NET developer · открыт к удалённой работе', title: 'Строю надёжный backend и превращаю AI из эксперимента в рабочий инструмент команды.',
    intro: 'Senior .NET-разработчик с коммерческим опытом с 2019 года. Разрабатываю backend-сервисы, модернизирую legacy-системы и выстраиваю процессы, которые помогают команде надёжно выпускать изменения.',
    brief: '30 секунд', full: 'Подробнее', contact: 'Написать', match: 'Сопоставить с вакансией', github: 'GitHub', navMatch: 'Вакансия', navSkills: 'Компетенции', navExperience: 'Опыт', navLab: 'Game Lab', navContacts: 'Контакты', evidence: 'Карьера в цифрах', years: 'лет коммерческой разработки', speed: 'ускорение отдельных страниц', code: 'строк монолита — масштаб выделения микросервиса', companies: 'компании и разные продуктовые домены', experience: 'Опыт', current: 'Сейчас',
    alfa: 'Внутренняя база знаний: микросервисы на современном .NET, legacy, Docker, Kubernetes, CI/CD, code review и внедрение AI-assisted development в команде.',
    mirtech: 'Веб-платформа грантовых конкурсов. Разработка, интеграции, авторизация, декомпозиция систем и развитие инженерных практик команды.',
    ros: 'Платформа для сферы ЖКХ. Разработка и рефакторинг, включая выделение микросервиса из десятков тысяч строк монолита.',
    lab: 'Game Lab', labText: 'Самостоятельно исследую игровые механики через небольшие проекты на Unity — от идеи до работающего прототипа.', location: 'Петрозаводск · UTC+3 · удалённо', nda: 'Часть деталей текущих проектов ограничена NDA.', responsibilities: 'Зона ответственности', results: 'Результаты', stack: 'Стек', locationLabel: 'Локация', locationDetail: 'Петрозаводск · UTC+3', educationLabel: 'Образование', education: 'ПетрГУ · ИМИТ, обучение до 4 курса', languageLabel: 'Язык', language: 'Английский · B1', formatLabel: 'Формат работы', format: 'Удалённо · российские и международные команды', contactKicker: '05 / НА СВЯЗИ', contactTitle: 'Есть сложная система или интересная идея?', contactText: 'Готов обсудить senior .NET/backend роль, развитие инженерных практик или проект на пересечении технологий и игровых механик.', availability: 'Открыт к предложениям · удалённо · UTC+3', writeBy: 'Предпочтительный способ связи', social: 'Социальный профиль',
  },
  en: {
    eyebrow: 'Senior .NET developer · open to remote work', title: 'I build reliable backend systems and turn AI from an experiment into a practical tool for the team.',
    intro: 'Senior .NET developer with commercial experience since 2019. I build backend services, modernize legacy systems and improve the engineering processes that help teams ship reliable changes.',
    brief: '30 seconds', full: 'In depth', contact: 'Contact me', match: 'Match a vacancy', github: 'GitHub', navMatch: 'Vacancy', navSkills: 'Skills', navExperience: 'Experience', navLab: 'Game Lab', navContacts: 'Contacts', evidence: 'Career by the numbers', years: 'years in commercial development', speed: 'faster page performance', code: 'lines of monolith reviewed to extract a microservice', companies: 'companies across distinct product domains', experience: 'Experience', current: 'Now',
    alfa: 'Internal knowledge platform: modern .NET microservices, legacy systems, Docker, Kubernetes, CI/CD, code review and introducing AI-assisted development to the team.',
    mirtech: 'A grant competition platform. Product development, integrations, authorization, system decomposition and stronger engineering practices.',
    ros: 'A platform for housing management companies. Development and refactoring, including extracting a microservice from tens of thousands of lines of monolith code.',
    lab: 'Game Lab', labText: 'I explore game mechanics through small Unity projects, taking each experiment from an idea to a working prototype.', location: 'Petrozavodsk · UTC+3 · remote', nda: 'Some details of my current work are protected by NDA.', responsibilities: 'Responsibilities', results: 'Outcomes', stack: 'Stack', locationLabel: 'Location', locationDetail: 'Petrozavodsk · UTC+3', educationLabel: 'Education', education: 'Petrozavodsk State University · studied through year 4', languageLabel: 'Language', language: 'English · B1', formatLabel: 'Work format', format: 'Remote · Russian and international teams', contactKicker: '05 / GET IN TOUCH', contactTitle: 'Have a complex system or an interesting idea?', contactText: 'I am open to discussing a senior .NET/backend role, stronger engineering practices, or a project where technology meets game mechanics.', availability: 'Open to opportunities · remote · UTC+3', writeBy: 'Preferred contact', social: 'Social profile',
  },
};

const roles = [
  {
    period: '10.2024—', company: 'Альфа-Банк', key: 'alfa', position: '.NET Developer',
    responsibilities: {
      ru: ['Внутренние микросервисы корпоративной базы знаний', 'Поддержка и модернизация legacy-компонентов', 'CI/CD для новых сервисов, code review'],
      en: ['Internal microservices for a corporate knowledge platform', 'Maintenance and modernization of legacy components', 'CI/CD for new services and code review'],
    },
    results: { ru: ['Внедрение AI-assisted development в процессы команды', 'Архитектурные детали и метрики защищены NDA'], en: ['Introducing AI-assisted development into team workflows', 'Architecture details and metrics are protected by NDA'] },
    stack: ['C#', '.NET', 'Docker', 'Kubernetes', 'CI/CD', 'AI tools'],
  },
  {
    period: '11.2021—08.2024', company: 'Миртех', key: 'mirtech', position: 'C# Developer / Team Lead',
    responsibilities: {
      ru: ['Разработка, поддержка и рефакторинг продуктовой платформы', 'Внешние интеграции и сервисы авторизации', 'Code review, оценка задач и собеседования разработчиков'],
      en: ['Product platform development, maintenance and refactoring', 'External integrations and authorization services', 'Code review, estimation and developer interviews'],
    },
    results: { ru: ['Ускорение отдельных страниц в 2–3 раза', 'Выделение микросервисов из готовых систем', 'Образовательные лекции и улучшение процессов команды'], en: ['Selected pages made 2–3× faster', 'Microservices extracted from existing systems', 'Internal lectures and improved team processes'] },
    stack: ['C#', '.NET Core', 'MS SQL', 'PostgreSQL', 'Redis', 'RabbitMQ'],
  },
  {
    period: '06.2019—11.2021', company: 'Росквартал', key: 'ros', position: 'C# Developer',
    responsibilities: { ru: ['Разработка и поддержка платформы для сферы ЖКХ', 'Рефакторинг существующих продуктов', 'Декомпозиция монолитной системы'], en: ['Development and support of a housing-sector platform', 'Refactoring existing products', 'Decomposing a monolithic system'] },
    results: { ru: ['Выделение микросервиса из монолита', 'Анализ и переработка десятков тысяч строк кода'], en: ['A microservice extracted from the monolith', 'Tens of thousands of lines of code reviewed and reworked'] },
    stack: ['C#', '.NET Core', '.NET Framework', 'MS SQL', 'Redis', 'RabbitMQ'],
  },
] as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>('ru');
  const [depth, setDepth] = useState<Depth>('brief');
  const t = copy[language];
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <header className="site-header">
          <a href="#top" className="font-mono text-sm font-semibold tracking-[-0.04em]">AV<span className="text-primary">/</span>DEV</a>
          <nav className="site-nav" aria-label={language === 'ru' ? 'Навигация по резюме' : 'Resume navigation'}>
            <a href="#vacancy-match">{t.navMatch}</a><a href="#competencies">{t.navSkills}</a><a href="#experience">{t.navExperience}</a><a href="#game-lab">{t.navLab}</a><a href="#contacts">{t.navContacts}</a>
          </nav>
          <div className="flex items-center gap-2 font-mono text-xs">
            <button className="control" aria-pressed={depth === 'brief'} onClick={() => setDepth('brief')}>{t.brief}</button>
            <button className="control" aria-pressed={depth === 'full'} onClick={() => setDepth('full')}>{t.full}</button>
            <span className="mx-1 h-5 w-px bg-border" />
            <button className="control" aria-pressed={language === 'ru'} onClick={() => setLanguage('ru')}>RU</button>
            <button className="control" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
          </div>
        </header>
        <section id="top" className="grid min-h-[620px] items-center gap-14 py-20 lg:grid-cols-[1.35fr_.65fr] lg:py-28">
          <div>
            <p className="mb-7 flex items-center gap-2 font-mono text-xs uppercase tracking-[.14em] text-muted-foreground"><span className="status-dot" /> {t.eyebrow}</p>
            <h1 className="max-w-4xl text-balance text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[.92] tracking-[-.065em]">Антон <span className="text-primary">Владимиров</span></h1>
            <h2 className="mt-7 max-w-3xl text-balance text-2xl font-medium leading-tight tracking-[-.025em] sm:text-4xl">{t.title}</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{t.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3"><a className="primary-button" href="#vacancy-match"><Braces size={17} /> {t.match}</a><a className="secondary-button" href="mailto:vladimirowant@yandex.ru"><Mail size={17} /> {t.contact}</a><a className="secondary-button" href="https://github.com/drosan-dev" target="_blank" rel="noreferrer">{t.github} <ArrowUpRight size={17} /></a></div>
          </div>
          <aside className="evidence-card" aria-label={t.evidence}>
            <div className="mb-8 flex items-center justify-between"><p className="font-mono text-xs uppercase tracking-[.15em] text-muted-foreground">{t.evidence}</p><Braces className="text-primary" size={22} /></div>
            <dl className="metric-grid"><div><dt className="metric">7+</dt><dd>{t.years}</dd></div><div><dt className="metric">2–3×</dt><dd>{t.speed}</dd></div><div><dt className="metric">10K+</dt><dd>{t.code}</dd></div><div><dt className="metric">3</dt><dd>{t.companies}</dd></div></dl>
          </aside>
        </section>
        <VacancyMatcher language={language} />
        <CompetencyMap language={language} />
        <section id="experience" className="border-t border-border py-20">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4"><div><p className="section-index">03 / TRACK RECORD</p><h2 className="section-title">{t.experience}</h2></div><p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin size={15} /> {t.location}</p></div>
          <div className="divide-y divide-border border-y border-border">
            {roles.map((role, index) => <article key={role.company} className={`experience-row ${depth === 'full' ? 'is-expanded' : ''}`}>
              <p className="font-mono text-xs text-muted-foreground">{role.period}</p>
              <div><h3 className="text-2xl font-semibold tracking-[-.035em]">{role.company}</h3><p className="mt-1 font-mono text-xs text-muted-foreground">{role.position}</p></div>
              <div><p className="leading-7 text-muted-foreground">{index === 0 && <span className="mr-2 rounded-full bg-primary px-2 py-1 font-mono text-[10px] font-bold text-primary-foreground">{t.current}</span>}{t[role.key]}</p>
                {depth === 'full' && <div className="role-details">
                  <section><h4>{t.responsibilities}</h4><ul>{role.responsibilities[language].map((item) => <li key={item}>{item}</li>)}</ul></section>
                  <section><h4>{t.results}</h4><ul>{role.results[language].map((item) => <li key={item}>{item}</li>)}</ul></section>
                  <section className="role-stack"><h4>{t.stack}</h4><div>{role.stack.map((item) => <span key={item}>{item}</span>)}</div></section>
                </div>}
              </div>
            </article>)}
          </div>
          {depth === 'full' && <div className="profile-strip">
            <article><MapPin /><div><span>{t.locationLabel}</span><strong>{t.locationDetail}</strong></div></article>
            <article><GraduationCap /><div><span>{t.educationLabel}</span><strong>{t.education}</strong></div></article>
            <article><Languages /><div><span>{t.languageLabel}</span><strong>{t.language}</strong></div></article>
            <article><Globe2 /><div><span>{t.formatLabel}</span><strong>{t.format}</strong></div></article>
          </div>}
        </section>
        <GameLab language={language} />
        <section id="contacts" className="contact-section">
          <div className="contact-pitch"><p className="section-index !text-current/55">{t.contactKicker}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><span><span className="status-dot" />{t.availability}</span></div>
          <div className="contact-links">
            <a href="mailto:vladimirowant@yandex.ru"><Mail /><div><span>{t.writeBy}</span><strong>vladimirowant@yandex.ru</strong></div><ArrowUpRight /></a>
            <a href="https://t.me/anton_VL99" target="_blank" rel="noreferrer"><MessageCircle /><div><span>Telegram</span><strong>@anton_VL99</strong></div><ArrowUpRight /></a>
            <a href="https://vk.ru/anton_vla" target="_blank" rel="noreferrer"><AtSign /><div><span>{t.social}</span><strong>vk.ru/anton_vla</strong></div><ArrowUpRight /></a>
          </div>
        </section>
        <footer className="flex flex-col justify-between gap-6 py-7 text-sm text-muted-foreground sm:flex-row"><p>© 2026 Антон Владимиров</p><p>Senior .NET Developer · Петрозаводск</p></footer>
      </div>
    </main>
  );
}
