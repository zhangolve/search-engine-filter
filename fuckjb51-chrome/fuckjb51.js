    var searchUrl= 'https://www.baidu.com/s?ie=utf-8&f=8&wd=';

    if(window.location.search!=='')
    {    
    var re="www.jb51.net\/.*?";
    var reg = new RegExp(re);
       var items=[];
       var urls=[];
       for(var i=1;i<11;i++)
       {
         
           items.push(document.getElementById(i));
           var showurl= items[i-1].getElementsByClassName('c-showurl');
           if(showurl.length!==0)
           {
           urls.push(items[i-1].getElementsByClassName('c-showurl')[0].innerHTML);
               console.log(urls[i-1]);
           if(reg.test(urls[i-1]))
           {
              
              items[i-1].remove();
             
           }
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
   
