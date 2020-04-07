import React from "react";
import { Table } from "antd";
import { ApplicationStore } from "../../state/types";

const ActionButton = (_: any, record: object) => {
  console.log(record);
  return <p>test</p>;
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    render: ActionButton,
  },
];

const GameTable = ({ store }: { store: ApplicationStore }) => {
  const { games } = store.getState();
  return <Table columns={columns} dataSource={games} />;
};

export default GameTable;
