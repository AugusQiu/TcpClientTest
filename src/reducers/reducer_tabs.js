import { ActionType } from '../utils/CONSTANTS';

const INITIAL_STATE = {
  //  sockets:[], 
   selected: "tab_root",
   tabList:[
     {
       _id:"tab_root",
       title:"首页",
       tag:""
     }
   ]
 }

export default function(state = INITIAL_STATE, action){
  switch (action.type) {

    /*添加标签元素*/
    // case ActionType.INSERT_ELEMENT:
    //   let {tabList} = state;
    //   let tabItem = action.payload;
    //   let tabArray = [...tabList,tabItem]
    //   return Object.assign({},state,{
    //       tabList:tabArray
    //   })

    case ActionType.CHANGE_TABELEMENT:
      let tabArray = [...action.payload]
      return Object.assign({},state,{
        tabList:tabArray
     })
   

    /*删除某个标签 */
    // case ActionType.DELETE_ELEMENT:
    //   let removedData = [...action.payload];
    //   return Object.assign({}, state, {
    //     tabList : removedData
    //   })
    
    /*改变标签页的名称*/
    case ActionType.CHANGE_NAME:
      let changedList = [...action.payload];
        return Object.assign({},state,{
          tabList:changedList
     })
   

  /*改变选中的标签*/
   case ActionType.CHANGE_SELECTED:
    return Object.assign({}, state, { selected: action.payload });
  
   /*改变每个标签页的ip*/
   case ActionType.CHANGE_IP:
      let ipArray= [...action.payload];
      return Object.assign({},state,{
        tabList:ipArray
   })

  /*改变每个标签页的端口地址*/
   case ActionType.CHANGE_PORT:
    let PortArray= [...action.payload];
    return Object.assign({},state,{
      tabList:PortArray
   })


  /*改变连接状态*/
  case ActionType.UPDATE_CONNECTSTATE:
     let conStateArray= [...action.payload];
     return Object.assign({},state,{
        tabList:conStateArray
    })

   /*初始化每个标签页的socket*/
   case ActionType.INIT_SOCKET:
    let socketArray= [...action.payload];
    return Object.assign({},state,{
       tabList:socketArray
    })


   /*更改标签页连接按钮信息*/
   case ActionType.CHANGE_CONBTNTEXT:
     let conbtnArray = [...action.payload];
     return Object.assign({},state,{
      tabList:conbtnArray
     })
  
  /*更改连接建立时间*/
  case ActionType.CHANGE_BUILDTIME:
    let buildTimeArray = [...action.payload];
    return Object.assign({},state,{
      tabList:buildTimeArray
    })
    

  /*更改连接持续时间*/
  case ActionType.CHANGE_CONTINUETIME:
    let continArray = [...action.payload];
    return Object.assign({},state,{
       tabList:continArray
    })

  case ActionType.CHANGE_TIMER:
    let timerArray = [...action.payload];
    return Object.assign({},state,{
       tabList:timerArray
    }) 
 
  case ActionType.CHANGE_ISSTART:
    let isstartArray = [...action.payload];
    return Object.assign({},state,{
       tabList:isstartArray
    })
  

  /*接收和发送的数据字节*/
  case ActionType.CHANGE_BYTESRECIVED:
    let recivedArray = [...action.payload];
    return Object.assign({},state,{
      tabList:recivedArray
    })

  case ActionType.CHANGE_BYTESSENDED:
    let sendedArray = [...action.payload];
    return Object.assign({},state,{
      tabList:sendedArray
    })

  
 /*更改连接发送或接收的数据*/
  case ActionType.CHANGE_TCPDATA:
    let tcpArray = [...action.payload];
    return Object.assign({},state,{
        tabList:tcpArray
    }) 
    
  case ActionType.CHANGE_TEMPTIME:
    let tempTimeArray = [...action.payload]
    return Object.assign({},state,{
      tabList:tempTimeArray
    }) 
 
  case ActionType.CHANGE_SELECTEDITEM:
   let itemArray = [...action.payload]  
   return Object.assign({},state,{
    tabList:itemArray
   }) 
 
   case ActionType.CHANGE_SHOWITEM:
    let showItemArray = [...action.payload]
    return Object.assign({},state,{
      tabList:showItemArray
     }) 

    case ActionType.CHANGE_HEXSTATE:
    let hexArray = [...action.payload]
    return Object.assign({},state,{
      tabList:hexArray
    }) 

    case ActionType.CHANGE_BUILDUNIX:
      let unixArray = [...action.payload]
      return Object.assign({},state,{
        tabList:unixArray
      }) 


      /*发送数据的提示 */
    case ActionType.CHANGE_SENDPROMPT:
      let spArray = [...action.payload];
      return Object.assign({},state,{
          tabList:spArray
      })

     /*显示区域改变*/
     case ActionType.CHANGE_SHOWAREA:
       let showarray = [...action.payload];
       return Object.assign({},state,{
          tabList:showarray
       })

      /* 发送数据区域状态改变*/
    case ActionType.CHANGE_SENDAREA:
      let saArray = [...action.payload];
      return Object.assign({},state,{
        tabList:saArray
      })
      
  }
   return state;
}
