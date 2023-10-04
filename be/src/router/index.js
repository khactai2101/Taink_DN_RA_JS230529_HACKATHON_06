const categoryRouter = require("./categoryRouter");
const questionRouter = require("./questionRouter");

function Router(app) {
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/questions", questionRouter);
}
module.exports = Router;
