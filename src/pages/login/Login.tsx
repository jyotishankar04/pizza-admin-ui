import { Alert, Button, Card, Checkbox, Form, Input, Layout, Space } from "antd"
import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { Credentials } from "../../types"
import { login, self } from "../../http/api"
import { useAuthStore } from "../../store"
import { usePermissions } from "../../hooks/usePermissions"
import { useLogoutMutation } from "../../lib/query"

const loginUser = async (userData: Credentials) => {
  const res = await login(userData)
  return res.data
}

const getSelf = async () => {
  const res = await self()
  return res.data
}


const Login = () => {
  const { isAllowed } = usePermissions()
  const { setUser } = useAuthStore()
  const { data: selfData, refetch } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false,
  })

  const { mutateAsync: logoutMutation } = useLogoutMutation()
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: async () => {
      await refetch()
      if (selfData) {
        if (!isAllowed(selfData.data)) {
          await logoutMutation()
          return
        }
        setUser(selfData.data)
      }
    },
  })
  return (
    <div>
      <Layout className="w-screen h-screen flex justify-center items-center gap-5">
        <div className="flex justify-center items-center ">
          <Layout.Content className="text-4xl font-bold text-[#F65F42]">Pizza Zone</Layout.Content>
        </div>
        <Card title={
          <Space className="flex justify-center items-center w-full">
            <LockFilled />
            Sign In
          </Space>
        }
          className="w-80"
        >
          <Form className="" initialValues={
            {
              remember: true
            }
          }
            onFinish={async (values) => {
              await mutateAsync({
                email: values.username,
                password: values.password
              })
            }}
            onFinishFailed={(errorInfo) => {
              console.log('Failed:', errorInfo);
            }}
          >
            {
              isError && <Alert message={error?.message} type="error" className="mb-5" />
            }
            <Form.Item name={"username"} rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              }
            ]}>
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item name={"password"} rules={[
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                type: 'string',
                message: 'The input is not valid Password!',
              }
            ]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item >
              <div className="flex justify-between w-full">

                <Space>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                </Space>
                <a href="/forgot">Forgot Password</a>
              </div>
            </Form.Item>
            <Form.Item>

              <Button loading={isPending} type="primary" htmlType="submit" className="w-full" >Login</Button>
              <p className="mt-5">Don't have an account? <a href="/auth/register">Sign Up</a></p>
            </Form.Item>
          </Form>
        </Card>
      </Layout>
    </div>
  )
}

export default Login