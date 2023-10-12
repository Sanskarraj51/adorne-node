module.exports = (res , status = false, statusCode = 500 , message = 'something went wrong' , info = null) =>{
    if(status){
        return res.status(200).json({
            status:true,
            statusCode:statusCode,
            message:message,
            data:info
        })
    }else{
        return res.status(statusCode).json({
            status:false,
            statusCode:statusCode,
            message:message
        })
    }
}