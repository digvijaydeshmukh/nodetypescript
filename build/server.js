"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var compression = require("compression");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var express = require("express");
var helmet = require("helmet");
var mongoose = require("mongoose");
var logger = require("morgan");
var PostControllers_1 = require("./controllers/PostControllers");
//import { UserRouter } from './controllers/UserControllers';
// import { userRoutes } from './controllers/UserControllers'
// import { PostRouter } from './router/PostRouter';
// import { UserRouter } from './router/UserRouter';
var postRouter = new PostControllers_1.PostRouter();
// const userRouter = new UserRouter();
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    // application config
    Server.prototype.config = function () {
        var MONGO_URI = 'mongodb://localhost/tes';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI, { useNewUrlParser: true });
        // express middleware
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
        // cors
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    };
    // application routes
    Server.prototype.routes = function () {
        var router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/posts', postRouter.router);
        // this.app.use('/api/v1/users', userRouter.router);
    };
    return Server;
}());
// export
exports.default = new Server().app;
//# sourceMappingURL=server.js.map