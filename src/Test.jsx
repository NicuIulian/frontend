import { useEffect, useState } from "react";
import { getAllReportsByUser } from "./apicalls/reports";
import { updateUser, getUserInfo } from "./apicalls/users";

import { useNavigate } from "react-router-dom";

import {
  Card,
  List,
  Descriptions,
  Empty,
  Form,
  Input,
  Button,
  message,
} from "antd";

function Test() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();
  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    async function getReports() {
      const data = await getAllReportsByUser();
      const user = await getUserInfo();
      setUser(user);
      setData(data.data);

      form.setFieldsValue({
        name: user.data.name,
        email: user.data.email,
      });
    }

    getReports();
  }, [form]);

  const handleUpdateUser = async (values) => {
    try {
      const response = await updateUser(values);
      if (response.success) {
        const user = await getUserInfo();
        setUser(user.data);
        form.setFieldsValue({
          name: user.data.name,
          email: user.data.email,
        });
        message.success("User updated successfully");
        navigate("/");
        window.location.reload();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to update user");
    }
  };

  return (
    <div>
      <h2>Update User Info</h2>
      <Form form={form} layout="vertical" onFinish={handleUpdateUser}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>

      <h2>History</h2>
      {data.length > 0 ? (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={data}
          renderItem={(item) =>
            item.exam ? (
              <List.Item>
                <Card title={`Exam: ${item.exam.name}`}>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label="Category">
                      {item.exam.category}
                    </Descriptions.Item>
                    <Descriptions.Item label="Duration">
                      {item.exam.duration} minutes
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Marks">
                      {item.exam.totalMarks}
                    </Descriptions.Item>
                    <Descriptions.Item label="Passing Marks">
                      {item.exam.passingMarks}
                    </Descriptions.Item>
                    <Descriptions.Item label="Verdict">
                      {item.result.verdict}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </List.Item>
            ) : null
          }
        />
      ) : (
        <Empty description="No history available" />
      )}
    </div>
  );
}

export default Test;
