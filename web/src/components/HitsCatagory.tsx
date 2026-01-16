import { UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Row } from "antd";
import { StyledCenterDiv } from "../utils/components";

//center span={24} offset={11}
//center Row justify='center
// justify="space-evenly" // space-full
// justify="space-around" align="middle"

const mockCard = [
  { productName: "Laminate", img: "" },
  { productName: "Tile", img: "" },
  { productName: "Stone", img: "" },
  { productName: "Wood", img: "" },
  { productName: "Mirror", img: "" },
  { productName: "WPC", img: "" },
  { productName: "Metal", img: "" },
  { productName: "All Product", img: "" },
];

export default function HitsCatagory() {
  return (
    <div style={{ border: "1px solid transparent" }}>
      <Row
        justify="space-evenly"
        className="mt-10 mb-12 w-full px-[120px]"
        style={{ border: "1px solid transparent" }}
      >
        {mockCard?.map((each, index) => (
          <Col key={index} style={{ border: "1px solid transparent" }}>
            <StyledCenterDiv>
              <Avatar
                className="rounded-xl"
                style={{ borderRadius: 16 }}
                src={each?.img}
                shape="square"
                size={96}
                icon={<UserOutlined />}
              />

              <span>{each?.productName}</span>
            </StyledCenterDiv>
          </Col>
        ))}
      </Row>
    </div>
  );
}
