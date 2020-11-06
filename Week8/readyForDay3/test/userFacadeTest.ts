import UserFacade from "../src/facades/user";
import { expect } from "chai";
import { ApiError } from "../src/errors/apiError";
import { bryptAsync, bryptCheckAsync } from "../src/utils/bcrypt-async-helper";
import IGameUser from "../src/interfaces/GameUser";
import { assert } from "console";

describe("Verify the UserFacade", () => {
  beforeEach(async () => {
    const hash: string = await bryptAsync("secret");
    UserFacade.users = [
      { name: "Peter Pan", userName: "pp@b.dk", password: hash, role: "user" },
      { name: "Donald", userName: "dd@b.dk", password: hash, role: "user" },
      { name: "admin", userName: "admin@a.dk", password: hash, role: "admin" },
    ];
  });

  it("Should Add the user Kurt", async () => {
    const newUser = {
      name: "Jan Olsen",
      userName: "jo@b.dk",
      password: "secret",
      role: "user",
    };
    try {
      const status = await UserFacade.addUser(newUser);
      const jan = await UserFacade.getUser("jo@b.dk");
      const passwordOK = await bryptCheckAsync("secret", jan.password);
      expect(status).to.be.equal("User was added");
      expect(UserFacade.users.length).to.equal(4);
    } catch (err) {
      expect.fail("Seems like password was not hashed correctly");
    } finally {
    }
  });

  it("Should remove the user Peter", async () => {
    let peter = "pp@b.dk";
    try {
      const status = await UserFacade.deleteUser(peter);
      expect(status).to.be.equal("User was deleted");
    } catch (err) {
      expect.fail("An error occured when trying to delete the user Peter");
    } finally {
    }
  });

  it("Should get three users", async () => {
    try {
      const result = await UserFacade.getAllUsers();
      expect(result.length).to.be.equal(3);
    } catch (err) {
      expect.fail("An error occured when trying to get the three users");
    } finally {
    }
  });

  it("Should find Donald", async () => {
    try {
      const result = await UserFacade.getUser("dd@b.dk");
      expect(result.name).to.be.equal("Donald");
      expect(result.role).to.be.equal("user");
      expect(result.userName).to.be.equal("dd@b.dk");
    } catch (err) {
      expect.fail("An error occured when trying to get the three users");
    } finally {
    }
  });

  it("Should not find xxx.@.b.dk", async () => {
    try {
      await UserFacade.getUser("xxx.@.b.dk");
      expect.fail('Trying to find xxx.@.b.dk should have thrown an error')
    } catch (err) {
      expect(err.name).to.be.equal('ApiError')
    } finally {
    }
  });
});
