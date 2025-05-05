import { ConfigProvider, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigation } from 'react-router';
import { useNavigate } from '@remix-run/react';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'g1',
    label: (
      <><p className="text-lg !text-black font-bold">菜单</p></>
    ),
    type: 'group',
    children:[
      {
        label: '仪表板',
        key: 'dashboard',
        icon: <MailOutlined />,
      },
      {
        label: '订单',
        key: 'order',
        icon: <AppstoreOutlined />,
      },
    ],

  },
  {
    key: 'g2',
    label: (
      <><p className="text-lg !text-black font-bold">归类</p></>
    ),
    type: 'group',
    children:[
      {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        icon: <SettingOutlined />,

      },
    ]
  }


];

const colorPrimary = '#3466FF';
export default function Layout({ children }: { children: React.ReactNode }) {

  const [current, setCurrent] = useState('dashboard');
  const navigate = useNavigate()

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate(e.key)
  };

  return (
    <ConfigProvider  theme={{
      token: {
        colorPrimary,
        borderRadius: 4,
      },

      components: {
        Menu: {
          itemActiveBg:colorPrimary,
          itemSelectedBg:colorPrimary,
          itemSelectedColor:'#fff',
          itemHeight:50,
          itemMarginBlock:12
        },
        Button: {

        }

      },
    }}>
    <div className="grid grid-cols-[300px_1fr] h-screen bg-gray-100">
      <aside className=" bg-white flex flex-col">
        <header className="flex items-center justify-center h-20">
          这是标题
        </header>

        <div className="flex flex-1 min-h-0 flex-shrink-0 select-none">
          <Menu onClick={onClick} style={{width:'100%',background:'unset'}} selectedKeys={[current]} mode="vertical" items={items} />
        </div>

      </aside>

      <div className=" ">
        <header className="h-20 bg-white">

        </header>
        <div className="mx-5">
          {children}
        </div>
      </div>
    </div>
    </ConfigProvider>
  );
}
