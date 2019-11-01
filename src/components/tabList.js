import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderElement} from '../utils/utils';



class TabList extends Component {

  componentDidUpdate(){
    let i = this.props.tabList.length;
    let width = i*112+"px";
    this.refs.tabListDiv.style.width = "calc(100% - "+width+")";
  }
  renderElements(List) {
    return List.map( (item,i) => renderElement(item));
  }
  
 

  render(){
    const List = this.props.tabList;
    return(
      <div className="flex tabListWrap">
        { this.renderElements.bind(this)(List) }
        <div style={{ width: "calc(100% - 112px)", borderBottom:"1px solid #2d9cd5"}} ref="tabListDiv"></div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { tabList: state.tabs.tabList };
}

export default connect(
  mapStateToProps
)(TabList);

