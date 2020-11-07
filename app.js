const Koa = require('koa') // 引入koa
const router = require('koa-router')() // 引入koa-router 并实例化
const koaBody = require('koa-body')() // 引入post中间件

const app = new Koa()

router.get('/', async (ctx) => {
  ctx.body = '首页'
})

router.get('/news', async (ctx) => {
  ctx.body = '新闻列表页面'
})
router.get('/details', async (ctx) => {
  ctx.body = '新闻详情页面'
  // 从ctx中读取get传值  http://localhost:3000/details?id=130&name=huawei
  console.log(ctx.query) // { id: '130', name: 'huawei' }
  console.log(ctx.querystring) // id=130&name=huawei

  // 方法二  request
  console.log(ctx.request.url) // /details?id=130&name=huawei
  console.log(ctx.url) // /details?id=130&name=huawei

  // 方法三
  console.log(ctx.request.query) // { id: '130', name: 'huawei' }
  console.log(ctx.request.query.id) // 130
  console.log(ctx.request.querystring) // id=130&name=huawei
})
// 动态路由  -----------------------------------------------------------------------
router.get('/goods/:uid', async (ctx) => {
  // 获取动态路由传参
  console.log('获取动态路由传参 : ', ctx.params)
  // http://localhost:3000/details/iphone
  if (ctx.params.uid === 'iphone') {
    ctx.body = 'iphone 产品'
  } else if (ctx.params.uid === 'oppo') {
    // http://localhost:3000/details/oppo
    ctx.body = 'oppo 产品'
  } else {
    // http://localhost:3000/details/some
    ctx.body = 'other 产品'
  }
})

router.post('/api/post', koaBody, async (ctx) => {
  console.log(ctx.request.body)
  ctx.body = JSON.stringify(ctx.request.body)
})

app.use(router.routes()) // 启动路由
app.use(router.allowedMethods()) // 可以配置也可以不配置，建议配置
// 监听接口
app.listen('3000', (err) => {
  if (err) {
    console.log('服务器启动失败')
  } else {
    console.log('服务器启动成功 -- app started at port 3000...')
  }
})
