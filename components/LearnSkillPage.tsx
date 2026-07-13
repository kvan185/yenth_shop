import Link from "next/link";

type SkillLesson = {
  title: string;
  detail: string;
  href: string;
};

type LearnSkillPageProps = {
  accent: string;
  backHref?: string;
  description: string;
  lessons: SkillLesson[];
  nextHref: string;
  nextLabel: string;
  title: string;
};

export default function LearnSkillPage({
  accent,
  backHref = "/learn",
  description,
  lessons,
  nextHref,
  nextLabel,
  title,
}: LearnSkillPageProps) {
  return (
    <main className="skillPage">
      <section className="skillHero">
        <div>
          <p className="homeEyebrow">Learn / {accent}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="toolHeroActions">
          <Link className="primaryButton" href={nextHref}>
            {nextLabel}
          </Link>
          <Link className="secondaryButton" href={backHref}>
            Về Learn
          </Link>
        </div>
      </section>

      <section className="skillChecklist">
        {lessons.map((lesson, index) => (
          <article className="skillStep" key={lesson.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{lesson.title}</h2>
              <p>{lesson.detail}</p>
            </div>
            <Link href={lesson.href}>Mở</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
