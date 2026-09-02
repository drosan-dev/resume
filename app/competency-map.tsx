'use client';

import { useState } from 'react';
import { BrainCircuit, Boxes, DatabaseZap, GitPullRequest, Network, RefreshCw } from 'lucide-react';

type Language = 'ru' | 'en';

const competencies = [
  {
    id: 'architecture', icon: Network,
    name: { ru: 'Backend и архитектура', en: 'Backend & architecture' },
    summary: { ru: 'Проектирование сервисов, интеграций и границ систем.', en: 'Designing services, integrations and system boundaries.' },
    evidence: [
      { company: 'Альфа-Банк', text: { ru: 'Разработка внутренних сервисов на современном .NET; детали под NDA.', en: 'Building internal services on modern .NET; details protected by NDA.' } },
      { company: 'Миртех', text: { ru: 'Декомпозиция готовых систем и внешние интеграции.', en: 'Decomposing existing systems and building external integrations.' } },
      { company: 'Росквартал', text: { ru: 'Выделение микросервиса из крупного монолита.', en: 'Extracting a microservice from a large monolith.' } },
    ],
  },
  {
    id: 'legacy', icon: RefreshCw,
    name: { ru: 'Legacy и рефакторинг', en: 'Legacy & refactoring' },
    summary: { ru: 'Изменение работающих систем без потери их устойчивости.', en: 'Changing production systems without sacrificing reliability.' },
    evidence: [
      { company: 'Альфа-Банк', text: { ru: 'Модернизация внутренних legacy-компонентов; детали под NDA.', en: 'Modernizing internal legacy components; details under NDA.' } },
      { company: 'Миртех', text: { ru: 'Поддержка и рефакторинг продуктовой платформы.', en: 'Maintaining and refactoring a product platform.' } },
      { company: 'Росквартал', text: { ru: 'Анализ и переработка десятков тысяч строк кода.', en: 'Reviewing and reworking tens of thousands of lines of code.' } },
    ],
  },
  {
    id: 'delivery', icon: Boxes,
    name: { ru: 'Delivery и инфраструктура', en: 'Delivery & infrastructure' },
    summary: { ru: 'Путь сервиса от репозитория до работающего окружения.', en: 'Taking a service from repository to a running environment.' },
    evidence: [
      { company: 'Альфа-Банк', text: { ru: 'Работа с процессами поставки внутренних сервисов; детали под NDA.', en: 'Working with delivery processes for internal services; details protected by NDA.' } },
      { company: 'Коммерческий опыт', text: { ru: 'GitLab CI/CD, Jenkins и работа с Linux.', en: 'GitLab CI/CD, Jenkins and Linux experience.' } },
    ],
  },
  {
    id: 'data', icon: DatabaseZap,
    name: { ru: 'Данные и производительность', en: 'Data & performance' },
    summary: { ru: 'SQL, PostgreSQL, Redis и оптимизация узких мест.', en: 'SQL, PostgreSQL, Redis and bottleneck optimization.' },
    evidence: [
      { company: 'Миртех', text: { ru: 'Оптимизация кода и запросов ускорила отдельные страницы в 2–3 раза.', en: 'Code and query optimization made selected pages 2–3× faster.' } },
      { company: 'Росквартал', text: { ru: 'MS SQL и Redis в продуктовой backend-разработке.', en: 'MS SQL and Redis in production backend development.' } },
    ],
  },
  {
    id: 'leadership', icon: GitPullRequest,
    name: { ru: 'Инженерное лидерство', en: 'Engineering leadership' },
    summary: { ru: 'Ревью, развитие команды и улучшение инженерных практик.', en: 'Reviews, team development and stronger engineering practices.' },
    evidence: [
      { company: 'Миртех', text: { ru: 'Team Lead: code review, оценка задач, собеседования и образовательные лекции.', en: 'Team Lead: code review, estimation, interviews and internal lectures.' } },
      { company: 'Альфа-Банк', text: { ru: 'Code review и участие в развитии инженерных практик команды.', en: 'Code review and contributing to the team’s engineering practices.' } },
    ],
  },
  {
    id: 'ai', icon: BrainCircuit,
    name: { ru: 'AI-assisted development', en: 'AI-assisted development' },
    summary: { ru: 'AI как контролируемый инженерный инструмент, а не замена экспертизе.', en: 'AI as a controlled engineering tool, not a substitute for expertise.' },
    evidence: [
      { company: 'Альфа-Банк', text: { ru: 'Практическое применение AI-инструментов в разработке; детали под NDA.', en: 'Practical use of AI tools in software development; details protected by NDA.' } },
      { company: 'Подход', text: { ru: 'Результат AI проходит те же требования к ревью и качеству кода.', en: 'AI output follows the same review and code-quality expectations.' } },
    ],
  },
] as const;

export function CompetencyMap({ language }: { language: Language }) {
  const [selected, setSelected] = useState(competencies[0].id);
  const active = competencies.find((item) => item.id === selected) ?? competencies[0];
  const c = language === 'ru' ? {
    kicker: '02 / EVIDENCE MAP', title: 'Карта компетенций', intro: 'Выберите область — справа появятся места и результаты, которые её подтверждают.', label: 'Выбрать компетенцию', proof: 'Связанные доказательства',
  } : {
    kicker: '02 / EVIDENCE MAP', title: 'Competency map', intro: 'Choose an area to see the roles and outcomes that provide evidence for it.', label: 'Select a competency', proof: 'Connected evidence',
  };

  return (
    <section id="competencies" className="competency-section">
      <div className="competency-heading"><div><p className="section-index">{c.kicker}</p><h2 className="section-title">{c.title}</h2></div><p>{c.intro}</p></div>
      <div className="competency-map">
        <div className="competency-list" role="list" aria-label={c.label}>
          {competencies.map((item) => {
            const Icon = item.icon;
            return <button key={item.id} type="button" className="competency-button" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><Icon /><span>{item.name[language]}</span><span className="competency-count">0{item.evidence.length}</span></button>;
          })}
        </div>
        <div className="competency-evidence" aria-live="polite">
          <div className="competency-active"><active.icon /><div><p className="font-mono text-xs uppercase tracking-[.12em] text-muted-foreground">{c.proof}</p><h3>{active.name[language]}</h3><p>{active.summary[language]}</p></div></div>
          <div className="evidence-chain">
            {active.evidence.map((proof, index) => <article key={`${active.id}-${proof.company}`}><span className="chain-index">{String(index + 1).padStart(2, '0')}</span><div><h4>{proof.company}</h4><p>{proof.text[language]}</p></div></article>)}
          </div>
        </div>
      </div>
    </section>
  );
}
