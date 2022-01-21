const redis = require('redis');

class RedisService {
  connect() {
    return new Promise((resolve, reject) => {
      const connection = redis.createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
      });

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

  set(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  hmset(key, values) {
    return new Promise((resolve, reject) => {
      this.client.hmset(key, ...values, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  hget(key, property) {
    return new Promise((resolve, reject) => {
      this.client.hget(key, property, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  hgetall(key) {
    return new Promise((resolve, reject) => {
      this.client.hgetall(key, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  hdel(key, property) {
    return new Promise((resolve, reject) => {
      this.client.hdel(key, property, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }


  rpush(key, values) {
    return new Promise((resolve, reject) => {
      this.client.rpush(key, values, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  lrange(key, start = 0, stop = -1) {
    return new Promise((resolve, reject) => {
      this.client.lrange(key, start, stop, (error, response) => {
        if (error) return reject(error);
        return resolve(response)
      });
    });
  }

  sadd(key, values) {
    return new Promise((resolve, reject) => {
      this.client.sadd(key, ...values, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  smembers(key) {
    return new Promise((resolve, reject) => {
      this.client.smembers(key, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  expire(key, time = 10) {
    return new Promise((resolve, reject) => {
      this.client.expire(key, time, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

  del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  }

}

module.exports = new RedisService();
