##Document metadata

### [title 元素](https://html.spec.whatwg.org/multipage/semantics.html#the-title-element)
title 元素代表了文档的 title 或者 name. 开发者需要使用 title 来标示文档，title 会应用在页面标签、书签和搜索结果中。
在 google 的 [webmasters](https://support.google.com/webmasters/answer/35624?rd=1#3) 中，给出了书写 title 的建议。

* 站点的每一个页面都必须保证拥有一个 `<title>` 标签
* 页面的 title 应该是具备描述性和简单性两个特点
* 避免关键词的堆砌
* 避免页面 title 的重复性，应该根据页面内容来产生 title
* 给 title 加上站点的品牌

### [link 元素](https://html.spec.whatwg.org/multipage/semantics.html#the-link-element)
link 元素允许开发者在文档中连接其他资源。link 元素的 href 属性指定了资源的地址。
一个 link 元素必须含有一个 rel 属性或者一个 itemprop 属性，但是不能同时包含。如果使用 rel 属性，那么该 link 元素被限定于在 head 元素内
使用。如果是 itemprop 属性，那么这个 link 元素则可以被使用在 head 和 body 中。

根据不同的 rel 值，可以将 link 元素分成两种类型：请求外部资源和链接。一个 link 元素可以同时兼备两种类型。
* 常用的链接类型的 link: alternate, author, help, license, next, prev, search, sidebar
* 常用的请求外部资源类型: stylesheet, prefetch, pingback, icon

通过 link 元素创建的链接是应用到整个页面的，这一点它不等同于 a 和 area 元素。
当 link 元素是一个外部资源时，下面几点需要注意：
* 建议加上 media 属性，因为只有当当前的环境匹配 media  的值的时候，该外部资源才会被请求。
* 建议加上 type 属性， type 属性告诉浏览器可以避免请求不支持的资源

常用 link 元素解释：
* [favicon 使用指南](https://github.com/audreyr/favicon-cheat-sheet)
* [给博客添加 rel=”author” 的 link](http://googlewebmastercentral.blogspot.com/2013/08/relauthor-frequently-asked-advanced.html)

监听 link 元素的事件

    ```
        <script>
        function sheetLoaded() {
        // Do something interesting; the sheet has been loaded
        }

        function sheetError() {
        alert("An error occurred loading the stylesheet!");
        }
        </script>

        <link rel="stylesheet" href="mystylesheet.css" onload="sheetLoaded()" onerror="sheetError()">
    ```

### [meta 元素](https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element)
https://support.google.com/webmasters/answer/35624?rd=1#3
https://github.com/jikeytang/jikeytang.github.io/issues/6
https://developers.google.com/webmasters/mobile-sites/?hl=en
https://developers.google.com/webmasters/state-of-the-web/2005/metadata?csw=1
https://support.google.com/webmasters/answer/79812?hl=en
http://code.lancepollard.com/complete-list-of-html-meta-tags/
https://github.com/h5bp/html5-boilerplate/blob/master/dist/doc/extend.md
https://github.com/h5bp/html5-boilerplate/blob/master/dist/doc/html.md
https://github.com/yisibl/blog/issues/1
http://searchenginewatch.com/sew/how-to/2067564/how-to-use-html-meta-tags
