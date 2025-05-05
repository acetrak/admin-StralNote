import workspaceSvg from '~/assets/undraw_workspace_s6wf.svg';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { useState } from 'react';
import { BookOutlined } from '@ant-design/icons';
import { useNavigate } from '@remix-run/react';

function Login() {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="h-screen bg-[#fff] grid grid-cols-[1fr_1fr]">

      <div className="bg-[#E7EAF9] flex flex-col pr-6">
        <div className="ml-auto w-fit flex-col flex gap-4 pt-[3rem] pr-12">
          <div className="flex items-center gap-4 justify-end pb-4">
            <BookOutlined className="text-4xl" /><p className="text-4xl font-bold">StralNote学院</p>
          </div>
          <p className="text-right text-xl text-gray-500">灵感随记，条理清晰，高效成就每一天</p>
          <p className="text-right text-xl text-gray-500">笔记有序，学习工作都高效</p>
        </div>
        <div className="mb-10 mt-auto flex">
          <img src={workspaceSvg} alt="" className=" w-[min(700px,70%)] ml-auto" />
        </div>
      </div>

      <div className="px-8 flex flex-col justify-center">

        <div className="">
          <div className="max-w-xl mx-auto">
            <h1 className="text-5xl font-bold text-center pb-4">StralNote</h1>
            <Form
              name="loginForm"
              size="large"
              layout="vertical"
              form={form}
              onFinish={onFinish}
              autoComplete="off"
              initialValues={{ username: 'admin', password: 'admin' }}
            >

              <Form.Item label="账号" name="username">
                <Input placeholder="请输入账号" allowClear />
              </Form.Item>
              <Form.Item label="密码" name="password">
                <Input type="password" allowClear placeholder="请输入密码" />
              </Form.Item>

              <div className="pb-2 flex items-center justify-between">
                <Checkbox>保持登录</Checkbox>
                <Button type="link">忘记密码</Button>
              </div>
              <Form.Item label={null}>
                <Button loading={loading} block type="primary" htmlType="submit">登录</Button>
              </Form.Item>
            </Form>

            <Divider className="border-zinc-300"></Divider>

            <div className="flex items-center justify-center gap-2">
              <p>还没有账号？</p><Button className="p-0" type="link">注册</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

}

export default Login;
