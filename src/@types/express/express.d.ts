// src/types/express.d.ts

import { Session } from "express-session";

declare global {
    namespace Express {
        interface Request {
            session: Session;
        }
    }
}
