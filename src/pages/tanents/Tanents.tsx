import { Breadcrumb, Button, Drawer, Space, Table } from "antd"
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import LoadingComponent from "../../components/Loading";
import TanentsFilter from "./TanentsFilter";
import { useState } from "react";
import { useGetTenants } from "../../lib/query";


const breadcrumbs = [
  {
    title: <Link to="/" className="text-black">Dashboard</Link>,
  },
  {
    title: "Tanents",
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },{
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: string) => new Date(date).toDateString()
  }
];

const Restaurants = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data:tanents, isLoading, isSuccess } = useGetTenants()
  return (
    <Space direction="vertical" className="w-full" size={"large"}>
      <Breadcrumb separator={<RightOutlined />} items={breadcrumbs} />
      <TanentsFilter onFilterChange={(filterName, filterValue) => console.log(filterName, filterValue)} >
        <Button type="primary" onClick={() => { setDrawerOpen(true) }}>Add Tanent</Button>
      </TanentsFilter>
      <div className="w-full">
        {isLoading && <LoadingComponent text="Fetching users..." />}
        {
          isSuccess && <Table dataSource={tanents.data.tanents} columns={columns} loading={isLoading} rowKey={record => record.id} />
        }
      </div>
  

      <Drawer title="Create Tanent" open={drawerOpen} placement="right" width={720} destroyOnClose onClose={() => { setDrawerOpen(false) }}
        extra={
          <Space>
            <Button onClick={() => { setDrawerOpen(false) }}>Cancel</Button>
            <Button onClick={() => console.log("submit")} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>

      </Drawer>
    </Space>
  )
}

export default Restaurants