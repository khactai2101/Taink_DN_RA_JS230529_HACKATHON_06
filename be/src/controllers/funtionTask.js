const conn = require("../../config/db.config.js");
const AppError = require("../utils/appError");
exports.createTask = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const values = [req.body.task, req.body.status];
  conn.query(
    `insert into todoList ( task , status)
    values (?,?)`,
    values,
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "todo created!",
      });
    }
  );
};

//* get all
exports.getAllTask = (req, res, next) => {
  conn.query("select * from todoList;", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
};

//* get one
exports.getOneTask = (req, res, next) => {
  conn.query(
    "SELECT * FROM todoList where id = ?",
    [req.params.id],
    function (err, data, result) {
      if (err) return next(new AppError(err));

      if (result.affectedRows === 0) {
        res.status(404).json({
          status: "fail",
          message: "No todo found",
        });
      }
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
};

//* detele
exports.deleteTask = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  conn.query(
    "DELETE FROM todoList WHERE id=?",
    [req.params.id],
    function (err, result) {
      if (err) return next(new AppError(err, 500));

      // Kiểm tra số lượng bản ghi bị ảnh hưởng bởi câu truy vấn DELETE
      if (result.affectedRows === 0) {
        res.status(404).json({
          status: "id not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Todo deleted!",
      });
    }
  );
};

//* update
exports.updateEmployment = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No employment id found", 404));
  }
  const values = [req.body.task, req.body.status];
  conn.query(
    `UPDATE todoList SET task=?,status=? WHERE id=?`,
    values,
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "todo updated!",
      });
    }
  );
};
