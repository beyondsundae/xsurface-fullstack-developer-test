import { Button, Col, Flex, Row } from "antd";
import { theme } from "../utils/theme";
import Image from "next/image";
import {
  debugginBorder,
  StyledSecondaryText,
  StyledWhiteText,
} from "../utils/components";
import { DownloadOutlined } from "@ant-design/icons";
import {
  SourceFBIcon,
  SourceIGIcon,
  SourceTTIcon,
} from "./icons/SVGComponents";

const mockAboutUs = [
  {
    title: "เกี่ยวกับเรา",
    link: "/aboutus",
  },
  {
    title: "สมัครงาน",
    link: "/apply-job",
  },
  {
    title: "คำถามที่พบบ่อย",
    link: "/fqa",
  },
];

import router from "next/router";
import Link from "next/link";

export default function Footer() {
  const souceSocialList = [
    <SourceFBIcon key={"SourceFBIcon"} />,
    <SourceIGIcon key={"SourceIGIcon"} />,
    <SourceTTIcon key={"SourceTTIcon"} />,
  ];

  return (
    <div
      className="relative w-full"
      style={{ backgroundColor: theme.color.footer }}
    >
      <Row justify="center">
        <Image
          className="dark:invert my-8"
          src="assets/logo-light.svg"
          alt="xsurface main logo"
          width={170}
          height={20}
          priority
        />

        <Col className="text-center" span={24}>
          <StyledWhiteText className="my-8">
            เมื่อวัสดุปิดผิว การตกแต่ง มารวมกันในแพตฟอร์มที่เน้นการออกแบบ
          </StyledWhiteText>
        </Col>
      </Row>
      <Row justify="center" className="my-12">
        <Col span={5} >
          <StyledWhiteText>เกี่ยวกับเรา</StyledWhiteText>

          <Row className="my-6">
            <Flex vertical gap="middle" >
              {mockAboutUs?.map((each, index) => (
                <Link href={each?.link} key={index}>
                  <StyledSecondaryText
                    className="text-start"
                    
                  >
                    {each?.title}
                  </StyledSecondaryText>
                </Link>
              ))}
            </Flex>
          </Row>
        </Col>
        <Col span={10} >
          <StyledWhiteText>ติดต่อเรา</StyledWhiteText>
          <Row className="my-6">
            <StyledSecondaryText className="max-w-70">
              เอ็กซ์เซอร์เฟส 53 ซอย สุขุมวิท 62, บางจาก, พระโขนง, กรุงเทพฯ 10260
            </StyledSecondaryText>
          </Row>
          <Row>
            <StyledWhiteText>อีเมล: {''}</StyledWhiteText>
            <StyledSecondaryText>support@xsurface.com</StyledSecondaryText>{" "}
            <StyledWhiteText>เบอร์: {''}</StyledWhiteText>
            <StyledSecondaryText>+66 65-656-2887</StyledSecondaryText>
          </Row>
        </Col>
        <Col span={5} >
          <StyledWhiteText>
            สมัครง่ายๆ ก็ลงขายกับเราได้เลย ฟรี ไม่มีค่าใช้จ่าย
          </StyledWhiteText>
          <Row>
            <Button
              className="w-full my-3"
              type="primary"
              danger
              style={{ backgroundColor: theme.color.generalRed }}
              shape="round"
            >
              ลงขายสินค้ากับเรา
            </Button>
          </Row>
        </Col>
      </Row>
      <Row justify="center">
        <Col className="text-center" span={24}>
          {souceSocialList?.map((each, index) => (
            <Button
              key={index}
              className="mx-3"
              type="primary"
              shape="circle"
              icon={each}
              size={"small"}
            />
          ))}

          <br />
          <StyledSecondaryText>© 2021 . Copyright of </StyledSecondaryText>
          <StyledWhiteText>XSURFACE Co. , Ltd.</StyledWhiteText>
        </Col>
      </Row>
      <Row justify="center">
        <StyledSecondaryText className="mx-2">
          นโยบายความเป็นส่วนตัว
        </StyledSecondaryText>
        <StyledSecondaryText className="mx-2">
          ข้อกำหนด และนโยบาย{" "}
        </StyledSecondaryText>
      </Row>
      Footer
    </div>
  );
}
