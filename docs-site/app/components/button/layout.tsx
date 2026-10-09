import type { ReactNode } from "react";
import { ComponentHeader } from "@/components/site/ComponentHeader";
import { PageArticle } from "@/components/site/Page";

export default function ButtonLayout({ children }: { children: ReactNode }) {
  return (
    <PageArticle>
      <ComponentHeader
        name="Button"
        slug="button"
        figmaNode="58-202"
        storybook="components-button--docs"
        lede="Buttons start actions: search, book, pay, confirm. Four hierarchies set how loudly a button asks for attention, so every screen has one clear next step."
      />
      {children}
    </PageArticle>
  );
}
