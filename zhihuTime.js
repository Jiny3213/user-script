// ==UserScript==
// @name         知乎回答时间前置
// @namespace    http://tampermonkey.net/
// @version      2024-02-27
// @description  把知乎回答时间前置显示，方便甄别过时回答
// @author       Jiny3213
// @match        https://www.zhihu.com/question/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhihu.com
// @grant        unsafeWindow
// @run-at       document-start
// @license      MIT
// ==/UserScript==

// 调整回答时间位置
function exchangeTimeDom() {
  console.log('do it')
  const answers = document.querySelectorAll('.AnswerItem')
  for(let answer of answers) {
    const content = answer.querySelector('.RichContent')
    const time = answer.querySelector('.ContentItem-time')
    answer.insertBefore(time, content)
  }
}

// 劫持fetch方法来自 https://cloud.tencent.com/developer/article/2123940
(function () {
  const originFetch = fetch;
  window.unsafeWindow.fetch = (url, options) => {
      return originFetch(url, options).then(async (response) => {
          if(url.match(/\/feeds\?/)){
              exchangeTimeDom()
              return response;
          }else{
              return response;

          }
      });
  };
})();

window.unsafeWindow.document.addEventListener("DOMContentLoaded", exchangeTimeDom)
window.unsafeWindow.onload = exchangeTimeDom;

// 劫持xhr
// function addXMLRequestCallback(callback){
//   var oldSend, i;
//   if( XMLHttpRequest.callbacks ) {
//       // we've already overridden send() so just add the callback
//       XMLHttpRequest.callbacks.push( callback );
//   } else {
//       // create a callback queue
//       XMLHttpRequest.callbacks = [callback];
//       // store the native send()
//       oldSend = XMLHttpRequest.prototype.send;
//       // override the native send()
//       XMLHttpRequest.prototype.send = function(){
//           // process the callback queue
//           // the xhr instance is passed into each callback but seems pretty useless
//           // you can't tell what its destination is or call abort() without an error
//           // so only really good for logging that a request has happened
//           // I could be wrong, I hope so...
//           // EDIT: I suppose you could override the onreadystatechange handler though
//           for( i = 0; i < XMLHttpRequest.callbacks.length; i++ ) {
//               XMLHttpRequest.callbacks[i]( this );
//           }
//           // call the native send()
//           oldSend.apply(this, arguments);
//       }
//   }
// }

// e.g.
// addXMLRequestCallback( function( xhr ) {
//       xhr.addEventListener("load", function(){
//       if ( xhr.readyState == 4 && xhr.status == 200) {
//           console.log(xhr.responseURL.match(/\/feeds\?/))
//           console.log(xhr.responseURL)
//           console.log(xhr.__raven_xhr.method)
//           console.log('拦截返回：', xhr);
//       }
//   });
// });

