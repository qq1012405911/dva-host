import React from "react";
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
import { connect } from 'dva'
//import { withRouter } from 'react-router';
const FormItem = Form.Item;

class LoginPage extends React.Component {

    handleSubmit = () => {


        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`${userInfo.userName}欢迎您 ，当前密码为：${userInfo.userPwd}`)
            }
        })
        this.props.history.push("/menu")

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ backgroundImage: "url(" + require("../image/loginBackground.jpeg") + ")" }}>
                <Card title="用户登录" style={{ marginTop: 10 }}>
                    <Form style={{ width: 300 }}>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        },
                                        {
                                            min: 5, max: 10,
                                            message: '长度不在范围内'
                                        },
                                        {
                                            pattern: new RegExp('^\\w+$', 'g'),
                                            message: '用户名必须为字母或者数字'
                                        }
                                    ]
                                })(

                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />

                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: []
                                })(

                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />

                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(

                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{ float: 'right' }}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

const HOME = Form.create()(LoginPage);
//export default Form.create()(LoginPage);
export default connect()(HOME)