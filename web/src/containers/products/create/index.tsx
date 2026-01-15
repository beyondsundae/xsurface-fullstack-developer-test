import { theme } from "@/src/utils/theme";
import { formatFileSize } from "@/src/utils/utils";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  InputNumberProps,
  message,
  Row,
  Spin,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
const { Text, Link } = Typography;
const { Dragger } = Upload;

import { v4 as uuid } from "uuid";
type FieldType = {
  productName: string;
  code: string;
  price: number;
};

type UsageLimit = {
  count: number;
  timeStamp?: Dayjs;
};

type UsageCheck = {
  isAllowed: boolean;
  diff?: number;
};

const maxLength = 6;
const maxFileSize = 50;
const toReleaseSecs = 5 * 60 * 60;
const maxActionCount = 25;

const roundedInput = { borderRadius: 24, padding: "10px 20px" };

const formatter: InputNumberProps<number>["formatter"] = (value) => {

  const [start, end] = `${value}`.split(".") || [];
  const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");


  return `${end ? `${v}.${end}` : `${v}`}`;
};

interface props {}

export default function CreateProduct({}: props) {
  /* ---------------------------------- state --------------------------------- */
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedURL, setUploadedURL] = useState<string[]>([]);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  /* ---------------------------------- form ---------------------------------- */
  const [form] = Form.useForm();

  /* -------------------------------- variables ------------------------------- */

  const limitUsage = {
    timeStamp: dayjs(),
    count: 0,
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    pastable: true,
    maxCount: maxLength,
    accept: "image/*",
    action: "/api/noop",
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload: async (file, fileList) => {
      const fileSize = formatFileSize(file?.size);

      if (fileSize > maxFileSize) {
        message.warning(
          `${file?.name} file size is too large (${fileSize?.toFixed(2)} Mb)`
        );

        return false;
      }
      const usageCheck = canCounterUp();
      if (!usageCheck?.isAllowed) {
        message.error(
          `reached limit, ${usageCheck?.diff} sesconds left to reset`
        );
        return false;
      }

      const alreadyUploaded = uploadedURL?.length;
      const fileIndex = fileList.findIndex((each) => each.uid === file.uid);
      const allowed = alreadyUploaded + fileIndex < maxLength;

      if (!allowed) {
        message.warning(`Maximum ${maxLength} images allowed`);
        return Upload.LIST_IGNORE;
      }

      await doUploadToS3(file);
      return false;
    },

    onChange: async (info) => {},
    onDrop(e) {},
    showUploadList: false,
    disabled: uploadedURL?.length >= maxLength || isUploading || isDisabled,

    onPreview: (file) => {},
    onRemove: (file) => {
      message.info(`${file.name} file removed successfully.`);
    },
  };

  /* -------------------------------- functions ------------------------------- */

  const getXSFLocalStorage = () => {
    const currentUsage = localStorage.getItem("xsf-test");

    if (currentUsage) {
      const tset = JSON?.parse(currentUsage);
      return tset;
    }
  };

  const setXSFLocalStorage = (value: Record<string, unknown>) => {
    localStorage.setItem("xsf-test", JSON.stringify(value));
  };

  const usageChecker = (currentUsage: UsageLimit): UsageCheck | undefined => {
    const diffTime = dayjs().diff(dayjs(currentUsage?.timeStamp), "second");
    const isDiffMoreThan5hrs = diffTime > toReleaseSecs;

    if (currentUsage?.count >= maxActionCount) {
      if (isDiffMoreThan5hrs) {
        currentUsage = limitUsage;
      } else {
        return { isAllowed: false, diff: toReleaseSecs - diffTime };
      }
    } else {
      if (isDiffMoreThan5hrs) {
        setXSFLocalStorage(limitUsage);
      }
    }

    return;
  };

  const canCounterUp = () => {
    let currentUsage = getXSFLocalStorage() || limitUsage;

    const checkedResult = usageChecker(currentUsage);

    if (checkedResult) {
      return checkedResult;
    }

    currentUsage = {
      timeStamp: dayjs(),
      count: Number(currentUsage["count"]) + 1,
    };

    setXSFLocalStorage(currentUsage);

    return { isAllowed: true };
  };

  const doUploadToS3 = async (data: UploadFile<File>) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", data as unknown as Blob);
      formData.append("bucket", process.env.NEXT_PUBLIC_BUCKET!);
      formData.append(
        "key",
        `${process.env.NEXT_PUBLIC_BUCKET_PRODUCTS_FOLDER}/${uuid()}.jpg`
      );

      const result = await axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/s3-client/upload`,
          formData
        )
        ?.then(({ data: latestUploadedURL = null }) => {
          if (latestUploadedURL) {
            setUploadedURL((prev) => [...prev, latestUploadedURL]);

            message.success("Files uploaded successfully!");
          }
        });
    } catch (error) {
      message.error(`Failed to upload image to S3. Please try again. ${error}`);
    } finally {
      setIsUploading(false);
    }
  };

  const onReset = () => {
    setUploadedURL([]);

    message.success("Reset form sucessfully");
  };
  const createProduct = async (values: FieldType) => {
    const result = await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/create`, {
        images: uploadedURL,
        ...values,
      })
      .then(({ data }) => {
        message.success(
          `Created product sucessfully ${data?.code}-${data?.productName}`
        );
        setUploadedURL([]);
        form?.resetFields();
      })
      .catch((err) => {
        const errMessage = err?.response?.data?.message;

        message.error(`Failed to upload product, ${err}, ${errMessage}`);
      });
  };

  /* --------------------------------- render --------------------------------- */
  const RenderImagesComponent = useMemo(() => {
    return (
      <Image.PreviewGroup
        preview={{
          onChange: (current, prev) => {},
          actionsRender: () => <></>,
        }}
      >
        {uploadedURL?.map((each, index) => (
          <div key={index} className="mx-2 shadow-sm rounded-lg">
            <Image
              style={{ objectFit: "cover" }}
              height={128}
              width={128}
              alt="basic"
              src={each}
            />
            <div
              className="text-center bg-red-400 rounded-sm"
              onClick={async () => {
                setDeletingIndex(index);
                const splitted = each?.split("/");
                const key = `${splitted?.[3]}/${splitted?.[4]}`;

                try {
                  const result = await axios
                    .post(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/s3-client/delete`,
                      {
                        Bucket: process.env.NEXT_PUBLIC_BUCKET!,
                        Key: key,
                      }
                    )
                    ?.then(({ data }) => {
                      const { status } = data || {};

                      if (status) {
                        message.success(
                          `${data?.key} file deleted successfully.`
                        );

                        if (index > -1) {
                          setUploadedURL((prev) => {
                            if (!prev) return prev;

                            const next = [...prev];
                            next.splice(index, 1);
                            return next;
                          });

                          setDeletingIndex(null);
                        }
                      }
                    });
                } catch (error) {
                  message.error(
                    `Failed to deleting image to S3. Please try again. ${error}`
                  );
                }
              }}
              style={{ cursor: "pointer" }}
            >
              {deletingIndex && deletingIndex === index ? (
                <Spin />
              ) : (
                <DeleteOutlined style={{ color: "white" }} />
              )}
            </div>
          </div>
        ))}
      </Image.PreviewGroup>
    );
  }, [uploadedURL, setUploadedURL, deletingIndex, setDeletingIndex]);

  const onFinish = async (values: FieldType) => {
    await createProduct(values);
  };

  useEffect(() => {
    const currentUsage = getXSFLocalStorage();
    const firstCheck = usageChecker(currentUsage);
    if (firstCheck && !firstCheck?.isAllowed) {
      message.error(
        `reached limit, ${firstCheck?.diff} sesconds left to reset`
      );
      setIsDisabled(true);
    }
  }, []);

  return (
    <>
      <Row className="w-full mt-3 pt-8">
        <Col push={1} span={5}>
          {" "}
          <span className="text-xl ">Upload Product</span>
        </Col>
      </Row>
      <Row className="w-screen h-full justify-center mt-3 pt-8">
        <Dragger {...uploadProps} className="w-2/4 h-[300px] border-dashed">
          <p className="ant-upload-drag-icon">
            <UploadOutlined style={{ color: theme.color.secondary }} />
          </p>
          <p className="ant-upload-text">
            Drag & Drop or <u className="text-blue-600/75">Choose file</u> to
            upload
          </p>
          <p className="ant-upload-hint">JPG. or PNG Maximum file size 50MB.</p>
        </Dragger>
      </Row>

      <Row justify={"center"}>
        <Col offset={10}>
          <span style={{ color: theme.color.secondary }}>
            {isUploading && <Spin />}{" "}
            {`Image upload (${uploadedURL?.length}/${maxLength})`}
          </span>
        </Col>
      </Row>
      <Row className="w-full h-full my-5 justify-center">
        {/* <Col offset={5} /> */}
        {RenderImagesComponent}
      </Row>
      <Row className="w-full justify-center mt-3 pt-8">
        <Form
          disabled={isDisabled}
          layout={"vertical"}
          form={form}
          size="large"
          onFinish={onFinish}
          className="rounded-lg w-2/5"
          // style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
        >
          <Form.Item<FieldType>
            label="Product name"
            name="productName"
            rules={[{ required: true, message: "Please input Product name!" }]}
          >
            <Input
              placeholder="Product name"
              className="pt-6"
              max={50}
              style={{ ...roundedInput }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Code"
            name="code"
            rules={[{ required: true, message: "Please inputCode!" }]}
          >
            <Input placeholder="Code" max={50} style={{ ...roundedInput }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input Price!" }]}
          >
            <InputNumber
              size={"default" as SizeType}
              style={{ ...roundedInput, width: "100%" }}
              min={0}
              prefix={"฿"}
              placeholder="1,000"
              precision={2}
              formatter={formatter}
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "") as unknown as number
              }
              controls={false}
              // onChange={onChange}
              // stringMode
            />
          </Form.Item>

          <Form.Item label={null} className="text-center ">
            <Row className="mt-12" justify="space-evenly">
              <Button
                className="w-2/6"
                shape="round"
                variant="outlined"
                color="danger"
                type="default"
                htmlType="reset"
                onClick={() => onReset()}
              >
                ยกเลิก
              </Button>
              <Button
                className="w-2/6"
                shape="round"
                color="danger"
                variant="solid"
                htmlType="submit"
                // disabled={uploadedURL?.length === 0}
              >
                ยืนยัน
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
}
