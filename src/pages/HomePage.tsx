import Title from "antd/es/typography/Title"
import { useAuthStore } from "../store"
import { Badge, Card, Typography } from "antd"
import { BarChartOutlined, ShoppingOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { Line, type LineConfig } from '@ant-design/plots';



const recentOrders = [{
  id: 1,
  user: {
    firstName: "John",
    lastName: "Doe"
  },
  totalAmount: 1400,
  status: "Preparing",
  address: "123 Main St, Anytown, USA",
  paymentMethod: "Credit Card",
  createdAt: new Date()
}, {
  id: 2,
  user: {
    firstName: "Smith",
    lastName: "Doe"
  },
  totalAmount: 1400,
  status: "On the way",
  address: "123 Main St, Anytown, USA",
  paymentMethod: "Credit Card",
  createdAt: new Date()
},
{
  id: 3,
  user: {
    firstName: "Smith",
    lastName: "King"
  },
  totalAmount: 400,
  status: "Delivered",
  address: "123 Main St, Anytown, USA",
  paymentMethod: "Cash on Delivery",
  createdAt: new Date()
}, {
  id: 4,
  user: {
    firstName: "Robert",
    lastName: "King"
  },
  totalAmount: 2900,
  status: "Delivered",
  address: "123 Main St, Anytown, USA",
  paymentMethod: "Cash on Delivery",
  createdAt: new Date(),
}, {
  id: 5,
  user: {
    firstName: "Kevin",
    lastName: "King"
  },
  totalAmount: 900,
  status: "Delivered",
  address: "123 Main St, Anytown, USA",
  paymentMethod: "Cash on Delivery",
  createdAt: new Date(),
}, {
  id: 6,
  user: {
    firstName: "John",
    lastName: "Doe"
  },
  totalAmount: 1400,
  status: "Preparing",
  address: "123 Main St, Anytown, USA",
  paymentMethod: "Credit Card",
  createdAt: new Date()
}]

const data = [
  { day: '1 Jan', sale: 8000 },
  { day: '2 Jan', sale: 9000 },
  { day: '3 Jan', sale: 9100 },
  { day: '4 Jan', sale: 10000 },
  { day: '5 Jan', sale: 12000 },
  { day: '6 Jan', sale: 16000 },
  { day: '7 Jan', sale: 13000 },
];

const config:LineConfig = {
  data,
  xField: 'day',
  yField: 'sale',
  shapeField: 'smooth',
  scale: {
    y: {
      domainMin: 0,
    },
  },
  interaction: {
    tooltip: {
      marker: false,
    },
  },
  style: {
    lineWidth: 3,
  },
};

const HomePage = () => {
  const { user } = useAuthStore()

  return (
    <div>
      <Title level={4}>Welcome {user?.firstName + " " + user?.lastName} 😊</Title>
      <div >
        <div className="grid grid-cols-4 grid-rows-6 gap-4">
          <StatCard label="Total Orders" icon={<ShoppingOutlined />} value="100" color="green" />
          <StatCard label="Total Sale" icon={<BarChartOutlined />} value="100" color="blue" isMoney />
          <Card className="col-span-2 row-span-4">
            <div className="flex gap-4 flex-row items-center">
              <ShoppingOutlined className={`w-8 h-8 flex justify-center items-center bg-orange-200  rounded-lg`} style={{ fontSize: "1.1rem", color: "red" }} />
              <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>Recent Orders</Typography.Text>
            </div>
            <div className="flex flex-col gap-3 mt-4 w-full  ">
              {
                recentOrders.map(order => {
                  return (
                    <RecentOrder key={order.id} order={order} />
                  )
                })
              }
            </div>
            <div className="mt-4">
              <Link to="/orders" className="text-md font-semibold " style={{ color: "black", textUnderlinePosition: "under", textDecoration: "underline", textDecorationColor: "red", textDecorationThickness: "2px" }}> See All Orders</Link>
            </div>
          </Card>
          <Card className="col-span-2 row-span-6">
            <div className="flex flex-col ">
              <div className="flex gap-4 flex-row items-center">
                <BarChartOutlined className={`w-8 h-8 flex justify-center items-center bg-orange-200  rounded-lg`} style={{ fontSize: "1.1rem", color: "red" }} />
                <Typography.Text style={{ fontSize: "1rem", fontWeight: "500" }}>Sales</Typography.Text>
              </div>
              <div>
                <Line {...config} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}


const StatCard: React.FC<{ label: string, icon: React.ReactNode, value: string, color: string, isMoney?: boolean }> = ({ label, icon, value, color, isMoney }) => {
  return (
    <Card>
      <div className="flex gap-4 flex-row float-start">
        <div>
          <div className={`w-8 h-8 flex justify-center items-center bg-${color}-200  rounded-lg`} style={{ fontSize: "1.1rem", color }} >
            {icon}
          </div>
        </div>
        <div>
          <Typography.Text style={{ fontSize: "0.8rem", fontWeight: "500" }}>{label}</Typography.Text>
          <Typography.Title level={3} style={{ margin: 0 }}>  <span hidden={!isMoney}>&#8377;</span> {value}</Typography.Title>
        </div>
      </div>
    </Card>
  )
}

const RecentOrder = ({ order }: { order: typeof recentOrders[0] }) => {
  return (
    <div className="flex gap-4  flex-row items-center justify-between w-full">
      <div className="flex flex-col">
        <Typography.Text style={{ fontSize: "0.9rem", fontWeight: "500" }}>{order.user.firstName + " " + order.user.lastName}</Typography.Text>
        <Typography.Text style={{ fontSize: "0.8rem", fontWeight: "500" }}>{order.address}</Typography.Text>
      </div>
      <Typography.Text style={{ fontSize: "0.9rem", fontWeight: "500" }}>&#8377; {order.totalAmount}</Typography.Text>
      <Badge.Ribbon color={(order.status === "Delivered" ? "green" : (order.status === "On the way" ? "orange" : "red"))} text={order.status} />
    </div>
  )
}

export default HomePage