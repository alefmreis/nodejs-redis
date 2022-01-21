require('dotenv').config({ path: '../.env' });


const redis = require('../services/redis.service');

(async () => {
  try {
    await redis.connect();

    await redis.set('laborit', 'empresa dos devs tops');

    await redis.set('numero', 7);

    const laborit = await redis.get('laborit');
    const numero = await redis.get('numero');

    console.log('laborit', laborit);
    console.log('numero', numero);


  } catch (error) {
    console.log(error);
  }
})();
