# web-spiders
网络蜘蛛🕷️

[TOC]

## 基于 NodeJS 的几种方案

大致思路是“抓取、解析、入库”，可选 “黑白名单、并发、定时任务”。

1. superagent/cheerio/express
2. superagent/cheerio/koa2/koa-router/eventproxy
3. request/cheerio/async/[node-schedule](https://github.com/node-schedule/node-schedule)
4. phantomjs/cheerio


### 案例

- express-spider
- koa2-spider

### 运行

1. 前提是需安装 nodejs

2. 在 express-spider 或 koa2-spider 目录执行

   ```shell
   npm start
   ```

3. 然后浏览器访问 `http://127.0.0.1:3000` 或 `curl -get http://127.0.0.1` 即可


##  参考

- [[NodeJS爬虫](https://segmentfault.com/a/1190000004077827)](https://segmentfault.com/a/1190000004077827)
- [[用nodejs写爬虫同步百度FEX Weekly中的文章](https://segmentfault.com/a/1190000002423761)](https://segmentfault.com/a/1190000002423761)