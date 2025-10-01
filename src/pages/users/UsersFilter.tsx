import {  Card, Input, Select } from "antd"
interface UsersFilterProps {
    onFilterChange: (filterName: string, filterValue: string) => void,
    children: React.ReactNode
}
const UsersFilter: React.FC<UsersFilterProps> = ({ onFilterChange, children }) => {
    return (
        <Card>
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4">
                    <Input.Search placeholder="Search" onChange={(e) => onFilterChange('userSearchFilter', e.target.value)} />
                    <Select className="w-52" placeholder="Select Role" onChange={(value) => onFilterChange('userRoleFilter', value)}>
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="manager">Manager</Select.Option>
                        <Select.Option value="customer">Customer</Select.Option>
                    </Select>
                    <Select className="w-52" placeholder="Select Status" onChange={(value) => onFilterChange('userStatusFilter', value)}>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="banned">Banned</Select.Option>
                    </Select>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </Card>
    )
}

export default UsersFilter