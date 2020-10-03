const bcrypt = require("bcryptjs");
const debug = require("debug")("game-case")

interface IGameUser {
  name: string;
  userName: string;
  password: string;
  role: string;
}

const users: Array<IGameUser> = [];

export class UserFacade {
  static generatorTestUsers(): boolean {
    return bcrypt
      .hash("testing", 10)
      .then((testPassword: string) => {
        users.push({
          name: "Jack",
          userName: "tester1",
          password: testPassword,
          role: "user",
        });
        users.push({
          name: "William",
          userName: "tester2",
          password: testPassword,
          role: "admin",
        });
        users.push({
          name: "Peter",
          userName: "tester3",
          password: testPassword,
          role: "none",
        });
        return true;
      })
      .catch((err: any) => {
        debug(err);
        return false;
      });
  }
  static addUser(user: IGameUser): boolean {
    return bcrypt
      .hash(user.password, 10)
      .then((hashPassword: string) => {
        user.password = hashPassword;
        users.push(user);
        return true;
      })
      .catch((err: any) => {
        debug(err);
        return false;
      });
  }
  static deleteUser(userName: string): boolean {
    const user = users.find((user) => user.userName === userName);
    if (!user) return false;
    let idx = users.indexOf(user);
    users.splice(idx, 1);
    return true;
  }
  static getAllUsers(): Array<IGameUser> {
    return users;
  }
  static getUser(userName: string): IGameUser {
    let user = users.find((user) => user.userName === userName);
    if (user) return user;
    throw new Error("User Not Found");
  }
  static checkUser(userName: string, password: string): boolean {
    /*Use bcrypjs's compare method */
    const user = users.find((user) => user.userName === userName);
    if (!user) return false;
    return bcrypt.compare(password, user.password).then((res: boolean) => res);
  }
}
