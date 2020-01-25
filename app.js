import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleWare } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
app.set("etag", "strong");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
    // store이 세션을 MongoDB에 저장시켜 준다.
  })
);
app.use(passport.initialize());
// initialize가 쿠키를 초기화
app.use(passport.session());
// session이 쿠키  찾음

app.use(localsMiddleWare);
// passport가 자기가 찾은 사용자의 요청(request)을 object, 즉 req.user로 만들어 줌

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; // 누군가가 내 파일을 불러올 때(import), app object를 주겠다는 뜻. 여기서 app object란, 21 - 29번까지 설정해 놓을 것들을 의미함.
