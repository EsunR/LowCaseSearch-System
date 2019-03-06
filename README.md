- [登录界面](#%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2)
    - [用户登录](#%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95)
    - [获取用户姓名](#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E5%A7%93%E5%90%8D)
- [注册界面](#%E6%B3%A8%E5%86%8C%E7%95%8C%E9%9D%A2)
    - [提交注册信息](#%E6%8F%90%E4%BA%A4%E6%B3%A8%E5%86%8C%E4%BF%A1%E6%81%AF)
- [修改密码界面](#%E4%BF%AE%E6%94%B9%E5%AF%86%E7%A0%81%E7%95%8C%E9%9D%A2)
    - [提交修改后的密码](#%E6%8F%90%E4%BA%A4%E4%BF%AE%E6%94%B9%E5%90%8E%E7%9A%84%E5%AF%86%E7%A0%81)
- [用户信息Api](#%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AFapi)
    - [获取用户基本信息](#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF)
- [学生系统](#%E5%AD%A6%E7%94%9F%E7%B3%BB%E7%BB%9F)
  - [法律法规板块](#%E6%B3%95%E5%BE%8B%E6%B3%95%E8%A7%84%E6%9D%BF%E5%9D%97)
    - [搜索法律法规](#%E6%90%9C%E7%B4%A2%E6%B3%95%E5%BE%8B%E6%B3%95%E8%A7%84)
  - [学生反馈板块](#%E5%AD%A6%E7%94%9F%E5%8F%8D%E9%A6%88%E6%9D%BF%E5%9D%97)
    - [提交反馈信息](#%E6%8F%90%E4%BA%A4%E5%8F%8D%E9%A6%88%E4%BF%A1%E6%81%AF)
- [教师系统](#%E6%95%99%E5%B8%88%E7%B3%BB%E7%BB%9F)
    - [案例上传](#%E6%A1%88%E4%BE%8B%E4%B8%8A%E4%BC%A0)


# 登录界面

### 用户登录
url：/login

类型：post

说明: 用来传出登录信息，返回Token

发送数据：
```js
{
    account: "16031210105",
    passWord: "123456",
    identity: "student", // 登录用户的身份，有student, teacher, admin
}
```

返回数据：
```js
{
    token: "hsajdhajfhuh2ksjkh3kjksadj"
}
```

报错：
- 密码错误

### 获取用户姓名
url：/getName?account=16031210105

类型：get

说明：用户输入学号/工号时自动显示学生/教师姓名。

返回数据：
```js
{
    name: "李大帅"
}
```


# 注册界面

### 提交注册信息
url：/commitReg

类型：post

说明：用户在注册界面提交完个人信息后点击注册，将信息上传到数据库。

发送数据：
```js
{
    name: "李大帅",
    account: "16031210105",
    email: "esunr641@gmail.com",
    phone: "15600000000",
    passWord: "123456",
    identity: "student"
}
```

接收数据：
```js
{
    status: "ok" //注册状态，如果成功注册，返回“ok”，失败返回“no”
}
```

报错：
- 学号已存在
- 数据插入错误，注册失败


# 修改密码界面
### 提交修改后的密码
url：/commitAlterPwd

类型：post （验证Token）

说明：用户提交修改密码后，后台检查原始密码是否对应，如果对应，则修改成功，将新密码覆盖，返回结果；反之修改失败，返回结果。

发送数据：
```js
{
    oldPwd: "123456",
    newPwd: "112233"
}
```

返回数据：
```js
{
    status: "ok" // 修改成功返回“ok”，失败返回“no”
}
```

报错：
- 更新密码失败


# 用户信息Api
### 获取用户基本信息
url：/getUserInfo?

类型：post （验证Token）

说明：获取用户的基本信息，这些信息每次用户进入系统后都要重新获取，这些信息将被存放在浏览器中，方便即时调用，避免重复请求用户数据。

url示例：
```js
{
    token: "sdasdjh21h312j.asdasd3443242sdasdasdaasd.asdawert"
}

```

返回数据:
```js
{
    name: "李大帅",
    account: "16031210105"
    email: "esunr641@gmail.com",
    phone: "15600000000",
    identity: "student" // 登录用户的身份，有student, teacher, admin
}
```

# 学生系统

## 法律法规板块

### 搜索法律法规
url：/searchLaw?

类型：get

url示例：
```
/searchLaw?key=关键字
```

## 学生反馈板块

### 提交反馈信息
url：/commit

类型：post（验证Token）

说明：用户提交反馈信息后，数据发送到后台，后台将反馈信息和反馈者的Account记录在数据库中。

发送数据：
```js
{
    account: "16031210105",
    feedbackMsg: "这个项目真棒！"
}
```

返回数据：
```js
{
    status: "ok" // 数据上传成功返回“ok”，失败返回“no”
}
```

# 教师系统

### 案例上传
url：/caseUpload

类型：post（验证Token）

发送数据：
```js
{
    account: "16031210101",
    name: "李大富",
    sort: {
        brief: "民事", // 案由，包括民事、刑事、行政、知识产权、国家赔偿、执行
        caseLeve: "典型案例", // 案例级别，包括典型案例、经典国案例、参阅案例、指导性案例、公报案例、普通案例、其他案例
        court: "最高人民法院", // 案例审理法院，包括最高人民法院、各直辖市法院、各省份法院、各自治区法院、各特别行政区法院。
    }, // 用于案例搜搜界面的左侧分类栏
    tag: {
        procedure: "一审", // 审理程序筛选，包括一审、二审、再审、其他审理程序
        courtLeve: "最高人民法院",  // 法院级别筛选，包括最高人民法院、高级人民法院、中级人民法院、基层人民法院、专门人民法院
        instrument: "判决书", // 文书类型，包括判决书、裁定书、决定书、调解书、其他文书
    }, //用于搜索分类
    uploadTime: "1551410202", //上传时间，用时间戳表示
}](> 错误代码
> - 0: 失败
> - 1: 成功
> - 2: token失效

# 登录界面

### 用户登录 【完成】

url：/login

类型：post

说明: 用来传出登录信息，返回Token

发送数据：
```js
{
    account: "16031210105",
    password: "123456",
    identity: "student", // 登录用户的身份，有student, teacher, admin
}
```

返回数据：
```js
{
    ref: 1,
    data: {
        token: "hsajdhajfhuh2ksjkh3kjksadj"
    }
}
```

报错：
- 密码错误

### 获取用户姓名【完成】
url：/getName?account=16031210105

类型：get

说明：用户输入学号/工号时自动显示学生/教师姓名。

返回数据：
```js
{
    ret: 1,
    data{
        name: "李大帅"
    }
}
```











# 注册界面

### 提交注册信息
url：/commitReg

类型：post

说明：用户在注册界面提交完个人信息后点击注册，将信息上传到数据库。

发送数据：
```js
{
    account: "16031210105",
    name: "李大帅",
    identity: "student",
    phone: "15600000000",
    email: "esunr641@gmail.com",
    password: "123456"
}
```

接收数据：
```js
{
    ret: 1
}
```

报错：
- 学号已存在
- 数据插入错误，注册失败


# 修改密码界面
### 提交修改后的密码
url：/commitAlterPwd

类型：post （验证Token）

说明：用户提交修改密码后，后台检查原始密码是否对应，如果对应，则修改成功，将新密码覆盖，返回结果；反之修改失败，返回结果。

发送数据：
```js
{
    oldPwd: "123456",
    newPwd: "112233"
}
```

返回数据：
```js
{
    ret: "1" 
}
```

报错：
- 更新密码失败











# 用户信息Api
### 获取用户基本信息
url：/getUserInfo

类型：get （验证Token）

说明：获取用户的基本信息，这些信息每次用户进入系统后都要重新获取，这些信息将被存放在浏览器中，方便即时调用，避免重复请求用户数据。


返回数据:
```js
{
    ret: 1,
    data{
        name: "李大帅",
        account: "16031210105"
        email: "esunr641@gmail.com",
        phone: "15600000000",
        identity: "student" // 登录用户的身份，有student, teacher, admin
        loginCount: "2"
    }
}
```







---


![image](http://img.cdn.esunr.xyz/0AKKET19%5DWP55Y5OSJIF.png)

---

# 1. 学生系统

## 1.1 法律法规板块 
![image](http://img.cdn.esunr.xyz/%5DAC~0S2PPM%287N%60B0@EPHI~D.jpg)

### 获取已发布的法律
url: /searchLow

类型：post

说明：在法律法规板块Right区域放置的文本内容，显示已经发布的法律条文和每条法律条文的概览。默认状态下，不传part和sort，part为一级分类（图中的蓝色部分），sort为二级分类（蓝色标题下的分类）。

[![kbOLYd.png](https://s2.ax1x.com/2019/03/02/kbOLYd.png)](https://imgchr.com/i/kbOLYd)

发送数据：
```js
// 完全展示
{
    page = 1 
}

// 展示法规类别为宪法的法律法规
{
    page = 1,
    level = "宪法"
} 

//展示搜索关键字为“中国”，按“以标题搜索”的方式，搜索勾选项为“中央法规司法解释、外国法律”相关的法律法规
{
    page = 1,
    search = 1,
    key = 中国,
    filter = ["中央法规司法解释","外国法律"]
}

//展示搜索关键字为“中国”，按“以标题及内容搜索”的搜索方式，搜索勾选项为“中央法规司法解释、外国法律”，法规类别为“宪法”，时效性为“现行有效”相关的法律法规
{
    page = 1,
    search = 2,
    key = 中国,
    filter = ["中央法规司法解释","外国法律"],
    level = "宪法"
    time = 1
}

// PS：time 1现行有效 2尚未生效 3失效 4部分失效 5 被修改

```





返回数据：
```js
{
    ret: 1,
    data: [
        {
            title: "烟台市全民阅读促进条例", // 标题
            number: "烟台市人民代表大会常务委员会公告第45号", // 发文字号
            commitTime: "1551509974", // 发布时间
            carryTime: "1546412374", // 法规生效时间
            time: "现行有效"
        },
        {
            title: "烟台市全民阅读促进条例2", // 标题
            number: "烟台市人民代表大会常务委员会公告第46号", // 发文字号
            commitTime: "1551509974", // 发布时间
            carryTime: "1546412374", // 法规生效时间
            time: "失效"
        }
        ...
    ]
}
```

### 获取侧边栏数据
url: /getSidebar

类型：get

说明：获取侧边栏数据

返回数据：
```js
{
    ret: 1,
    data: {
        level: [
            {
                title: "法律",
                count: 10
            },
            {
                title: "行政法规",
                count: 10
            },
            {
                title: "司法解释",
                count: 10
            },
            ...
        ],
        department: [
            {
                title: "各部",
                count: 10
            },
            {
                title: "各委",
                count: 10
            },
            {
                title: "各局",
                count: 10
            }
            ...
        ],
        time: [
            {
                title: "现行有效",
                count: 10
            },
            {
                title: "尚未有效",
                count: 10
            },
            ...
        ],
        lowSort: [
            {
                title: "宪法",
                cout: 10
            },
            {
                title: "机关工作",
                cout: 10
            },
            ...
        ]
        
    }
}
```


## 1.2 司法案例板块
![image](http://img.cdn.esunr.xyz/W%60%25L%7BKRB~1MFGZB%28MRYSJZ0.jpg)

### 查询司法案例
url: /searchCase

类型：post（验证Token）

发送数据：
```js
// 完全展示
{
   page = 1
}

{
    page = 1, // 必传项
    section: "案例与裁判文书", // 必传项， 搜索框下的选择板块，分别为案例与裁判文书、公报案例、案例要旨、案例报道
+   search: "title" // 搜索方式，title为按标题搜索，article为按标题及文章内容搜索
+   key: "搜索关键字"
    sort: {
        brief: "民事", // 案由，包括民事、刑事、行政、知识产权、国家赔偿、执行
        caseLevel: "典型案例", // 案例级别，包括典型案例、经典国案例、参阅案例、指导性案例、公报案例、普通案例、其他案例
        court: "各省份法院", // 案例审理法院，包括最高人民法院、各直辖市法院、各省份法院、各自治区法院、各特别行政区法院。  
    }, // 从左方侧边栏筛选的信息
    tag: {
        courtLevel: "最高人民法院",  // 法院级别筛选，包括最高人民法院、高级人民法院、中级人民法院、基层人民法院、专门人民法院
        procedure: "一审", // 审理程序筛选，包括一审、二审、再审、其他审理程序
        instrument: "判决书", // 文书类型，包括判决书、裁定书、决定书、调解书、其他文书
        topic: "贪污受贿", // 案例专题，包括贪污受贿、涉黑涉黄、其他
        commitTime: "一月内", // 发布时间，包括一月内、三月内、半年内、一年内、其他(其他用两个时间戳字符串表示，如 "1546272000000-1551369600000"代表2019年1月1日到2019年3月1日 )
        closingTime: "一月内" //审结时间，包括一月内、三月内、半年内、一年内、其他（同上）
    }, //从搜索分类中筛选的信息，tag内传递的内容是分情况的，如section为案例与判决书，则tag内只会传procedure、courtLevel、instrument这三个字段
}
```

返回数据：
```js
{
   code: 1,
   data{
       total: 100, // 相关案例总数
       side: {
           brief: [
               {
                   title: "民事",
                   count: "10"
               },
               {
                   title: "刑事",
                   count: "10"
               }
               ... ...
           ],
           caseLevel: [
               {
                   title: "典型案例",
                   count: "10"
               },
               {
                   title: "经典国案例",
                   count: "10"
               }
               ... ...
           ],
           court: [
               {
                   title: "最高人民法院",
                   count: "10"
               },
               {
                   title: "高级人民法院",
                   count: "10"
               }
               ... ...
           ],
       },
       article: [
           {
+              id: 1, // 文章id
               title: "这是一个司法案例",
               brief: "民事",
               caseLevel: "典型案例",
               court: "最高人民法院",
               commitTime: "1551843442000" // 注意时间戳为13位
               // 不要返回文章内容，不要返回文章内容，不要返回文章内容
           },
           {
               id: 2, 
               title: "这是第二个司法案例",
               brief: "民事",
               caseLevel: "典型案例",
               court: "最高人民法院",
               commitTime: "1551843442000"
           },
       ]
   }
}
```

### 获取司法案例详情
url: /getCaseDetail?id

类型：get

发送数据：
```
/getCaseDetail?id=1

获取id为1的司法案例
```

返回数据：
```js
{
    code: 1,
    data: {
        title: "这是一个标题",
        content: "内容"
        commitTime: "1551843442000"
        section: "案例与裁判文书",
        brief: "民事",
        caseLevel: "经典国案例",
        court: "最高人民法院",
        
        // 以下几个属性，对于不同section的司法案例可能有控制，直接传回空值即可，但必须有该值
        courtLevel: "最高人民法院",
        procedure: "一审",
        instrument: "判决书", 
        closingTime: "1551843442000",
        topic: "贪污受贿"
    }
}
```


## 1.3 学生反馈板块

### 提交反馈信息
url：/commit

类型：post（验证Token）

说明：用户提交反馈信息后，数据发送到后台，后台将反馈信息和反馈者的Account记录在数据库中。

发送数据：
```js
{
    feedbackMsg: "这个项目真棒！"
}
```

返回数据：
```js
{
    code: 1
}
```

# 教师系统


### 案例上传
url：/commitCase

类型：post（验证Token）

说明：
- 案例与裁判文书包含【procedure审理程序、courtLevel法院级别、instrument文书】属性；
- 公报案例包含【procedure审理程序、courtLevel法院级别、closingTime审结时间】属性；
- 案例要旨包含【procedure审理程序、courtLevel法院级别、instrument文书】属性
- 案例报道包含【topic案例专题】属性


发送数据：
```js
{
    uid: 12, // 用户Id
    account: "16031210101",
    name: "李大富",
    title: "案例1", // 案例标题
+   section: "案例与裁决书", // 所属板块，包括案例与裁判文书、公报案例、案例要旨、案例报道
    sort: {
        brief: "民事", // 案由，包括民事、刑事、行政、知识产权、国家赔偿、执行
        caseLevel: "典型案例", // 案例级别，包括典型案例、经典国案例、参阅案例、指导性案例、公报案例、普通案例、其他案例
        court: "各省份法院", // 案例审理法院，包括最高人民法院、各直辖市法院、各省份法院、各自治区法院、各特别行政区法院。  
    }, // 用于案例搜搜界面的左侧分类栏
    tag: {
        procedure: "一审", // 审理程序筛选，包括一审、二审、再审、其他审理程序
        courtLevel: "最高人民法院",  // 法院级别筛选，包括最高人民法院、高级人民法院、中级人民法院、基层人民法院、专门人民法院
        instrument: "判决书", // 文书类型，包括判决书、裁定书、决定书、调解书、其他文书
        closingTime: "1551410202" //审结时间，用时间戳表示
+       topic: "贪污受贿" // 案例专题，包括贪污受贿、涉黑涉黄、其他
    }, //用于搜索分类
    content: "案例内容", // 案例内容
    commitTime: "1551410202", //上传时间，用时间戳表示
}
```

返回数据：
```
{
    code: 1
}
```

### 获取案例分类

url: /getCaseSort?

类型: get

说明：用于动态生成发布案例时的下拉分类列表

发送数据：
```
/getCaseSort?sort=brief // 获取案由分类
```

返回数据：
```js
{
   code: 1,
   data:{
        key: "brief"
        value: ['民事', '刑事', '行政', '知识产权', '国家赔偿', '执行']
   }
}
```







<br>
<br>
<br>
<br><br>
<br><br><br><br><br>)