

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

    if (err.name === 'Unauthorized') {
        return res.status(401).json({
            message: err.message
        })
    }

    if (err.name === 'notFound') {
        return res.status(404).json({
            message: err.message
        })
    }

    if (err.name === 'BadRequest') {
        return res.status(400).json({
            message: err.message
        })
    }

    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message
    })
}

module.exports = errorHandler