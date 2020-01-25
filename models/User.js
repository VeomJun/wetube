import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
// passport-local-mongoose는 username과 password를 사용하는 방식이다.

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  // avatarUrl은 fileUrl과 동일한 역할을 수행하게 됨.
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

// passport-local-mongoose는 기본적인 사용자 인증에 대한 다양한 기능들을 포함하고 있는 모듈.
// usernameField의 경우, username을 통해 사용자 인증을 할 수 있는 것으로 우리의 경우 그 인증 대상을 'email'로 설정해 놓았다.
// 즉 email field가 사용자 인증을 위한 username으로 설정된 것이다.
// 그러나, 이와 같은 기능들을 사용했다 해서 사용자 인증 기능이 이루어진 것은 아니다.
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
