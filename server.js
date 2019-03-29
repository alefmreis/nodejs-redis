const redis = require('./services/redis.service');

(async () => {
  try {
    await redis.connect();

    await redis.insertKey('nome', 'Alef Martins dos Reis');
    const key = await redis.getKey('nome');
    console.log(key);

    await redis.insertManyValuesByKey('professions', ['name', 'software developer', 'name', 'customer success']);
    const keys = await redis.getManyValuesByKey('professions');
    console.log(keys);

    await redis.insertListWithoutDuplicatedKeys('frutas', ['orange', 'banana', 'strawberry', 'grape', 'pineapple']);
    const fruits = await redis.listMembers('frutas');
    console.log(fruits);
    
    await redis.deleteKey('frutas');

  } catch (error) {
    console.log(error);
  }
})();
