// src/CalculatorTab.tsx
import React, { useState } from "react";
import {
  Form,
  Select,
  Radio,
  Button,
  Card,
  Typography,
  Statistic,
  Switch,
  Row,
  Col,
  Divider,
} from "antd";
import { CalculatorInput } from "./types";
import { calculateGiftAmount, formatCurrency } from "./utils";
import {
  GiftFilled,
  SmileFilled,
  UsergroupAddOutlined,
  ReloadOutlined, // Import thêm icon Reset
} from "@ant-design/icons";

const { Option } = Select;

export const CalculatorTab: React.FC = () => {
  const [suggestedAmount, setSuggestedAmount] = useState<number>(0);
  const [form] = Form.useForm();

  const onFinish = (values: CalculatorInput) => {
    const amount = calculateGiftAmount(values);
    setSuggestedAmount(amount);
  };

  // Hàm xử lý khi bấm nút Reset
  const onReset = () => {
    form.resetFields(); // Đưa form về trạng thái initialValues
    setSuggestedAmount(0); // Ẩn kết quả tính toán
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          location: "restaurant",
          incomeLevel: "worker",
          companion: false,
        }}
        size="large"
      >
        <Card
          bordered={false}
          style={{ background: "#FFF9F0", borderRadius: 24, marginBottom: 20 }}
        >
          <Form.Item
            name="relationship"
            label={
              <span style={{ fontWeight: 700, fontSize: 16 }}>
                🤵👰 Bạn là gì của cô dâu chú rể?
              </span>
            }
            rules={[{ required: true, message: "Chọn đi bạn ơi!" }]}
          >
            <Select placeholder="Chọn mối quan hệ" style={{ fontWeight: 600 }}>
              <Option value="family">🩸 Họ hàng / Ruột thịt</Option>
              <Option value="closeFriend">🤞 Bạn thân (Chí cốt)</Option>
              <Option value="colleague">💼 Đồng nghiệp</Option>
              <Option value="social">👋 Bạn xã giao</Option>
              <Option value="ex">💔 Người yêu cũ (Ex)</Option>
            </Select>
          </Form.Item>
        </Card>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<span style={{ fontWeight: 700 }}>🏰 Tổ chức ở đâu?</span>}
              name="location"
            >
              <Radio.Group buttonStyle="solid" style={{ width: "100%" }}>
                <div
                  style={{ display: "flex", gap: 8, flexDirection: "column" }}
                >
                  <Radio.Button
                    value="home"
                    style={{
                      borderRadius: 12,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    🏡 Tại tư gia
                  </Radio.Button>
                  <Radio.Button
                    value="restaurant"
                    style={{
                      borderRadius: 12,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    🍻 Nhà hàng
                  </Radio.Button>
                  <Radio.Button
                    value="luxury"
                    style={{
                      borderRadius: 12,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ✨ Khách sạn 5 sao
                  </Radio.Button>
                </div>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span style={{ fontWeight: 700 }}>
                  💰 Ví bạn đang dày không?
                </span>
              }
              name="incomeLevel"
            >
              <Radio.Group buttonStyle="solid" style={{ width: "100%" }}>
                <div
                  style={{ display: "flex", gap: 8, flexDirection: "column" }}
                >
                  <Radio.Button
                    value="student"
                    style={{
                      borderRadius: 12,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    📚 Sinh viên / Học sinh
                  </Radio.Button>
                  <Radio.Button
                    value="worker"
                    style={{
                      borderRadius: 12,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    💼 Đã đi làm
                  </Radio.Button>
                  <Radio.Button
                    value="rich"
                    style={{
                      borderRadius: 12,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    💎 Đại gia
                  </Radio.Button>
                </div>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Card
          bordered={false}
          style={{ background: "#F0FFF4", borderRadius: 24, marginBottom: 24 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 16 }}>
              👨‍👩‍👧 Dắt người yêu/trẻ em theo?
            </span>
            <Form.Item name="companion" valuePropName="checked" noStyle>
              <Switch
                checkedChildren={<UsergroupAddOutlined />}
                unCheckedChildren={<SmileFilled />}
              />
            </Form.Item>
          </div>
        </Card>

        {/* Action Buttons Area */}
        <div style={{ display: "flex", gap: 12 }}>
          {/* Nút Reset (Secondary Action) */}
          <Button
            htmlType="button"
            onClick={onReset}
            size="large"
            icon={<ReloadOutlined />}
            style={{
              flex: 1, // Chiếm 1 phần
              height: 56,
              borderRadius: 28,
              border: "2px solid #F7D9C4",
              color: "#E07A5F",
              fontSize: 16,
              background: "white",
              fontWeight: 700,
            }}
          >
            Làm lại
          </Button>

          {/* Nút Submit (Primary Action) */}
          <Button
            type="primary"
            htmlType="submit"
            icon={<GiftFilled />}
            size="large"
            style={{
              flex: 2, // Chiếm 2 phần (lớn hơn nút Reset)
              height: 56,
              fontSize: 18,
              borderRadius: 28,
              background: "linear-gradient(135deg, #FF9A8B 0%, #FF6A88 100%)",
              border: "none",
              boxShadow: "0 4px 15px rgba(255, 106, 136, 0.3)",
            }}
          >
            Tính Tiền
          </Button>
        </div>
      </Form>

      {suggestedAmount > 0 && (
        <div
          className="result-card-animation"
          style={{
            marginTop: 32,
            textAlign: "center",
            background: "linear-gradient(135deg, #FFE5E5 0%, #FFF0F0 100%)",
            padding: "24px",
            borderRadius: 24,
            border: "2px solid #FFC2C2",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -10,
              right: -10,
              fontSize: 60,
              opacity: 0.2,
            }}
          >
            🌺
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -10,
              left: -10,
              fontSize: 60,
              opacity: 0.2,
            }}
          >
            🌸
          </div>

          <Typography.Title
            level={5}
            style={{ color: "#E07A5F", marginBottom: 8 }}
          >
            Mức phong bì đề xuất
          </Typography.Title>
          <Statistic
            value={suggestedAmount}
            formatter={(value) => formatCurrency(Number(value))}
            valueStyle={{
              color: "#D64045",
              fontWeight: 800,
              fontSize: 42,
              fontFamily: "Nunito",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
          <Divider style={{ margin: "12px 0", borderColor: "#FFC2C2" }} />
          <Typography.Text
            type="secondary"
            style={{ fontStyle: "italic", fontSize: 13 }}
          >
            "Của ít lòng nhiều, quan trọng là tấm lòng bạn nhé!" ❤️
          </Typography.Text>
        </div>
      )}
    </div>
  );
};
