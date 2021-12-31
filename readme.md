---
title: OneManager高级设置
date: 2021-08-18 10:00:00
tags: [Onedrive]
index_img: https://s1.ax1x.com/2020/04/13/GjMcnK.jpg
banner_img: https://s1.ax1x.com/2020/04/13/GjMcnK.jpg
hide: false
---


## OneManager是什么

这是一个利用微软onedrive api将onedrive目录映射成一个云盘的程序，类似的程序有很多，比如OneIndex、Pyone、OnePoint等等。这个程序的特点是支持多种onedrive类型，可以部署在vps，heroku，以及腾讯云scf上。
[项目地址](https://github.com/qkqpttgf/OneManager-php) [我的Demo](https://service-ps9dmx7o-1304376991.hk.apigw.tencentcs.com/release/Cloud/CloudA/)

## 部署教程

参考项目readme说明，网上一些博客也有不少教程，这不是本文的重点，本文主要讲的是部署好后的设置问题。
部署成功后在设置->首页里添加相应的盘，可以添加多个盘，同一个盘也可以添加多次。

## 平台变量

登录后，在`管理`>`设置`里有一些自定义设置，有些人不清楚这些设置是干嘛的，这可以理解，毕竟项目的说明写的太简单了。
注意本文的操作都是针对程序默认主题来说的，其他主题由于是第三方人员开发，不保证所有功能都能正常使用。

### adminloginpage

自定义登录地址，设置后就会隐藏登录按钮(有些主题本来就没有登录按钮)，登录时需要手动在网盘地址后加上`?你设置的值`进行登录。
比如设置为`abc`，那么你只能通过`http://xxx.com/xxx?abc`地址来登录 。所以一旦设置就要记住你设置的值，不然连你自己也没法知道登录地址那就麻烦了。
这个设置是为了防止别人通过默认的登录界面尝试登录你的网盘，设置本项后只要猜不到登录界面，即使别人知道登录密码也没用，多一道防护墙，让网盘更安全。

### autoJumpFirstDisk

设置点击网盘标题时跳转到绑定的第一个盘还是当前绑定的网盘根目录。

### background

自定义背景图片，填入一个图片的url地址，因为图片加载通常需要更多时间，为了速度考虑不建议放入大体积图片。

### backgroundm

手机端显示的背景图片地址。

### customCss

设置自定义css的地方，这里设置的css会作用于网盘所有页面。
比如我想隐藏语言选项框：

```html
<style>.changelanguage{display:none}</style>
```

同时隐藏复制下载链接按钮

```html
<style>.file button{display:none}.changelanguage{display:none}</style>
```

### customScript

设置自定义js，会作用于所有页面。
比如设置http重定向到https：

```html
<script type="text/javascript">
    var targetProtocol = "https:";
    if (window.location.protocol != targetProtocol)
        window.location.href = targetProtocol + window.location.href.substring(window.location.protocol.length);
</script>
```

### customTheme

通过url的方式引用html主题，比如你可以通过设置下面的地址来使用我的主题。

```html
https://cdn.jsdelivr.net/gh/kizx/onemoe-theme/onemoe.html
```

### disableChangeTheme

设置为`1`后游客浏览时将不显示右下角的主题切换功能。

### disableShowThumb

设置为`1`后将不显示缩略图的按钮和功能，对于云函数用户来说，建议设为`1`来关闭该功能，因为该功能可能点一下就是一分钱。

### hideFunctionalityFile

设置为`1`后，游客浏览网盘时就会看不到read.md，head.md，head.ofm，foo.omf这些文件，这些文件是干嘛的后面会说。

### passfile

设置密码文件名，比如这里设置为password.txt，那么在某一个目录下新建一个password.txt文件，其中写入密码，这样任何人在浏览这个网盘目录时都需要输入相应密码后才能访问。

### sitename

设置网站名称。

### theme

切换主题。

### timezone

设置时区，国内可设置为8。

## 每个盘独立变量

### diskname

多盘在网盘界面显示的名称。

### domain_path

当绑定多个域名时，可以使不同域名打开时访问不同目录。当然如果你只有一个域名也可以用，通过这种方式可以使当前域名访问一个指定子目录，和后面的public_path起到一样的作用。
下面是两个域名的设置方法，中间用`|`隔开，如果有多个域名只设置一个域名时，未设置的域名好像也会只访问该目录，要访问根目录dirname设置为`/`。

```txt
domain1.com:/dir1name|domain2.com:/dir2name
```

### downloadencrypt

设置为`1`时启用该功能，这样在设置了密码的目录下的文件虽然无法在网页端浏览，但可以通过具体的文件链接进行下载。

### guestup_path

设置图床路径或者叫游客上传路径，设置后游客只能看到上传按钮看不到目录下的文件。

### public_path

设置该盘的显示的根目录，默认为`/`，换个说法就是可以显示指定的文件夹，默认显示全部。
比如我们只想将网盘下的public文件夹内容作为网盘，可以设置为`/public/`。
有了这个功能，即使只有一个onedrive账号，我们也可以通过重复绑定同一个账号来生成多盘，然后每个盘的public_path设置为不同的路径，这样可以将一个盘的功能分开。

------

还有一种特殊情况是我既想让游客上传文件，又想让游客看见上传后的文件目录，目前就只能通过这种方法将该目录设置到两个盘，一个盘作上传，一个盘作目录展示。

## 进阶设置

### 设置网站ico图标

将favicon.ico图片放在网盘根目录下，~~如果你设置了多盘的的话，则需要在每个盘的根目录下都放置一个favicon.ico文件~~，新版的html主题只需要在绑定的第一个盘下面设置就行了。
当然你也可以在customCss或customScript中进行全局设置：

```html
<link rel="icon" href="https://cloud.tencent.com/favicon.ico" type="image/x-icon">
这里我使用了腾讯云的网站图标，你应该改为自己的favicon.ico图片地址。
```

### 刷新自动切换背景图片

这个是通过设置特殊的图片api来实现的，这些api每次刷新都会返回一张不同的图片，将后台background设置为这些api的url即可。
网上类似的api有很多，以下是群友收集的免费图片api：

```txt
https://api.ixiaowai.cn/api/api.php (二次元动漫)
http://www.dmoe.cc/random.php（二次元随机图）
https://api.ixiaowai.cn/mcapi/mcapi.php （menhera酱）
https://api.ixiaowai.cn/gqapi/gqapi.php （风景）
https://acg.yanwz.cn/wallpaper/api.php（二次元随机图）
```

### 利用index.html设置自定义页面

如果一个目录下有名为index.html的文件，则直接显示该文件，可以利用这个功能设置一个自定义页面或者用于隐藏一个特定页面，相当于部署了一个静态页面。

### 设置顶部和底部说明文字

在需要展示顶部说明的目录下新建一个`head.md`文件，在文件里写入说明内容即可，这是一个markdown文件，可以使用markdown语言进行书写。
底部说明说明文字对应的是`readme.md`文件，规则与顶部文字一样。

### 利用head.omf设置一言

head.omf作用和head.md一样，区别是他不支持markdonw语言，但是支持html语言，可以写入html、css、js内容。
在想展示一言的目录新建`head.omf`文件，然后写入以下内容：

```html
<p id="hitokoto">:D 获取中...</p>
<script>
    fetch('https://v1.hitokoto.cn')
        .then(response => response.json())
        .then(data => {
            const hitokoto = document.getElementById('hitokoto')
            hitokoto.innerText = data.hitokoto
        })
        .catch(console.error)
</script>
```

以上是使用了https://developer.hitokoto.cn/ 的一言接口，你也可以尝试更换其他接口或者自建接口。

### 利用foot.omf设置Valine评论

使用Valine需要先注册[LeanCloud](https://www.leancloud.cn/)并实名认证，然后新建应用获取AppID和AppKey。
具体过程参考：https://valine.js.org/quickstart.html
然后新建`foot.omf`，写入以下内容（注意填入替换自己的AppID和AppKey）：

```html
<script src='//unpkg.com/valine/dist/Valine.min.js'></script>
<div id="vcomments"></div>
<script>
    new Valine({
        el: '#vcomments',
        appId: '你获取的AppID',
        appKey: '你获取的AppKey'
    })
</script>
```

ps: 上面的js用的是unpkg的cdn，国内速度完全不行，建议改用jsdelivr的cdn

```html
<script src='//cdn.jsdelivr.net/npm/valine/dist/Valine.min.js'></script>
```


- 如果对样式不满意，建议直接在omf文件写css美化。

### 设置动态背景

这里的动态背景指我们经常在一些网页见到的那种下雪、粒子线条、彩条等动态背景，一般是通过js实现的，可以自己在网上找找现成的教程，js我不会，这里只展示一种我找到的动态彩条背景。
我将下面的代码写在了foot.omf中，可以访问 https://pan.2bboy.com/home/test/colored-ribbon/ 查看其效果。

```html
<script size="90" alpha="0.5" zIndex="0" src="https://pan.2bboy.com/ppx/test/ribbon.js" type="text/javascript" charset="utf-8"></script>
```

其中最重要的是 ribbon.js 这个js文件，我将他放在网盘目录下，你应该下载该文件放在自己的云空间里，然后替换引用的地址。
如果将代码放在omf文件里则只能在当前目录有效果，设置在后台的customScript中就可以全局生效了。

当然只要你懂点js，利用omf文件可以玩出很多东西，比我这里有一些示例：https://pan.2bboy.com/home/test/

### 美化自定义登录页面

修改common.php相应地方，添加style和br

```php
$html .= '
    <style>body{background-image:linear-gradient(60deg,#343b44 0%,#485563 100%);background-attachment:fixed;color:#343b44}body>div{position:absolute;text-align:center;background-color:rgba(221,221,221,.5);border-radius:20px;width:75vw;max-width:500px;height:350px;margin:auto;top:25%;bottom:50%;left:0;right:0}body>div:hover{box-shadow:3px 3px 6px 3px rgba(0,0,0,.3)}h4{font-size:40px}input{font-size:20px;margin:2%auto;border:#343b44 2px solid;border-radius:10px;padding:10px;height:50px;text-align:center}input:last-of-type{color:#343b44;height:50px;width:80px;font-weight:800}input:hover:last-of-type{cursor:pointer;color:#ddd;background-color:#485563}</style>
    <body>
    <div>
      <center><h4>'.getconstStr('InputPassword').'</h4>
      <form action="" method="post">
          <div>
            <input name="password1" type="password"/>
            </br>
            <input type="submit" value="'.getconstStr('Login').'">
          </div>
      </form>
      </center>
    </div>
';
```

[![img](https://pan.2bboy.com/img/2020/05/0530183122.png)](https://pan.2bboy.com/img/2020/05/0530183122.png)





### 提示

- 游客上传文件时只能单个上传，不能批量上传。
- 由于scf的缓存系统，在scf上进行某项改动后有时候不会立马生效，或者刷新后时而生效时而不生效，只要多等一会儿，等旧缓存自己失效就好了。
- php格式的主题为旧版主题，许多功能不支持，html格式的主题为新版主题，不同主题的作者更新频率和支持功能都可能不同，功能测试请以最新版本的默认主题为准。


## 参考资料

Onedrive云盘程序——OneManager小白设置指南
https://www.2bboy.com/archives/176.html/comment-page-1