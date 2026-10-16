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
    console.log("Status code: " + status);

    const data = await response.json();

    expect(data.message).to.be.a("string");
    expect(data.message).to.eql("Login successful");


    token = data.token;
    if (token !== null){
    console.log("Generated Token: " + token);
}
else {
    console.log("Token Tidak Tersedia");
}
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
    console.log("Status code: " + statuscode);

    const data = await response.json();
    console.log("User Ditemukan: ")
    console.log(data);
    expect(data.users[0].username).to.equal("aaa");
    expect(data.users[0].age).to.equal(1);
    expect(data.users[0].userId).to.equal("6ac4832804fbf61a8ccb4c7a");
    
    console.log("Username: " + data.users[0].username);
    console.log("Usia: " + data.users[0].age);
    console.log("UserId: " + data.users[0].userId);
    
  });

  it("Add User", async function () {
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
    console.log("Status code: " + status);
    
    const data = await response.json();

    expect(data.username).to.be.a("string");
    expect(data.age).to.be.a("number");
    expect(data.userId).to.be.a("string");
    expect(data.message).to.be.a("string");

    console.log("Response body:", data);

  });

it("Add User", async function () {
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
    console.log("Status code: " + status);
    
    const data = await response.json();

    expect(data.message).to.be.a("string");

    console.log("Response body:", data);

  });
});