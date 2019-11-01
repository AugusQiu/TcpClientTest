/* 数据发送组件*/
import React, { Component } from 'react';
import moment from 'moment'
import fs from 'fs'

import { connect } from 'react-redux';
import {changeTabTcpData,changeTabBytesSended,changeTabSendArea,changeTabSendPrompt} from '../actions/index';
import {bufToUnit8,convertBytes,sendDatatoServer,getTcpDataLength,hexToBinary,formatItemTime,textToHex} from '../utils/tcp_utils'


class SendData extends Component{
    
    constructor(props){
        super(props);
        this.state={
            list:[
                {
                    name:'文本'
                },
                {
                    name:'二进制'
                },
                {
                    name:'文件'
                },
            ]
        }
    }
 
    componentDidUpdate(){

      try{
        var textArea = document.getElementById("textArea");
        textArea.value = this.getTextData(this.props.selectedTab,this.props.tabList)
      }catch(e){

      }
    }

    componentDidMount(){
      let textDecode = this.getTextDecode(this.props.selectedTab,this.props.tabList);
      let option1 =  document.getElementById("selectDecode").children[0]
      let option2 =  document.getElementById("selectDecode").children[1]
      if(textDecode =='UTF-8'){
        option1.setAttribute('selected',true)
      }else if(textDecode =='GB18030'){
        option2.setAttribute('selected',true)
      }
    }

    getConstate(tabId,tabList){
        for(var i=0;i<tabList.length;i++){
          if(tabId == tabList[i]._id){
            return tabList[i].connectState
          }
        }
    }
   
    getSelectedLi(tabId,tabList){
        for(var i=0;i<tabList.length;i++){
            if(tabId == tabList[i]._id){
              return tabList[i].selectedLi
            }
        }
    }
    setSelectedLi(tabId,li,tabList){
        for(var i=0;i<tabList.length;i++){
            if(tabId == tabList[i]._id){
              tabList[i].selectedLi = li;
            }
        }
        return tabList;
    }
    getTextData(tabId,tabList){
        for(var i=0;i<tabList.length;i++){
            if(tabId == tabList[i]._id){
              return tabList[i].textData;
            }
        }
    }
    setTextData(tabId,data,tabList){
        for(var i=0;i<tabList.length;i++){
            if(tabId == tabList[i]._id){
              tabList[i].textData= data;
            }
        }
        return tabList;
    }

    getBinaryData(tabId,tabList){
      for(var i=0;i<tabList.length;i++){
          if(tabId == tabList[i]._id){
            return tabList[i].binaryData;
          }
      }
   }

   setBinaryData(tabId,data,tabList){
      for(var i=0;i<tabList.length;i++){
          if(tabId == tabList[i]._id){
            tabList[i].binaryData= data;
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
      setTcpData(tabId,data,tabList){
        for(var i=0;i<tabList.length;i++){
          if(tabId == tabList[i]._id){
            tabList[i].tcpData.push(data);
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
   
    getUnfold(tabId,tabList){
      for(var i=0;i<tabList.length;i++){
        if(tabId == tabList[i]._id){
          return tabList[i].unfold;
        }
      }
    }
    setUnfold(tabId,state,tabList){
      for(var i=0;i<tabList.length;i++){
        if(tabId == tabList[i]._id){
          tabList[i].unfold = state
        }
      }
      return tabList;
    }

   getFilePath(tabId,tabList){
     for(var i=0;i<tabList.length;i++){
       if(tabId == tabList[i]._id){
         return tabList[i].filePath;
       }
     }
   }

   setFilePath(tabId,path,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        tabList[i].filePath = path;
      }
    }
    return tabList;
   }

   getFileData(tabId,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        return tabList[i].fileData;
      }
    }
  }

  setFileData(tabId,data,tabList){
   for(var i=0;i<tabList.length;i++){
     if(tabId == tabList[i]._id){
       tabList[i].fileData = data;
     }
   }
   return tabList;
  }

  getDataType(tabId,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        return tabList[i].dataType;
      }
    }
  }

  setDataType(tabId,dataType,tabList){
   for(var i=0;i<tabList.length;i++){
     if(tabId == tabList[i]._id){
       tabList[i].dataType = dataType;
     }
   }
   return tabList;
  }

  getFileSize(tabId,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        return tabList[i].fileSize;
      }
    }
  }
  setFileSize(tabId,size,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        tabList[i].fileSize = size;
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
  
  setTextDecode(tabId,decode,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        tabList[i].textDecode = decode;
      }
    }
    return tabList;
  }

  
  getSdRightShowText(tabId,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        return tabList[i].sdRightShowText;
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
   
     
  getSdRightShowBinary(tabId,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        return tabList[i].sdRightShowBinary;
      }
    }
   }

   setSdRightShowBinary(tabId,show,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        tabList[i].sdRightShowBinary= show;
      }
    }
    return tabList;
   }
     
  getSdRightShowFile(tabId,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        return tabList[i].sdRightShowFile;
      }
    }
   }

   setSdRightShowFile(tabId,show,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        tabList[i].sdRightShowFile= show;
      }
    }
    return tabList;
   }
   


    formateSendCont(val){
      var lines = val.split("\n");
      var string = "";
      console.log(lines);
      for(var i=0;i<lines.length-1;i++){
        var line= lines[i];
        console.log(line)
        line = line.replace(/(\/\/.*|#.*)/g,''); //匹配注释
           string+=line;
      }
      return string;
    }

    renderHexTable(data){
       let items =[];
       let hexData = textToHex(data);
  
        for(var i=0;i<hexData.length;i=i+16){
         items.push(
            <tr>
            <td>{i/16+1}</td>
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
          </tr>
          )
       }
      
      return items;
     
    
     }


    render(){
           
         let sdMain;       //展开时左边区域的输入文本域
         let foldInput;    //收取后显示的输入框
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
          </tr>
             {
               this.renderHexTable(this.getSdRightShowBinary(this.props.selectedTab,this.props.tabList))
             }
           </table>
         )


         if(this.getDataType(this.props.selectedTab,this.props.tabList)=='文本'){
               sdMain =(
                 <textarea key="text" id="textArea" style={{width:'100%',height:'100%'}}
                  onBlur={(e)=>{
                    var value = e.target.value;
                    this.props.changeTabSendArea(this.setTextData(this.props.selectedTab,value,this.props.tabList))
                  
                    var string = this.formateSendCont(value);
                    let buf =  Buffer.from(string,'hex');
                    var bytes =Buffer.byteLength(buf);
                    this.props.changeTabSendArea(this.setHeaderBytes(this.props.selectedTab,bytes,this.props.tabList))
  
                    this.props.changeTabSendArea(this.setSdRightShowText(this.props.selectedTab,value,this.props.tabList))
                  }}
                >
                {this.getTextData(this.props.selectedTab,this.props.tabList)}
                </textarea>
               )
              // sdMain=(
              //   <div contentEditable="true" key="text"  id="textArea" suppressContentEditableWarning style={{width:'100%',height:'100%'}}
              //    onBlur={(e)=>{
                 
              //     var value = document.getElementById('textArea').innerText;
              //     this.props.changeTabSendArea(this.setTextData(this.props.selectedTab,value,this.props.tabList))
                
              //     var string = this.formateSendCont(value);
              //     let buf =  Buffer.from(string,'hex');
              //     var bytes =Buffer.byteLength(buf);
              //     this.props.changeTabSendArea(this.setHeaderBytes(this.props.selectedTab,bytes,this.props.tabList))

              //     this.props.changeTabSendArea(this.setSdRightShowText(this.props.selectedTab,value,this.props.tabList))

              //    }}
              //   dangerouslySetInnerHTML={{__html: `${this.getTextData(this.props.selectedTab,this.props.tabList)}`}} ></div>
              // )
         }else if(this.getDataType(this.props.selectedTab,this.props.tabList)=='二进制'){
          // sdMain =(
          //   <textarea key="binary" style={{width:'100%',height:'100%'}} id="binaryArea" value={this.getBinaryData(this.props.selectedTab,this.props.tabList)} 
          //   onBlur={(e)=>{
          //     var string = this.formateSendCont(e.target.value);
          //     this.props.changeTabSendArea(this.setBinaryData(this.props.selectedTab,string,this.props.tabList))
          //  }}>
          //  </textarea>
          // )
          sdMain=(
            <div contentEditable="true" key="binary" id="binaryArea" suppressContentEditableWarning style={{width:'100%',height:'100%'}}
           
             onBlur={(e)=>{
              var value = document.getElementById('binaryArea').innerText;
              this.props.changeTabSendArea(this.setBinaryData(this.props.selectedTab,value,this.props.tabList))

              
              var string = this.formateSendCont(value);
              let buf = hexToBinary(string)
              var bytes =Buffer.byteLength(buf);
              this.props.changeTabSendArea(this.setHeaderBytes(this.props.selectedTab,bytes,this.props.tabList))
              var str = string.replace(/[\r\n\s\t]/g,"");

              this.props.changeTabSendArea(this.setSdRightShowBinary(this.props.selectedTab,str,this.props.tabList))
             }}
            dangerouslySetInnerHTML={{__html: `${this.getBinaryData(this.props.selectedTab,this.props.tabList)}`}} ></div>
          )
         }else{
              sdMain=(
                  <div style={{width:'100%',height:'100%'}}>
                      <p style={{height:'30px'}}>{this.getFilePath(this.props.selectedTab,this.props.tabList)}</p>

                      <div className="flex" style={{marginTop:"100px",height:'35px',width:'100%'}}>
                        <div className="inputWrap"> 
                           <p>选择文件</p>
                            <input id='file'  type='file' onChange={(e)=>{
                            var filePath= document.getElementById('file').files[0].path;
                            var fileSize= document.getElementById('file').files[0].size;
                            this.props.changeTabSendArea(this.setFilePath(this.props.selectedTab,filePath,this.props.tabList));
                            this.props.changeTabSendArea(this.setFileSize(this.props.selectedTab,fileSize,this.props.tabList));
                            this.props.changeTabSendArea(this.setHeaderBytes(this.props.selectedTab,fileSize,this.props.tabList))
                           }}></input>
                      </div>
                        <div style={{marginTop:'10px',width:'20%',marginLeft:'40%'}}>
                         <input type="checkbox" value="hex" checked ></input>
                         <label>Hex文件</label>
                        </div>
                    </div>
                  </div>
                    
                       
              )
         }
         
         if(!this.getUnfold(this.props.selectedTab,this.props.tabList)&&this.getDataType(this.props.selectedTab,this.props.tabList)=='文本'){
           foldInput = (
             <input type="text" key="inputText" className="foldInput" onBlur={(e)=>{
              var string = this.formateSendCont(e.target.value);
              this.props.changeTabSendArea(this.setTextData(this.props.selectedTab,string,this.props.tabList))

              var buf = hexToBinary(string);
              var bytes = Buffer.byteLength(buf);
              this.props.changeTabSendArea(this.setHeaderBytes(this.props.selectedTab,bytes,this.props.tabList))
             }}></input>
           )
         }else if(!this.getUnfold(this.props.selectedTab,this.props.tabList)&&this.getDataType(this.props.selectedTab,this.props.tabList)=='二进制'){
          foldInput = (
            <input type="text" key="inputBinary" className="foldInput" onBlur={(e)=>{
             var string = this.formateSendCont(e.target.value);
             this.props.changeTabSendArea(this.setBinaryData(this.props.selectedTab,string,this.props.tabList))

             let buf = hexToBinary(string)
             var bytes =Buffer.byteLength(buf);
             this.props.changeTabSendArea(this.setHeaderBytes(this.props.selectedTab,bytes,this.props.tabList))
            }}></input>
          )
         }else if(!this.getUnfold(this.props.selectedTab,this.props.tabList)&&this.getDataType(this.props.selectedTab,this.props.tabList)=='文件'){
          foldInput = (
           <div className="foldFileWrap">
                     <div className="inputWrap"> 
                           <p>选择文件</p>
                            <input id='file2'  type='file' onChange={(e)=>{
                            var filePath= document.getElementById('file2').files[0].path;
                            var fileSize= document.getElementById('file2').files[0].size;
                            this.props.changeTabSendArea(this.setFilePath(this.props.selectedTab,filePath,this.props.tabList));
                            this.props.changeTabSendArea(this.setFileSize(this.props.selectedTab,fileSize,this.props.tabList));
                            this.props.changeTabSendArea(this.setHeaderBytes(this.props.selectedTab,fileSize,this.props.tabList))
                           }}></input>
                      </div>
                   <p>{ this.getFilePath(this.props.selectedTab,this.props.tabList)}</p>
           </div>
           )
         }

         

         return(
             <div className="sendDataWrap"  ref="sendDataWrap">
               <div className="sdHeaderWrap"> 
                <div className="sdHeader">
                   <button onClick={(e)=>{
                       if(!this.getConstate(this.props.selectedTab,this.props.tabList)){
                           alert("与服务器断开，请重新连接");
                           return;
                       }else{
                          if(this.state.textData==''){
                              alert("请输入发送内容或者选择发送文件")
                              return;
                          }

                          if(this.getDataType(this.props.selectedTab,this.props.tabList)=='文件'){
                            let startTime = moment().valueOf();
                          
                            var fileSize= this.getFileSize(this.props.selectedTab,this.props.tabList);
                            var totalBytes = this.getBytesSended(this.props.selectedTab,this.props.tabList);
                            totalBytes+=fileSize;
                            this.props.changeTabBytesSended(this.setBytedSended(this.props.selectedTab,totalBytes,this.props.tabList));

                            let sendAndInsert = async ()=>{
                                await this.sendFile(this.getFilePath(this.props.selectedTab,this.props.tabList),this.getSocket(this.props.selectedTab,this.props.tabList));
                               
                                var endTime  = moment().valueOf();
                                var totalTime = (endTime - startTime)/1000;

                                fileSize = convertBytes(fileSize);
                                var itemTime = formatItemTime(endTime);
                          
                                var orderNum = getTcpDataLength(this.props.selectedTab,this.props.tabList) +1;


                                let fileData  = this.getFileData(this.props.selectedTab,this.props.tabList);//buffer类型


                                var saveSecond = ((endTime% (1000 * 60)));
                                var saveTime = moment().format('YYYYMMDDHHmm')+saveSecond
                                var obj = {
                                    orderNum:orderNum,
                                    content:bufToUnit8(fileData),
                                    binaryContent:this.getFileData(this.props.selectedTab,this.props.tabList).toString('hex'),
                                    time:itemTime,
                                    saveTime:saveTime,
                                    type:'发送',
                                    takedTime:totalTime+'s',
                                    bytes:fileSize
                                 } 
                              
                                 this.props.changeTabTcpData(this.setTcpData(this.props.selectedTab,obj,this.props.tabList));
                        
                           }
                              
                           sendAndInsert();
                        
                           
                          }else if(this.getDataType(this.props.selectedTab,this.props.tabList) =='二进制'){
                            let value = this.getBinaryData(this.props.selectedTab,this.props.tabList);
                            // var string = this.formateSendCont(value);
                            let data = hexToBinary(value)
                            this.sendBinaryData(data,this.getSocket(this.props.selectedTab,this.props.tabList));
                          }else{  //传输文本
                            let data = this.getTextData(this.props.selectedTab,this.props.tabList);
                            // var string = this.formateSendCont(data);
                            this.sendTextData(data,this.getSocket(this.props.selectedTab,this.props.tabList),'utf-8');
                          }
                              
                           
                           
                       }
                   }}  disabled  ={this.getConstate(this.props.selectedTab,this.props.tabList)?"":"disabled"}>发送</button>

                    <ul className='flex' style={{justifyContent:'space-between'}}>
                        {
                           this.state.list.map((item, index) => {
                                return <li key={index} className={(this.getSelectedLi(this.props.selectedTab,this.props.tabList) ===index)?"sdLiactive":""} style={{cursor:'pointer'}} onClick={(e)=>{
                                  
                                    this.props.changeTabSendArea(this.setDataType(this.props.selectedTab,item.name,this.props.tabList));
                                    this.props.changeTabSendArea(this.setSelectedLi(this.props.selectedTab,index,this.props.tabList));
                                }}>{item.name}</li>
                           })

                        }
                   </ul>

                   {foldInput}
                  
                   <div className='flex' ref="encodeWrap" style={{width:'20%',marginTop:'10px'}}>
                         <p>字符编码:</p>
                         <select id="selectDecode" style={{width:'60%',height:'20px'}} onChange={(e)=>{
                                  if(e.target.value =='UTF-8'){
                                        this.props.changeTabSendArea(this.setTextDecode(this.props.selectedTab,'UTF-8',this.props.tabList));
                                  }else if(e.target.value =='GB18030'){
                                        this.props.changeTabSendArea(this.setTextDecode(this.props.selectedTab,'GB18030',this.props.tabList));
                                  }
                               }}
                         >
                             <option>UTF-8</option>
                             <option>GB18030</option>
                        </select>
                   </div>

                   <p style={{marginTop:'10px'}}>实际字节数:{this.getHeaderBytes(this.props.selectedTab,this.props.tabList)}字节</p>

                   <a id="foldLink" onClick={(e)=>{
                     e.preventDefault();
                  
                     var sendDataWrap = this.refs.sendDataWrap;
                     var foldLink = document.getElementById("foldLink");
                     var encodeWrap =this.refs.encodeWrap;

                     if(this.getUnfold(this.props.selectedTab,this.props.tabList)){
                      sendDataWrap.style.height = "48px";
                      foldLink.innerText = "展开";
                      encodeWrap.style.display = "none";
                      this.props.changeTabSendArea(this.setUnfold(this.props.selectedTab,false,this.props.tabList));
                     }else{
                      sendDataWrap.style.height = "350px";
                      foldLink.innerText = "收取";
                      encodeWrap.style.display ="flex";
                      this.props.changeTabSendArea(this.setUnfold(this.props.selectedTab,true,this.props.tabList));
                     }
                   }}> 收取</a>
                </div>
                </div>
               <div className="flex" ref="sdContainer">
                  <div className="sdLeft">
                    {sdMain}
                  </div>
                  <div className="sdRight">
                     {(this.getDataType(this.props.selectedTab,this.props.tabList)=='文本')?this.getSdRightShowText(this.props.selectedTab,this.props.tabList):HexTable}
                  </div>
                </div> 
             </div>
         )



    }


     /*传输文本*/
     sendTextData(data,socket,encode){
        let startTime = moment().valueOf();
    
        sendDatatoServer(data,socket,encode).then((res)=>{
           if(res=='success'){

              //字符串转十六进制
              let binaryData = new Buffer(data).toString('hex');
              let buf  = Buffer.from(binaryData,'hex');


               var endTime  = moment().valueOf();
               var totalTime = (endTime - startTime)/1000;
    
               var bytes =Buffer.byteLength(buf);
               var totalBytes = this.getBytesSended(this.props.selectedTab,this.props.tabList);
               totalBytes+=bytes;
               bytes = convertBytes(bytes);
              
               var itemTime = formatItemTime(endTime);
               var orderNum = getTcpDataLength(this.props.selectedTab,this.props.tabList) +1;

               var saveSecond = ((endTime% (1000 * 60)));
               var saveTime = moment().format('YYYYMMDDHHmm')+saveSecond

               var obj = {
                   orderNum:orderNum,
                   content:bufToUnit8(buf),
                   binaryContent:binaryData,
                   time:itemTime,
                   saveTime:saveTime,
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
    

 

     /*传输二进制 */
     sendBinaryData(data,socket){
        let startTime = moment().valueOf();
        sendDatatoServer(data,socket).then((res)=>{
           if(res=='success'){
               var endTime  = moment().valueOf();
               var totalTime = (endTime - startTime)/1000;
    
               var bytes =Buffer.byteLength(data);
               var totalBytes = this.getBytesSended(this.props.selectedTab,this.props.tabList);
               totalBytes+=bytes;
               bytes = convertBytes(bytes);
              
               var itemTime = formatItemTime(endTime);
               var orderNum = getTcpDataLength(this.props.selectedTab,this.props.tabList) +1;

               var saveSecond = ((endTime% (1000 * 60)));
               var saveTime = moment().format('YYYYMMDDHHmm')+saveSecond

               var obj = {
                   orderNum:orderNum,
                   time:itemTime,
                   saveTime:saveTime,
                   content:bufToUnit8(data),
                   binaryContent:data.toString('hex'),
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
 
    

     /*传输文件*/
     sendFile(path,socket){
        let fileInfo = fs.statSync(path);
        let fileSize = fileInfo.size;

        let sendSize = 0;
        let packSize = 1024;

        let fd = fs.openSync(path, 'r');
        let buf = new Buffer.alloc(packSize);

        while (sendSize < fileSize) {
            
            fs.readSync(fd, buf, 0, buf.length, sendSize);
            // let data = buf.toString('hex');//以十六进制传输
            this.props.changeTabSendArea(this.setFileData(this.props.selectedTab,buf,this.props.tabList));

            socket.write(buf,"",()=>{
              this.props.changeTabSendPrompt(this.setSendPrompt(this.props.selectedTab,"发送成功",this.props.tabList))
            });
            sendSize += packSize;
        }

    }

}
function mapStateToProps(state){
    return {
        selectedTab: state.tabs.selected,
        tabList: state.tabs.tabList
    };
  }
  
export default connect(mapStateToProps,{changeTabTcpData,changeTabBytesSended,changeTabSendPrompt,changeTabSendArea})(SendData);