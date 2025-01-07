import authRoute from "../routes/oauth2/auth";
import callbackRoute from "../routes/oauth2/callback";
import logoutRoute from "../routes/oauth2/logout";
import getUserRoute from "../routes/oauth2/user";
import changeProfile from "../routes/user/changeProfile";
import findUserRoute from "../routes/user/findUser";

export {
    changeProfile,
    authRoute,
    callbackRoute,
    getUserRoute,
    logoutRoute,
    findUserRoute
}