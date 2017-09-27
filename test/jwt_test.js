const jwt = require("jsonwebtoken");


/**
 * 生成Token
 */
var content = { msg: "today  is  a  lomo's  day !" }; // 要生成token的主题信息
var secretOrPrivateKey = "Lomo"; // 这是加密的key（密钥） 

var token = jwt.sign(content, secretOrPrivateKey, {
    expiresIn: 60 * 60 * 24 // 24小时过期
});

console.log("生成的Token: \r\n" + token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtc2ciOiJ0b2RheSAgaXMgIGEgIGxvbW8ncyAgZGF5ICEiLCJpYXQiOjE1MDYzOTc2MTIsImV4cCI6MTUwNjQ4NDAxMn0.D8ikDcSs0ardLCtxE8PRghA64AqDUIhMohhfI8jehrk



/**
 * 解析Token
 */

// var token_eg = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtc2ciOiJ0b2RheSAgaXMgIGEgIGxvbW8ncyAgZGF5ICEiLCJpYXQiOjE1MDYzOTc2MTIsImV4cCI6MTUwNjQ4NDAxMn0.D8ikDcSs0ardLCtxE8PRghA64AqDUIhMohhfI8jehrk';

// jwt.verify(token_eg, secretOrPrivateKey, function(error, decode) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("解析后的msg: " + decode.msg);
//         //  next();
//     }
// });