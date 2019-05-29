require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const api = require('./api');

const app = new Koa();
const router = new Router();

// router.get('/', (ctx) => {
//   ctx.body = '홈';
// });

// router.get('/about/:name', (ctx) => {
//   const { name } = ctx.params;
//   ctx.body = `${name}의 소개`;
// });

// // query parameter - posts?id=231434
// router.get('/posts', (ctx) => {
//   const { id } = ctx.query;
//   if (id) {
//     ctx.body = `포스트 #${id}`;
//     return;
//   }
//   ctx.body = '선택한 포스트가 없습니다';
// });

router.use('/api', api.routes());

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4001, () => {
  console.log('server is litening to port:4001!!!!!!!!!!!');
});
