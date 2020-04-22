import { createUser, findUserById, validateUser } from "../helpers/auth";
const tempUser = {
	name: "Testy Timmy",
	password: "1234",
	email: "none@ofyourbusiness.com",
};

describe("Unit tests for the register auth helper method", () => {
	it("createUser should return the user object w/o password", () => {
		const createdUser = createUser(tempUser);

		expect(createdUser.name).toBe(tempUser.name);
		expect(createdUser.email).toBe(tempUser.email);
		expect(createdUser.password).toBe(undefined);
	});

	it("createUser should return null if name is missing", () => {
		const createdUser = createUser({ ...tempUser, name: "" });
		expect(createdUser).toBe(null);
	});
	it("createUser should return null if email is missing", () => {
		const createdUser = createUser({ ...tempUser, email: "" });
		expect(createdUser).toBe(null);
	});
	it("createUser should return null if password is missing", () => {
		const createdUser = createUser({ ...tempUser, password: "" });
		expect(createdUser).toBe(null);
	});
});

describe("Unit tests for the findUserById auth helper method", () => {
	it("findUserById should return the user Object with valid Id", () => {
		const user = findUserById(1);
		expect(user.name).toBe("Francis");
		expect(user.email).toBe("1@archipel.com");
		expect(user.id).toBe(1);
	});
	it("findUserById should return undefined with invalid Id", () => {
		const user = findUserById(10);
		expect(user).toBe(undefined);
	});
});

describe("Unit tests for the validateUser auth helper method", () => {
	it("validateUser should return the user Object with valid email & password", () => {
		return validateUser("1@archipel.com", "password").then((user) => {
			expect(user.name).toBe("Francis");
			expect(user.email).toBe("1@archipel.com");
			expect(user.id).toBe(1);
		});
	});
	it("validateUser should return null with invalid email", () => {
		return validateUser("not@anemail", "password").then((user) => {
			expect(user).toBe(null);
		});
	});
	it("validateUser should return null with invalid password", () => {
		return validateUser("1@archipel.com", "aaaaaa").then((user) => {
			expect(user).toBe(null);
		});
	});
});
