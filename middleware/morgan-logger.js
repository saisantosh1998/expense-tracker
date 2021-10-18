const morgan=require('morgan');

const log=require('.././winston-logger');

const morganLogger=morgan('tiny',{stream:log.logger.stream});

 module.exports=morganLogger;