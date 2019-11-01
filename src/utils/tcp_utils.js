
/*UTF-8编码*/
// export function Uint8ArrayToString(array) {
//     console.log(array);
//     var out, i, len, c;
//     var char2, char3;
//     out = "";
//     len = array.length;
//     i = 0;
//     while (i < len) {
//         c = array[i++];
//         switch (c >> 4) {
//             case 0:
//             case 1:
//             case 2:
//             case 3:
//             case 4:
//             case 5:
//             case 6:
//             case 7:

//                 out += String.fromCharCode(c);
//                 break;
    
//             case 12:
//             case 13:
//                 char2 = array[i++];
//                 out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
//                 break;
//             case 14:
//                 char2 = array[i++];
//                 char3 = array[i++];
//                 out += String.fromCharCode(((c & 0x0F) << 12) |
//                     ((char2 & 0x3F) << 6) |
//                     ((char3 & 0x3F) << 0));
//                 break;
//         }
//     }

//     return out;
// }

/*获取字节数,UTF-8编码下*/
export  function getBytesLength(str) {   
    var totalLength = 0;     
    var charCode;  
    for (var i = 0; i < str.length; i++) {  
        charCode = str.charCodeAt(i);  
        if (charCode < 0x007f)  {     
            totalLength++;     
        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff))  {     
            totalLength += 2;     
        } else if ((0x0800 <= charCode) && (charCode <= 0xffff))  {     
            totalLength += 3;   
        } else{  
            totalLength += 4;   
        }          
    }  
    return totalLength;   
}  



//unit8Array根据选择编码成字符串
export function textDecode(unit8,decode){
    if(unit8 ==undefined){
        return '';
    }
    var str = "";
    if(decode =='UTF-8'){
        str = new TextDecoder('utf-8').decode(unit8);
    }else if(decode=='GB18030'){
        str = new TextDecoder('gb18030').decode(unit8);
    }
    return str;
  }

/*发送、接收数据时间选项格式化 */
export function formatItemTime(time){

    var hours = parseInt(( time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+8;
    hours =  (hours < 10 ? ('0' + hours) : hours);
    var minutes = parseInt((time% (1000 * 60 * 60)) / (1000 * 60));
    minutes = (minutes < 10 ? ('0' + minutes) : minutes)
    var seconds =((time%(1000*60))/1000).toFixed(3);   
    seconds = (seconds<10?('0'+seconds):seconds)

    return `${hours}:${  minutes }:${seconds}`;

}


// buffer二进制转unit8Array的数据格式
export function  bufToUnit8(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

export function convertBytes(bytes){
      if(bytes<1024){
          return bytes+'字节'
      }
      else if(1024<=bytes&&bytes<1024*1024){
        return (bytes/1024).toFixed(2)+'KB'
      }else if(1024*1024<=bytes&&bytes<1024*1024*1024){
        return (bytes/(1024*1024)).toFixed(2)+'MB'
      }else{
        return (bytes/(1024*1024*1024)).toFixed(2)+'GB'
      }
}

/*文本字符串转十六进制*/
export function textToHex(data){
    if(data == undefined){
        return [];
    }

    var hexData=[];
    var data = data.toString();

    for(var i =0;i< data.length;i=i+2){  
        hexData.push(data.substring(i,i+2));
    } 
    return hexData;
}

/*十六进制转ascii码*/
export function hexToAscii(hex){
    if(hex ==undefined){
        return '.';
    }
    var x1 = hex.charAt(0);
    var x2 = hex.charAt(1);
    x1 = parseInt(hexCharToNum(x1));
    x2 = parseInt(hexCharToNum(x2));
    var number = 16*x1 +x2;
     
    var newHex = '0x'+hex;
    if(number<33 ||number ==127){
        return '.'
    }else{
        return String.fromCharCode(newHex)
    } 

}

function hexCharToNum(char){
  switch (char){
      case 'A':
          return 10
      case 'B':
          return 11
      case 'C':
          return 12
      case 'D':
          return 13
      case 'E':
          return 14
      case 'F':
          return 15
     default:
         return char
  }
}

/*发送数据到服务器 */
export function sendDatatoServer(data,socket,encode){
    var p = new Promise((resolve,reject)=>{
        socket.write(data, encode,function(){
            resolve('success')
        });
      
        socket.on("error", function (err) {
            reject(err)
        });

    })
    return p;
   
  }

 /*获取单个标签页下已有数据的长度 */ 
 export function  getTcpDataLength(tabId,tabList){
    for(var i=0;i<tabList.length;i++){
      if(tabId == tabList[i]._id){
        return tabList[i].tcpData.length;
      }
    }
   } 


 /*十六进制字符串转二进制*/
 export function hexToBinary(data){
       //   console.log(parseInt(data,16).toString(2));
    // var blob = new Blob([data], {type: 'text/plain'});
    // return blob;
    // var reader = new FileReader();
    // reader.onload = function(event){
    //     var content = reader.result;
    //     console.log(content)
    //  };
    //  reader.readAsText(blob);

    var str = data.replace(/[\r\n\s\t]/g,"");
    let buf  = Buffer.from(str,'hex');
    return buf
 }  


 