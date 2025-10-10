import { Card, Input, Select } from "antd"
import { useState, useEffect } from "react"
import { useDebounce } from "../../hooks/useDebounce"

interface UsersFilterProps {
    onFilterChange: (filterName: string, filterValue: string) => void,
    children: React.ReactNode
}

const UsersFilter: React.FC<UsersFilterProps> = ({ onFilterChange, children }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    useEffect(() => {
        onFilterChange('userSearchFilter', debouncedSearchTerm)
    }, [debouncedSearchTerm, onFilterChange])

    return (
        <Card>
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4">
                    <Input.Search
                        placeholder="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        allowClear
                    />
                    <Select
                        className="w-52"
                        placeholder="Select Role"
                        onChange={(value) => {
                            if(value) onFilterChange('userRoleFilter', value)
                            else onFilterChange('userRoleFilter', '')
                        }}
                        allowClear
                    >
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="manager">Manager</Select.Option>
                        <Select.Option value="customer">Customer</Select.Option>
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