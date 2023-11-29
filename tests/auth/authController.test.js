const {
	login,
	register,
} = require('../../src/account/controllers/auth_controller');
const Account = require('../../src/account/model/account_model');
const httpMocks = require('node-mocks-http');

// Mocking sendmail function
jest.mock('../../utils/sendmail', () => jest.fn(() => Promise.resolve()));

// Mocking mongoose model
jest.mock('../../src/account/model/account_model');

describe('Auth Controller', () => {
	let req, res;

	beforeEach(() => {
		Account.mockClear();

		req = httpMocks.createRequest();
		res = httpMocks.createResponse();
	});

	describe('login', () => {
		it('should successfully login with valid credentials', async () => {
			req.body = { email: 'test@example.com', password: 'Password123' };
			const mockAccount = {
				_id: '123',
				email: 'test@example.com',
				comparePassword: jest
					.fn()
					.mockImplementation((pwd, cb) => cb(null, true)),
				generateJwt: jest.fn().mockReturnValue('token'),
			};
			Account.findOne.mockResolvedValue(mockAccount);

			await login(req, res);

			expect(res.statusCode).toBe(200);
			expect(res._getJSONData()).toEqual({
				_id: mockAccount._id,
				email: mockAccount.email,
				token: 'token',
			});
		});

		it('should return error for invalid email or password', async () => {
			req.body = { email: 'test@example.com', password: 'Password123' };
			Account.findOne.mockResolvedValue(null);

			await login(req, res);

			expect(res.statusCode).toBe(400);
			expect(res._getJSONData()).toEqual({
				error: 'Email and password are invalid',
			});
		});

		it('should handle internal server error', async () => {
			req.body = { email: 'test@example.com', password: 'Password123' };
			Account.findOne.mockRejectedValue(new Error('Internal server error'));

			await login(req, res);

			expect(res.statusCode).toBe(500);
		});
	});

	describe('register', () => {
		it('should successfully register a new account', async () => {
			req.body = {
				email: 'new@example.com',
				password: 'Password123',
				username: 'newUser',
			};
			Account.findOne.mockResolvedValue(null);
			const mockSave = jest
				.fn()
				.mockResolvedValue({ _id: '123', email: 'new@example.com' });
			Account.mockImplementation(() => ({ save: mockSave }));

			await register(req, res);

			expect(res.statusCode).toBe(201);
			expect(mockSave).toHaveBeenCalled();
		});

		// Test for existing email
		it('should return error for existing email', async () => {
			req.body = {
				email: 'existing@example.com',
				password: 'Password123',
				username: 'existingUser',
			};
			Account.findOne.mockResolvedValue({ email: 'existing@example.com' });

			await register(req, res);

			expect(res.statusCode).toBe(400);
			expect(res._getJSONData()).toEqual({ error: 'Email already exists' });
		});

		// Test for internal server error during account creation
		it('should handle internal server error', async () => {
			req.body = {
				email: 'new@example.com',
				password: 'Password123',
				username: 'newUser',
			};
			Account.findOne.mockResolvedValue(null);
			const mockSave = jest
				.fn()
				.mockRejectedValue(new Error('Internal server error'));
			Account.mockImplementation(() => ({ save: mockSave }));

			await register(req, res);

			expect(res.statusCode).toBe(500);
			expect(res._getJSONData()).toEqual({ error: 'Internal server error' });
		});
	});
});
