import type { MetaFunction } from '@remix-run/node';
import { Button ,theme} from 'antd';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { motion } from 'motion/react';
import Icon from '@mdi/react';
import { mdiCalendarMonth, mdiWalletBifoldOutline, mdiWalletGiftcard, mdiWalletOutline } from '@mdi/js';
import { cn } from '~/utils';

const { getDesignToken, useToken } = theme;


export default function Dashboard() {
  return (
    <>

      <div className="py-8 flex items-center">
        <div className=" ">
          <h1 className="text-xl text-black font-bold mb-2">你好，李善</h1>
          <p className="text-zinc-700 text-sm">欢迎回来，这是控制台</p>
        </div>
        <div className="ml-auto flex gap-3">
          <Button icon={<DownloadOutlined />}>下载</Button>
          <Button size="middle" type="primary" icon={<PlusOutlined />}>添加列表</Button>
        </div>
      </div>

      <Count />

    </>
  );
}

function Count() {
  const data = [
    {
      title: '总收入',
      value: 232670,
      icon: (props:{color?:string})=> <Icon className="text-blue-500" style={{ ...(props.color ? { color: props.color } : undefined) }} path={mdiWalletBifoldOutline} size={1.3} />
    },
    {
      title: '总支出',
      value: 143200,
      icon: ()=><Icon className="text-blue-500" path={mdiWalletOutline} size={1.3} />
    },
    {
      title: '引导对话',
      value: 23420,
      icon: ()=><Icon className="text-blue-500" path={mdiWalletGiftcard} size={1.3} />
    },
    {
      title: '本月目标',
      value: 900000,
      icon: ()=><Icon className="text-blue-500" path={mdiCalendarMonth} size={1.3} />
    },
  ];
  const { token } = useToken();

  return (
   <>

     <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
       {
         data.map((item, index) => (
           <motion.div
             key={index}
             initial={{ opacity: 0, y: 100 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: index * 0.2 }}
             className={cn(' rounded-lg shadow-sm py-7 px-5 text-gray-600',index===0?'!text-white':'')}
             style={{backgroundColor:index===0 ?token.colorPrimary:'#fff'}}
           >

             <div className="flex items-center gap-4 justify-between mb-2">
               <p className="text-base font-bold">{item.title}</p>
               <item.icon color={index===0?'#fff':token.colorPrimary}/>
             </div>
             <h1 className="text-2xl font-bold">{item.value.toLocaleString()}</h1>
           </motion.div>
         ))
       }
     </div>

     <div className="grid grid-cols-1 xl:grid-cols-[7fr_4fr] mt-6 gap-4 xl:gap-8 xl:grid-rows-2">

       <DashCard index={0}></DashCard>
       <DashCard index={1}></DashCard>
       <DashCard index={2}></DashCard>
       <DashCard index={3}></DashCard>

     </div>
   </>
  );
}

function DashCard({children,index=0}:{children?:React.ReactNode,index?:number}) {
  return (
    <motion.div  initial={{ opacity: 0, y: 100 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: (index+4) * 0.2 }} className="dashcard">{children}
    </motion.div>
  )
}

