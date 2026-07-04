import Link from "next/link";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
};

export default function PlaceholderPage({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
}: PlaceholderPageProps) {
  return (
    <main className="placeholderShell">
      <section className="placeholderCard">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hubDescription">{description}</p>
        <Link className="secondaryButton placeholderLink" href={backHref}>
          {backLabel}
        </Link>
      </section>
    </main>
  );
}
