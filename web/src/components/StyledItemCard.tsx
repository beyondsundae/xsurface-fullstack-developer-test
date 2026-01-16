import { EyeFilled } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import { SetStateAction } from "react";
import { theme } from "../utils/theme";
import { formatPrice } from "../utils/utils";
import { SaveToMaterial } from "./icons/SVGComponents";
import { IProduct } from "./types/interface";
const { Text, Link } = Typography;

interface props {
  setCurrentActive?: (value: SetStateAction<number | null>) => void;
  index?: number;
  item?: IProduct;
  imgHeight?: string | number | undefined;
}
export default function StyledItemCard({
  setCurrentActive,
  index,
  item,
  imgHeight = "230px",
}: props) {
  const isStockAvaiable = (item?.avaibleStock as number) > 0;

  return (
    <>
      <Card
        hoverable
        style={{ width: 200, borderRadius: 16 }}
        styles={{ body: { padding: 10 } }}
        onClick={() => {
          typeof setCurrentActive === "function" &&
            setCurrentActive(index as number);
        }}
        cover={
          <img
            alt="example"
            src={item?.img}
            style={{
              height: imgHeight,
              width: "100%",
              objectFit: "cover",
            }}
            className="anim-fade-in"
          />
        }
      >
        <div>
          <Row className="">
            <Col flex={12} className="font-semibold">
              {index}-{item?.productName || "-"}
            </Col>
            <Col flex={2}>
              <SaveToMaterial />
            </Col>
          </Row>
          <Row>
            <Col flex={12}>
              <Text type="secondary">{item?.code || "-"}</Text>
            </Col>
            <Col flex={2}>
              <EyeFilled
                style={{
                  fontSize: 10,
                  color: theme.color.secondary,
                }}
              />
              <Text type="secondary">{item?.viewed}</Text>
            </Col>
          </Row>
          <Text type="secondary">{item?.catagory || "-"}</Text> <br />
          <Text className="font-medium">{`W${item?.dimension?.width} x H${item?.dimension?.height} x D${item?.dimension?.depth} ${item?.dimension?.unit}`}</Text>
          <Text>
            {item?.discountPercentage ? (
              <s>{formatPrice(item?.price) || "-"}</s>
            ) : (
              <>
                <br />
                <br />
              </>
            )}
          </Text>
          <Row>
            <Col flex={12}>
              <Text
                style={{
                  color: item?.discountPercentage
                    ? theme.color.generalRed
                    : "black",
                }}
                className="font-bold"
              >
                {formatPrice(item?.priceAfterDiscount)}
              </Text>
            </Col>
            <Col flex={1}>
              <Text type={isStockAvaiable ? "success" : "danger"}>
                {isStockAvaiable ? "In Stock" : "Out of Stock"}
              </Text>
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
}
