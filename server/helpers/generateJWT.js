const jwt = require('jsonwebtoken');

module.exports = (id, email = null, forStudent = false, data = null) => {
    if (forStudent) {
        return jwt.sign(
            {
                _id: id,
                userName: data.userName,
                subject: data.subject,
                test: data.test
            },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );
    }

    return jwt.sign(
        { _id: id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};
