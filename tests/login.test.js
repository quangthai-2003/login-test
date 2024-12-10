const axios = require('axios');

const baseUrl = 'https://reqres.in';

describe('Login Api', () => {
  const loginUrl = `${baseUrl}/api/login`;

  // Meta data tests
  describe('Test Meta data', () => {
    it('should return status code 400 when missing email', async () => {
      try {
        await axios.post(loginUrl, {
          password: 'cityslicka',
        });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('error');
        expect(error.response.data.error).toBe('Missing email or username');
      }
    });

    it('should return status code 400 when missing password', async () => {
      try {
        await axios.post(loginUrl, {
          email: 'eve.holt@reqres.in',
        });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('error');
        expect(error.response.data.error).toBe('Missing password');
      }
    });

    it('should return status code 400 when both email and password are missing', async () => {
      try {
        await axios.post(loginUrl, {});
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('error');
      }
    });

    // !TODO invalid email format
  });

  // Request params tests
  describe('Test Request params', () => {
    it('should return status code 400 when email is null', async () => {
      try {
        await axios.post(loginUrl, {
          email: null,
          password: 'cityslicka',
        });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('error');
        expect(error.response.data.error).toBe('Missing email or username');
      }
    });

    it('should return status code 400 when password is null', async () => {
      try {
        await axios.post(loginUrl, {
          email: 'eve.holt@reqres.in',
          password: null,
        });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('error');
        expect(error.response.data.error).toBe('Missing password');
      }
    });

    // !TODO: password must contain at least one uppercase letter, one lowercase letter, one number and one special character
    // !TODO: password must be at least 8 characters long
    // !TODO: password must not contain username or email
  });

  // Bussiness tests
  describe('Test Business logic', () => {
    it('should return status code 200 when email and password are correct', async () => {
      try {
        await axios.post(loginUrl, {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka',
        });
      } catch (error) {
        expect(error.response.status).toBe(200);
        expect(error.response.data).toHaveProperty('token');
      }
    });

    it('should return status code 400 when email is incorrect', async () => {
      try {
        await axios.post(loginUrl, {
          email: '123@gmail.com',
          password: 'cityslicka',
        });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('error');
        expect(error.response.data.error).toBe('user not found');
      }
    });

    // !TODO:
    // it('should fail to login with invalid credentials', async () => {
    //   try {
    //     await axios.post(url, {
    //       email: 'eve.holt@reqres.in',
    //       password: 'wrongpassword',
    //     });
    //   } catch (error) {
    //     expect(error.response.status).toBe(400);
    //     expect(error.response.data).toHaveProperty('error');
    //   }
    // });
  });
});
