const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
server.use(middlewares);
router.render = (req, res) => {
    res.jsonp({
        entities: res.locals.data,
        len: res.locals.data.length
    })
}
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}))
server.use(router);
server.use('/api', router)
server.listen(3001, () => {
    console.log('JSON Server is running')
})