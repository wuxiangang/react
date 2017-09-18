const GLOBAL = {
    isRouter(route) {
      return route.children === null;
    },
    setCookie(cookies, key) {
      const cookiesArr = cookies ? cookies.split('; ') : [];
      let result = key ? undefined : {};
      for (let i = 0, l = cookiesArr.length; i < l; i++) {
        const parts = cookiesArr[i].split('=');
        const name = decodeURI(parts[0]);
        const cookie = decodeURI(parts[1]);
        if (key && key === name) {
          result = cookie;
          break;
        } else if (!key) {
          result[name] = cookie;
        }
      }
      return result;
    },
    setHref(str) {
      if (typeof window === 'undefined') {
        return `${global.pathname}/${str}`;
      } else {
        return `${location.pathname}/${str}`;
      }
    },
};

module.exports = GLOBAL;
