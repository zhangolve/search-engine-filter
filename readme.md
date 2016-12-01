# 功能

- 百度搜索默认过滤掉脚本之家(www.jb51.net ) 的内容
- 添加一个输入框，输入指定的url，使得在搜索时，来屏蔽掉来自特定地址的内容
- 添加完成后点击过滤按钮进行提示

# todo

- ~~添加完成后点击过滤按钮进行提示~~ 
- 用户添加脚本后，首次启动，进行向导 
[原生js实现弹窗](http://www.cssscript.com/minimal-modal-window-with-plain-javascript/)
- gm_stylish 
- 更完善的过滤机制
- 加入对google搜索时的过滤机制
- 当更新脚本时gm_Value 应当不变，而不是焚毁掉
- 对输入的域名匹配正则表达式
- 直接使用ES6语法，尽量不适用Jquery


# 目录结构

HCBClient\src\routes\Home\components




| 文件                | 功能               | 
| --------------------|:------------------:|
| Home.jsx            | 展示充值客户端主页 | 
| login.jsx           | 登录页面           |  
| pay.jsx             | 银行卡充值页面     |  
|cashPay.jsx          | 现金充值页面       |
|TopUp.jsx            |提现页面            |
|BackHome.jsx         |返回首页组件        |
|HomeWelcome.jsx      |欢迎组件            |
|welcome.jsx          |欢迎组件            |
|SettlementDetail.jsx |结账页面            |
|HealthCardBalance.jsx|健康卡余额查询组件  |
|BankNote.jsx         |银行记账补录页面    |


注：**TemporaryCard.jsx 和OfficialCard.jsx 文件及两个文件夹用于存放正式卡应用和临时卡应用功能相应代码，暂时未开发完全  **