import Link from "next/link";
import type { ReactNode } from "react";

type RouteHubCard = {
  href: string;
  title: string;
  description: string;
  meta?: string;
};

type RouteHubProps = {
  eyebrow: string;
  title: string;
  description: string;
  cards: RouteHubCard[];
  footer?: ReactNode;
};

export default function RouteHub({ eyebrow, title, description, cards, footer }: RouteHubProps) {
  return (
    <main className="hubShell">
      <section className="hubHero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hubDescription">{description}</p>
      </section>

      <section className="hubGrid" aria-label={title}>
        {cards.map((card) => (
          <Link className="hubCard" href={card.href} key={card.href}>
            <span className="hubCardTitle">{card.title}</span>
            <small>{card.description}</small>
            {card.meta ? <strong>{card.meta}</strong> : null}
          </Link>
        ))}
      </section>

      {footer ? <section className="hubFooter">{footer}</section> : null}
    </main>
  );
}
