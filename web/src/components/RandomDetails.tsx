import { Button, Col, Divider, Row, Typography } from "antd";
import { debugginBorder, StyledClearButton } from "../utils/components";
const { Text, Link } = Typography;

const mockDetails = {
  logo: "./assets/icons/logo1.svg",
  descriptions:
    "บริการตกแต่งผนังที่ให้คุณได้เลือกสไตล์ วัสดุ และ accessories ได้เอง โดยมีระบบการผลิตที่เป็นมาตราฐานโดยใช้เครื่องจักรและการกำหนดค่าที่มีความละเอียดสูง รวมไปถึงระบบการติดตั้งที่ง่ายและรวดเร็ว เพื่อให้คุณได้ผนังสวยถูกใจเหมือนมีผู้ออกแบบมืออาชีพมาทำให้บ้านของคุณสวยด้วย Wallplast",
  image: "./assets/pictures/mockj-pic-1.jpg",
  link: "",
};

export default function RandomDetails() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 600, borderRadius: 24 }}
    >
      <img
        alt="example"
        src={mockDetails.image}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "0% 65%", borderRadius: 24 }}
        draggable={false}
        onClick={() => {}}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0, 0.6) 20%, transparent 70%)",
          borderRadius: 24,
        }}
      >
        <Row className="mt-12">
          <Col push={2} span={10}>
            <img
              className="dark:invert"
              src={mockDetails?.logo}
              alt="xsurface main logo"
              width={170}
              height={20}
            />
          </Col>
        </Row>
        <Row className="mt-6">
          <Col push={2} span={10} style={{ borderBottom: "2px solid white" }} />
        </Row>
        <Row className="mt-18">
          <Col push={2} span={10}>
            <span className="text-lg text-white">
              {mockDetails?.descriptions}
            </span>
          </Col>
        </Row>
        <Row className="my-18">
          <Col push={2} span={2} />
          <StyledClearButton
            className="w-[20%]"
            shape="round"
            variant="solid"
            style={{}}
          >
            View more {"----->"}
          </StyledClearButton>
        </Row>
      </div>
    </div>
  );
}
