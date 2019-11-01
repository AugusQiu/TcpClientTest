import React, { Component } from 'react';
import { connect } from 'react-redux';

import ShowTab from './showTab'
import TabList from './tabList'
import Footer from './footer'

class App extends Component {

  nameModalClose(text){
    this.props.nameModalToggle();
    if(text)
      this.props.nameModal.callback(text);
  }

  render() {
    return (
    
        <div className="appWrap">   
            <TabList/>
            <ShowTab/>
            <Footer/>
        </div>
    );
  }
}

function mapStateToProps(state){
  return {
    elementList: state.tabs.elementList,
  };
}

export default connect(mapStateToProps)(App);
