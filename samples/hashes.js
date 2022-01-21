require('dotenv').config({ path: '../.env' });


const redis = require('../services/redis.service');

(async () => {
  try {
    await redis.connect();

    const user = {
      id: 1,
      name: 'Alef Reis',
      age: 25,
      job: 'Software Engineer'
    };

    await redis.hmset(`user:${user.id}`, ['name', user.name, 'age', user.age, 'job', user.job]);

    let userFull = await redis.hgetall(`user:${user.id}`);

    console.log('user full', userFull);

    const userName = await redis.hget(`user:${user.id}`, 'name');

    console.log('user name', userName);

    await redis.hdel(`user:${user.id}`, 'age');

    userFull = await redis.hgetall(`user:${user.id}`);

    console.log('user full', userFull);

  } catch (error) {
    console.log(error);
  }
})();
