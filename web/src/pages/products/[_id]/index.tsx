import EditProduct from "@/src/containers/products/edit";
import Product from "@/src/containers/products/list";
import ProductShow from "@/src/containers/products/show";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { _id } = router.query;
  if (!_id) {
    return <div>ssr loading.. order</div>;
  }

  return <EditProduct productCode={_id as string} />;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Page />
    </section>
  );
}
