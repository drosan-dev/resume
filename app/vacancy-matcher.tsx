'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, Check, FlaskConical, LockKeyhole, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type Language = 'ru' | 'en';
type MatchStatus = 'confirmed' | 'adjacent' | 'missing';

type Requirement = {
  id: string;
  label: Record<Language, string>;
  keywords: string[];
  status: MatchStatus;
  evidence: Record<Language, string>;
};

const requirements: Requirement[] = [
  { id: 'dotnet', label: { ru: '.NET / C#', en: '.NET / C#' }, keywords: ['.net', 'dotnet', 'c#', 'asp.net'], status: 'confirmed', evidence: { ru: 'Основной коммерческий стек с 2019 года.', en: 'Primary commercial stack since 2019.' } },
  { id: 'backend', label: { ru: 'Backend-разработка', en: 'Backend development' }, keywords: ['backend', 'back-end', 'бэкенд', 'серверн'], status: 'confirmed', evidence: { ru: 'Внутренние сервисы, интеграции и продуктовые платформы.', en: 'Internal services, integrations and product platforms.' } },
  { id: 'microservices', label: { ru: 'Микросервисы', en: 'Microservices' }, keywords: ['microservice', 'микросервис'], status: 'confirmed', evidence: { ru: 'Выделение сервисов из монолита и разработка новых внутренних сервисов.', en: 'Extracting services from a monolith and building new internal services.' } },
  { id: 'legacy', label: { ru: 'Работа с legacy', en: 'Legacy modernization' }, keywords: ['legacy', 'легаси', 'рефактор'], status: 'confirmed', evidence: { ru: 'Модернизация существующих систем и рефакторинг крупных кодовых баз.', en: 'Modernizing existing systems and refactoring large codebases.' } },
  { id: 'delivery', label: { ru: 'CI/CD и инфраструктура', en: 'CI/CD and infrastructure' }, keywords: ['ci/cd', 'cicd', 'gitlab ci', 'jenkins', 'инфраструктур'], status: 'confirmed', evidence: { ru: 'Коммерческий опыт с CI/CD, GitLab CI и Jenkins.', en: 'Commercial experience with CI/CD, GitLab CI and Jenkins.' } },
  { id: 'containers', label: { ru: 'Docker / Kubernetes', en: 'Docker / Kubernetes' }, keywords: ['docker', 'kubernetes', 'k8s', 'кубер'], status: 'confirmed', evidence: { ru: 'Коммерческий опыт контейнеризации и оркестрации.', en: 'Commercial experience with containerization and orchestration.' } },
  { id: 'data', label: { ru: 'Реляционные БД и Redis', en: 'Relational databases and Redis' }, keywords: ['sql', 'postgres', 'redis', 'database', 'баз данных', 'бд'], status: 'confirmed', evidence: { ru: 'MS SQL, PostgreSQL, Redis; есть кейс ускорения страниц в 2–3 раза.', en: 'MS SQL, PostgreSQL and Redis; includes a 2–3× page performance case.' } },
  { id: 'review', label: { ru: 'Code review', en: 'Code review' }, keywords: ['code review', 'код ревью', 'ревью кода', 'pull request'], status: 'confirmed', evidence: { ru: 'Регулярная часть работы, включая опыт Team Lead.', en: 'A regular responsibility, including Team Lead experience.' } },
  { id: 'ai', label: { ru: 'AI-assisted development', en: 'AI-assisted development' }, keywords: [' ai ', 'ии', 'artificial intelligence', 'llm', 'copilot', 'генерац'], status: 'confirmed', evidence: { ru: 'Практическое применение AI-инструментов с обязательным code review.', en: 'Practical use of AI tools with mandatory code review.' } },
  { id: 'frontend', label: { ru: 'Frontend / Angular', en: 'Frontend / Angular' }, keywords: ['frontend', 'front-end', 'фронтенд', 'angular', 'typescript', 'javascript'], status: 'adjacent', evidence: { ru: 'Есть коммерческий fullstack-опыт, но основной профиль — backend.', en: 'Commercial full-stack experience; backend remains the primary focus.' } },
  { id: 'python', label: { ru: 'Python', en: 'Python' }, keywords: ['python'], status: 'adjacent', evidence: { ru: 'Некоммерческий опыт; не заявляется как основная специализация.', en: 'Non-commercial experience; not presented as a core specialization.' } },
  { id: 'unity', label: { ru: 'Unity / игровые механики', en: 'Unity / game mechanics' }, keywords: ['unity', 'gamedev', 'gameplay', 'геймдиз', 'игров'], status: 'adjacent', evidence: { ru: 'Самостоятельные мини-проекты и эксперименты с механиками.', en: 'Independent mini-projects and game-mechanics experiments.' } },
  { id: 'go', label: { ru: 'Go', en: 'Go' }, keywords: ['golang', ' go '], status: 'missing', evidence: { ru: 'В публичном профиле нет подтверждённого опыта.', en: 'No evidence in the public profile.' } },
  { id: 'cloud', label: { ru: 'Публичные облака', en: 'Public cloud platforms' }, keywords: ['aws', 'azure', 'gcp', 'amazon web services'], status: 'missing', evidence: { ru: 'Конкретная облачная платформа пока не указана.', en: 'No specific cloud platform is currently listed.' } },
  { id: 'kafka', label: { ru: 'Kafka', en: 'Kafka' }, keywords: ['kafka'], status: 'missing', evidence: { ru: 'В публичном профиле нет подтверждения.', en: 'No evidence in the public profile.' } },
];

const demo: Record<Language, string> = {
  ru: 'Ищем Senior .NET backend-разработчика. Нужен опыт C#, микросервисной архитектуры, PostgreSQL, Redis, Docker, Kubernetes, CI/CD, работы с legacy и code review. Будет плюсом Angular и применение AI-инструментов в разработке.',
  en: 'We are looking for a Senior .NET backend developer with C#, microservices, PostgreSQL, Redis, Docker, Kubernetes, CI/CD, legacy modernization and code review experience. Angular and AI-assisted development are a plus.',
};

function findMatches(text: string) {
  const normalized = ` ${text.toLowerCase().replace(/[\n,;:()]/g, ' ')} `;
  return requirements.filter((item) => item.keywords.some((keyword) => normalized.includes(keyword)));
}

type ModelContextLike = { registerTool?: (tool: Record<string, unknown>, options?: { signal?: AbortSignal }) => void | Promise<void> };

export function VacancyMatcher({ language }: { language: Language }) {
  const [value, setValue] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const matches = useMemo(() => (analyzed ? findMatches(value) : []), [analyzed, value]);
  const groups = useMemo(() => ({
    confirmed: matches.filter((item) => item.status === 'confirmed'),
    adjacent: matches.filter((item) => item.status === 'adjacent'),
    missing: matches.filter((item) => item.status === 'missing'),
  }), [matches]);

  const analyze = useCallback((text = value) => {
    setValue(text);
    setAnalyzed(Boolean(text.trim()));
    return findMatches(text);
  }, [value]);

  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContextLike }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'analyze_vacancy_match',
      title: 'Analyze vacancy match',
      description: 'Analyze a vacancy description locally and show which stated requirements are confirmed, adjacent, or not evidenced by Anton Vladimirov’s public resume.',
      inputSchema: { type: 'object', properties: { vacancyText: { type: 'string', minLength: 1 } }, required: ['vacancyText'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: true },
      execute(input: unknown) {
        const vacancyText = typeof input === 'object' && input && 'vacancyText' in input ? String((input as { vacancyText: unknown }).vacancyText) : '';
        if (!vacancyText.trim()) throw new Error('vacancyText must not be empty');
        const result = analyze(vacancyText);
        return { found: result.map((item) => ({ id: item.id, status: item.status })) };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, [analyze]);

  const c = language === 'ru' ? {
    kicker: '01 / ВАКАНСИЯ × ОПЫТ', title: 'Сопоставьте опыт с вакансией', desc: 'Вставьте описание вакансии. Анализ работает только в браузере: текст никуда не отправляется и не сохраняется.', placeholder: 'Вставьте требования вакансии…', demo: 'Подставить пример', action: 'Найти подтверждения', empty: 'Вставьте текст вакансии или используйте демонстрационный пример.', noMatch: 'Знакомые требования не найдены. Это не оценка соответствия — анализатор работает только с явно размеченными компетенциями.', confirmed: 'Подтверждено опытом', adjacent: 'Смежный опыт', missing: 'Нет подтверждения', found: 'требований распознано', privacy: 'Текст остаётся на вашем устройстве', questions: 'О чём стоит спросить на интервью', questionItems: ['Как вы выделяли микросервис из существующего монолита?', 'Как вы внедряете AI-инструменты без потери качества кода?', 'Какой подход используете при модернизации legacy-систем?'],
  } : {
    kicker: '01 / VACANCY × EXPERIENCE', title: 'Match the experience to your vacancy', desc: 'Paste a vacancy description. Analysis happens entirely in your browser: the text is never sent or saved.', placeholder: 'Paste the vacancy requirements…', demo: 'Use demo vacancy', action: 'Find evidence', empty: 'Paste a vacancy or use the demo example.', noMatch: 'No familiar requirements found. This is not a fit score—the analyzer only works with explicitly mapped competencies.', confirmed: 'Confirmed by experience', adjacent: 'Adjacent experience', missing: 'No evidence', found: 'requirements recognized', privacy: 'Text stays on your device', questions: 'Worth asking in an interview', questionItems: ['How did you extract a microservice from an existing monolith?', 'How do you introduce AI tools without sacrificing code quality?', 'How do you approach legacy modernization?'],
  };

  return (
    <section id="vacancy-match" className="matcher-section">
      <div className="matcher-heading"><p className="section-index">{c.kicker}</p><h2 className="section-title">{c.title}</h2><p>{c.desc}</p></div>
      <div className="matcher-workspace">
        <div className="matcher-input">
          <Textarea value={value} onChange={(event) => { setValue(event.target.value); setAnalyzed(false); }} placeholder={c.placeholder} aria-label={c.placeholder} className="min-h-48 resize-y border-border bg-background/70 p-4 text-base leading-6" />
          <div className="mt-3 flex flex-wrap gap-2"><Button size="lg" onClick={() => analyze()} disabled={!value.trim()}><Search />{c.action}</Button><Button size="lg" variant="outline" onClick={() => analyze(demo[language])}><Sparkles />{c.demo}</Button></div>
          <p className="mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground"><LockKeyhole size={13} />{c.privacy}</p>
        </div>
        <div className="matcher-results" aria-live="polite">
          {!analyzed && <div className="matcher-empty"><Search size={28} /><p>{c.empty}</p></div>}
          {analyzed && matches.length === 0 && <div className="matcher-empty"><AlertCircle size={28} /><p>{c.noMatch}</p></div>}
          {analyzed && matches.length > 0 && <>
            <p className="mb-5 font-mono text-xs uppercase tracking-[.12em] text-muted-foreground">{matches.length} {c.found}</p>
            {(['confirmed', 'adjacent', 'missing'] as MatchStatus[]).map((status) => groups[status].length > 0 && <div className="match-group" key={status}><h3>{status === 'confirmed' ? <Check /> : status === 'adjacent' ? <FlaskConical /> : <AlertCircle />}{c[status]}</h3>{groups[status].map((item) => <article className={`match-item ${status}`} key={item.id}><strong>{item.label[language]}</strong><p>{item.evidence[language]}</p></article>)}</div>)}
            <div className="interview-questions"><h3>{c.questions}</h3><ol>{c.questionItems.map((question) => <li key={question}>{question}</li>)}</ol></div>
          </>}
        </div>
      </div>
    </section>
  );
}
