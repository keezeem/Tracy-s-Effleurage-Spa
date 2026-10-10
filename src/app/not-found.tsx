import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero title="This page has drifted off." intro="The page you were looking for is not here. Let's take you somewhere calmer." />
      <section className="section-y on-light">
        <div className="container-x flex flex-wrap gap-6">
          <Link href="/" className="border-b border-espresso pb-1 hover:border-champagne">Back to home</Link>
          <Link href="/treatments" className="border-b border-espresso pb-1 hover:border-champagne">View treatments</Link>
        </div>
      </section>
    </>
  );
}
