import _ from 'lodash';
import React from 'react';
import TabElement from '../components/tabElement'


/*传入的参数element只有窗口这一种类型，所以返回的也只有窗口元素*/
export function renderElement(element){
   return <TabElement key={element._id} title={element.title} _id={element._id} tag = {element.tag}/>;
}

