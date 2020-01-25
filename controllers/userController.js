import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  // 여기서 next 값을 지니게 해 줌으로써 join을 처리하는 controller가 middleware가 되었다.
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
      // join이 성공하면 next를 통해 Router의 postLogin으로 넘어간다.
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  //  (req, res) =>     이걸 안 지워서 로그인이 되지 않았어!!!! 하지만 해결했지 but Why!
  // passport.authenticate는 username과 password를 찾도록 설정되어 있다.
  failureRedirect: routes.login,
  successRedirect: routes.home
  // 로그인에 성공했을 때는 홈으로, 실패했을 때에는 로그인으로
  // join에서 아이디와 비밀번호를 설정하면, login 단계로 넘어오는데 이 때는 올바른 값으로 login이 성공된 것으로 간주하여
  // 자동으로 home으로 이동하게 된다?
});
// 여기서 local은 우리가 설치해 준 strategy의 이름이다.

export const githubLogin = passport.authenticate("github");
// 깃헙에서 정보를 가져오기 위해 실행되는 함수

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
    // cb(callback)는 이럴 때 호출 한다.
    // 사용자의 정보를 찾아 왔을 때, 그렇지 못할 때를 대비하여 cb(error, user)와 같이 작성한다.
    // 그러면 passport가 정보를 찾아 왔을 때에는 user에 따라 가져 온 정보에 맞추어 id와 password를 찾아내고,
    // 못 찾았을 시 에는 에러를 송출한다.
    // 이 경우에는 트라이 캐치 구문에 맞추어 에러만 작성해 주었다.
  }
  // 이 함수는 깃헙에서 사용자 정보를 정상적으로 가져왔을 때 실행되는 함수로
  // 정상적으로 실행되면 로그인이 잘 되었다는 것.
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
