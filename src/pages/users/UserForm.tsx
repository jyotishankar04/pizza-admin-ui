import { Card, Col, Form, Input, Row, Select, Space } from "antd"
import { useGetTenants } from "../../lib/query"

const UserForm = () => {
  const { data: tanents ,isSuccess, isLoading } = useGetTenants()

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>

          <Card title="Basic Information" variant={"borderless"}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="First Name" name="firstName">
                  <Input placeholder="John" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" name="lastName">
                  <Input placeholder="Doe" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Email" name="email">
              <Input placeholder="jhon.doe@example.com" />
            </Form.Item>
          </Card>
          <Card title="Store Information" variant={"borderless"}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Password" name="password">
                  <Input.Password placeholder="***************" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Confirm Password" name="confirmPassword">
                  <Input.Password placeholder="***************" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Role Information" variant={"borderless"}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Role" name="role">
                  <Select placeholder="Select Role">
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                    <Select.Option value="customer">Customer</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tanent" name="tanentId">
                  <Select placeholder="Select Tanent" loading={isLoading}>
                    {
                     isSuccess && tanents.data.tanents.map(tanent => {
                        return (
                          <Select.Option value={tanent.id}>{tanent.name}</Select.Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>

      </Col>
    </Row>
  )
}

export default UserForm