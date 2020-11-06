import path from "path";
require('dotenv').config({ path: path.join(process.cwd(), '.env') })
import { expect } from "chai";
import { Server } from "http";
import fetch from "node-fetch";
import { bryptAsync } from "../src/utils/bcrypt-async-helper"
import UserFacade from '../src/facades/user';
import { doesNotReject } from "assert";


let server: Server;
const TEST_PORT = "7777"

describe("Create/Update Comments", () => {
  let URL: string;
  before(async () => {
    process.env["PORT"] = TEST_PORT;
    process.env["SKIP_AUTHENTICATION"] = "1";
    server = await require("../src/app").server;
    URL = `http://localhost:${process.env.PORT}`;
  })


  beforeEach(async () => {
    const hash: string = await bryptAsync("secret");

    UserFacade.users = [
      { name: "Peter Pan", userName: "pp@b.dk", password: hash, role: "user" },
      { name: "Donald Duck", userName: "dd@b.dk", password: hash, role: "user" },
      { name: "admin", userName: "admin@a.dk", password: hash, role: "admin" }
    ]
  })



  after(async () => {
    server.close();
  })

  it("Should get the message Hello", async () => {
    const result = await fetch(`${URL}/api/dummy`).then(r => r.json());
    expect(result.msg).to.be.equal("Hello")
  })

  it("Should get three users", async () => {
    const result = await fetch(`${URL}/api/users`)
    .then(response => response.json());

    expect(result[0].name).to.be.equal("Peter Pan");
    expect(result[1].name).to.be.equal("Donald Duck");
    expect(result[2].name).to.be.equal("admin");
  })

  it("Should Add the user Jan", async () => {
    const newUser = { name: "Jan Olsen", userName: "jo@b.dk", password: "secret", role: "user" }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }
    const result = await fetch(`${URL}/api/users`, config)
    .then(r => r.json());

    expect(result.status).to.be.equal("User was added")
  })

  it("Should find the user Donald Duck", async () => {
    const username = "dd@b.dk"
    const result = await fetch(`${URL}/api/users/${username}`)
    .then(response => response.json());

    expect(result.name).to.be.equal("Donald Duck");
    expect(result.userName).to.be.equal("dd@b.dk");
  })

  it("Should not find the user xxx@b.dk", async () => {
    const falseUsername = "xxx@b.dk"
    const result = await fetch(`${URL}/api/users/${falseUsername}`)
    .then(response => response.json());

    expect(result.code).to.equal(404);
    expect(result.message).to.equal("User Not Found");
  })

  it("Should Remove the user Donald Duck", async () => {
    const username = "dd@b.dk";
    const config = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    const result = await fetch(`${URL}/api/users/${username}`, config)
    .then(response => response.json());

    expect(result.status).to.be.equal("User was deleted");
  })


})
