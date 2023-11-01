const port = 3000,
    express = require('express'),
    errorhandle = require('./controllers/errorhandle'),
    getpost = require('./controllers/getpost'),
    app = express(),
    bodyParser = require('body-parser'),
    userController = require('./controllers/userController'),
    loginController = require('./controllers/loginController'),
    hostController = require('./controllers/hostController'),
    BoardController = require('./controllers/BoardController');
const mongoose = require("mongoose");
const cookies = require('cookie-parser');
const jwt = require('./controllers/tokenUtils.js');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const router = require('./routes/indexRoutes.js');



mongoose.connect("mongodb://127.0.0.1:27017/SOS", {
    useNewUrlParser: true,
});


// 미들 웨어 함수 : 요청과 응답 사이클에서 실행되는 함수


app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(express.json()); // body-parser.json()과 같은 역할 클라이언트 쪽의 json 요청을 제대로 받을 수 있다. 요청 값을 제대로 받아오지 못하는 것을 해결
app.use(cookieParser());

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

app.use("/routes", router);

app.post("/login", loginController.login); 

//회원 가입시 데이터 베이스에 저장.

//id 중복검사
app.post('/checkID', userController.CheckID);
//사용자 회원 가입 
app.post('/register', userController.registerUser);
//가게 주인 회원 가입
app.post('/Hregister', hostController.registerHost);



// GET: 
app.get('/freeboard', BoardController.FreeBoard);
app.get('/freeboard/:BoardNumber', BoardController.FreeBoards); // 게시판 번호 url
// POST:
app.post('/freeboard', BoardController.FreeBoard);



// PUT: 
app.put('/freeboard', BoardController.FreeBoard);

// DELETE: 
app.delete('/freeboard/:BoardNumber', BoardController.FreeBoard);


//데이터 베이스 연결 설정


// UserDB 변수에 데이터베이스 할당 






app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
