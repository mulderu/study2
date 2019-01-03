/**
 * simple vhost wildcard test 
 */
var connect = require("connect"),
  serveStatic = require("serve-static"),
  vhost = require("vhost");

var mailapp = connect();
var staticapp = connect();

staticapp.use(serveStatic("public"));

var app = connect();

var userapp = connect();
userapp.use((req, res, next)=>{
  console.log("=====");
  console.log(req.vhost);
  console.log(req.url);
  let username = req.vhost[0];

  req.originalUrl = req.url;
  req.url = '/' + username + req.url;
  console.log(req.url);

  next();
})
userapp.use('/mulder/test', (req, res)=>{
  res.end('userapp /test good');
});
/** 
 * /etc/hosts
 * 
 * 127.0.0.1 mailapp.mulderyu  asset-img.mulderyu
 * 127.0.0.1 mulder.mid.mulderyu
 * 
 */

app.use(vhost("mailapp.mulderyu", mailapp));
app.use(vhost("asset-*.mulderyu", staticapp));
app.use(vhost("*.mid.mulderyu", userapp));

mailapp.use("/",function(req, res) {
  res.setHeader('Content-type', 'text/plain');
  res.end('helo this is mailapp');
})

app.listen(2000);

/**
 * 
 * http://mailapp.mulderyu:2000/hi
 * http://asset-img.mulderyu:2000/test1.txt
 * http://mulder.mid.mulderyu:2000/test
 * 
 */

