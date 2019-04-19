(function(pluginName, scriptForModernBrowsers, scriptForLegacyBrowsers) {

    pluginName = pluginName.replace(/.js$/i, '\\.js');

    var testPattern = new RegExp(pluginName, 'i');
    var replacePattern = new RegExp(pluginName+'$', 'i');

    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];

    var parts = currentScript.src.split('/');
    if (!testPattern.test(parts[parts.length - 1])) {
        console.warn('plugin components not found!');
        return;
    }

    var path = currentScript.src.replace(replacePattern, '');

    let src = (typeof fetch === 'function') ? path + scriptForModernBrowsers : path + scriptForLegacyBrowsers;
    document.write('<script src="' + src + '"></script>')

}('plugin.js', 'pluginM.js', 'pluginL.js'));
