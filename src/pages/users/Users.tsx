import { Badge, Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { useAuthStore, type User } from "../../store";
import LoadingComponent from "../../components/Loading";
import UsersFilter from "./UsersFilter";
import { useState } from "react";
import UserForm from "./UserForm";
const columns = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_text: string, record: User) => <Link to={`/users/${record.id}`}>{
      record.firstName + " " + record.lastName
    }</Link>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (_text: string, record: User) => <div>
      <Badge color={(record.role === "admin" ? "red" : (record.role === "manager" ? "orange" : "green"))} text={record.role} />
    </div>
  }
]
const Users = () => {
  const { user } = useAuthStore()
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { token: { colorBgBase } } = theme.useToken();
  const { data: users, isLoading, isSuccess } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers()
  })
  const breadcrumbs = [
    {
      title: <Link to="/" className="text-black">Dashboard</Link>,
    },
    {
      title: "Users",
    },
  ];

  if (user?.role !== "admin") return <Navigate to="/" replace />

  return (
    <Space direction="vertical" className="w-full" size={"large"}>
      <Breadcrumb separator={<RightOutlined />} items={breadcrumbs} />
      <UsersFilter onFilterChange={(filterName, filterValue) => console.log(filterName, filterValue)} >
        <Button type="primary" onClick={() => { setDrawerOpen(true) }}>Add User</Button>
      </UsersFilter>
      <div className="w-full">
        {isLoading && <LoadingComponent text="Fetching users..." />}
        {
          isSuccess && <Table dataSource={users.data} columns={columns} loading={isLoading} rowKey={record => record.id} />
        }
      </div>

      <Drawer title="Create User" style={{ backgroundColor: "whitesmoke" }} open={drawerOpen} placement="right" width={720} destroyOnClose onClose={() => { setDrawerOpen(false) }}
        extra={
          <Space>
            <Button onClick={() => { setDrawerOpen(false) }}>Cancel</Button>
            <Button onClick={() => console.log("submit")} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical">
          <UserForm />
        </Form>
      </Drawer>
    </Space>
  )
}

export default Users