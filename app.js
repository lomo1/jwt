const express = require('express');
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');

const jwt = require("jsonwebtoken");

const app = express();


// 创建 application/x-www-form-urlencoded 编码解析, 如果解析json 在使用bodyParse.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

//app.use(express.static('public'));
app.use(cookies());

// 通过get请求进入测试界面
app.get('/index.html', function(req, res) {
    console.log(__dirname); // => /Users/lomo/Sites/sites/JDBToolsPlatform/api/oAuth/ldap
    console.log(JSON.stringify(req.cookies));
    res.sendFile(__dirname + '/views/' + "index.html");
});

// 手动设置cookie
app.get('/set', function(req, res) {
    console.log("set cookies page...");
    res.sendFile(__dirname + '/views/' + 'set.html');
});

//设置json web token 示例页
app.get('/jwtDemo', function(req, res) {
    console.log("set/get jwt page...");
    res.sendFile(__dirname + '/views/' + 'jwt.html');
});

//测试--设置cookie，给set.html测试使用。
app.post('/cookies/set', urlencodedParser, function(req, res) {
    console.log("start set cookies ...");
    console.log("传入的cookie key-value: " + req.body.cookieKey + "=>" + req.body.cookieValue);
    //15min 有效期，建议使用maxAge(单位毫秒)
    res.cookie(req.body.cookieKey, req.body.cookieValue, { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.send('{error:{returnCode: 0}, data:{}}');
});


//生成jwt的Token
app.post('/jwt/set', urlencodedParser, function(req, res) {
    console.log('jwt...setting Page');
    console.log("jstName=>" + req.body.jstContents + ", jstValue=>" + req.body.jstKeys);
    let content = req.body.jstContents;

    let secretOrPrivateKey = req.body.jstKeys;
    console.log(typeof content);
    let token = jwt.sign(content, secretOrPrivateKey); //TODO expiresIn报错问题
    console.log("生成的Token：" + token);
    //种Cookie
    res.cookie("accessToken", token, { expires: new Date(Date.now() + 900000), httpOnly: true }); //15min有效期
    //返回生成的Token or ...
    res.send(token);
});

//解析accessToken(在服务端解析), 获取其内容并返回
app.post('/jwt/get', urlencodedParser, function(req, res) {

    if (req.cookies.accessToken) {
        let cookieContents = req.cookies.accessToken;
        let secretKey = req.body.secretKey;
        console.log("从Cookie中获取到的token: " + cookieContents);
        //解析Token
        jwt.verify(cookieContents, secretKey, function(error, decode) {
            if (error) {
                console.log(error);
            } else {
                console.log("解析后的Token内容: " + JSON.stringify(decode)); //此处的contents字段名依赖加密时的json里的key
                //res.send('{error: {returnCode: 0, returnMessage: null}, data: { contents: ' + JSON.stringify(decode) + '}}');
                res.send(JSON.stringify(decode));
            }
        });
    } else {
        console.log("Cookie中未发现accessToken!!!");
        res.send('{error:{returnCode: 1, returnMessage: false}, data: null}');
    }
});



let server = app.listen(8088, function() {
    let host = server.address().address;
    let port = server.address().port;

    console.log("访问地址:  http://%s:%s", host, port);

});