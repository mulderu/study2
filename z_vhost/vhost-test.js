/**
 * basic vhost test by domain
 */
var connect = require("connect"),
  serveStatic = require("serve-static"),
  vhost = require("vhost");

var mailapp = connect();
var staticapp = connect();

staticapp.use(serveStatic("public"));

var app = connect();

/** 
 * /etc/hosts
 * 
 * 127.0.0.1 mailapp.mulderyu  asset-img.mulderyu
 * 
 */

app.use(vhost("mailapp.mulderyu", mailapp));
app.use(vhost("asset-*.mulderyu", staticapp));

mailapp.use("/",function(req, res) {
  res.setHeader('Content-type', 'text/plain');
  res.end('helo this is mailapp');
})

app.listen(2000);

/**
 * 
 * http://mailapp.mulderyu:2000/hi
 * http://asset-img.mulderyu:2000/test1.txt
 * 
 */

