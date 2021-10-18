const rtracer =require('cls-rtracer');
const log=require('../winston-logger')
const logRoute=(req,res,next)=>{
    const rid=rtracer.id();
    res.setHeader('X-Requested-Id',rid);
    let message=`${req.method.toUpperCase()}${req.originalUrl.toLowerCase()}`
    log.info(message)
    next()
}
module.exports=logRoute;