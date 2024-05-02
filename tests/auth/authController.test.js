const {
	login,
	register,
	verifyAccount,
} = require('../../src/auth_providers/controllers/auth_controller');
const Account = require('../../src/account/model/account_model');
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');

jest.mock('../../src/account/model/account_model');
jest.mock('jsonwebtoken');
jest.mock('../../src/utils/sendmail', () => jest.fn(() => Promise.resolve()));
jest.mock('../../src/auth_providers/controllers/auth_controller', () => ({
	...jest.requireActual('../../src/auth_providers/controllers/auth_controller'),
	sendVerificationEmail: jest.fn().mockResolvedValue(true),
}));

describe('Auth Controller', () => {
	let req, res;

	beforeAll(() => {
		process.env.JWT_SECRET = 'test-secret';
	});

	afterAll(() => {
		delete process.env.JWT_SECRET;
	});

	beforeEach(() => {
		Account.mockClear();
		jwt.sign.mockClear();

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

	describe('verifyAccount', () => {
		it('should verify account successfully with valid token', async () => {
			const mockAccount = { _id: '123', status: 'pending', save: jest.fn() };
			jwt.verify.mockReturnValue({ _id: mockAccount._id });
			Account.findById.mockResolvedValue(mockAccount);

			req.params = { token: 'valid-token' };
			await verifyAccount(req, res);

			expect(res.statusCode).toBe(200);
			expect(mockAccount.status).toBe('active');
			expect(mockAccount.save).toHaveBeenCalled();
			expect(res._getJSONData()).toEqual({
				message: 'Account verified successfully',
			});
		});
	});

	describe('register', () => {
		it('should successfully register a new account', async () => {
			req.body = {
				email: 'new@example.com',
				password: 'Password1234.',
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
				password: 'Password1234.',
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
				password: 'Password1234.',
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
