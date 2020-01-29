import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import { githubLoginCallback, kakaoLoginCallback } from "./controllers/userController";
import routes from "./routes";

// passport.use는 passport에게 strategy를 사용하라는 명령으로, 괄호 안에 해당되는 strategy가 들어간다.
// 예를 들어 username과 password로 사용하기 혹은 facebook이나 github로 사용하기 등 많은 방식을 설정할 수 있다.
// 그리고 우리의 경우에는 passportLocalMongoose에 따라 username과 password를 이용할 것이다.
// createStrategy는 이미 생성된 passport-local의 LocalStrategy를 생성한다.
passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.gitHubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KO_ID,
      clientSecret: process.env.KO_SECRET,
      callbackURL: `http://localhost:4000${routes.kakaoCallback}`
    },
    kakaoLoginCallback
  )
);

// It sends only "id" to cookies.
passport.serializeUser(User.serializeUser());
// 받은 정보(id)를 통해 해당 정보가 어느 사용자의 것인지를 convert할 수 있음
passport.deserializeUser(User.deserializeUser());
// 위의 두 줄로 passport가 사용자 인증을 처리할 수 있도록 설정됨.
