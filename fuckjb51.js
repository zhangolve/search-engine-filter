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
// @grant			  GM_addStyle
// ==/UserScript==


     var searchUrl= 'https://www.baidu.com/s?ie=utf-8&f=8&wd=';
    if(window.location.search!=='')
    {    
    var re="www.jb51.net\/.*?";
    var getRe = GM_getValue('re', re);
    
    var reg = new RegExp(getRe);
       var items=[];
       var urls=[];
       for(var i=1;i<11;i++)
       {
         
           items.push(document.getElementById(i));
           urls.push(items[i-1].getElementsByClassName('c-showurl')[0].innerHTML);  
           if(reg.test(urls[i-1]))
           {
              
              items[i-1].remove();
             
           }
           
       }
        var button=document.getElementById('su');
      button.addEventListener('click',timeout);
      document.addEventListener("keypress",enter);
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
          }
    function filter(){
    var inputFilter=document.getElementById('inputFilter');
        if(inputFilter.value!=='')
        {   
         re=re+"|"+inputFilter.value+"\/.*?";
        getRe=re;
        GM_setValue('re',getRe);
         alert('已添加过滤地址');
        window.location.reload(true);
        }
        else{
        alert("请输入需要过滤的域名");
        }
    }
       function timeout(){
         
           var kw=document.getElementById('kw').value;
           searchUrl+=kw;
           document.location.href=searchUrl; 　
         
      } 
      function enter(event){
      if(event.keyCode==13) {  
            this.timeout();
        }  
      
      }
   


    GM_addStyle("#inputFilter {width: 140px;height:25px;font-size:14px} #filter{width:40px;height:25px;color:red} ");
  /*

  
  
  
  */