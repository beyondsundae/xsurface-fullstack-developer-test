import ProductShow from "@/src/containers/products/show";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { _id } = router.query;

  if (!_id) {
    return <div>ssr loading.. order</div>;
  }

  return <ProductShow productCode={_id as string} />;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Page />
    </section>
  );
}
