import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Breadcrumb, Select } from "antd";
import {
  DesktopOutlined,
  ManOutlined,
  WomanOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Table, Tag, Space, message, Input, Typography, Button } from "antd";

import { useStaff } from "../../hooks/useStaff";
import useUpdate from "../../hooks/useUpdae";
import useDelete from "../../hooks/useDelete";
import ModalEdit from "./modalEdit";

const { Search } = Input;
const { Option } = Select;
const { Text, Link } = Typography;
const { Column, ColumnGroup } = Table;

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function Home() {
  const [text, settext] = useState("");
  const [idEdit, setidEdit] = useState(0);
  const [status, setstatus] = useState("");
  const [modal, setmodal] = useState(false);
  const { data: staffs } = useStaff(text, status);
  const [collapsed, setcollapsed] = useState(false);
  const { mutate: update, isLoading: loadingUpdate } = useUpdate();
  const { mutate: remove } = useDelete();
  const onUpdate = (id) => {
    update(id, {
      onSuccess: () => {
        message.success("Thay đổi thành công");
      },
    });
  };
  const onDetete = (id) => {
    if (!window.confirm("Bạn có chắc chứ?")) return;
    remove(id, {
      onSuccess: () => {
        message.success("Xóa thành công");
      },
    });
  };
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setcollapsed(!collapsed)}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Dashbord
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              KYC
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              User Account
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0 16px",
              padding: 8,
            }}
          >
            <h1>KYC Profile</h1> <span>Display profile kyc</span>
          </div>
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div style={{ display: "flex" }}>
                <Search
                  placeholder="input search text"
                  value={text}
                  onChange={(e) => settext(e.target.value)}
                  onSearch={(e) => console.log(e)}
                  enterButton
                />
                <Select
                  onChange={(v) => setstatus(v)}
                  defaultValue=""
                  style={{ width: 300 }}
                >
                  <Option value="">Filter status</Option>
                  <Option value="0">Initial</Option>
                  <Option value="1">Approved</Option>
                </Select>
                <Select style={{ width: 300 }}></Select>
              </div>

              <Table dataSource={staffs}>
                <Column title="ID-Card" dataIndex="id" key="firstName" />
                <Column title="Họ và tên" dataIndex="name" key="firstName" />

                <Column title="Tuổi" dataIndex="age" key="age" />
                <Column
                  title="Giói tính"
                  render={(v, r) => (
                    <Text>
                      {v ? (
                        <div>
                          <ManOutlined style={{ color: "blue" }} />
                          <Text>Nam</Text>
                        </div>
                      ) : (
                        <div>
                          <WomanOutlined style={{ color: "red" }} />
                          <Text>Nữ</Text>
                        </div>
                      )}
                    </Text>
                  )}
                  dataIndex="gender"
                  key="age"
                />
                <Column title="Địa chỉ" dataIndex="address" key="address" />

                <Column title="SDT" dataIndex="phone" key="tags" />
                <Column title="Email" dataIndex="email" key="tags" />
                <Column title="Ghi chú" dataIndex="note" key="tags" />
                <Column
                  title="Status"
                  key="status"
                  render={(text, record) => (
                    <Space size="middle">
                      <Button
                        onClick={() => {
                          onUpdate(record.id);
                        }}
                        type={record.status ? "primary" : "default"}
                      >
                        {record.status ? "APPROVED" : "INITIAL"}
                      </Button>
                    </Space>
                  )}
                />
                <Column
                  title="Action"
                  key="action"
                  render={(text, record) => (
                    <div>
                      <Text
                        style={{ marginRight: 8 }}
                        onClick={() => {
                          onDetete(record.id);
                        }}
                        type="danger"
                      >
                        Xóa
                      </Text>
                      <Text
                        onClick={() => {
                          setidEdit(record.id);
                          setmodal(!modal);
                        }}
                      >
                        <EditOutlined style={{ color: "blue" }} />
                      </Text>
                    </div>
                  )}
                ></Column>
              </Table>
            </div>
          </Content>
          <ModalEdit
            id={idEdit}
            close={() => setmodal(!modal)}
            isShow={modal}
          />

          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
export default Home;
