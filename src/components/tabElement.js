import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSelected,changeTabElement} from '../actions/index';

class TabElement extends Component {

  delTabElement(tabId,tabList){
    let array = tabList;
     for(var i=0;i<array.length;i++){
        if(tabId == array[i]._id){
          array.splice(i,1)
        }
     }
     return array;
  }

  render(){
    return(
       <div onClick={()=>{ 
         this.props.changeSelected(this.props._id);
       }} 
          className={ 'tabWrap '+(this.props.selectedTab == this.props._id?'active':'')}>

        <p className="tabTag">{this.props.tag}</p>     
        <p className="tabTitle">{this.props.title}</p>
         {(this.props._id==='tab_root')?<div></div>:
         
         <div onClick={()=>{    
            let newArray = this.delTabElement(this.props._id,this.props.tabList);
        

            let deleteAndchange = async()=>{
              await  this.props.changeTabElement(newArray)
              this.props.changeSelected('tab_root');
            }
            
            try{
              deleteAndchange();
            }catch(e){

            }
        
            
        }}><img src={require('../assets/images/delete.png')} className="delIcon"/></div>
         }
       </div>
      
     
    
    )

  }
}


function mapStateToProps(state){
  return { 
       selectedTab: state.tabs.selected,
       tabList :    state.tabs.tabList 
  }; 
}

export default connect(mapStateToProps, { changeSelected,changeTabElement})(TabElement);
