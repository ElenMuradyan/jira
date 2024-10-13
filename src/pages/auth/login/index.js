import { Form, Input, Button, Flex } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { regexpValidation, ROUTE_CONSTANTS } from '../../../core/utilis/constants';
import { auth } from '../../../services/firebase'
import { Link } from 'react-router-dom';
import AuthWrapper from '../../../components/sheard/AuthWrapper';
import { useState } from 'react';
import LoginBanner from '../../../core/Imgs/auth_login.jpg';

const Login = () => {
     const [ form ] = Form.useForm();
     const [ loading, setLoading ] = useState( false );

     const handleLogin = async values => {
                setLoading( true );
                try{
                const { email, password } = values;
                const response=await signInWithEmailAndPassword( auth, email, password );
                form.resetFields();
                }catch( error ){
                console.log( error );
                }finally{
                        setLoading( false );
                };
      };

        return(
        <AuthWrapper title='Sign in' banner={ LoginBanner }>
        <Form layout='vertical' onFinish={ handleLogin } form={ form }>
                <Form.Item 
                label='Email'
                name='email'
                rules={[{
                        required:true,
                        message:'Enter your email'
                }]}
                >
                <Input type='email' placeholder='Email'></Input>
                </Form.Item>
                <Form.Item 
                label='Password'
                name='password'
                tooltip='Password must be min 6 max 16 characters .....'
                rules={[{
                        required:true,
                        message:'Enter your email'
                },
                {
                pattern:regexpValidation,
                message:'Wrong password'
                }]}
                >
                <Input.Password placeholder='Password'/>
                </Form.Item>
                <Flex align="center" justify="flex-end" gap={'10px'}>
                <Button type='primary' htmlType='submit' loading={ loading }>Sign In</Button>
                <Link to={ROUTE_CONSTANTS.REGISTER}>Create account</Link>
                </Flex>
        </Form>
        </AuthWrapper>
        )
}
export default Login