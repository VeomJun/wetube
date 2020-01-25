import multer from "multer";
import routes from "./routes";
import express from "express";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleWare = (req, res, next) => {
  res.locals.siteName = "Eastern Spirit";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  // 여기서 말하는 user란 userController 중 postJoin에서 변수로 지정한 user를 의미한다.
  // 이렇게 작성해 줘야만 다른 template에서도 user에 접근할 수 있다.
  // passport가 쿠키나 serialize, deserialize 등의 기능을 지원하며 user에 담긴 object를 request에도 올려줌.
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
    // 회원가입(join)을 하는데, 가입이 되어 있을 시에는 홈 화면으로 돌려 보냄
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
