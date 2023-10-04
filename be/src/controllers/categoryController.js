const conn = require("../../config/db.config.js");
const AppError = require("../utils/appError.js");
exports.createCategory = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const values = [req.body.name];
  conn.query(
    `insert into category ( name)
    values (?)`,
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
exports.getAllCategory = (req, res, next) => {
  conn.query("select * from category ", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
};

//* get one
exports.getOneCategory = (req, res, next) => {
  conn.query(
    "SELECT * FROM category where id = ?",
    [req.params.id],
    function (err, data, result) {
      if (err) return next(new AppError(err));

      if (result.affectedRows === 0) {
        res.status(404).json({
          status: "fail",
          message: "Khong co category",
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
exports.deleteCategory = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  conn.query(
    "DELETE FROM category WHERE id=?",
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
