// src/App.tsx
import React from "react";
import { Layout, Tabs, Typography, ConfigProvider } from "antd";
import { CalculatorTab } from "./CalculatorTab";
import { ManagerTab } from "./ManagerTab";
import { HeartFilled, BookFilled } from "@ant-design/icons";
import "./App.css"; // Ensure CSS is imported

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const items = [
    {
      key: "1",
      label: (
        <span style={{ fontSize: 16, fontWeight: 700 }}>
          <HeartFilled /> Tính Tiền
        </span>
      ),
      children: <CalculatorTab />,
    },
    {
      key: "2",
      label: (
        <span style={{ fontSize: 16, fontWeight: 700 }}>
          <BookFilled /> Sổ Nợ
        </span>
      ),
      children: <ManagerTab />,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Nunito', sans-serif",
          colorPrimary: "#FF9A8B", // Warm Coral
          colorSuccess: "#95D5B2", // Soft Green
          colorWarning: "#F7D9C4", // Soft Orange
          borderRadius: 16, // Very rounded corners
          colorBgLayout: "#FFF9F0", // Match body background
          colorTextHeading: "#4A4A4A", // Softer black
          boxShadow: "0 4px 20px rgba(255, 154, 139, 0.15)", // Warm shadow
        },
        components: {
          Button: {
            colorPrimary: "#FF9A8B",
            algorithm: true,
            fontWeight: 700,
            controlHeightLG: 50,
            boxShadow: "0 4px 14px rgba(255, 154, 139, 0.4)",
          },
          Card: {
            headerFontSize: 20,
            boxShadowTertiary: "0 10px 40px rgba(0,0,0,0.03)",
          },
          Table: {
            headerBg: "#FFF0E6", // Very pale coral for headers
            headerColor: "#E07A5F",
            headerBorderRadius: 12,
          },
          Tabs: {
            itemSelectedColor: "#E07A5F",
            inkBarColor: "#E07A5F",
            titleFontSizeLG: 18,
          },
          InputNumber: {
            controlHeight: 40,
          },
          Select: {
            controlHeight: 40,
          },
        },
      }}
    >
      <Layout style={{ minHeight: "100vh", background: "transparent" }}>
        <Header
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "none",
            borderBottom: "1px solid rgba(255, 154, 139, 0.2)",
            height: 80,
          }}
        >
          <Title
            level={2}
            style={{
              margin: 0,
              color: "#E07A5F",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
            }}
          >
            💌 Tiền mừng cưới
          </Title>
        </Header>

        <Content
          style={{
            padding: "24px",
            maxWidth: 800,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              padding: "32px 24px",
              borderRadius: 32,
              boxShadow: "0 20px 60px rgba(255, 154, 139, 0.15)",
            }}
          >
            <Tabs defaultActiveKey="1" items={items} size="large" centered />
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            color: "#998da0",
            background: "transparent",
          }}
        >
          Made with ❤️ for Vietnamese Weddings
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
