import speakeasy from 'speakeasy';

const middleware = (req, res, next) => {
    const secret = process.env.SECRET_KEY;
    const token = req.header('x-token');

    if (!secret) {
        return res.status(500).json({ status: 500, message: 'This endpoint is unavailable' });
    }

    if (!token) {
        return res.status(400).json({ status: 400, message: 'Missing header for this request' });
    }

    const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token
    });

    if (verified) {
        next();
    } else {
        res.status(401).json({ status: 401, message: 'Unauthorized' });
    }
};

export default middleware;