import {  Card, Input } from "antd"
interface UsersFilterProps {
    onFilterChange: (filterName: string, filterValue: string) => void,
    children: React.ReactNode
}
const TanentsFilter: React.FC<UsersFilterProps> = ({ onFilterChange, children }) => {
    return (
        <Card>
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4">
                    <Input.Search placeholder="Search" onChange={(e) => onFilterChange('tanentSearchFilter', e.target.value)} />
                </div>
                <div>
                    {children}
                </div>
            </div>
        </Card>
    )
}

export default TanentsFilter