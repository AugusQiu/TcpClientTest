import React,{Component} from 'react'
import { connect } from 'react-redux';

import NewTcpC from '../tcpClient/newTcp_c'
import TcpClient from '../tcpClient/TcpClient'

class ShowTab extends Component{
    render(){
        return(
          <div>
           {
             (this.props.selectedTab==='tab_root')?<NewTcpC key='tab_root' />:<TcpClient key={this.props.selectedTab}/>
           }
          
          </div>
        )
    }
}
function mapStateToProps(state){
  return { selectedTab: state.tabs.selected };
}

export default connect(mapStateToProps)(ShowTab);
