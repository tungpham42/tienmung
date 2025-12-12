// src/ManagerTab.tsx
import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  message,
  Empty,
  Tooltip,
  Row,
  Col,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { GiftRecord, RelationshipType } from "./types";
import { formatCurrency } from "./utils";
import { giftService } from "./giftService";
import {
  PlusCircleFilled,
  DeleteTwoTone,
  SaveFilled,
  SyncOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

export const ManagerTab: React.FC = () => {
  const [data, setData] = useState<GiftRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setData(giftService.getAll());
      setLoading(false);
    }, 400);
  };

  const handleAdd = (values: any) => {
    const newRecord: GiftRecord = {
      id: Date.now().toString(),
      name: values.name,
      relationship: values.relationship,
      amount: values.amount,
      eventDate: values.eventDate.format("YYYY-MM-DD"),
      location: "Chưa rõ",
      isReturned: false,
    };

    const updated = giftService.add(newRecord);
    setData(updated);
    message.success({ content: "Đã lưu vào sổ rồi nha!", icon: "✍️" });
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Xóa dòng này?",
      content: "Xóa rồi là không tìm lại được đâu á!",
      okText: "Xóa luôn",
      okType: "danger",
      cancelText: "Giữ lại",
      centered: true,
      icon: <DeleteTwoTone twoToneColor="#FF6B6B" />,
      onOk() {
        const updated = giftService.delete(id);
        setData(updated);
        message.info("Đã xóa.");
      },
    });
  };

  const columns: ColumnsType<GiftRecord> = [
    {
      title: "Người mời",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <b style={{ fontSize: 16, color: "#4a4a4a" }}>{text}</b>
      ),
    },
    {
      title: "Quan hệ",
      dataIndex: "relationship",
      key: "relationship",
      render: (rel: RelationshipType) => {
        // Soft pastel colors for tags
        const colors: Record<string, string> = {
          closeFriend: "#B7E4C7", // Pastel Green
          family: "#FFE5D9", // Pastel Orange
          colleague: "#D8E2DC", // Pastel Gray-Green
          ex: "#FEC5BB", // Pastel Red
          social: "#F0EFEB", // Pastel Grey
        };
        const textColors: Record<string, string> = {
          closeFriend: "#2D6A4F",
          family: "#9D0208",
          colleague: "#495057",
          ex: "#641220",
          social: "#6C757D",
        };

        const labels: Record<string, string> = {
          closeFriend: "Bạn thân",
          family: "Họ hàng",
          colleague: "Đồng nghiệp",
          ex: "NYC",
          social: "Xã giao",
        };
        return (
          <Tag
            color={colors[rel]}
            style={{
              color: textColors[rel],
              borderRadius: 12,
              fontWeight: 700,
              border: "none",
              padding: "2px 10px",
            }}
          >
            {labels[rel] || rel}
          </Tag>
        );
      },
    },
    {
      title: "Tiền đi",
      dataIndex: "amount",
      key: "amount",
      render: (val) => (
        <span style={{ color: "#E07A5F", fontWeight: 700, fontSize: 15 }}>
          {formatCurrency(val)}
        </span>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Ngày cưới",
      dataIndex: "eventDate",
      key: "eventDate",
      render: (date) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            color: "#888",
          }}
        >
          <CalendarOutlined /> {dayjs(date).format("DD/MM/YYYY")}
        </div>
      ),
      sorter: (a, b) => dayjs(a.eventDate).unix() - dayjs(b.eventDate).unix(),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Tooltip title="Xóa">
          <Button
            type="text"
            danger
            icon={<DeleteTwoTone twoToneColor="#FF6B6B" />}
            onClick={() => handleDelete(record.id)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, fontSize: 18, color: "#4A4A4A" }}>
          📒 Danh sách đã đi ({data.length})
        </h3>
        <div>
          <Button
            icon={<SyncOutlined />}
            onClick={loadData}
            style={{ marginRight: 8, borderRadius: 12 }}
          />
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={() => setIsModalOpen(true)}
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 10px rgba(255, 154, 139, 0.4)",
            }}
          >
            Ghi thêm
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Chưa có đám nào, ví còn dày! 😆"
            />
          ),
        }}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 600 }}
      />

      <Modal
        title={<span style={{ fontSize: 20 }}>📝 Ghi sổ đám mới</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={500}
      >
        <Form
          form={form}
          onFinish={handleAdd}
          layout="vertical"
          size="large"
          style={{ marginTop: 20 }}
        >
          <Form.Item
            name="name"
            label="Tên người mời"
            rules={[{ required: true, message: "Nhập tên người mời nha!" }]}
          >
            <Input
              placeholder="Ví dụ: Chú rể A..."
              style={{ borderRadius: 12 }}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="amount"
                label="Tiền mừng"
                rules={[{ required: true, message: "Nhập số tiền!" }]}
              >
                <InputNumber
                  style={{ width: "100%", borderRadius: 12 }}
                  formatter={(v) =>
                    `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(v) => v!.replace(/\$\s?|(,*)/g, "")}
                  addonAfter="đ"
                  step={50000}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="eventDate"
                label="Ngày cưới"
                rules={[{ required: true, message: "Ngày nào thế?" }]}
              >
                <DatePicker
                  style={{ width: "100%", borderRadius: 12 }}
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="relationship"
            label="Mối quan hệ"
            rules={[{ required: true, message: "Chọn mối quan hệ đi nào" }]}
          >
            <Select style={{ borderRadius: 12 }} placeholder="Chọn...">
              <Select.Option value="closeFriend">🤞 Bạn thân</Select.Option>
              <Select.Option value="colleague">💼 Đồng nghiệp</Select.Option>
              <Select.Option value="family">🩸 Họ hàng</Select.Option>
              <Select.Option value="social">👋 Xã giao</Select.Option>
              <Select.Option value="ex">💔 Người yêu cũ</Select.Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveFilled />}
            block
            size="large"
            style={{ borderRadius: 24, marginTop: 10, background: "#4A4A4A" }}
          >
            Lưu vào sổ
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
