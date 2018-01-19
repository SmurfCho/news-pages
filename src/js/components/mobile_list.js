import React from 'react';
import {Row,Col} from 'antd';
import { Link } from 'react-router-dom';
import Tloader from 'react-touch-loader';
export default class MobileList extends React.Component{
	constructor(){
		super();
		this.state = {
			news: '',
			count:5,
			hasMore: 0,
			initializing: 1,
			onRefresh: Date.now()
		};
	}

	componentWillMount(){
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type
		+ "&count=" + this.props.count,myFetchOptions)
		.then(response => response.json())
		.then(json => this.setState({news:json}));
	};

	loadMore(resolve){
		setTimeOut(()=>{
			var count = this.state.count;
			this.setState({
				count:count+5
			});
			var myFetchOptions = {
				method: 'GET'
			};
			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type
			+ "&count=" + this.props.count,myFetchOptions)
			.then(response => response.json())
			.then(json => this.setState({news:json}));
			this.setState({
				hasMore: count>0&&count<50
			});
			resolve();
		},2e3);
	};

	componentDidMount(){
		setTiemount(()=>{
			this.setState({
				hasMore: 1,
				initializing: 2
			})
		});
	}

	render(){

		var {hasMore,initializing,onRefresh}=this.state;

		const {news} = this.state;
		const newsList = news.length
		?
		news.map((newsItem,index)=>(
			<section key={index} className="m_artical list-item special_section clearfix">
				<Link to={`details/${newsItem.uniquekey}`}>
					<div className="m_artical_img">
						<img src={newsItem.thumbnail_pic_s} alt="{newsItem.title}"/>
					</div>
					<div className="m_artical_title">
						<span>{newsItem.title}</span>
					</div>
					<div className="m_artical_desc clearfix">
						<div className="m_artical_desc_l">
							<span className="m_artical_channel">{newsItem.realtype}</span>
							<span className="m_artical_time">{newsItem.date}</span>
						</div>
					</div>
			</Link>
				</section>
		))
		:
		'没有加载到任何新闻';

		return(
			<div>
        <Row>
					<Col span={24}>
						<Tloader className="main" onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} initializing={initializing}>
						{newsList}
						</Tloader>
					</Col>
				</Row>
			</div>
		)
	};
}
