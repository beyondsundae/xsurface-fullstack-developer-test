import {
  Row,
  Col,
  Input,
  Space,
  Button,
  Menu,
  MenuProps,
  FloatButton,
  DrawerProps,
  RadioChangeEvent,
  Drawer,
} from "antd";
import Image from "next/image";
import { CSSProperties, useMemo, useState } from "react";
import { StyledCenterDiv } from "../utils/components";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  DownloadOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  PauseOutlined,
  PieChartOutlined,
  ProductOutlined,
  SearchOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { MaskType } from "antd/es/_util/hooks";
import router from "next/router";

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

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "grp",
    label: "Products",
    type: "group",
    children: [
      {
        key: "sub1",
        icon: <ProductOutlined />,
        onClick: () => {
          router.push("/products");
        },
        label: "Products List",
      },
      {
        key: "1-1",
        icon: <UploadOutlined />,
        onClick: () => {
          router.push("/products/create");
        },
        label: "Create Product",
      },
    ],
  },
];

const onClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

export default function Navbar({}: Props) {
  /* ---------------------------------- state --------------------------------- */
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
          <StyledCenterDiv>
            <Icon
              path={path}
              altName={altName}
              style={{ ...style, display: "block" }}
            />
            <span>{title}</span>
          </StyledCenterDiv>
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
    <>
      <Drawer
        size={300}
        styles={{ body: { padding: 0 } }}
        mask={{ blur: false }}
        closable={{ placement: "end" }}
        title={
          <>
            <Image
              className="dark:invert"
              src="assets/logo.svg"
              alt="xsurface main logo"
              width={170}
              height={20}
              priority
            />
          </>
        }
        placement={"left"}
        onClose={onClose}
        open={open}
        key={"left"}
      >
        <Menu
          onClick={onClick}
          style={{ width: "100%" }}
          mode="vertical"
          items={items}
        />
      </Drawer>

      <div>
        <nav style={{ borderBottom: "1px solid #f0f0f0" }}>
          <Row className="my-3">
            {/* space */}
            <Col span={1}>
              <Button
                type="text"
                onClick={showDrawer}
                style={{ marginBottom: 16 }}
              >
                {open ? <PauseOutlined /> : <MenuOutlined />}
              </Button>
            </Col>

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
                style={{ borderRadius: 25 }}
                prefix={<SearchOutlined />}
                placeholder={"ค้นหาสินค้า"}
                suffix={
                  <Button
                    color="danger"
                    variant="filled"
                    shape="round"
                    style={{ backgroundColor: "#F3F1F2" }}
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

            <Col span={1} />
          </Row>
        </nav>
      </div>
    </>
  );
}
