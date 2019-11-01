export class ActionType {
  
  // static INSERT_ELEMENT = 'INSERT_ELEMENT';
  // static DELETE_ELEMENT = 'DELETE_ELEMENT';
  static CHANGE_TABELEMENT = 'CHANGE_TABELEMENT'

  static CHANGE_SELECTED = 'CHANGE_SELECTED';
  static CHANGE_NAME = 'CHANGE_NAME';

  // 改变连接状态
  static UPDATE_CONNECTSTATE = 'UPDATE_CONNECTSTATE';

  //添加、删除每个标签页的ip地址和端口
  static CHANGE_IP  = 'CHANGE_IP';
  static CHANGE_PORT= 'CHANGE_PORT'

  // 初始化socket
  static INIT_SOCKET = 'INIT_SOCKET';

  // 更改连接按钮和提示信息
  static CHANGE_CONBTNTEXT = 'CHANGE_CONBTNTEXT';
  static CHANGE_TCPROMPT = 'CHANGE_TCPROMPT'
  
  // 更改相关时间显示
  static CHANGE_BUILDTIME= 'CHANGE_BUILDTIME';
  static CHANGE_CONTINUETIME = 'CHANGE_CONTINUETIME';
  static CHANGE_TIMER = 'CHANGE_TIMER';
  static CHANGE_ISSTART = 'CHANGE_ISSTART';

  // 接收、发送数据字节
  static CHANGE_BYTESRECIVED = 'CHANGE_BYTESRECIVED';
  static CHANGE_BYTESSENDED  = 'CHANGE_BYTESSENDED';  

  // 更改接收、发送数据
  static CHANGE_TCPDATA = 'CHANGE_TCPDATA';
  
  static CHANGE_TEMPTIME = 'CHANGE_TEMPTIME';
  static CHANGE_SELECTEDITEM = 'CHANGE_SELECTEDITEM';
  static CHANGE_SHOWITEM = 'CHANGE_SHOWITEM';

  static CHANGE_HEXSTATE = 'CHANGE_HEXSTATE';
  static CHANGE_BUILDUNIX = 'CHANGE_BUILDUNIX';

  // 发送数据的提示
  static CHANGE_SENDPROMPT = 'CHANGE_SENDPROMPT';

  //发送区域改变
  static CHANGE_SENDAREA= 'CHANGE_SENDAREA';

  //显示区域改变
  static CHANGE_SHOWAREA ='CHANGE_SHOWAREA';
}

export class StorageConfig {

  static DEFAULT_DB = '/home/andreas/Downloads/notes.db';

  /*每个标签窗口元素数据存储的格式配置*/
  static Tab_DEFAULT_STORAGE = {
    _id: '',   
    title: '',
    tag:''
  };
}

