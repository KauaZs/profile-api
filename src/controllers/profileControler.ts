import authRoute from "../routes/oauth2/auth";
import callbackRoute from "../routes/oauth2/callback";
import logoutRoute from "../routes/oauth2/logout";
import getUserRoute from "../routes/oauth2/user";
import changeProfile from "../routes/users/changeProfile";
import findUserRoute from "../routes/users/findUser";
import listHallFame from "../routes/users/listHallFame";

export {
    changeProfile,
    authRoute,
    callbackRoute,
    getUserRoute,
    logoutRoute,
    findUserRoute,
    listHallFame
}