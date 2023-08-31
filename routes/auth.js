/**
*
* 設定2個路由用於
* 1. http://127.0.0.1:3000/auth/login - 使用 googleOAuth2Client 物件生成授權 URL
* 2. http://127.0.0.1:3000/auth/google/callback 
* - 從請求的查詢參數中獲取授權碼(code)，授權碼可以換取訪問gmail api的token
* - 接著轉址到指定的路徑
* 
*/

var express = require('express');
var router = express.Router();
const googleOAuth2Client = require('../config/googleOAuth2Client');

//定義了 OAuth 2.0 授權範圍，這裡指定了可以訪問使用者 Gmail 郵件的範圍。
const SCOPES = [
   'https://mail.google.com/',
];

// 訪問 http://127.0.0.1:3000/auth/login 
// 在這個路由中，使用 googleOAuth2Client 物件生成授權 URL
// 然後再將用戶重新導向到 Google 登入頁面以進行授權
router.get('/login', (req, res) => {
   const authUrl = googleOAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
   });
   res.redirect(authUrl);
});

// Google登入成功後會被導向 http://127.0.0.1:3000/auth/google/callback
// 也就是我們在建立「OAuth 用戶端」的時候填寫的URI
router.get('/google/callback', async (req, res) => {
   // 從請求的查詢參數中獲取授權碼（code）
   const code = req.query.code;
   try {
      //然後使用 googleOAuth2Client 物件的 getToken 方法來換取訪問令牌（tokens）
      const { tokens } = await googleOAuth2Client.getToken(code)

      //一旦換取到訪問令牌，它將設置 googleOAuth2Client 的憑據（credentials）以供後續使用。
      googleOAuth2Client.setCredentials(tokens);

      //將訪問令牌儲存在會話（session）中，通常是為了在後續的請求中持續使用該令牌，以訪問 Google 服務。
      req.session.tokens = tokens;

      //成功驗證後，它將使用 res.redirect 重新導向到 指定的路徑
      res.redirect('/email/user');
   } catch (err) {
      console.error('Error authenticating with Google:', err);
      res.status(500).send('Error authenticating with Google');
   }
});

module.exports = router;
