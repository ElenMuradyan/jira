import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { Form, Button, Input, notification } from 'antd';
import './index.css';

class Register extends React.Component{
    constructor(){
        super();
        this.state={
        loading:false,
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        }
    }
    handleChangeInput = e => {
    const {name,value}=e.target;
    this.setState({
        [name]:value,
    })
    }

    handleRegister = async e => {
        const {email,password}=this.state;
        e.preventDefault();
        this.setState({
            loading:true,
        });
        try{
        await createUserWithEmailAndPassword(auth,email,password);
        }catch{

        }finally{
            this.setState({
              loading:false,
            });
        };
    };

render(){
   const { loading }=this.state;
   return (<div className="autd_container">
        <Form onFinish={this.handleRegister} layout='vertical'>
            <Form.Item label="First Name">
                <Input type="text" name="firstName" placeholder='First Name' onChange={this.handleChangeInput}></Input>
            </Form.Item>
            <Form.Item label="Last Name">
                <Input type="text" name="lastName" placeholder='Last Name' onChange={this.handleChangeInput}></Input>
            </Form.Item>
            <Form.Item label="Email">
                <Input type="email" name="email" placeholder='Email' onChange={this.handleChangeInput}></Input>
            </Form.Item>
            <Form.Item label="Password">
                <Input.Password type="password" name="password" placeholder='Password' onChange={this.handleChangeInput}></Input.Password>
            </Form.Item>
            <hr/>
            <Button type="primary" onClick={this.handleRegister} loading={loading}>Register</Button>
        </Form>
</div>);
}
};
export default Register;