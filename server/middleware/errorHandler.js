

const errorHandler = (err, req, res, next) => {
    console.error(err)

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            message: err.errors[0].message
        })
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            message: err.errors[0].message
        })
    }

    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message
    })
}

module.exports = errorHandler