import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, postJoin, getLogin, postLogin, logout } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

// userController.js와 videoController.js 파일을 확인해 보자. 해당 파일들 처럼 function이 export되어 있을 때에만 위 함수들 처럼 개별적으로 req, res에 대한 내용을 설정하지 않아도
// 앞선 파일들에 설정된 내용들을 불러와서 function 이름만 작성해 주어도 작동한다. vscode의 특별 기능!

export default globalRouter;
