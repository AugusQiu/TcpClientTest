/*数据展示区域*/
import React, { Component } from 'react';
import moment from 'moment'

import { connect } from 'react-redux';
import { changeTabSelectedItem,changeTabShowItem,changeTabHexState,changeTabTcpData,changeTabBytesSended,changeTabSendPrompt,
  changeTabSendArea,changeTabShowArea
} from '../actions/index';
import {textToHex,hexToAscii,sendDatatoServer,textDecode,convertBytes,getTcpDataLength,formatItemTime,hexToBinary,bufToUnit8} from '../utils/tcp_utils'


const fs = require("fs");
const { dialog } = require('electron').remote;
const clipboard = require('electron').clipboard;


class ShowData extends Component{
     constructor(props) {
       super(props);
     }
     componentWillMount(){
           
     }

    componentDidMount(){
      let hexState = this.getHexState(this.props.selectedTab,this.props.tabList);
      let option1 =  document.getElementById("selectText").children[0]
      let option2 =  document.getElementById("selectText").children[1]
      if(!hexState){
        option1.setAttribute('selected',true)
      }else{
        option2.setAttribute('selected',true)
      }

      var ico  = this.refs.lineFeedIco;
      var srMain = this.refs.srMain;
      if(this.getLineFeed(this.props.selectedTab,this.props.tabList)){
        ico.src= require('../assets/images/lineFeedTrue.png');
        srMain.style.whiteSpace = "norwrap";
      }else{
        ico.src= require('../assets/images/lineFeedFalse.png');
        srMain.style.whiteSpace = "normal";
      }
    
    }

    getConstate(tabId,tabList){
        for(var i=0;i<tabList.length;i++){
          if(tabId == tabList[i]._id){
            return tabList[i].connectState
          }
        }
    }

   getTcpData(tabId,tabList){
     for(var i=0;i<tabList.length;i++){
        if(tabId == tabList[i]._id){
          return tabList[i].tcpData;
        }
      }
   }
  

   getSelectedItem(tabId,tabList){
    for(var i=0;i<tabList.length;i++){
        if(tabId == tabList[i]._id){
          return tabList[i].selectedItem;
        }
      }
   }

   setSelectedItem(tabId,index,tabList){
    for(var i=0;i<tabList.length;i++){
        if(tabId == tabList[i]._id){
          tabList[i].selectedItem = index
        }
      }
      return tabList;
   }

   getShowItem(tabId,tabList){
     
     for(var i=0;i<tabList.length;i++){
        if(tabId == tabList[i]._id){
          return tabList[i].showItem;
        }
      }
   }
   
   setShowItem(tabId,item,tabList){
    for(var i=0;i<tabList.length;i++){
        if(tabId == tabList[i]._id){
          tabList[i].showItem= item
        }
      }
      return tabList;
   }
    
   getHexState(tabId,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        return tabList[i].HexState;
      }
    }
   }

   setHexState(tabId,state,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        tabList[i].HexState = state
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

  getSocket(tabId,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        return tabList[i].socket
      }
    }
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

  setSendPrompt(tabId,prompt,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        tabList[i].sendPrompt = prompt
      }
    }
    return tabList;
  }
  setTextData(tabId,data,tabList){
    for(var i=0;i<tabList.length;i++){
        if(tabId == tabList[i]._id){
          tabList[i].textData= data;
        }
    }
    return tabList;
 }
setBinaryData(tabId,data,tabList){
  for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        tabList[i].binaryData= data;
      }
  }
  return tabList;
}

getHeaderBytes(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].headerBytes;
    }
  }
 }

 setHeaderBytes(tabId,bytes,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].headerBytes = bytes;
    }
  }
  return tabList;
 }

 getTextDecode(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].textDecode;
    }
  }
}

setSdRightShowText(tabId,show,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].sdRightShowText= show;
    }
  }
  return tabList;
 }
 setSdRightShowBinary(tabId,show,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].sdRightShowBinary= show;
    }
  }
  return tabList;
 }
 getLineFeed(tabId,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      return tabList[i].lineFeed;
    }
  }
 }

 setLineFeed(tabId,state,tabList){
  for(var i=0;i<tabList.length;i++){
    if(tabId == tabList[i]._id){
      tabList[i].lineFeed= state;
    }
  }
  return tabList;
 }

   renderTime(i){
     var i = i/16;
     var num =0;
     if(i==0){
       num = "00";
     }else{
      num = i*10;
     }
      
     if(num<100){
       return '000000'+num +'h'
     }else if(100<=num<1000){
       return '00000'+num+'h'
     }else if(1000<=num<10000){
       return '0000'+num +'h'
     }else if(10000<=num<100000){
       return '000'+num +'h'
     }else if(100000<=num<1000000){
       return '00'+ num + 'h'
     }else if(1000000<=num<10000000){
       return '0' + num +'h'
     }else{
       return num +'h'
     }
   }

   renderHexTable(data){
    //  if(data ==undefined){
    //    throw new Error("数据包内容undefined");
    //  }

     let items =[];
     let hexData = textToHex(data);

      for(var i=0;i<hexData.length;i=i+16){
       items.push(
          <tr>
          <td>{this.renderTime(i)}</td>
          <td>{hexData[i]}</td>
          <td>{hexData[i+1]}</td>
          <td>{hexData[i+2]}</td>
          <td>{hexData[i+3]}</td>
          <td>{hexData[i+4]}</td>
          <td>{hexData[i+5]}</td>
          <td>{hexData[i+6]}</td>
          <td>{hexData[i+7]}</td>
          <td>{hexData[i+8]}</td>
          <td>{hexData[i+9]}</td>
          <td>{hexData[i+10]}</td>
          <td>{hexData[i+11]}</td>
          <td>{hexData[i+12]}</td>
          <td>{hexData[i+13]}</td>
          <td>{hexData[i+14]}</td>
          <td>{hexData[i+15]}</td>
          <td>;</td>
          <td>{hexToAscii(hexData[i])}</td> <td>{hexToAscii(hexData[i+1])}</td> <td>{hexToAscii(hexData[i+2])}</td>  <td>{hexToAscii(hexData[i+3])}</td>
          <td>{hexToAscii(hexData[i+4])}</td> <td>{hexToAscii(hexData[i+5])}</td>  <td>{hexToAscii(hexData[i+6])}</td>  <td>{hexToAscii(hexData[i+7])}</td>
          <td>{hexToAscii(hexData[i+8])}</td> <td>{hexToAscii(hexData[i+9])}</td> <td>{hexToAscii(hexData[i+10])}</td> <td>{hexToAscii(hexData[i+11])}</td>
          <td>{hexToAscii(hexData[i+12])}</td> <td>{hexToAscii(hexData[i+13])}</td> <td>{hexToAscii(hexData[i+14])}</td> <td>{hexToAscii(hexData[i+15])}</td> 
        
        </tr>
        )
     }
    
    return items;
   
  
   }


  sendDataAgain(binaryData,socket){
    let startTime = moment().valueOf();
    let buf  = Buffer.from(binaryData,'hex');

    sendDatatoServer(buf,socket).then((res)=>{
       if(res=='success'){
           var endTime  = moment().valueOf();
           var totalTime = (endTime - startTime)/1000;  
           
           
           let itemTime = formatItemTime(endTime)
           var orderNum = getTcpDataLength(this.props.selectedTab,this.props.tabList) +1;
        
           var bytes =Buffer.byteLength(buf);
           var totalBytes = this.getBytesSended(this.props.selectedTab,this.props.tabList);
           totalBytes+=bytes;
           bytes = convertBytes(bytes);
          
           var saveSecond = ((endTime% (1000 * 60)));
           var saveTime = moment().format('YYYYMMDDHHmm')+saveSecond;

            var  obj = {
                orderNum:orderNum,
                time:itemTime,
                content:bufToUnit8(buf),
                saveTime:saveTime,
                binaryContent:binaryData,
                type:'发送',
                takedTime:totalTime+'s',
                bytes:bytes
            } 
          
           this.props.changeTabBytesSended(this.setBytedSended(this.props.selectedTab,totalBytes,this.props.tabList))
           this.props.changeTabTcpData(this.setTcpData(this.props.selectedTab,obj,this.props.tabList))
           this.props.changeTabSendPrompt(this.setSendPrompt(this.props.selectedTab,"发送成功",this.props.tabList))
        }
   
   }).catch((err)=>{
      console.log(err)
      this.props.changeTabSendPrompt(this.setSendPrompt(this.props.selectedTab,"发送失败",this.props.tabList))
   })
  }

 
     
    render(){
         let HexTable = (
          <table className="hexTable">
          <tr className="tableTR">
              <th></th>
              <th>0</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>a</th>
              <th>b</th>
              <th>c</th>
              <th>d</th>
              <th>e</th>
              <th>f</th>
              <th style={{width:"5%"}}></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
          </tr>
             {
               this.renderHexTable(this.getShowItem(this.props.selectedTab,this.props.tabList).binaryContent)
             }
           </table>
         )


         return(
             <div className="showDataWrap">
                 <div className="flex">
                  <div className="showDataLeft">
                      <table style={{width:'100%',textAlign:'center',borderCollapse:"collapse"}}>
                        <tr style={{fontWeight:'bold'}}>
                            <th>序号</th>
                            <th>时间</th>
                            <th>方向</th>
                            <th>耗时</th>
                            <th>数据字节数</th>
                        </tr>
                        {
                            // (this.getConstate(this.props.selectedTab,this.props.tabList)==true)?
                             this.getTcpData(this.props.selectedTab,this.props.tabList).map((item,index)=>{

                                return <tr 
                                className={`${(this.getSelectedItem(this.props.selectedTab,this.props.tabList) ==index)?"tableActive":""}  ${(index%2==0?"grayBg":"")  }` } 
                                  
                          
                                style={{cursor:'pointer'}}
                                 onClick={(e)=>{
                                      this.props.changeTabSelectedItem(this.setSelectedItem(this.props.selectedTab,index,this.props.tabList))
                                      this.props.changeTabShowItem(this.setShowItem(this.props.selectedTab,item,this.props.tabList))
                                  }}>
                                   <td>{index+1}</td>
                                   <td>{item.time}</td>
                                   <td>{item.type}</td>
                                   <td>{item.takedTime}</td>
                                   <td>{item.bytes}</td>
                                </tr>
                            })
                            // :''
                        }
                      </table>
                  </div>
                  <div className="showDataRight">
                    <div className="srHeader">
                            <h3>{this.getShowItem(this.props.selectedTab,this.props.tabList).orderNum}</h3>
                            <p> {this.getShowItem(this.props.selectedTab,this.props.tabList).type}</p>
                            <p> {this.getShowItem(this.props.selectedTab,this.props.tabList).bytes}</p>
                            <div className="showMode">
                                <label style={{color:'#fff'}}>显示格式 : </label>
                                <select id="selectText" onChange={(e)=>{
                                  
                                   if(e.target.value =='二进制'){
                                         this.props.changeTabHexState(this.setHexState(this.props.selectedTab,true,this.props.tabList));
                                   }else{
                                       
                                         this.props.changeTabHexState(this.setHexState(this.props.selectedTab,false,this.props.tabList));
                                   }
                                }}>
                                    <option>文本</option>
                                    <option>二进制</option>
                                </select>
                            </div>
                            <a onClick={(e)=>{
                                  e.preventDefault();
                                  var ico  = this.refs.lineFeedIco;
                                  var srMain = this.refs.srMain;

                                  if(this.getLineFeed(this.props.selectedTab,this.props.tabList)){
                                           ico.src= require('../assets/images/lineFeedFalse.png');
                                           this.props.changeTabShowArea(this.setLineFeed(this.props.selectedTab,false,this.props.tabList));
                                           srMain.style.whiteSpace = "normal";
                                  }else{
                                           ico.src= require('../assets/images/lineFeedTrue.png');
                                           this.props.changeTabShowArea(this.setLineFeed(this.props.selectedTab,true,this.props.tabList));
                                           srMain.style.whiteSpace = "nowrap";
                                  }
                            }}>
                              <img ref="lineFeedIco" src={require('../assets/images/lineFeedTrue.png')} className="lineFeedIco" /></a> 
                   
                    </div>
                    <div className="srBtns">

                        <button  onClick={(e)=>{
                           
                          this.sendDataAgain(this.getShowItem(this.props.selectedTab,this.props.tabList).binaryContent,this.getSocket(this.props.selectedTab,this.props.tabList))
                             
                         }
                        } disabled  ={this.getConstate(this.props.selectedTab,this.props.tabList)?"":"disabled"} >重发数据包</button>

                        <button onClick={(e)=>{
                           if(this.getShowItem(this.props.selectedTab,this.props.tabList).content==''||this.getShowItem(this.props.selectedTab,this.props.tabList).content==undefined){
                             alert("数据包无任何内容")
                             return false;
                           }else{
                             if(this.getHexState(this.props.selectedTab,this.props.tabList)){
                              clipboard.writeText(this.getShowItem(this.props.selectedTab,this.props.tabList).binaryContent);
                             }else{
                              clipboard.writeText(textDecode(this.getShowItem(this.props.selectedTab,this.props.tabList).content,this.getTextDecode(this.props.selectedTab,this.props.tabList)));
                             }
                          
                           }
                        }}>复制数据包</button>

                        <button  onClick={(e)=>{
                         if(this.getHexState(this.props.selectedTab,this.props.tabList)){
                            var str = this.getShowItem(this.props.selectedTab,this.props.tabList).binaryContent;
                            this.props.changeTabSendArea(this.setBinaryData(this.props.selectedTab,str,this.props.tabList))
                            this.props.changeTabSendArea(this.setSdRightShowBinary(this.props.selectedTab,str,this.props.tabList))

                            let data = hexToBinary(str)
                            var bytes =Buffer.byteLength(data);
                            this.props.changeTabSendArea(this.setHeaderBytes(this.props.selectedTab,bytes,this.props.tabList))

              
  
                         }else{
                    
                           var val = textDecode(this.getShowItem(this.props.selectedTab,this.props.tabList).content,this.getTextDecode(this.props.selectedTab,this.props.tabList));
                           this.props.changeTabSendArea(this.setTextData(this.props.selectedTab,val,this.props.tabList))
                           this.props.changeTabSendArea(this.setSdRightShowText(this.props.selectedTab,val,this.props.tabList))

                           var bytes = this.getShowItem(this.props.selectedTab,this.props.tabList).binaryContent.length/2;
                           this.props.changeTabSendArea(this.setHeaderBytes(this.props.selectedTab,bytes,this.props.tabList))
                           
                        }}}>复制到发送区</button>

                        <button onClick={(e)=>{this.saveFile(textDecode(this.getShowItem(this.props.selectedTab,this.props.tabList).content,this.getTextDecode(this.props.selectedTab,this.props.tabList)),this.getShowItem(this.props.selectedTab,this.props.tabList).saveTime)}}>保存</button>
                        <button onClick={(e)=>{this.saveFileToHex(this.getShowItem(this.props.selectedTab,this.props.tabList).binaryContent,this.getShowItem(this.props.selectedTab,this.props.tabList).saveTime)}}>保存Hex文件</button>
                    </div>

                    <div className="srMain" ref="srMain">
                     {
                       (this.getHexState(this.props.selectedTab,this.props.tabList)?HexTable:textDecode(this.getShowItem(this.props.selectedTab,this.props.tabList).content,this.getTextDecode(this.props.selectedTab,this.props.tabList)))
                     }
                    
                    </div>
                  </div>
                </div> 
             </div>
      
         )
    }

  

    saveFile(data,time){
       
        var filters = [
            {   
                name:'',
                extensions:['dat']
            }
        ]

        var filePath = dialog.showSaveDialog({
            defaultPath:time,
            filters,
            title:'文件另存为',
            buttonLabel: '保存'
        })

        fs.writeFileSync(filePath, data, 'utf8')
    }

    saveFileToHex(data,time){

         var filters = [
           {   
               name:'',
               extensions:['hex']
           }
         ]

       var filePath = dialog.showSaveDialog({
           defaultPath:time,
           filters,
           title:'文件另存为Hex文件',
           buttonLabel: '保存为Hex文件'
       })
        
 
       var  newVal="";  
       for(var i =0;i< data.length;i=i+2){
          if(i%32==0&&i!=0){
            newVal+='\n'
          }
           newVal +=data.substring(i,i+2)+' ';
       } 
       
       fs.writeFileSync(filePath, newVal, 'utf8')
    }
}
function mapStateToProps(state){
    return {
        selectedTab: state.tabs.selected,
            tabList: state.tabs.tabList
    };  
  }
  
export default connect(mapStateToProps,{ changeTabSelectedItem,changeTabShowItem,changeTabHexState,changeTabTcpData,changeTabBytesSended,changeTabSendPrompt,
  changeTabSendArea,changeTabShowArea})(ShowData);