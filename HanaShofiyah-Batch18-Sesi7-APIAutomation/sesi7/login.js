const { describe } = require("mocha");
const assert = require("assert");
const { expect } = require("chai");

let token;

describe("Test Login", function () {
  it("Valid Login", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: "admin",
          password: "admin",
        }),
      }
    );

    assert.strictEqual(response.status, 200);
    let status = response.status;
    // console.log("Status code: " + status);

    const data = await response.json();

    expect(data.message).to.be.a("string");
    expect(data.message).to.eql("Login successful");


    token = data.token;
//     if (token !== null){
//     console.log("Generated Token: " + token);
// }
// else {
//     console.log("Token Tidak Tersedia");
// }
  });

  it("Get User", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).to.equal(200);
    let statuscode = response.status;
    // console.log("Status code: " + statuscode);

    const data = await response.json();
    // console.log("User Ditemukan: ")
    // console.log(data);
    expect(data.users[0].username).to.equal("Deta");
    expect(data.users[0].age).to.equal(22);
    expect(data.users[0].userId).to.equal("6ad79e26662770e9034d3d09");
    
    // console.log("Username: " + data.users[0].username);
    // console.log("Usia: " + data.users[0].age);
    // console.log("UserId: " + data.users[0].userId);
    
  });

  it("Successfully add a new user", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          username: "baekhyun",
          age: 9,
        }),
      }
    );

    expect(response.status).to.equal(201);
    let status = response.status;
    // console.log("Status code: " + status);
    
    const data = await response.json();

    expect(data.username).to.be.a("string");
    expect(data.age).to.be.a("number");
    expect(data.userId).to.be.a("string");
    expect(data.message).to.be.a("string");

    // console.log("Response body:", data);

  });

it("Error when adding user with special character", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          username: "!@)!@*!(@!",
          age: 1,
        }),
      }
    );

    expect(response.status).to.equal(500);
    let status = response.status;
    // console.log("Status code: " + status);
    
    const data = await response.json();

    expect(data.message).to.be.a("string");

    // console.log("Response body:", data);

  });
});