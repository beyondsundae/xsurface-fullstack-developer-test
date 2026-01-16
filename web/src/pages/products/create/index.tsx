import LandingPage from "@/src/containers/landingPage";
import CreateProduct from "@/src/containers/products/create";
import Products from "@/src/containers/products/list";
import { useRouter } from "next/router";

const Page = () => {
  return <CreateProduct />;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Page />
    </section>
  );
}
