import browserHistory from 'react-router/lib/browserHistory';

const mixins = function () {
  const _this = this;
  return {
    isRouter() {
      return _this.props.children === null;
    },
    getProps() {
      const url = global.pathname || window.location.pathname;
      let key = url.replace(/\?.*$/, '').replace(/^\//, '').replace(/\/$/, '').split('/');
      key = key[key.length - 1];
      return key;
    },
    whetherFetch() {
      if (this.isRouter() && !_this.props[this.getProps()]) _this.getData();
    },
    getBacks() {
      const path = _this.props.route.path || '/';
      const route = path.replace(/:([^"]*)/, '');
      const arrs = window.location.pathname.split(`/${route}`);
      if (arrs.length > 2) {
        this.path = arrs[0];
        for (let i = 1; i < arrs.length - 1; i++) {
          this.path += `/${route}${arrs[i]}`;
        }
      } else {
        this.path = arrs[0];
      }
      return this.path;
    },
    goBack() {
      const path = this.getBacks();
      if (typeof path === 'string')     {
        browserHistory.push(path);
      } else      {
        browserHistory.goBack();
      }
    }
  };
};

module.exports = mixins;
