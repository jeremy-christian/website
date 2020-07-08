import React, { useEffect } from "react";
import { useAuth0 } from "./react-auth0-spa";
import { PageHeader, Button, Spin, Layout } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import io from "socket.io-client";
import { createStore } from "redux";
import reducers from "./state/reducers";
import { setUser, setGames } from "./state/actions";
import LoginModal from "./components/LoginModal";
import { Centered } from "./components/ApplicationLayout";
import { Home, HomeFooter } from "./components/Home/Home";
import Lobby from "./components/Lobby/Lobby";
import {
  ApplicationGame,
  ApplicationPage,
  ApplicationState,
} from "./state/types";
import { Provider } from "react-redux";
import { connect } from "react-redux";
const { Header, Footer, Content } = Layout;

const StyledLayout = styled(Layout)`
  padding: 0rem 12rem;
  min-height: 100vh;
  background-color: white;
`;

// define store
const store = createStore(reducers);
// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
store.subscribe(() => console.log(store.getState()));

const socket = io.connect("http://localhost:8000");

const PageContent = ({
  page,
  socket,
}: {
  page: ApplicationPage;
  socket: SocketIOClient.Socket;
}) => (
  <>
    {page == "home" && <Home socket={socket} />}
    {page == "lobby" && <Lobby socket={socket} />}
  </>
);

const FooterContent = ({
  page,
  socket,
}: {
  page: ApplicationPage;
  socket: SocketIOClient.Socket;
}) => (
  <>
    {page == "home" && <HomeFooter socket={socket} />}
    {/* {page == "lobby" && <LobbyFooter socket={socket} />} */}
  </>
);

const mapStateToProps = (
  state: ApplicationState,
  ownProps: { socket: SocketIOClient.Socket }
) => {
  return {
    page: state.ui.page,
    socket: ownProps.socket,
  };
};

const ConnectedContent = connect(mapStateToProps)(PageContent);
const ConnectedFooter = connect(mapStateToProps)(FooterContent);

function App() {
  socket.on("pushGames", (games: ApplicationGame[]) => {
    store.dispatch(setGames(games));
  });

  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    loading,
    user,
  } = useAuth0();

  useEffect(() => {
    if (user) {
      store.dispatch(setUser(user));
    }
  });

  if (loading) {
    return (
      <Centered>
        <Spin size="large" tip="Loading..." />
      </Centered>
    );
  }

  if (!isAuthenticated) {
    return <LoginModal callback={loginWithRedirect} />;
  }

  const LogoutButton = (
    <Button key={1} onClick={() => logout()} type="primary">
      Log Out
    </Button>
  );

  return (
    <Provider store={store}>
      <StyledLayout>
        <PageHeader ghost={false} title="Games" extra={[LogoutButton]} />

        <Content>
          <ConnectedContent socket={socket} />
        </Content>
        <Footer>
          <ConnectedFooter socket={socket} />
        </Footer>
      </StyledLayout>
    </Provider>
  );
}

export default App;
