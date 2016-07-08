import Koa from 'koa'
import router from 'koa-router'
import url from 'url'
import superagent from 'superagent'
import cheerio from 'cheerio'
import eventproxy from 'eventproxy'
const app = new Koa()
const ep = new eventproxy()

let topic_lists = ''
const homeUrl = 'https://cnodejs.org/?tab=good'
superagent.get(homeUrl)
  .end((err, res) => {
    if (err) {
      next(err)
    }

    // 1.获取首页文章列表
    const $ = cheerio.load(res.text)
    const topicUrls = []
      // 筛选数据
    $('#topic_list .topic_title').each((idx, element) => {
      const $element = $(element)
      const href = url.resolve(homeUrl, $element.attr('href'))
      topicUrls.push(href)
    })
    console.log(`首页精华文章有 ${topicUrls.length} 篇`)

    // 2.获取文章页信息
    ep.after('topic_html', topicUrls.length, (topics) => {
      topics = topics.map((topicPair) => {
        const topicUrl = topicPair[0],
          topicHtml = topicPair[1],
          $ = cheerio.load(topicHtml)
        return ({
          title: $('.topic_full_title').text().trim(),
          href: topicUrl,
          comment1: $('.reply_content').eq(0).text().trim()
        })
      })

      // todo: 这里 hack 一下，暂时没想好怎么处理
      topic_lists = topics
      console.log(`----------`)
      console.log(topics)
    })

    topicUrls.forEach((topicUrl) => {
      superagent.get(topicUrl)
        .end((err, res) => {
          //console.log(`fetch ${topicUrl} successful`)
          ep.emit('topic_html', [topicUrl, res.text])
        })
    })
  })

// response
app.use(ctx => {
  ctx.body = topic_lists
})

// 以下仅供演示 Koa、Koa2、Express和 Hapi 区别
// Common function
app.use((ctx, next) => {
  const start = new Date()
  return next().then(() => {
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
})

// async functions(Babel required)
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.listen(3000, () => console.log('server started at port 3000'))

export default app
