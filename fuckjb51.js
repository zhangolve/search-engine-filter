// ==UserScript==
// @name         fuckjb51
// @namespace    https://github.com/zhangolve/fuckjb51
// @version      0.1
// @description  filter something you don't like 
// @author       zhangolve contact   zhangolve@gmail.com
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @match        https://www.baidu.com/*
// @grant             GM_setValue
// @grant             GM_getValue
//@grant              GM_deleteValue
// ==/UserScript==

(function() {
    'use strict';
 
    var re="www.jb51.net\/.*?";
    var getRe = GM_getValue('re', re);
    
    var reg = new RegExp(getRe,"g");

    //var resultQuery=document.getElementsByClassName('c-container');
       for(var i=1;i<11;i++)
       {

         var item=document.getElementById(i);
         var url=item.getElementsByClassName('c-showurl')[0];  
           url=url.innerHTML;
         
           if(reg.test(url))
           {
              console.log(url);
              item.remove();
           }
       }
    var s_tab=document.getElementById("s_tab");
    var inputFilter=document.createElement("input");
    inputFilter.setAttribute("id","inputFilter");
    inputFilter.setAttribute("placeholder","过滤域名");
    var filterButton=document.createElement("input");
    filterButton.setAttribute('type','submit');
    filterButton.setAttribute('value','过滤');
    filterButton.setAttribute('id','filter');
    s_tab.appendChild(inputFilter);
    s_tab.appendChild(filterButton);
  document.getElementById("filter").addEventListener("click", filter );
    function filter(){
    var inputFilter=document.getElementById('inputFilter');
         re=re+"|"+inputFilter.value+"\/.*?";
        getRe=re;
        GM_setValue('re',getRe);
         alert('已添加过滤地址');
        window.location.reload(true);
    }
    // Your code here...
})();