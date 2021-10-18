const fs = require('fs');
const winston = require('winston');
const rTracer = require('cls-rtracer');
const path = require('path');

const logDir = 'log';//directory for logging the messages
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);//if not logdir exists creating it 
}

logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.File({ filename: path.join(logDir, '/server.log') })
    ]

})

const logMsg=(data,level)=>{
    const rid=rTracer.id();
    const now=new Date().toISOString();
    let prefix=`[${now}]:`;
    if(rid){
        prefix=prefix+`Request id:${rid}`;
    }else{
        prefix+='Server-Log: ';
    }
    if(data instanceof Array){
        data.forEach((row)=>{
            const message=`${prefix}${row}`;
            logger.log(level,message);
        })
    }else{
        const message=`${prefix}${data}`;
            logger.log(level,message);
    }
    
}
logger.stream={
    write:(message)=>{
        logMsg(message,'info');
    }
}

module.exports ={
    error:(message)=>{
        logMsg(message,'error')
    },
    info:(message)=>{
        logMsg(message,'info')
    },
    debug:(message)=>{
        logMsg(message,'debug')
    },
    verbose:(message)=>{
        logMsg(message,'verbose')
    },
    warn:(message)=>{
        logMsg(message,'warn')
    },
    silly:(message)=>{
        logMsg(message,'silly')
    },
    logger,
    
}