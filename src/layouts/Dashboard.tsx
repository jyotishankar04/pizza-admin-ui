import { Navigate, NavLink, Outlet } from "react-router-dom"
import { useAuthStore } from "../store"
import {  Layout, Menu, theme } from "antd"
import { useState } from "react"
import { GiftOutlined, HomeOutlined, ProductOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import Logo from "../components/Logo"


const {Sider,Header,Content,Footer} = Layout

const Dashboard = () => {
    const {user} = useAuthStore()
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } =theme.useToken();
    const items = [
      {
        key:"/",
        label:<NavLink to="/">Home</NavLink>,
        icon: <HomeOutlined />
      },
      {
        key:"/users",
        label:<NavLink to="/users">Users</NavLink>,
        icon: <UserOutlined />
      },
      {
        key:"/restaurants",
        label:<NavLink to="/restaurants">Restaurants</NavLink>,
        icon: <ShopOutlined />
      },
      {
        key:"/products",
        label:<NavLink to="/products">Products</NavLink>,
        icon: <ProductOutlined />
      },{
        key:"/orders",
        label:<NavLink to="/orders">Orders</NavLink>,
        icon: <ShoppingCartOutlined/>
      },
      {
        key:"/Promos",
        label:<NavLink to="/Promos">Promos</NavLink>,
        icon: <GiftOutlined />
      }
    ]
    if(user === null){
        return <Navigate to="/auth/login" />     
    }

  return (
    <div className="">
        <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Logo className="text-xl py-2" collapsed={collapsed} />
        <Menu theme="light" defaultSelectedKeys={['/']} mode="inline"  items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 , background: colorBgContainer}} />
        <Content style={{ margin: '0 16px' }}>
        <Outlet/> 
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