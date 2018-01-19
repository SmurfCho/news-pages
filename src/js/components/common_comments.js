import React from 'react';
import { Row,Col } from 'antd';
import { BrowserRouter as Router,Route,Switch,Link } from 'react-router-dom';
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
  Card,
  notification
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const tabPane = Tabs.tabPane;
const MenuItemGroup = Menu.ItemGroup;
class CommonComments extends React.Component {
  constructor(){
    super();
    this.state = {
      comments: ''
    }
  }
  componentDidMount(){
    var myFetchOptions = {
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey,
  myFetchOptions)
  .then(response=>response.json())
  .then(json=>{
    this.setState({comments:json});
  })

  }

  handleSubmit(e){
    e.preventDefault();
    var myFetchOptions = {
      method:'GET'
    };
    var formdata = this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark ,
  myFetchOptions)
  .then(response=>response.json())
  .then(json=>{
    this.componentDidMount();
  })
  };

  addUserCollection(e){
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey ,
  myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      notification['success']({message:'ReactNews提醒',description:'收藏此文章成功'});
    })
  };
  render(){
    let {getFieldDecorator} = this.props.form;
    const {comments} = this.state;
    const commentsList = comments.length ?
    comments.map((comment,index)=>(
      <Card key={index} title={comment.UserName} extra={<a href="#">发布于{comment.datetime}</a>}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    :
    '没有加载到任何评论';
    return(
      <div class="comment">
        <Row>
          <Col span={24}>
          {commentsList}
            <Form onSubmit = {this.handleSubmit.bind(this)}>
              <FormItem label="您的评论">
                {getFieldDecorator('remark',{initialValue:''})(<Input type="textarea" placeholder="随便写点什么" />)}
              </FormItem>
              <Button type="primary" htmlType="submit">提交评论</Button>
              &nbsp;&nbsp;
              <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CommonComments = Form.create({})(CommonComments);
