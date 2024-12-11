import redisClient from '../utils/redis';

describe('Redis Client', () => {
  it('should be alive when connected', () => {
    expect(redisClient.isAlive()).toBe(true);
  });

  it('should store and retrieve data', async () => {
    await redisClient.set('testKey', 'testValue', 10);
    const value = await redisClient.get('testKey');
    expect(value).toBe('testValue');
  });
});

