//error handler
const notFoundHanlder = (_req, _res, next) => {
    const error = new Error('Resource Not Found');
    error.status = 400;
    next(error);
}

//global error hanlder
const errroHanlder = (error, _req, res, next) => {
    //returning our created error
    if(error.status) {
        return res.status(error.status).json({
            message: error.message
        })
    }
    res.status(500).json({
        message: 'Something went wrong'
    })
}

module.exports = {
    notFoundHanlder,
    errroHanlder
}