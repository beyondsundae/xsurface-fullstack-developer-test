import { theme } from "../utils/theme";
import CardCarouselHighlight from "./CardCarouselHighlight";
import { IProduct } from "./types/interface";

const dataTotal = 20;

export default function Collections() {
  const mockLatestViewedProducts: IProduct[] = Array(dataTotal)
    .fill({
      title: "FUVAL (Silver)...",
      code: "CODE12345678",
      catagory: "กระจก",
      isExclusiveDeal: true,
      discountPercentage: 0,
      img: "https://www.nawy.com/blog/wp-content/uploads/2022/07/interior-design.jpg",
      price: 990,
      priceAfterDiscount: 550,
      unit: "ตร.ม.",
      viewed: 1000,
      dimension: {
        width: 60,
        height: 100,
        depth: 4.5,
        unit: "cm.",
      },
      avaibleStock: 10,
    })
    ?.map((each, index) => ({ no: index, ...each }));

  return (
    <CardCarouselHighlight
      data={mockLatestViewedProducts}
      description={
        <span>
          ค้นหาแรงบันดาลใจ ผ่านการออกแบบ <br />
          และคัดสรรวัสดุที่น่าสนใจเข้าไว้ด้วยกัน
        </span>
      }
      title={"Collections"}
      linkColor={theme.color.XClusiveDeal}
      backgroundColor={theme.color.collectionsBackground}
    />
  );
}
