/*
 * @Author: Y
 * @Date:   2017-12-30 21:59:44
 * @Last Modified by:   Y
 * @Last Modified time: 2017-12-30 22:00:12
 */
<!--PC和WAP自适应版-->
<
div id = "SOHUCS"
sid = "请将此处替换为配置SourceID的语句" > < /div>  <
    script type = "text/javascript" >
    (function() {
        var appid = 'cytokgBSj';
        var conf = 'prod_56e323d684c4a5a2888437612669baa0';
        var width = window.innerWidth || document.documentElement.clientWidth;
        if (width < 960) {
            window.document.write('<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf + '"><\/script>');
        } else { var loadJs = function(d, a) { var c = document.getElementsByTagName("head")[0] || document.head || document.documentElement; var b = document.createElement("script");
                b.setAttribute("type", "text/javascript");
                b.setAttribute("charset", "UTF-8");
                b.setAttribute("src", d); if (typeof a === "function") { if (window.attachEvent) { b.onreadystatechange = function() { var e = b.readyState; if (e === "loaded" || e === "complete") { b.onreadystatechange = null;
                                a() } } } else { b.onload = a } } c.appendChild(b) };
            loadJs("http://changyan.sohu.com/upload/changyan.js", function() { window.changyan.api.config({ appid: appid, conf: conf }) }); }
    })(); < /script>