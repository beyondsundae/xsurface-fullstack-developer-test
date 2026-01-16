import LandingPage from "@/src/containers/landingPage";
import Products from "@/src/containers/products/list";
import { useRouter } from "next/router";

const Page = () => {
  return <Products />;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Page />
    </section>
  );
}
