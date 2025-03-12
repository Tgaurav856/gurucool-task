const redisClient = require('../config/redis');

exports.enqueueRequest = async (req, res) => {
    const queueName = `queue:${req.user.id}`;
    await redisClient.lPush(queueName, JSON.stringify(req.body));
    res.json({ message: 'Request enqueued' });
};
