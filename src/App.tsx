import React, { useCallback } from "react";
import { useAuth0 } from "./react-auth0-spa";
import { PageHeader, Button, Spin, Card, Layout } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

const { Footer } = Layout;

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();

  if (loading) {
    return (
      <Centered>
        <Spin size="large" tip="Loading..." />
      </Centered>
    );
  }

  if (!isAuthenticated) {
    return (
      <Centered>
        <Card title="You are unauthenticated" style={{ width: 300 }}>
          <p>
            Please click the button below to log in. (Powered by&nbsp;
            <a href="https://auth0.com/">auth0</a>.)
          </p>
          <p>
            <div>
              <Button type="primary" onClick={() => loginWithRedirect()}>
                Log In
              </Button>
            </div>
          </p>
        </Card>
      </Centered>
    );
  }

  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Title"
      subTitle="This is a subtitle"
      extra={[
        <Button key={1} onClick={() => logout()} type="primary">
          Log Out
        </Button>
      ]}
    ></PageHeader>
  );
}

export default App;
