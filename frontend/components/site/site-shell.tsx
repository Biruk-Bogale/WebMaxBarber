import { Header } from "./header";
import { Footer } from "./footer";
import { PromoBanner } from "./promo-banner";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PromoBanner />

      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
