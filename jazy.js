function jazy(path, options) {
    options = options || {};

    if (!window['@@jazy_' + path]) {
        var caught = function() {},
            callbacks = [],
            module = document.createElement(options.tag || 'script');

        module.async = options.async != null ? options.async : true;

        jazy.then = function(callback) {
            callbacks.push(callback);
            return this;
        }

        jazy.catch = function(callback) {
            caught = callback;
        }

        module.onerror = function(e) { caught(); }

        module.onreadystatechange = module.onload = function() {
            window['@@jazy_' + path] = 1;
            while (callbacks.length) {
                (callbacks.shift())();
            }
        }

        module[options.srcKey || 'src'] = path;

        document.head.appendChild(module);

    } else {
        jazy.then = function(callback) {
            callback();
            return this;
        }
    }

    return jazy;
}
