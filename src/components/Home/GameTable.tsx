import React from "react";
import { Table, Button } from "antd";
import { ApplicationState, ApplicationGame } from "../../state/types";
import { connect } from "react-redux";
import { setPage, setActiveGame } from "../../state/actions";

const ActionButton = ({
  onClick,
  record,
}: {
  onClick: (record: object) => void;
  record: object;
}) => {
  return <Button onClick={() => onClick(record)}>View</Button>;
};

const mapDispatchToProps = (dispatch: any) => ({
  onClick: (record: any) => {
    dispatch(setActiveGame(record));
    dispatch(setPage("lobby"));
  },
});

const ConnectedButton = connect(null, mapDispatchToProps)(ActionButton);

const RenderConnectedButton = (record: object) => (
  <ConnectedButton record={record} />
);

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    render: RenderConnectedButton,
  },
];

const mapStateToProps = (state: ApplicationState) => {
  return {
    games: state.games,
  };
};

const ConnectedTable = ({ games }: { games: ApplicationGame[] }) => {
  return (
    <>
      <Table columns={columns} dataSource={games} />
    </>
  );
};

export default connect(mapStateToProps)(ConnectedTable);
