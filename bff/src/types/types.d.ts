import { JwtPayload } from "firebase-admin/lib/auth/token-verifier";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}
