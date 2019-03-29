const redis = require('redis');

class RedisService {
  connect() {
    return new Promise((resolve, reject) => {
      const connection = redis.createClient();

      connection.on('error', (error) => {
        console.log('Error', error);
        return reject(error);
      });

      connection.on('ready', () => {
        console.log('Redis is connected!');
        this.client = connection;
        return resolve(this.client);
      });

    });
  }

  insertKey(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  getKey(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  insertManyValuesByKey(key, values) {
    return new Promise((resolve, reject) => {
      this.client.hmset(key, ...values, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  getManyValuesByKey(key) {
    return new Promise((resolve, reject) => {
      this.client.hgetall(key, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  insertList(key, values) {
    return new Promise((resolve, reject) => {
      this.client.rpush(key, values, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  listRange(key, start = 0, stop = -1) {
    return new Promise((resolve, reject) => {
      this.client.lrange(key, start, stop, (error, response) => {
        if (error) return reject(error);
        return resolve(response)
      });
    });
  }

  insertListWithoutDuplicatedKeys(key, values) {
    return new Promise((resolve, reject) => {
      this.client.sadd(key, ...values, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  listMembers(key) {
    return new Promise((resolve, reject) => {
      this.client.smembers(key, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  expirateKey(key, time = 10) {
    return new Promise((resolve, reject) => {
      this.client.expire(key, time, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  deleteKey(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

}

module.exports = new RedisService();
