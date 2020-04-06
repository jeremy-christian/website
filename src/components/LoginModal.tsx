import React from "react";
import { Button, Card } from "antd";
import styled from "styled-components";

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginModal = ({ callback }: { callback: Function }) => (
  <Centered>
    <Card title="You are unauthenticated" style={{ width: 300 }}>
      <p>
        Please click the button below to log in. (Powered by&nbsp;
        <a href="https://auth0.com/">auth0</a>.)
      </p>
      <p>
        <div>
          <Button type="primary" onClick={() => callback()}>
            Log In
          </Button>
        </div>
      </p>
    </Card>
  </Centered>
);

export default LoginModal;
