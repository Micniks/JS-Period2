var auth = require("basic-auth");
import { Response, Request } from "express";
import UserFacade from "../facades/user";

var myBasicAuth = async function (req:any, res:Response,next:Function) {
  var credentials = auth(req)
 
  try {
    if (credentials && await UserFacade.checkUser(credentials.name, credentials.pass)) {
      const user = await UserFacade.getUser(credentials.name)
      req.userName = user.userName;
      req.role = user.role;
      return next();
    }
  } catch (err) { }
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
}

function denied(req: Request, res: Response) {
  res.statusCode = 401;
  res.setHeader("WWW-Authenticate", 'Basic realm="example"');
  res.end("Access denied!");
}

export { myBasicAuth };
