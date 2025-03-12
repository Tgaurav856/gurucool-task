const redisClient = require('../config/redis');
const User = require('../models/user');

const processQueue = async () => {
    const users = await User.find();
    for (const user of users) {
        const queueName = `queue:${user._id}`;
        const request = await redisClient.rPop(queueName);
        if (request) {
            console.log(`Processing request for user ${user._id}:`, request);
        }
    }
};

module.exports = processQueue;