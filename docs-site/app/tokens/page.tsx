import type { Metadata } from "next";
import { DocsApp } from "@/components/DocsApp";
import tokens from "@/data/tokens.json";
import type { TokenData } from "@/lib/types";

export const metadata: Metadata = { title: "Token reference" };

export default function TokensPage() {
  return <DocsApp data={tokens as unknown as TokenData} />;
}
