import { Row, Col, Input, Space, Button } from "antd";
import Image from "next/image";
import { CSSProperties, useMemo } from "react";
import { CenterDiv } from "../utils/components";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";

interface Props {}

interface IDetails {
  title?: string;
  path: string;
  altName: string;
  style?: CSSProperties;
}

const menuKeys = [
  { key: "collection", title: "คอลเลคชั่น" },
  { key: "material-album", title: "แมททีเรียลอัลบัม" },
  { key: "material-board", title: "แมททีเรียลบอร์ด" },
  { key: "cart", title: "ตะกร้า" },
  { key: "profile", title: "โปรไฟล์" },
];

const menuList: IDetails[] = menuKeys.map(({ key, title }) => ({
  path: `/assets/icons/icon-${key}.svg`,
  altName: `icon-${key}`,
  title,
}));

export default function Navbar({}: Props) {
  /* ------------------------------- components ------------------------------- */
  const Icon = ({ path, altName, style }: IDetails) => {
    return (
      <Image
        style={style}
        className="dark:invert"
        src={path}
        alt={altName}
        width={16}
        height={20}
        priority
      />
    );
  };
  const MenuList = ({ title, path, altName, style }: IDetails) => {
    return (
      <>
        <Button className="mt-2" style={{ border: "1px solid transparent" }}>
          <CenterDiv>
            <Icon
              path={path}
              altName={altName}
              style={{ ...style, display: "block" }}
            />
            <span>{title}</span>
          </CenterDiv>
        </Button>
      </>
    );
  };

  /* --------------------------------- render --------------------------------- */
  const RenderList = useMemo(
    () =>
      menuList.map(({ title, path, altName }) => (
        <MenuList key={altName} title={title} path={path} altName={altName} />
      )),
    []
  );
  return (
    <div>
      <nav style={{ borderBottom: "1px solid #f0f0f0" }}>
        <Row className="my-3">
          {/* space */}
          <Col span={1} />

          {/* logo */}
          <Col span={3}>
            <Image
              className="dark:invert"
              src="assets/logo.svg"
              alt="xsurface main logo"
              width={170}
              height={20}
              priority
            />
          </Col>

          {/* search bar */}
          <Col span={8} className="mx-2">
            <Input
              className="h-full"
              style={{ borderRadius: 25}}
              prefix={<SearchOutlined />}
              placeholder={"ค้นหาสินค้า"}
              suffix={
                <Button
                  color="danger"
                  variant="filled"
                  shape="round"
                  style={{backgroundColor: '#F3F1F2'}}
                  icon={
                    <Image
                      className="dark:invert"
                      src={"/assets/icons/icon-search-by-pic.svg"}
                      alt={"search-by-pic"}
                      width={16}
                      height={20}
                      priority
                    />
                  }
                  size={"small"}
                >
                  ค้นหาด้วยรูป
                </Button>
              }
              allowClear
            />
          </Col>

          {/* render menu */}
          <Col style={{ border: "1px solid transparent" }}>
            <Space size="small" wrap>
              {RenderList}
            </Space>
          </Col>

          {/* login */}
          <Col
            span={2}
            className="text-center "
            style={{ border: "1px solid transparent" }}
          >
            <Button
              color="danger"
              className="my-1"
              style={{ border: "1px solid transparent", borderRadius: 10 }}
              variant="solid"
            >
              Login
            </Button>
            <Button type="text" className="my-1">
              ⋯
            </Button>
          </Col>

          {/* optoins */}
          {/* <Col span={1} style={{ border: "1px solid transparent" }}>
            <Button className="my-1">
              ⋯
            </Button>
          </Col> */}

          <Col span={1} />
        </Row>
      </nav>
      คอลเลคชั่น
    </div>
  );
}
