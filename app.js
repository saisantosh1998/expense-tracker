const express=require("express");
const app=express();
// const router=require('./routing.js');
const log=require('./winston-logger.js');
const rTracer=require('cls-rtracer');

const bodyParser = require('body-parser');
const routeLogger=require('./middleware/route-logger');
// using body parser
app.use(bodyParser.json())
// replacing app with router for route handlers

app.use(rTracer.expressMiddleware({
    useHeader: true,
    headerName: 'X-Request-Id'
}))
app.use(routeLogger);
module.exports=app.listen(2000,()=>{
    log.info('listening from port 2000')
})
