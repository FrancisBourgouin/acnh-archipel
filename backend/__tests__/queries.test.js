import request from "supertest";
import app from "../app";

describe("Test GraphQL queries", () => {
	it("retrieves the proper archipelagos full response", async () => {
		const query = `{ 
      archipelagos{
        id
        name 
        islands{
          id
          name
          nativeFruit
          islanders{
            id
            name
          }
        }
      } 
    }`;
		const expectedResponse = {
			data: {
				archipelagos: [
					{
						id: "1",
						islands: [
							{
								id: "1",
								islanders: [
									{ id: "1", name: "Francis" },
									{ id: "3", name: "Corrina" },
								],
								name: "Raftel",
								nativeFruit: "Peaches",
							},
							{
								id: "2",
								islanders: [{ id: "2", name: "Riki" }],
								name: "Montoya",
								nativeFruit: "Apples",
							},
						],
						name: "Covidian Montréal Consortium",
					},
					{
						id: "2",
						islands: [
							{
								id: "3",
								islanders: [{ id: "4", name: "Bawb" }],
								name: "Syracuse",
								nativeFruit: "Oranges",
							},
						],
						name: "Secret Group of Destiny",
					},
				],
			},
		};

		const res = await request(app).post("/graphql").send({ query: query });
		const parsedRes = JSON.parse(res.text);

		expect(res.statusCode).toEqual(200);
		expect(parsedRes).toEqual(expectedResponse);
	});

	it("retrieves the proper archipelago full response by archipelagoId", async () => {
		const query = `{ 
      archipelago(archipelagoId: 1){
        id
        name 
        islands{
          id
          name
          nativeFruit
          islanders{
            id
            name
          }
        }
      } 
    }`;
		const expectedResponse = {
			data: {
				archipelago: {
					id: "1",
					islands: [
						{
							id: "1",
							islanders: [
								{ id: "1", name: "Francis" },
								{ id: "3", name: "Corrina" },
							],
							name: "Raftel",
							nativeFruit: "Peaches",
						},
						{
							id: "2",
							islanders: [{ id: "2", name: "Riki" }],
							name: "Montoya",
							nativeFruit: "Apples",
						},
					],
					name: "Covidian Montréal Consortium",
				},
			},
		};

		const res = await request(app).post("/graphql").send({ query: query });
		const parsedRes = JSON.parse(res.text);

		expect(res.statusCode).toEqual(200);
		expect(parsedRes).toEqual(expectedResponse);
	});

	it("retrieves the proper archipelago full response by islanderId", async () => {
		const query = `{ 
      archipelago(islanderId: 3){
        id
        name 
        islands{
          id
          name
          nativeFruit
          islanders{
            id
            name
          }
        }
      } 
    }`;
		const expectedResponse = {
			data: {
				archipelago: {
					id: "1",
					islands: [
						{
							id: "1",
							islanders: [
								{ id: "1", name: "Francis" },
								{ id: "3", name: "Corrina" },
							],
							name: "Raftel",
							nativeFruit: "Peaches",
						},
						{
							id: "2",
							islanders: [{ id: "2", name: "Riki" }],
							name: "Montoya",
							nativeFruit: "Apples",
						},
					],
					name: "Covidian Montréal Consortium",
				},
			},
		};

		const res = await request(app).post("/graphql").send({ query: query });
		const parsedRes = JSON.parse(res.text);

		expect(res.statusCode).toEqual(200);
		expect(parsedRes).toEqual(expectedResponse);
	});

	it("retrieves the proper islands full response", async () => {
		const query = `{ 
      islands{
        id
        name
        nativeFruit
        islanders{
          id
          name
        }
      }
    }`;
		const expectedResponse = {
			data: {
				islands: [
					{
						id: "1",
						islanders: [
							{ id: "1", name: "Francis" },
							{ id: "3", name: "Corrina" },
						],
						name: "Raftel",
						nativeFruit: "Peaches",
					},
					{
						id: "2",
						islanders: [{ id: "2", name: "Riki" }],
						name: "Montoya",
						nativeFruit: "Apples",
					},
					{
						id: "3",
						islanders: [{ id: "4", name: "Bawb" }],
						name: "Syracuse",
						nativeFruit: "Oranges",
					},
				],
			},
		};

		const res = await request(app).post("/graphql").send({ query: query });
		const parsedRes = JSON.parse(res.text);

		expect(res.statusCode).toEqual(200);
		expect(parsedRes).toEqual(expectedResponse);
	});

	it("retrieves the proper island full response by islandId", async () => {
		const query = `{ 
      island(islandId: 1){
        id
        name
        nativeFruit
        islanders{
          id
          name
        }
      }
    }`;
		const expectedResponse = {
			data: {
				island: {
					id: "1",
					islanders: [
						{ id: "1", name: "Francis" },
						{ id: "3", name: "Corrina" },
					],
					name: "Raftel",
					nativeFruit: "Peaches",
				},
			},
		};

		const res = await request(app).post("/graphql").send({ query: query });
		const parsedRes = JSON.parse(res.text);

		expect(res.statusCode).toEqual(200);
		expect(parsedRes).toEqual(expectedResponse);
	});

	it("retrieves the proper island full response by islanderId", async () => {
		const query = `{ 
      island(islanderId: 3){
        id
        name
        nativeFruit
        islanders{
          id
          name
        }
      }
    }`;
		const expectedResponse = {
			data: {
				island: {
					id: "1",
					islanders: [
						{ id: "1", name: "Francis" },
						{ id: "3", name: "Corrina" },
					],
					name: "Raftel",
					nativeFruit: "Peaches",
				},
			},
		};

		const res = await request(app).post("/graphql").send({ query: query });
		const parsedRes = JSON.parse(res.text);

		expect(res.statusCode).toEqual(200);
		expect(parsedRes).toEqual(expectedResponse);
	});

	it("retrieves the proper islanders full response", async () => {
		const query = `{ 
        islanders{
          id
          name
        }
    }`;
		const expectedResponse = {
			data: {
				islanders: [
					{ id: "1", name: "Francis" },
					{ id: "2", name: "Riki" },
					{ id: "3", name: "Corrina" },
					{ id: "4", name: "Bawb" },
				],
			},
		};

		const res = await request(app).post("/graphql").send({ query: query });
		const parsedRes = JSON.parse(res.text);

		expect(res.statusCode).toEqual(200);
		expect(parsedRes).toEqual(expectedResponse);
	});

	it("retrieves the proper islander full response by islanderId", async () => {
		const query = `{ 
        islander(islanderId: 1){
          id
          name
        }
    }`;
		const expectedResponse = {
			data: {
				islander: { id: "1", name: "Francis" },
			},
		};

		const res = await request(app).post("/graphql").send({ query: query });
		const parsedRes = JSON.parse(res.text);

		expect(res.statusCode).toEqual(200);
		expect(parsedRes).toEqual(expectedResponse);
	});
});
