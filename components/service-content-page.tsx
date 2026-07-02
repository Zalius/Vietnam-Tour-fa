import { InfoCard, InfoGrid, ServicePage } from "@/components/service-page";
import type { ServiceContent } from "@/lib/service-content";
import type { ReactNode } from "react";

export function ServiceContentPage({
  content,
  contactBlock,
}: {
  content: ServiceContent;
  contactBlock?: ReactNode;
}) {
  return (
    <ServicePage
      eyebrow={content.eyebrow}
      title={content.title}
      intro={content.intro}
      heroImage={content.heroImage}
    >
      <div className="mb-8 rounded-2xl bg-secondary p-6">
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          {content.body}
        </p>
      </div>

      {contactBlock}

      <InfoGrid>
        {content.cards.map((card) => (
          <InfoCard key={card.title} title={card.title}>
            <p>{card.body}</p>
          </InfoCard>
        ))}
      </InfoGrid>
    </ServicePage>
  );
}
