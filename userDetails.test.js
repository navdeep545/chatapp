const request = require("supertest");
const { server } = require("../server/socket/index"); // Adjust the path to your server entry file

describe("User Details API", () => {
  let token;

  beforeAll(async () => {
    // Assume a login API to get a token
    const response = await request(server)
      .post("/api/login")
      .send({ email: "test@example.com", password: "password123" });

    token = response.body.token; // Store the token for authentication
  });

  // Test case for fetching user details
  it("should fetch user details successfully", async () => {
    const res = await request(server)
      .get("/api/user-details")
      .set("Authorization", `Bearer ${token}`) // Set the auth header
      .expect("Content-Type", /json/)
      .expect(200); // Expect a 200 OK response

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("email");
  });

  // Cleanup after all tests
  afterAll(async () => {
    server.close(); // Ensure server is closed after tests
  });
});
