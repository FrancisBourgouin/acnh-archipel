import request from "supertest"
import app from "../app"

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})

describe("Example test with supertest on app.js", () => {
  it("receives hello from / route", async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('hello')
  })
})