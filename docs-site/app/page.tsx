import { DocsApp } from "@/components/DocsApp";
import tokens from "@/data/tokens.json";
import type { TokenData } from "@/lib/types";

export default function Home() {
  return <DocsApp data={tokens as unknown as TokenData} />;
}
