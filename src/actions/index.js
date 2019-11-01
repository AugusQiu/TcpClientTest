import db from '../utils/db';
import { ActionType} from '../utils/CONSTANTS';

/*添加标签*/
// export function insertTab(data){
//   return(dispatch)=>{
//     dispatch({
//       type:ActionType.INSERT_ELEMENT,
//       payload:data
//     })
//   }
// }

/*删除标签 */
// export function deleteTab(data){
//   return(dispatch)=>{
//     dispatch({
//       type:ActionType.DELETE_ELEMENT,
//       payload:data
//     })
//   }
// }
export function changeTabElement(data){
  return {
    type: ActionType.CHANGE_TABELEMENT,
    payload: data
  };
}

/*更改选中的标签*/
export function changeSelected(id){
  return {
     type: ActionType.CHANGE_SELECTED,
     payload: id
   };
}

/*修改标签名称*/
export function changeTabName(data){
  return {
    type: ActionType.CHANGE_NAME,
    payload: data
  };
}


export function changeMode(mode){
  return {type: ActionType.CHANGE_MODE, payload: mode};
}


/*更新客户端与服务器连接状态*/
export function updateConnectState(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.UPDATE_CONNECTSTATE,
      payload:data
    })
  }
}



/*改变每个标签页的ip地址*/
export function changeTabIp(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_IP,
      payload:data
    })
  }
}

/*改变每个标签页的端口地址*/
export function changeTabPort(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_PORT,
      payload:data
    })
  }
}

/*初始化socket*/
export function initTabsocket(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.INIT_SOCKET,
      payload:data
    })
  }
}

/*改变连接按钮和提示信息*/
export function changeTabCBtext(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_CONBTNTEXT,
      payload:data
    })
  }
}

export function changeTabPrompt(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_TCPROMPT,
      payload:data
    })
  }
}

/*更改连接建立时间*/
export function changeTabBuildTime(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_BUILDTIME,
      payload:data
    })
  }
}


/*更改连接持续时间 */
export function changeTabContinueTime(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_CONTINUETIME,
      payload:data
    })
  }
}

export function changeTabTimer(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_TIMER,
      payload:data
    })
  }
}

export function changeTabISstart(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_ISSTART,
      payload:data
    })
  }
}


/*接收、发送数据字节*/
export function changeTabBytesRecived(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_BYTESRECIVED,
      payload:data
    })
  }
}


export function changeTabBytesSended(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_BYTESSENDED,
      payload:data
    })
  }
}

/*改变接收、发送的数据列表*/
export function changeTabTcpData(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_TCPDATA,
      payload:data
    })
  }
}

export function changeTabTempTime(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_TEMPTIME,
      payload:data
    })
  }
}

export function changeTabSelectedItem(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_SELECTEDITEM,
      payload:data
    })
  }
}

export function changeTabShowItem(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_SHOWITEM,
      payload:data
    })
  }
}

/*改变数据展示状态 文本 or 十六进制 */
export function changeTabHexState(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_HEXSTATE,
      payload:data
    })
  }
}


export function changeTabBuildUnix(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_BUILDUNIX,
      payload:data
    })
  }
}

export function changeTabSendPrompt(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_SENDPROMPT,
      payload:data
    })
  }
}


export function changeTabSendArea(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_SENDAREA,
      payload:data
    })
  }
}

export function changeTabShowArea(data){
  return(dispatch)=>{
    dispatch({
      type:ActionType.CHANGE_SHOWAREA,
      payload:data
    })
  }
}
// export function insertElement(element){
//   if(!element._id)
//   throw 'Error: Id must be defined.';

//   return (dispatch) => {
//     db.insert(element, (errInsertElement, newElement) => {
//       if(newElement)
//       db.find({},(err,doc)=>{
//         dispatch({
//           type: ActionType.INSERT_ELEMENT,
//           payload:doc,
//           error: err
//         });
//       })
//     });
   
//   };
// }
// export function insertRootElement(element){
//   db.insert(element, (errInsertElement, newElement) => {
//   });
// }

/*获取nedb中所有数据 */
// export function getAllElements(){
//   return (dispatch) => {
//     db.find({},(err,doc)=>{
//       dispatch({
//         type: ActionType.GET_ALL,
//         payload:doc,
//         error: err
//       });
//     })
//   };
// }

// export function deleteElementById(_id){
//     return (dispatch) => {
//       db.remove({ _id:_id },(err, numRemoved) => {
//            if(numRemoved)
//            db.find({},(err,doc)=>{
//             dispatch({
//               type: ActionType.DELETE_ELEMENT,
//               payload:doc,
//               error: err
//             });
//            })
//       });
//   };
// }

// export function deleteAll(){
//   return (dispatch) => {
//     db.remove({}, { multi: true }, function (err, numRemoved) {
//       dispatch({
//         type:ActionType.DELETE_ALL,
//         error:err
//       })
//      });
//   };
 
// }

// export function getRoot(){
//   return (dispatch) => {
//     /*tab_1是首页标签，它无法删除*/
//     db.findOne({_id:'tab_1'}, (err, docs) => {
//       if(docs){
//          db.find({},(err,doc)=>{
//           dispatch({
//             type: ActionType.GET_ROOT,
//             payload:doc,
//             error: err
//           });
//          })
//       }
//       else{
//         db.insert({_id:'tab_1',title:'首页' }, (err, newRoot) => {
//           if(newRoot)
//             db.find({},(err,doc)=>{
//             dispatch({
//               type: ActionType.GET_ROOT,
//               payload:doc,
//               error: err
//             });
//            })
//         });
//       }
//     });
//   };
// }

// /*根据id查询标签元素*/
// export function getElementById(_id){
//   return (dispatch) => {
//     db.findOne({ _id: _id }, (err, docs) => {
//       dispatch({ type: ActionType.GET_ELEMENT, 
//           payload: docs,
//            error: err });
//     });
//   };
// }
/*更新窗口对应连接的服务器ip地址*/
// export function updateIpAddress(_id,ipAddress){
//   return (dispatch) => {
//     db.update({_id:_id}, { $set: { ipAddress: ipAddress} }, { upsert: true }, function (err, numReplaced) {
//       if(numReplaced){
//         db.find({},(err,doc)=>{
//           dispatch({
//             type: ActionType.UPDATE_IP,
//             payload:doc,
//             error: err
//           });
//         })
//        }

//     });
//   };
// }


// export function updateElement(newElement){
//   return (dispatch) => {
//     db.update({ _id: newElement._id }, newElement, {}, (err, numReplaced) => {
//       dispatch({ type: ActionType.UPDATE_ELEMENT, payload: newElement, error: err });
//     });
//   };
// }