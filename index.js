const express = require("express");
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connect = require("./config/database");
const moment = require('moment');
const Swal = require('sweetalert2') 
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");

const app = express();

dotenv.config();
const port = process.env.PORT;
connect.connectDB();

const routerClient = require("./routes/client/index.route");
const routerAdmin = require("./routes/admin/index.route");

const systemConfig = require("./config/system");


// SocketIO
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
// End SocketIO

app.use(cookieParser('abcdefgh'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
});

app.use((req, res, next) => {
    res.locals.prefixAdmin = systemConfig.prefixAdmin;
    next();
});

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// router client
routerClient(app);
routerAdmin(app);

app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'public', 'uploads', filename);
    res.sendFile(filePath);
});

app.get("*", (req, res) => {
    res.render("client/pages/error/404",{
        title: "404 not found",
    })
})


server.listen(port, () => {
    console.log("Đang chạy trên cổng: " + port);
});