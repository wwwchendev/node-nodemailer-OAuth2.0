/** 
* 'googleOAuth2Client.js'模組用於建立 Google OAuth 2.0 用戶端（Client）物件
* 該物件可以用於進行身份驗證和授權以訪問受保護的 Google 服務，如 Google 雲端硬碟、Gmail API 等。
* 備註：OAuth 2.0 是授權第三方應用程式訪問用戶資源的標準協定。
* 
* 讓我們逐步解釋這段程式碼的用途：
* 1. `require('dotenv').config();`: 
* 這行程式碼載入了 `dotenv` 套件，它的作用是從一個名為 `.env` 的檔案中載入環境變數。
* 2. `const { google } = require('googleapis');`: 
* 這行程式碼載入了 `googleapis` 套件，使你可以在程式中使用 Google API。
* 3. `const googleOAuth2Client = new google.auth.OAuth2(...)`: 這行程式碼創建了一個 Google OAuth2 用戶端物件。
* 該物件用於執行 OAuth2 用戶端驗證流程，以獲取用於訪問受保護 Google 服務的訪問令牌。
* 在建立該物件時，需要提供客戶端 ID、客戶端密鑰和重新導向 URI 等資訊。
* 4. `module.exports = googleOAuth2Client;`: 這行程式碼將建立的 `googleOAuth2Client` 物件導出，
* 以便其他模組可以引用並使用它來執行 Google 服務的身份驗證和授權。
*/

require('dotenv').config();

const { google } = require('googleapis');

const googleOAuth2Client = new google.auth.OAuth2(
   process.env.CLIENT_ID,
   process.env.CLIENT_SECRET,
   process.env.REDIRECT_URI
);

module.exports = googleOAuth2Client;

