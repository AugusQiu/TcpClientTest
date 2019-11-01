/* 首页创建tcp客户端新窗口的组件*/
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { changeTabElement,changeSelected} from '../actions/index';

class NewTcp_c extends Component {

  constructor(props){
     super(props);
  }


  setTabElement(tab,tabList){
    tabList.push(tab)
    return tabList;
  }
    
  /*返回新建窗口的按钮*/
  renderMenu(){
    const elementButtons = (
         <button className='newTCBtn' onClick={(e)=>{
               let tabId = _.uniqueId('tab_')
             
                var tabObj  = {
                  _id:tabId,
                  title:"TCP客户端",
                  tag:"tcp",
                  connectState:false,
                  remoteIp:'',
                  remotePort:'',
                  socket:{},
                  conBtnText:"连接",
                  TCprompt:"未连接服务器",
                  sendPrompt:"",
                  buildTime:"",
                  timer:null,
                  continueTime:0,
                  isstart:1,
                  BytesRecived:0,
                  BytesSended:0,
                  tempTime:0,
                  selectedItem:-1,
                  buildUnix:0,
                  showItem: {
                    content:'',
                    binaryContent:'',
                    time:'',
                    saveTime:'',
                    type:'',
                    takedTime:'',
                    bytes:''
                  },
                  HexState:true,
                  tcpData:[],

                  // 发送数据区域各个状态
                  dataType:'文本',
                  selectedLi:0,
                  textData:'',
                  binaryData:'', //数据是以十六进制显示
                  fileData:'',
                  filePath:'',
                  fileSize:'',
                  headerBytes:0,
                  unfold:true,
                  textDecode:"UTF-8",
                   
                  lineFeed:true, //文本右侧显示区域是否换行

                  sdRightShowText:'',//发送区域右边的显示区域
                  sdRightShowBinary:'',
                  sdRightShowFile:''
                }

                
                this.props.changeTabElement(this.setTabElement(tabObj,this.props.tabList))
                this.props.changeSelected(tabId); 
              

         }}>新建接口</button>
    );

    return (
      <div style={{marginLeft:'50px'}}>
        {elementButtons}
      </div>
    );
  }

  render(){

    const menuBar = this.renderMenu.bind(this)();

      return (
        <div className="newWrap">
          <div style={{width:'100%',paddingTop:'20px',height:'52px',borderBottom:'1px solid #797979'}}>
            <h1 style={{fontWeight:'bold',fontSize:'25px'}}>协议接口</h1>
          </div>
         
          <div className="tc_border" >
            <div className="flex">
            <div className="TCP1">
               <p>TCP</p>
            </div>

            <div className="tc_prompt">
             <p>TCP客户端</p>
             <p>创建TCP客户端，可向指定的TCP服务器建立连接，并接受、发送指定数据。</p>
            </div>
            </div>
          
           
            { menuBar }
            {/* <button onClick={(e)=>{
              console.log(this.props.tabList)
            }}>获取所有标签</button> */}
          </div>
        </div>
      );
      
  }
}

function mapStateToProps(state){
  return { 
    tabList: state.tabs.tabList
   };
}

export default connect(
  mapStateToProps, //state=>props 变量的映射 
  {changeTabElement,changeSelected} //函数的映射
)(NewTcp_c);
