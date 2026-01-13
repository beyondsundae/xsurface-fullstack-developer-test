import { Avatar, Col, Row, Space, Typography } from "antd";
import { debugginBorder } from "../utils/components";
import { useMemo } from "react";
const { Text, Link } = Typography;

const mockRelatedBrads = Array(7).fill(null);
const sizeData = 4;

export default function RelatedBrands() {
  const chunkArray = (data: unknown[], size: number) => {
    return Array.from(
      { length: Math.ceil(data.length / size) },
      (each, index) => {
        const startAt = index * size;
        return data.slice(startAt, startAt + size);
      }
    );
  };

  const chunkedData = useMemo(
    () => chunkArray(mockRelatedBrads, sizeData),
    [mockRelatedBrads, sizeData]
  );
  return (
    <div
      className="relative w-full overflow-hidden"
    >
      <Row justify={"center"} className="my-12">
        <span className="text-2xl">ร้านค้าที่ร่วมขายกับเรา</span>
      </Row>

      {chunkedData?.map((eachData, index) => (
        <Row key={index} justify={"center"} className="my-12">
          {eachData?.map((each, index) => (
            <Col key={index} className="mx-5">
              <Avatar
                className="rounded-xl"
                style={{ borderRadius: 16 }}
                src={""}
                shape="square"
                size={128}
              />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}
