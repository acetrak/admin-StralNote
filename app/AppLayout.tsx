import { Dropdown, MenuProps, Popover } from 'antd';
import { ConfigProvider, Menu, theme } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, SmileOutlined } from '@ant-design/icons';
import { CSSProperties, useState } from 'react';
import { useLocation, useNavigate } from '@remix-run/react';
import Icon from '@mdi/react';
import {
  mdiAccountCircleOutline,
  mdiChevronDown,
  mdiChevronLeft,
  mdiChevronRight,
  mdiCog,
  mdiImageFilterDrama, mdiLogin
} from '@mdi/js';
import { motion } from 'motion/react';
import { cn } from '~/utils';
import userLogo from '~/assets/human.png'

type MenuItem = Required<MenuProps>['items'][number];

const { useToken } = theme;




const colorPrimary = '#3466FF';

const WHILE_LIST =['/login']
export default function Layout({ children }: { children: React.ReactNode }) {

  const location = useLocation();

  if(WHILE_LIST.includes(location.pathname)){
    return <>{children}</>
  }

  const [current, setCurrent] = useState('dashboard');
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate(e.key);
  };
  const { token } = useToken();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuItem[] = [
    {
      key: 'g1',
      label: (
        <><p className={cn(' !text-black font-bold', collapsed?'text-sm':'text-lg')}>菜单</p></>
      ),
      type: 'group',
      children: [
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
        <><p className={cn(' !text-black font-bold', collapsed?'text-sm':'text-lg')}>归类</p></>
      ),
      type: 'group',
      children: [
        {
          label: 'Navigation Three - Submenu',
          key: 'SubMenu',
          icon: <SettingOutlined />,

        },
      ]
    }


  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary,
          borderRadius: 4,
        }
      }}
    >
      <div className="grid grid-cols-[auto_1fr] h-screen bg-gray-100">
        <motion.aside className=" bg-white flex flex-col" variants={{collapsed:{width:64},expend:{width:300,}}} animate={collapsed?'collapsed':'expend'} initial={false}>
          <header className={cn('flex items-center h-20 relative',collapsed?'px-2':'px-4')}>
            <Icon path={mdiImageFilterDrama} size={collapsed?1.5:2} style={{ color: token.colorPrimary }} />
            <p className={cn('text-lg text-zinc-800 font-bold pl-4',collapsed?'hidden':'inline-block')}>StralNote</p>
            <motion.button onClick={toggleCollapsed} style={{ backgroundColor: token.colorPrimary }} className="shadow-sm absolute z-20 right-0 top-1/2 w-[30px] h-[30px] rounded-full translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <Icon path={collapsed?mdiChevronRight:mdiChevronLeft} size={1} color="#fff" />
            </motion.button>
          </header>

          <div className="flex flex-1 min-h-0 flex-shrink-0 select-none">
            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    itemActiveBg: colorPrimary,
                    itemSelectedBg: colorPrimary,
                    itemSelectedColor: '#fff',
                    itemHeight: 50,
                    itemMarginBlock: 12
                  },
                },
              }}
            >
            <Menu
              inlineCollapsed={collapsed}
              onClick={onClick} style={{
              width: '100%',
              background: 'unset'
            }}
              selectedKeys={[current]}
              mode="vertical"
              items={items}
            />
            </ConfigProvider>
          </div>

        </motion.aside>

        <main className="h-full flex flex-col overflow-y-auto">
          <header className="h-20 bg-white flex px-6 xl:px-12 sticky top-0 z-10"  >
            <UserProfile className="ml-auto" style={{'--ant-popover-inner-padding':0} as CSSProperties}/>
          </header>
          <div className="mx-6 xl:mx-12 flex-1 min-h-0 flex-shrink-0 ">
            {children}
          </div>
        </main>
      </div>
    </ConfigProvider>
  );
}


function UserProfile({className,style}:{className?:string,style?:CSSProperties}) {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (<div className="flex items-center"><Icon path={mdiAccountCircleOutline} size={1} /><span className="ml-2">个人账号</span></div>)
    },
    {
      key: '2',
      label: (<div className="flex items-center"><Icon path={mdiCog} size={1} /><span className="ml-2">设置</span></div>),
    },
    {
      key: '3',
      label:(<div className="flex items-center"><Icon path={mdiLogin} size={1} /><span className="ml-2">退出登录</span></div>)
    }
  ];
  const content =(
    <div className="min-w-[200px]">
    <Menu selectedKeys={[]} items={items} style={{border:'none'}} ></Menu>
    </div>
  )

  return (
    <>
      <Popover content={content} title={null} placement="bottomRight" getPopupContainer={e=>e}>
        <div className={cn('flex items-center',className)} style={style}>
          <div className="bg-gray-400 rounded-full w-[44px] h-[44px] flex overflow-hidden">
            <img src={userLogo} className="w-full h-full" alt="" />
          </div>

          <div className="flex flex-col justify-center ml-3">
            <p className="text-black font-bold text-sm mb-1">张翰</p>
            <p className="text-xs text-zinc-500">管理员</p>
          </div>
          <Icon className="ml-9 text-zinc-700" path={mdiChevronDown} size={1} />
        </div>
      </Popover>


    </>
  )
}
