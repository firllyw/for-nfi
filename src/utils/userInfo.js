import Cookie from "js-cookie";

export function getUserInfo(type) {
    return Cookie.get(type) || null;
}

export function setUserInfo(type, userInfo, isRemember = false) {
    if (userInfo) {
      const expiresNumber = isRemember ? 30 : 1;
      Cookie.set(type, userInfo, { expires: expiresNumber });
    }
}

export function removeUserInfo(type) {
    if (getUserInfo(type)) {
        Cookie.remove(type);
    }
}