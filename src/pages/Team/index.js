import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getTeam } from "../../API";

function Team() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getTeam()
      .then((res) => {
        console.log(res);
        setDataSource(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Table
        loading={loading}
        columns={[
          {
            title: "teamName",
            dataIndex: "teamName",
          },
          {
            title: "Member",
            dataIndex: "teamCount",
          },
          {
            title: "courseName",
            dataIndex: "courseName",
          },
          {
            title: "topicName ",
            dataIndex: "topicName",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />
    </Space>
  );
}
export default Team;
