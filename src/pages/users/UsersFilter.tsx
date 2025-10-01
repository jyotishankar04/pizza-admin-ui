import { Button, Card, Input, Select } from "antd"

const UsersFilter = () => {
    return (
        <Card>
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4">
                    <Input.Search placeholder="Search" />
                    <Select className="w-52" placeholder="Select Role">
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="manager">Manager</Select.Option>
                        <Select.Option value="customer">Customer</Select.Option>
                    </Select>
                    <Select  className="w-52" placeholder="Select Status">
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="banned">Banned</Select.Option>
                    </Select>
                </div>
                <div>
                    <Button type="primary">Add User</Button>
                </div>
            </div>
        </Card>
    )
}

export default UsersFilter