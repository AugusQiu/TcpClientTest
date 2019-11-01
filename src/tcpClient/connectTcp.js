/*TCP连接服务器模块组件*/
import React, { Component } from 'react';
import moment from 'moment'
import { connect } from 'react-redux';
import {TextDecoder} from 'text-decoding'

import {changeTabName,changeTabIp,changeTabPort,updateConnectState,initTabsocket,changeTabCBtext,changeTabPrompt,
        changeTabBuildTime,changeTabContinueTime,changeTabTimer,changeTabISstart,changeTabBytesRecived,changeTabBytesSended,
        changeTabTcpData,changeTabTempTime, changeTabSelectedItem,changeTabShowItem,changeTabHexState,changeTabBuildUnix,changeTabSendPrompt
} from '../actions/index';

import {convertBytes,getTcpDataLength,formatItemTime} from '../utils/tcp_utils'
import formateTime from '../utils/formateTime'


const net = require("net")
const dns = require("dns")

class  ConnectTcp extends Component{

  constructor(props) {
    super(props);
    this.state = {
      ip:'',
      port:'',
      localHost:'',
      continueTime:0
    };

  }

  componentWillMount(){
   if(this.getConstate(this.props.selectedTab,this.props.tabList)) {
    let diff = moment().unix() - this.getBuildUnix(this.props.selectedTab,this.props.tabList)
    this.setState({
      continueTime:diff
    })

    this.handleTime()
   }
   
  }
  
  componentDidMount(){

    // 切换窗口，input输入框数据保存
     if(this.getTitleName(this.props.selectedTab,this.props.tabList)!=="TCP客户端"){
      this.refs.input1.value = this.getTitleName(this.props.selectedTab,this.props.tabList);
     }
    if(this.getRemoteIp(this.props.selectedTab,this.props.tabList)!==""){
        let remoteIp =this.getRemoteIp(this.props.selectedTab,this.props.tabList);
        this.refs.input2.value = remoteIp
        this.setState({
          ip:remoteIp
        })
    }
    
    if(this.getRemotePort(this.props.selectedTab,this.props.tabList)!==""){
      let remotePort = this.getRemotePort(this.props.selectedTab,this.props.tabList);
      this.refs.input3.value =  remotePort
      this.setState({
        port:remotePort
      })
    }

  }

changeName(tabId,title,tabList){
   for(var i=0;i<tabList.length;i++){
     if(tabId == tabList[i]._id){
       tabList[i].title = title
     }
   }
   return tabList;
}
getTitleName(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
     if(tabId == tabList[i]._id){
        return tabList[i].title;
     }
  }
}
getRemoteIp(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].remoteIp
    }
  }
}
getRemotePort(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].remotePort
    }
  }
}
setIp(tabId,ip,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].remoteIp = ip
    }
  }
  return tabList;
}
setPort(tabId,port,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].remotePort= port
    }
  }
  return tabList;
}
getConstate(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].connectState
    }
  }
}
setConstate(tabId,constate,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].connectState= constate
    }
  }
  return tabList;
}
getSocket(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].socket
    }
  }
}
setSocket(tabId,socket,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].socket= socket
    }
  }
  return tabList;
}

// 客户端主动断开连接
 disconnectServer(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].socket.destroy();
    }
  }
 }

 getConBtnText(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].conBtnText
    }
  }
}
setConBtnText(tabId,text,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].conBtnText= text
    }
  }
  return tabList;
}
getTCprompt(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].TCprompt
    }
  }
}
setTCprompt(tabId,prompt,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].TCprompt= prompt
    }
  }
  return tabList;
}
getBuildTime(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].buildTime
    }
  }
}
setBuildTime(tabId,time,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].buildTime= time
    }
  }
  return tabList;
}
getContinueTime(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].continueTime
    }
  }
}
setContinueTime(tabId,time,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].continueTime = time
    }
  }
  return tabList;
}
getTimer(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].timer
    }
  }
}
setTimer(tabId,timer,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].timer = timer
    }
  }
  return tabList;
}
getISstart(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].isstart
    }
  }
}
setISstart(tabId,isstart,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].isstart = isstart
    }
  }
  return tabList;
}
getBytesRecived(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].BytesRecived
    }
  }
}
setBytesRecived(tabId,bytes,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].BytesRecived = bytes
    }
  }
  return tabList;
}
getBytesSended(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].BytesSended
    }
  }
}
setBytedSended(tabId,bytes,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].BytesSended = bytes
    }
  }
  return tabList;
}

setTcpData(tabId,data,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].tcpData.push(data);
    }
  }
  return tabList;
}

deleteTcpData(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].tcpData = []
    }
  }
  return tabList;
}

getTempTime(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].tempTime;
    }
  }
}

setTempTime(tabId,time,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].tempTime = time
    }
  }
  return tabList;
}

setSelectedItem(tabId,index,tabList){
  for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        tabList[i].selectedItem = index
      }
    }
    return tabList;
 }
 
 setShowItem(tabId,item,tabList){
  for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        tabList[i].showItem= item
      }
    }
    return tabList;
 }

 setHexState(tabId,state,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].HexState = state
    }
  }
  return tabList;
 }

getBuildUnix(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].buildUnix;
    }
  }
}

setBuildUnix(tabId,unix,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].buildUnix = unix
    }
  }
  return tabList;
}
getSendPrompt(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].sendPrompt;
    }
  }
}
setSendPrompt(tabId,prompt,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].sendPrompt = prompt
    }
  }
  return tabList;
}


// 从服务获取数据，默认接收二进制，浏览器显示的是unit8Array的数据格式
 getData(socket){
  
   var startTime = moment().valueOf();

   socket.on("data", (data)=> {

     //unit8Array转十六进制
     var hex_string = Buffer.from(data).toString('hex');
        
    // 根据十六进制字符串获取字节数
     var bytes  = hex_string.length/2;
     var totalBytes = this.getBytesRecived(this.props.selectedTab,this.props.tabList)
     totalBytes += bytes;
     this.props.changeTabBytesRecived(this.setBytesRecived(this.props.selectedTab,totalBytes,this.props.tabList))
     bytes = convertBytes(bytes);


     var endTime = moment().valueOf()
     var totalTime =(endTime -startTime)/1000;

     totalTime = (totalTime -this.getTempTime(this.props.selectedTab,this.props.tabList)).toFixed(3);

     this.props.changeTabTempTime(this.setTempTime(this.props.selectedTab,totalTime,this.props.tabList));
    
    
     var itemTime = formatItemTime(endTime);

     var saveSecond = ((endTime% (1000 * 60)));
     var saveTime = moment().format('YYYYMMDDHHmm')+saveSecond

     var orderNum = getTcpDataLength(this.props.selectedTab,this.props.tabList) +1;
      
     var obj = {
      orderNum: orderNum,
      content:data,
      binaryContent:hex_string,
      time:itemTime,
      saveTime:saveTime,
      type:'接收',
      takedTime:totalTime+"s",
      bytes:bytes
    }
    
     this.props.changeTabTcpData(this.setTcpData(this.props.selectedTab,obj,this.props.tabList));

   });
 }


//  连接成功持续期间，秒表计时
handleTime = () => { 
    var Timer = setInterval(()=>{
       let diff = moment().unix() - this.getBuildUnix(this.props.selectedTab,this.props.tabList)
       this.setState({
         continueTime:diff
       })
    },1000)
    this.props.changeTabTimer(this.setTimer(this.props.selectedTab,Timer,this.props.tabList));
 }

 
    render(){
      let connectedPrompt =( 
        <div>
          <div className="TCprompt">
                  <p>{this.state.localHost}</p>
                  <p>远程:{this.getRemoteIp(this.props.selectedTab,this.props.tabList)+':'+this.getRemotePort(this.props.selectedTab,this.props.tabList)}</p>
                  <p>建立时间:{this.getBuildTime(this.props.selectedTab,this.props.tabList)}</p>
                  <p>持续时间:
                   {
                      // formateTime(this.getContinueTime(this.props.selectedTab,this.props.tabList))
                        formateTime(this.state.continueTime)
                   }
                   </p>
                  <p>接收:{this.getBytesRecived(this.props.selectedTab,this.props.tabList)}字节</p>
                  <p>发送:{this.getBytesSended(this.props.selectedTab,this.props.tabList)}字节</p>
                  <p>总字节数:{this.getBytesRecived(this.props.selectedTab,this.props.tabList)+this.getBytesSended(this.props.selectedTab,this.props.tabList)}字节</p>
          </div>

           <div className="TCprompt">
            <p>
            {this.getSendPrompt(this.props.selectedTab,this.props.tabList)}</p>
           </div>
        </div>
      );
  
       return(
        <div>
             <div className="flex TCconnect">
             <div className="TCtag">
                <h4>TCP</h4>
             </div>

             <div className="flex" style={{width:'598px'}}>
               <div className="TCtitle"><p>名称</p></div>
               <input type="text" placeholder='TCP客户端' ref="input1" className="input1" onBlur={(e)=>{
                      let tabId  = this.props.selectedTab;
                      let title= e.target.value;
                      if(title ==='')
                       title = 'TCP客户端'
                      this.props.changeTabName(this.changeName(tabId,title,this.props.tabList));
                 }
               }/>
             </div>


             <div className="flex"  style={{width:'692px'}}>
               <div className="TCtitle"><p>服务器地址</p></div>
               <input type="text" placeholder="域名或IP" ref="input2" className="input2" 
               onBlur={(e)=>{
                   var val = e.target.value;   
                   dns.lookup(val,(err,address)=>{
                     this.setState({
                       ip:address
                     })
                     this.props.changeTabIp(this.setIp(this.props.selectedTab,address,this.props.tabList))
                   }) 
                 
                 }
               }/>
               <p style={{marginTop:"8px",width:"50px",textAlign:"center"}}>:</p>
                <input type="text" placeholder="端口" ref="input3"  className="input3" onBlur={(e)=>{
                    this.setState({
                      port:e.target.value
                    })
                    
                    this.props.changeTabPort(this.setPort(this.props.selectedTab,e.target.value,this.props.tabList))
                 }
                }/>

               <button className="conBtn" onClick={(e)=>{                  
            
  
                 if(!this.getConstate(this.props.selectedTab,this.props.tabList)){

               

                  this.props.changeTabCBtext(this.setConBtnText(this.props.selectedTab,'连接中...',this.props.tabList));
                  this.props.changeTabPrompt(this.setTCprompt(this.props.selectedTab,'正在连接服务器',this.props.tabList));


                  
                  try{
                      var  client  = net.createConnection({
                       port: this.state.port,
                       host: this.state.ip,
                      }, ()=>{

                        this.props.changeTabTcpData(this.deleteTcpData(this.props.selectedTab,this.props.tabList));
                        this.props.changeTabSelectedItem(this.setSelectedItem(this.props.selectedTab,-1,this.props.tabList))
                        this.props.changeTabShowItem(this.setShowItem(this.props.selectedTab,
                          { 
                            content:'',
                            binaryContent:'',
                            time:'',
                            saveTime:'',
                            type:'',
                            takedTime:'',
                            bytes:''},this.props.tabList))
                      
 
                       this.props.changeTabCBtext(this.setConBtnText(this.props.selectedTab,'断开连接',this.props.tabList));
                       this.props.changeTabPrompt(this.setTCprompt(this.props.selectedTab,'',this.props.tabList));
                       this.props.changeTabBuildTime(this.setBuildTime(this.props.selectedTab,moment().format('HH:mm:ss'),this.props.tabList))
                       this.props.changeTabBuildUnix(this.setBuildUnix(this.props.selectedTab,moment().unix(),this.props.tabList))
                       this.props.changeTabTempTime(this.setTempTime(this.props.selectedTab,0,this.props.tabList));

                      let handleAndUpdate = async()=>{
                        await this.handleTime();
                        // 改变连接状态为正确连接
                        this.props.updateConnectState(this.setConstate(this.props.selectedTab,true,this.props.tabList))
                      }
                       
                      handleAndUpdate();
                        
                     })
          
                     
                     
                     let initAndget = async()=>{
                       await  this.props.initTabsocket(this.setSocket(this.props.selectedTab,client,this.props.tabList))
                       this.getData(this.getSocket(this.props.selectedTab,this.props.tabList));
                     }
                    
                     initAndget();
                     
                     
                     client.on("error", (err)=>{
                       this.props.changeTabCBtext(this.setConBtnText(this.props.selectedTab,'重新连接',this.props.tabList));

                       var err = err.toString();
                       if(err.indexOf("ECONNRESET")==-1){
                        this.props.changeTabPrompt(this.setTCprompt(this.props.selectedTab,'无法连接到服务器,请检查服务器地址是否正确',this.props.tabList));
                       }else{
                        this.props.changeTabPrompt(this.setTCprompt(this.props.selectedTab,'与服务器断开,请重新连接',this.props.tabList));
                       }
                       this.props.updateConnectState(this.setConstate(this.props.selectedTab,false,this.props.tabList))
                     });

                      
                     client.on("close",()=>{
                      this.props.updateConnectState(this.setConstate(this.props.selectedTab,false,this.props.tabList))
                      this.disconnectServer(this.props.selectedTab,this.props.tabList);
                      this.props.changeTabBuildTime(this.setBuildTime(this.props.selectedTab,'',this.props.tabList));
                      this.props.changeTabTimer(this.setTimer(this.props.selectedTab, clearInterval(this.getTimer(this.props.selectedTab,this.props.tabList)),this.props.tabList));
                      this.props.changeTabISstart(this.setISstart(this.props.selectedTab,1,this.props.tabList));
                      this.props.changeTabBytesRecived(this.setBytesRecived(this.props.selectedTab,0,this.props.tabList));
                      this.props.changeTabBytesSended(this.setBytedSended(this.props.selectedTab,0,this.props.tabList));
                      this.props.changeTabTempTime(this.setTempTime(this.props.selectedTab,0,this.props.tabList));
                      this.props.changeTabSendPrompt(this.setSendPrompt(this.props.selectedTab,'',this.props.tabList))
                      this.props.changeTabCBtext(this.setConBtnText(this.props.selectedTab,'重新连接',this.props.tabList));
                      this.props.changeTabPrompt(this.setTCprompt(this.props.selectedTab,'与服务器断开,请重新连接',this.props.tabList));
                        this.setState({
                        continueTime:0
                      })
                     })

                
                    }catch(err){
                      console.log(err)
                     
                       this.props.changeTabCBtext(this.setConBtnText(this.props.selectedTab,'重新连接',this.props.tabList));
                       this.props.changeTabPrompt(this.setTCprompt(this.props.selectedTab,'无法连接到服务器,请检查服务器地址是否正确',this.props.tabList));
                       this.props.updateConnectState(this.setConstate(this.props.selectedTab,false,this.props.tabList))
                       
                    }

                 }else{
                  this.props.updateConnectState(this.setConstate(this.props.selectedTab,false,this.props.tabList))
                  //  断开连接恢复到初始状态
                  this.disconnectServer(this.props.selectedTab,this.props.tabList);
                  this.props.changeTabBuildTime(this.setBuildTime(this.props.selectedTab,'',this.props.tabList));
                  this.props.changeTabTimer(this.setTimer(this.props.selectedTab, clearInterval(this.getTimer(this.props.selectedTab,this.props.tabList)),this.props.tabList));
                  this.props.changeTabISstart(this.setISstart(this.props.selectedTab,1,this.props.tabList));
                  this.props.changeTabBytesRecived(this.setBytesRecived(this.props.selectedTab,0,this.props.tabList));
                  this.props.changeTabBytesSended(this.setBytedSended(this.props.selectedTab,0,this.props.tabList));
                  this.props.changeTabTempTime(this.setTempTime(this.props.selectedTab,0,this.props.tabList));
                  this.props.changeTabSendPrompt(this.setSendPrompt(this.props.selectedTab,'',this.props.tabList))
                  this.props.changeTabCBtext(this.setConBtnText(this.props.selectedTab,'重新连接',this.props.tabList));
                  this.props.changeTabPrompt(this.setTCprompt(this.props.selectedTab,'与服务器断开,请重新连接',this.props.tabList));
                    this.setState({
                    continueTime:0
                  })
                
                  //  this.props.changeTabContinueTime(this.setContinueTime(this.props.selectedTab,0,this.props.tabList));
                
                  }


               }}>
               
               {this.getConBtnText(this.props.selectedTab,this.props.tabList)}
               
               
               </button>
             </div>
          </div>
   
             <div style={{width:"98%",marginLeft:"2%"}}>
               { (this.getConstate(this.props.selectedTab,this.props.tabList) ===true)? 
                connectedPrompt :<p style={{marginTop:'10px',fontSize:'14px'}}
                
               className={
                 this.getTCprompt(this.props.selectedTab,this.props.tabList)=='与服务器断开,请重新连接'?'red':''
                }>
                {this.getTCprompt(this.props.selectedTab,this.props.tabList)}
                
                </p>    
               }
             </div>
        </div>
         
        )
      }
}

function mapStateToProps(state){
    return {
       selectedTab: state.tabs.selected,
       tabList:state.tabs.tabList
    };
  }
  
export default connect(mapStateToProps,{changeTabName,changeTabIp,changeTabPort,updateConnectState,initTabsocket,changeTabCBtext,changeTabPrompt,
  changeTabBuildTime,changeTabContinueTime,changeTabTimer,changeTabISstart,changeTabBytesRecived,changeTabBytesSended,
  changeTabTcpData,changeTabTempTime, changeTabSelectedItem,changeTabShowItem,changeTabHexState,changeTabBuildUnix,changeTabSendPrompt
})(ConnectTcp);