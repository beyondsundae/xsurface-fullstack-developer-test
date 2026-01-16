import { Breadcrumb } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadcrumbLayout() {
  /* -------------------------------- variables ------------------------------- */
  const pathname = usePathname();
  const excludedPath = ['landing-page']

  const title = (pathname as string)
  ?.split("/")
  ?.filter(Boolean)
  ?.slice(0)
  ?.join(" ");

  if(excludedPath?.includes(title)) return
  
  return (
    <div className="m-5">
      <Breadcrumb
        items={[
          {
            title: <Link href="/landing-page">Landing Page</Link>,
          },

          {
            title: title,
          },
        ]}
      />
    </div>
  );
}
