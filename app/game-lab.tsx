import { ArrowUpRight, Code2, Dices, FlaskConical, Gamepad2, Orbit, Puzzle } from 'lucide-react';

type Language = 'ru' | 'en';

export function GameLab({ language }: { language: Language }) {
  const c = language === 'ru' ? {
    kicker: '04 / GAME LAB', title: 'Лаборатория игровых механик',
    lead: 'Не называю себя коммерческим геймдизайнером. Я senior-инженер, который системно изучает игры через собственные прототипы на Unity.',
    manifesto: 'Меня интересуют не отдельные «фичи», а системы, в которых простые правила взаимодействуют и создают неожиданные игровые ситуации.',
    processTitle: 'Как я экспериментирую',
    process: [
      ['01', 'Гипотеза', 'Формулирую, какое поведение или ощущение должна создать механика.'],
      ['02', 'Прототип', 'Самостоятельно собираю минимальную проверяемую версию в Unity.'],
      ['03', 'Наблюдение', 'Играю, сравниваю ожидание с реальным поведением системы.'],
      ['04', 'Итерация', 'Меняю правила, параметры или реализацию и повторяю цикл.'],
    ],
    directions: 'Что исследую',
    cards: [
      ['Системные механики', 'Взаимодействие правил, из которого возникает глубина без лишней сложности.'],
      ['Живые системы', 'Поведение мира, которое реагирует на игрока и развивается не по одному сценарию.'],
      ['Настольная оптика', 'Использую опыт настольных игр, чтобы видеть экономику действий, темп и понятность правил.'],
    ],
    github: 'Открыть эксперименты на GitHub', note: 'Избранные прототипы добавим после отбора репозиториев.', engine: 'Основной инструмент', engineValue: 'Unity · C#', ownership: 'Формат', ownershipValue: 'Solo · от идеи до прототипа',
  } : {
    kicker: '04 / GAME LAB', title: 'Game mechanics laboratory',
    lead: 'I do not present myself as a commercial game designer. I am a senior engineer who studies games systematically through independent Unity prototypes.',
    manifesto: 'I am interested not in isolated features, but in systems where simple rules interact to produce unexpected gameplay situations.',
    processTitle: 'How I experiment',
    process: [
      ['01', 'Hypothesis', 'Define the behavior or feeling the mechanic should create.'],
      ['02', 'Prototype', 'Build the smallest testable version independently in Unity.'],
      ['03', 'Observe', 'Play and compare the intended behavior with the actual system.'],
      ['04', 'Iterate', 'Change rules, parameters or implementation and repeat the cycle.'],
    ],
    directions: 'What I explore',
    cards: [
      ['Systemic mechanics', 'Rules that interact to create depth without unnecessary complexity.'],
      ['Living systems', 'World behavior that reacts to the player and does not follow a single script.'],
      ['Board-game lens', 'Using board-game experience to reason about action economy, pacing and rule clarity.'],
    ],
    github: 'Explore experiments on GitHub', note: 'Selected prototypes will appear here after the repositories are curated.', engine: 'Primary tool', engineValue: 'Unity · C#', ownership: 'Format', ownershipValue: 'Solo · idea to prototype',
  };

  const icons = [Orbit, Puzzle, Dices];
  return (
    <section id="game-lab" className="game-lab-expanded">
      <div className="game-lab-intro">
        <div><p className="section-index !text-current/60">{c.kicker}</p><h2 className="section-title">{c.title}</h2><p className="game-lab-lead">{c.lead}</p></div>
        <aside><Gamepad2 /><blockquote>{c.manifesto}</blockquote><dl><div><dt>{c.engine}</dt><dd>{c.engineValue}</dd></div><div><dt>{c.ownership}</dt><dd>{c.ownershipValue}</dd></div></dl></aside>
      </div>

      <div className="lab-process">
        <h3><FlaskConical /> {c.processTitle}</h3>
        <ol>{c.process.map(([number, title, text]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{text}</p></li>)}</ol>
      </div>

      <div className="lab-directions">
        <h3>{c.directions}</h3>
        <div>{c.cards.map(([title, text], index) => { const Icon = icons[index]; return <article key={title}><Icon /><h4>{title}</h4><p>{text}</p></article>; })}</div>
      </div>

      <div className="lab-footer"><p>{c.note}</p><a href="https://github.com/drosan-dev" target="_blank" rel="noreferrer"><Code2 />{c.github}<ArrowUpRight /></a></div>
    </section>
  );
}
