const conn = require("../../config/db.config.js");
const AppError = require("../utils/appError.js");

//* get one
exports.getOneQuestion = (req, res, next) => {
  conn.query(
    "SELECT * FROM question where id = ?",
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
exports.getAllQuestion = (req, res, next) => {
  conn.query("select * from question ", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
};
exports.getOneQuestionForAllAnswer = (req, res, next) => {
  conn.query(
    `SELECT 
        question.id, question.content AS question_content, 
        answer.content AS answer_content, answer.is_answer
      FROM question
      JOIN answer ON question.id = answer.question_id
      WHERE question.id = ?`,
    [req.params.id],
    (err, results) => {
      if (err) {
        console.error("Lỗi truy vấn cơ sở dữ liệu: " + err);
        return next(new AppError(err));
      }

      if (results.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Không tìm thấy câu hỏi",
        });
      }

      res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};
exports.getQuestionWithParams = async (req, res, next) => {
  const { category_id, level, limit } = req.query;
  let query = `SELECT * FROM question WHERE 1`;
  const params = [];
  if (category_id) {
    query += ` AND category_id = ? `;
    params.push(category_id);
  }
  if (level) {
    query += ` AND level = ? `;
    params.push(level);
  }
  if (limit) {
    query += ` LIMIT ? `;
    params.push(parseInt(limit));
  }
  conn.query(query, params, (err, result) => {
    console.log(res);
    return res.json(result);
  });
};

exports.addQuestion = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const values = [
    req.body.category_id,
    // req.body.create_at,
    req.body.content,
    req.body.level,
  ];
  conn.query(
    `INSERT INTO question (category_id,content,level ) VALUES(?,?,?)`,
    values,
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "question created!",
      });
    }
  );
};
