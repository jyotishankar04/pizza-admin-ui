import { Badge, Breadcrumb, Button, Drawer, Form, Space, Table } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { Link, Navigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { useAuthStore } from "../../store";
import LoadingComponent from "../../components/Loading";
import UsersFilter from "./UsersFilter";
import { useCallback, useState } from "react";
import UserForm from "./UserForm";
import { useCreateUser } from "../../lib/query";
import LoadingModel from "../../components/LoadingModel";
import type { User } from "../../types";
import { PERPAGE } from "../../constants/Users";

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
  const queryClient = useQueryClient()
  const {
    mutateAsync: createUser,
    isPending: isCreating,
    isError: isCreatingError,
  } = useCreateUser()
  const [queryParams, setQueryParams] = useState({
    perPage: PERPAGE,
    currentPage: 1,
    q: "",
    role: ""
  });
  const [form] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: users, isLoading, isSuccess } = useQuery({
    queryKey: ['users', queryParams],
    queryFn: () => {
      const queryString = new URLSearchParams({
        perPage: queryParams.perPage.toString(),
        currentPage: queryParams.currentPage.toString(),
        q: queryParams.q,
        role: queryParams.role
      }).toString()
      console.log(queryString)
      return getUsers(queryString)
    }
  })

  const closeDrawer = useCallback(() => {
    form.resetFields()
    setDrawerOpen(false)
  }, [form])

  const handleFilterChange = useCallback((filterName: string, filterValue: string) => {
    setQueryParams(prev => {
      const newQueryParams = {
        role: filterName === "userRoleFilter" ? filterValue : prev.role,
        q: filterName === "userSearchFilter" ? filterValue : prev.q,
        currentPage: 1
      };

      return { ...prev, ...newQueryParams };
    });
  }, []);
  const onHandleSubmit = async () => {
    try {
      // Validate form fields
      await form.validateFields();

      // Create user
      await createUser({
        firstName: form.getFieldValue('firstName'),
        lastName: form.getFieldValue('lastName'),
        email: form.getFieldValue('email'),
        password: form.getFieldValue('password'),
        role: form.getFieldValue('role'),
        tanentId: form.getFieldValue('role') === "manager" ? form.getFieldValue('tanentId') : undefined,
      });

      // Invalidate and refetch users data
      await queryClient.invalidateQueries({ queryKey: ['users'] });

      // Close drawer after successful creation
      closeDrawer();

    } catch (error) {
      // Validation or creation failed - don't close drawer
      console.error('Failed to create user:', error);
    }
  }

  // Remove the problematic useEffect

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
      <UsersFilter onFilterChange={handleFilterChange} >
        <Button type="primary" onClick={() => { setDrawerOpen(true) }}>Add User</Button>
      </UsersFilter>
      <div className="w-full">
        {isLoading && <LoadingComponent text="Fetching users..." />}
        {
          isSuccess && <Table
            dataSource={users?.data}
            columns={columns}
            pagination={{
              total: users.total,
              pageSize: queryParams.perPage,
              current: queryParams.currentPage,
              onChange: (page, pageSize) => {
                setQueryParams((prev) => ({ ...prev, currentPage: page, perPage: pageSize }))
              }
            }}
            loading={isLoading}
            rowKey={record => record.id} />
        }
      </div>

      <Drawer
        title="Create User"
        style={{ backgroundColor: "whitesmoke" }}
        open={drawerOpen}
        placement="right"
        width={720}
        destroyOnClose
        onClose={closeDrawer}
        extra={
          <Space>
            <Button disabled={isCreating} onClick={closeDrawer}>Cancel</Button>
            <Button loading={isCreating} onClick={onHandleSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          disabled={isCreating}
          form={form}
          layout="vertical"
        >
          <UserForm />
        </Form>
      </Drawer>
      {isCreatingError && <LoadingModel text="Creating User..." />}
    </Space>
  )
}

export default Users