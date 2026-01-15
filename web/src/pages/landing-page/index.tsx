import LandingPage from "@/src/containers/landingPage";
import { useRouter } from "next/router";

const Page = () => {
  return <LandingPage />;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Page />
    </section>
  );
}
