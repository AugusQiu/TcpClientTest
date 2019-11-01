/*测试tcp通讯的主页面*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ConnectTcp from './connectTcp'
import ShowData   from './showData'
import SendData   from './sendData'

class TcpClient extends Component{

  render(){
    return(
      <div className="TCWrap">
        <ConnectTcp />
        <SendData   />
        <ShowData />
      </div>
    )
  }
}

function mapStateToProps(state){
  return { selectedTab: state.tabs.selected };
}

export default connect(mapStateToProps)(TcpClient);