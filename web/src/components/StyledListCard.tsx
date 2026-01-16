import { Card, Carousel, Col, Row, Typography } from "antd";
import router from "next/router";
import { useCallback } from "react";
import { theme } from "../utils/theme";
import { formatPrice } from "../utils/utils";
import { IProduct } from "./types/interface";
const { Text, Link } = Typography;

interface props {
  index?: number;
  item?: IProduct;
  imgHeight?: string | number | undefined;
}
export default function StyledListCard({
  index,
  item,
  imgHeight = "200px",
}: props) {
  const goToProductDetail = useCallback(
    () => item?.code && router.push(`/products/${item?.code}/show`),
    [item?.code]
  );

  return (
    <>
      <Card
        hoverable
        className="w-full shadow-lg"
        style={{ borderRadius: 16 }}
        styles={{ body: { padding: 10 } }}
        cover={
          <div className="simply-carousel ">
            <Carousel arrows autoplay>
              {(item?.images?.length ? item?.images : [null])?.map(
                (each, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={each ?? "/assets/pictures/default-product-pic.png"}
                        onClick={() => {
                          goToProductDetail();
                        }}
                        style={{
                          height: imgHeight,
                          width: "100%",
                          objectFit: "cover",
                        }}
                        className="anim-fade-in"
                      />
                    </div>
                  );
                }
              )}
            </Carousel>
          </div>
        }
      >
        <div
          onClick={() => {
            goToProductDetail();
          }}
        >
          <Row className="">
            <Col flex={12} className="font-semibold">
              {item?.productName || "-"}
            </Col>
          </Row>
          <Row>
            <Col flex={12}>
              <Text type="secondary">{item?.code || "-"}</Text>
            </Col>
          </Row>
          <Row className="justify-end mt-10">
            <Col>
              <span
                style={{
                  color: theme.color.generalRed,
                }}
                className="font-bold text-lg"
              >
                {formatPrice(item?.priceAfterDiscount || item?.price)}
              </span>
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
}
