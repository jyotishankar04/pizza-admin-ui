import { Navigate, NavLink, Outlet } from "react-router-dom"
import { useAuthStore } from "../store"
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Space, theme } from "antd"
import { useState } from "react"
import { BellFilled, DownOutlined, GiftOutlined, HomeOutlined, LogoutOutlined, ProductOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import Logo from "../components/Logo"
import { useLogoutMutation } from "../lib/query"
import LoadingModel from "../components/LoadingModel"
import type { MenuItemType } from "antd/es/menu/interface"


const { Sider, Header, Content, Footer } = Layout
const items = [
  {
    key: "/",
    label: <NavLink to="/">Home</NavLink>,
    icon: <HomeOutlined />
  },
  {
    key: "/tanents",
    label: <NavLink to="/tanents">Tanents</NavLink>,
    icon: <ShopOutlined />
  },
  {
    key: "/products",
    label: <NavLink to="/products">Products</NavLink>,
    icon: <ProductOutlined />
  }, {
    key: "/orders",
    label: <NavLink to="/orders">Orders</NavLink>,
    icon: <ShoppingCartOutlined />
  },
  {
    key: "/Promos",
    label: <NavLink to="/Promos">Promos</NavLink>,
    icon: <GiftOutlined />
  }
]
const getMenuItems = (role: "admin" | "manager") => {
  if (role === "admin") {
    const menus = [...items]

    menus.splice(1, 0, {
      key: "/users",
      label: <NavLink to="/users">Users</NavLink>,
      icon: <UserOutlined />
    }) as MenuItemType[]

    return menus
  }
  return items as MenuItemType[]
}



const Dashboard = () => {
  const { user } = useAuthStore()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { mutateAsync: logoutMutation, isPending } = useLogoutMutation()

  const items = getMenuItems(user?.role as "admin" | "manager")

  if (user === null) {
    return <Navigate to="/auth/login" />
  }
  if (isPending) {
    return <LoadingModel text="Logging Out..." />
  }

  return (
    <div className="">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Logo className="text-xl py-2" collapsed={collapsed} />
          <Menu theme="light" defaultSelectedKeys={['/']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header style={{ paddingLeft: 18, paddingRight: 18, background: colorBgContainer }} >
            <Flex gap="middle" align="start" justify="space-between">
              <Badge text={user.role === "admin" ? "You are Admin" : (user.tanent?.name + " (" + user.tanent?.address + ")")} status="success" />
              <Space>
                <Badge dot>
                  <BellFilled />
                </Badge>
                <Dropdown menu={{
                  items: [{
                    key: "1",
                    label: "Logout",
                    icon: <LogoutOutlined rotate={90} />,
                    onClick: async () => {
                      await logoutMutation()
                    }
                  }]
                }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Avatar style={{ backgroundColor: "#F65F42" }} icon={<UserOutlined />} />
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </Space>
            </Flex>
          </Header>
          <Content style={{ margin: '24px 24px' }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            MicroPizza ©{new Date().getFullYear()} Created by DEVSUVAM
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default Dashboard