var submit=document.getElementById('submit');
var filterRules=localStorage.getItem('filter');
submit.addEventListener('click', filter);

function filter() {
var inputFilter = document.getElementById('inputFilter');

if (inputFilter.value !== '') {

filterRules = filterRules + '|' + inputFilter.value + '\/.*?';
//GM_setValue('re', getRe);
localStorage.setItem('filter',filterRules);
alert(filterRules);
alert('已添加过滤地址');
window.location.reload(true);
} else {
alert('请输入需要过滤的域名');
}
}

