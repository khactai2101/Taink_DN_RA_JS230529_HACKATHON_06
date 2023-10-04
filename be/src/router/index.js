const taskRouter = require("./taskRouter");
function Router(app) {
  app.use("/api/v1/notes", taskRouter);
}
module.exports = Router;
