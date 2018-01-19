import React from 'react';
import { Row,Col } from 'antd';
import {BrowserRouter as Router,Link} from 'react-router-dom';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal,
	Dropdown
 } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem =Form.Item;
const TabPane = Tabs.TabPane;
class MobileHeader extends React.Component{

	constructor(){
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userId: 0
		};
	}
	componentWillMount(){
		console.log(localStorage);
		if(localStorage.userid!=''&&localStorage.userid != 'undefined'){
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userId:localStorage.userid})
		}
	}
	setModalVisible(value){
		this.setState({modalVisible: value});
	};

	handleClick(e){
		if(e.key == "register"){
			this.setState({current:'register'});
			this.setModalVisible(true);
		}else{

			this.setState({current:e.key});

		}
	};

	handleSubmit(e){
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response=>response.json()).then(json=>{
			this.setState({userNickName:json.NickUserName,userid:json.UserId});
			localStorage.userid = json.UserId;
			localStorage.userNickName = json.NickUserName;
		});
		if(this.state.action=="login"){
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	};

	login(){
		this.setModalVisible(true);
	};

	callback(key){
		if(key == 1){
			this.setState({action:'login'});
		}else if(key == 2){
			this.setState({action:'register'});
		}
	}
	logout(){
		localStorage.userid = '';
		localStorage.userNickName = '';
		this.setState({hasLogined:false});
	}
	render(){
		let {getFieldDecorator} = this.props.form;
		const menu = (
		  <Menu>
				<Menu.Item key="0">
						<a href={`/usercenter`}>个人中心</a>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="1">
						<a onClick={this.logout.bind(this)} href={`/`}>退出</a>
				</Menu.Item>
		  </Menu>
		);
		const userShow = this.state.hasLogined
		?
		<Dropdown overlay={menu} trigger={['click']}>
		<div style={{ marginTop:10,fontSize: 16}}>
    <a className="ant-dropdown-link" >
			选项
    </a>
		</div>
  	</Dropdown>
		:
		<Icon type="setting" onClick={this.login.bind(this)}/>
		return(
			<div id="mobileHeader">
				<header>
					<Row>
						<Col span={20}>
							<a href="/" class="logo" id="headerLogo">
								<img src="/src/images/logo.png" alt="logo" />
								<span>News</span>
							</a>
						</Col>
						<Col span={4}>
							{userShow}
						</Col>
				</Row>
				</header>
				<Modal title="用户中心" wrapClassName="veitical-center-modal" visible={this.state.modalVisible}
						onCancel = {()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText = "关闭">

							<Tabs type="card" onChange={this.callback.bind(this)}>

							<TabPane tab="登录" key="1">
									<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户" >
											{getFieldDecorator('userName')(<Input placeholder="请输入您的账号" />)}
										</FormItem>
										<FormItem label="密码" >
										{getFieldDecorator('password')(<Input type="password" placeholder="请输入您的密码" />)}
										</FormItem>
										<Button type="primary" htmlType="submit">登录</Button>
									</Form>
								</TabPane>

								<TabPane tab="注册" key="2">
								<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
									<FormItem label="账户" >
										{getFieldDecorator('r_userName')(<Input placeholder="请输入您的账号" />)}
									</FormItem>
									<FormItem label="密码" >
									{getFieldDecorator('r_password')(<Input type="password" placeholder="请输入您的密码" />)}
									</FormItem>
									<FormItem label="确认密码" >
									{getFieldDecorator('r_confirmPassword')(<Input type="password" placeholder="请输入您的账号" />)}
									</FormItem>
									<Button type="primary" htmlType="submit">注册</Button>
								</Form>
								</TabPane>
							</Tabs>
						</Modal>
			</div>
		);
	};
}

export default MobileHeader = Form.create({})(MobileHeader);