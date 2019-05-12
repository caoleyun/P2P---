import React from 'react';
import {connect} from 'react-redux';
import $ from  'jquery/dist/jquery.min.js';


class Filterbar extends React.Component{
	constructor({options,title,onpick}){
		super();

		this.state={
			v:[],
			shape:"radio" //radio 单选 checkbox 多选
		}
	}

	//单选 筛选
	chooseradio(item){
		this.setState({"v":[item]});

	}
	//多选 筛选
	choosecheckbox(){
		//这里要决定数组怎么变 必须要知道哪些 复选框选中
		//react 中没有双向绑定
		var arr=[];
		$(this.refs.checkbox).find("input[type=checkbox]:checked").each(function(){
			arr.push($(this).val());
		});
		this.setState({"v":arr});
	}

	//上传数据 （给父组件传数据）
	submitdata(){
		this.props.onpick(this.props.title,this.state.v);
	}

	showshape(){
		if(this.state.shape=="radio"){
			return <div className="radio">
						{
							this.props.options.map((item,index)=>{
								return <a 
											key={index} 
											href="javascript:;" 
											onClick={()=>{this.chooseradio(item)}}
											className={this.state.v[0]==item?"cur":""}
										>{item}</a>
							})
						}
						<a href="javascript:;" className="mutibtn" onClick={()=>{this.setState({"shape":"checkbox"})}}>多选+</a>
					</div>
		}else{
			return <div className="checkbox" ref="checkbox">
						{
							this.props.options.map((item,index)=>{
								return <label  key={index}><input onClick={()=>{this.choosecheckbox()}} type="checkbox" key={index} value={item} />{item}</label>
							})
						}
						<input type="button" className="btn btn-success" value="确定" onClick={()=>{this.submitdata()}} />
						{" "}
						<input type="button" className="btn" value="取消" onClick={()=>{this.setState({"shape":"radio","v":[]})}} />
					</div>
		}
						
						
	}

	render(){
		return(
			<div className="filterbar">
				<div className="row">
					<div className="col-lg-1">{this.props.title}</div>
					<div className="col-lg-11">
						{this.showshape()}
					</div>
				</div>
			</div>
		);
	}

	componentDidUpdate(){
		//向父组件 传数据
		//在状态为radio的时候 我们才发送 因为checkbox的时候 点击确定按钮才发送
		if(this.state.shape==="radio"){
			this.submitdata();
		}
	}
}

export default connect()(Filterbar);