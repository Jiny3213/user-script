// ==UserScript==
// @name         bilibili显示豆瓣评分跳转
// @namespace    https://github.com/Jiny3213
// @version      1.0
// @description  一个简单的脚本，显示番剧和电影的豆瓣评分，点击可以跳转豆瓣，为你在b站看剧提供参考
// @author       Jiny3213
// @match        https://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        GM_xmlhttpRequest
// @require      file://D:\code\bili-douban-score\index.js
// @duplicated   此脚本已过时，无法获取豆瓣评分
// ==/UserScript==

(function() {
  'use strict';
  let title, isAppend, father
  if(document.querySelector('[class^="mediainfo_mediaTitle"]')) {
    title = document.querySelector('[class^="mediainfo_mediaTitle"]').innerText
    isAppend = false
    father = document.querySelector('[class^="mediainfo_bottomBar"]')
  } else if (document.querySelector('.media-info-title-t')) {
    title = document.querySelector('.media-info-title-t').innerText
    isAppend = true
    father = document.querySelector('.media-info-count')
  } else {
    return
  }
//   GM_xmlhttpRequest({
//     headers: {
//       'content-type': 'text/html; charset=utf-8',
//       'User-agent': window.navigator.userAgent,
//     },
//     url: 'https://www.douban.com/search?q=' + title,
//     method: 'GET',
//     onreadystatechange: (res) => {
//       if (res.readyState === 4) {
//         const doc = (new DOMParser).parseFromString(res.response, 'text/html');
//         console.log(1111, doc)
//         console.log(doc.querySelector('.search-result .DouWeb-SR-search-result-list-smart-box-card .rating_num'))
//         const doubanScore = doc.querySelector('.search-result .DouWeb-SR-search-result-list-smart-box-card .rating-num').innerText
//         const href = doc.querySelector('.result-list .result .title a').href
//         const doubanScoreEl = document.createElement('a')
//         doubanScoreEl.href = href
//         doubanScoreEl.target = '_blank'
//         doubanScoreEl.style.color = "#7fc06e"
//         if(isAppend) {
//           document.querySelector('.media-info-count-item-review').classList.remove('media-info-count-item-review')
//           const titleEl = document.createElement('span')
//           doubanScoreEl.classList.add('media-info-count-item')
//           doubanScoreEl.classList.add('media-info-count-item-review')
//           titleEl.classList.add('media-info-label')
//           titleEl.innerText = '豆瓣评分'
//           titleEl.style.color = "#7fc06e"
//           const scoreEl = document.createElement('em')
//           scoreEl.innerText = `${doubanScore}分` 
//           scoreEl.style.color = "#7fc06e"
//           doubanScoreEl.appendChild(titleEl)
//           doubanScoreEl.appendChild(scoreEl)
//           father.appendChild(doubanScoreEl)
//         } else {
//           doubanScoreEl.innerText = `豆瓣评分：${doubanScore}分`
//           father.insertBefore(doubanScoreEl, document.querySelector('[class^="upinfo_upInfoCard"]'))
//         }
//       }
//     },
// })

  GM_xmlhttpRequest({
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'User-agent': window.navigator.userAgent,
    },
    url: `https://m.douban.com/rexxar/api/v2/search?q=${encodeURIComponent(title)}&type=&loc_id=&start=0&count=10&sort=relevance`,
    method: 'GET',
    onreadystatechange: (res) => {
      if (res.readyState === 4) {
        console.log(res.response)
        // const doc = (new DOMParser).parseFromString(res.response, 'text/html');
        // console.log(1111, doc)
        // console.log(doc.querySelector('.search-result .DouWeb-SR-search-result-list-smart-box-card .rating_num'))
        // const doubanScore = doc.querySelector('.search-result .DouWeb-SR-search-result-list-smart-box-card .rating-num').innerText
        // const href = doc.querySelector('.result-list .result .title a').href
        // const doubanScoreEl = document.createElement('a')
        // doubanScoreEl.href = href
        // doubanScoreEl.target = '_blank'
        // doubanScoreEl.style.color = "#7fc06e"
        // if(isAppend) {
        //   document.querySelector('.media-info-count-item-review').classList.remove('media-info-count-item-review')
        //   const titleEl = document.createElement('span')
        //   doubanScoreEl.classList.add('media-info-count-item')
        //   doubanScoreEl.classList.add('media-info-count-item-review')
        //   titleEl.classList.add('media-info-label')
        //   titleEl.innerText = '豆瓣评分'
        //   titleEl.style.color = "#7fc06e"
        //   const scoreEl = document.createElement('em')
        //   scoreEl.innerText = `${doubanScore}分` 
        //   scoreEl.style.color = "#7fc06e"
        //   doubanScoreEl.appendChild(titleEl)
        //   doubanScoreEl.appendChild(scoreEl)
        //   father.appendChild(doubanScoreEl)
        // } else {
        //   doubanScoreEl.innerText = `豆瓣评分：${doubanScore}分`
        //   father.insertBefore(doubanScoreEl, document.querySelector('[class^="upinfo_upInfoCard"]'))
        // }
      }
    },
})

})();