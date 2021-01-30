import Koa from "koa";
import koaBody from "koa-body";
const mongoose = require('mongoose');
import cors from "koa2-cors";
import variables from './variables'; 

import logger from "./logger";
import {
  log as logMiddleware,
  responseHandler,
  requestId,
} from "./middlewares";
import router from "./router";

require("dotenv").config();

const app = new Koa();

mongoose
	.connect(variables.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => console.log("connect successfully"))
	.catch((err) => console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`))

app.use(koaBody());
app.use(requestId());
app.use(logMiddleware({ logger }));
app.use(cors({ origin: "*" }));
app.use(responseHandler());

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
