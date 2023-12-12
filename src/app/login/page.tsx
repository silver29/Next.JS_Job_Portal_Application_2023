"use client";
import { Button, Form, Radio, message } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/users/login", values);
      message.success(response.data.message);
      router.push("/");
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong');
    } finally{
      dispatch(SetLoading(false));
    }
  };

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-5 w-450">
        <h1 className='text-xl'>SheyJobs - Login</h1>
        <hr />
        <Form layout="vertical" className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          {/* <Form.Item label="Login As" name="userType">
            <Radio.Group>
              <Radio value="employer">Employer</Radio>
              <Radio value="employee">Employee</Radio>
            </Radio.Group>
          </Form.Item> */}
          <Form.Item label="Email" name='email'>
            <input type="email" className="input" />
          </Form.Item>
          <Form.Item label="Password" name='password'>
            <input type="password" className="input" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
          <Link href="/register">
            Don't have an account? Register
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;