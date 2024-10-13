import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { Form, Button, Input, Flex } from 'antd';
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/utilis/constants";
import AuthWrapper from "../../../components/sheard/AuthWrapper";
import RegisterBanner from "../../../core/Imgs/auth-register.jpg"

const Register= () => {
    const [ form ] = Form.useForm();
    const [ loading, setLoading ] = useState( false );

    const handleRegister = async values => {
        setLoading(true);
        try{
            const { email, password } = values;
            await createUserWithEmailAndPassword( auth, email, password );
            form.resetFields();
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        };
    };

    return (
        <AuthWrapper title='Sign up' banner={RegisterBanner}>
        <Form onFinish={ handleRegister } layout='vertical' form={ form }>
            <Form.Item
            label='First name'
            name='firstName'
            rules={[{
                required:true,
                message:'Please input your first name'
            }]}
            >
            <Input type='text' placeholder="First name"></Input>
            </Form.Item>
            <Form.Item
            label='Last name'
            name='lastName'
            rules={[{
                required:true,
                message:'Please input your last name'
            }]}
            >
            <Input type='text' placeholder="Last name"></Input>
            </Form.Item>
            <Form.Item
            label='Email'
            name='email'
            rules={[{
                required:true,
                message:'Please input your email'
            }]}
            >
            <Input type='email' placeholder="Email"></Input>
            </Form.Item>
            <Form.Item
            label='Password'
            name='password'
            rules={[{
                required:true,
                message:'Please input your password'
            }]}
            >
            <Input.Password placeholder="Password"/>
            </Form.Item>
            <Flex align="center" justify="flex-end" gap={'10px'}>
            <Button type='primary' htmlType="submit" loading={ loading }>Sign up</Button>
            <Link to={ROUTE_CONSTANTS.LOGIN}>Sign in</Link>
            </Flex>
        </Form>
        </AuthWrapper>
    )
};

export default Register;