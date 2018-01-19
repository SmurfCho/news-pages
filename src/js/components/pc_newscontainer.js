import React from 'react';
import { Row,Col } from 'antd';
import { Tabs,Carousel } from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_product';
const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component{
	render(){
		const settings = {
			dots:true,
			infinite:true,
			speed: 500,
			slidesToShow:1,
			autoplay:true
		}
		return(
			<div>
				<Row>
				<Col span={2}></Col>
				<Col span={22} class="container">
					<div class="leftContainer">
						<div class="carousel">
							<Carousel {...settings}>
							<div><img src="./src/images/carousel_1.jpg" alt="carousel_1"/></div>
							<div><img src="./src/images/carousel_2.jpg" alt="carousel_2"/></div>
							<div><img src="./src/images/carousel_3.jpg" alt="carousel_3"/></div>
							<div><img src="./src/images/carousel_4.jpg" alt="carousel_4"/></div>
							</Carousel>
						</div>
						<div class="clear"></div>
						<PCNewsImageBlock count={3} type="guoji" width="500px" cardTitle="国际头条" imageWidth="112px"/>
					</div>
					<Tabs class="tabs_news">
						<TabPane tab="头条新闻" key="1">
							<PCNewsBlock count={22} type="top"  bordered="false"/>
						</TabPane>
						<TabPane tab="国际" key="2">
							<PCNewsBlock count={22} type="guoji"  bordered="false"/>
						</TabPane>
					</Tabs>
					{/*<Tabs class="tabs_product">
						<TabPane tab="React news 产品" key="1"><PCProduct/></TabPane>
					</Tabs>*/}
					<div>
					<PCNewsImageBlock count={8} type="guonei" width="100%" cardTitle="国内新闻" imageWidth="112px"/>
					<PCNewsImageBlock count={16} type="yule" width="100%" cardTitle="娱乐新闻" imageWidth="112px"/>
					</div>
				</Col>
				</Row>
			</div>
		);
	}
}
