import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import './Login.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  componentWillMount(){
    // console.log(this.props);
  }
  handleSubmit (e)  {
    e.preventDefault();
    // let history=this.props.history;
    console.log(this.props);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let {password,userName}=values;
        const registInfo=JSON.parse(localStorage.getItem('registInfo'));
        let confirm=false;
        for(let item of registInfo){
          if(password===item.password&&userName===item.nickname){
            confirm=true;
            this.props.loggedIn();
            setTimeout(() =>history.replaceState("layout/main",userName),500);
          }
        }
        
        if(!confirm){
          message.info('用户名或密码错误,请重新输入!');
        }
        // console.log('Received values of form: ', values);
      }else{
        if(JSON.parse(localStorage.getItem('registInfo'))){
          message.info('用户名或密码不能为空!');
        }else{
          message.info('首次使用的用户请先注册再登陆!');
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" action="/">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            // <Checkbox>Remember me</Checkbox>
          )} */}
          {/* <a className="login-form-forgot" href="">Forgot password</a> */}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/regist">register now!</Link>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;