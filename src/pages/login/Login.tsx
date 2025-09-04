import { Button, Card, Input, Layout, Space } from "antd"
import { LockOutlined } from "@ant-design/icons"
const Login = () => {
  return (
    <div>
      <Layout className="w-screen h-screen flex justify-center items-center gap-5">
        <div className="flex justify-center items-center text-blue-600">
          <h1 className="text-4xl font-bold">Pizza Zone</h1>
        </div>
        <Card title={
          <Space className="flex justify-center items-center w-full">
            <LockOutlined />
            Sign In
          </Space>
        }
          className="w-80"
        >
          <div className="flex flex-col gap-2">
            <Input placeholder="Email" />
            <Input.Password placeholder="Password" />
            <div className="flex justify-between items-center">
              <Space>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </Space>
              <a href="/forgot">Forgot Password</a>
            </div>
            <Button type="primary">Login</Button>
            <p>Don't have an account? <a href="/auth/register">Sign Up</a></p>
          </div>
        </Card>
      </Layout>
    </div>
  )
}

export default Login