// 导入模块
let http = require("http");
let fs = require("fs");
let url = require("url");
let template = require("art-template");
let mysql = require("mysql");

// 创建服务
let server = http.createServer();

/*
  功能:和数据库交互
  参数:
    sql -> sql 语句
    fun -> 自定义函数
*/
function interactingWithDatabase(sql, fun) {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "comment_list",
  });
  connection.connect();
  connection.query(sql, function (err, results) {
    if (err) {
      throw err;
    } else {
      fun(results);
    }
  });
  connection.end();
}

/*
  功能:渲染首页数据
  参数:
    res -> response
    result -> 数据库返回值
*/
function renderIndex(res, results) {
  fs.readFile("./index.html", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.end(
        template.render(data.toString(), {
          comment_list: results.reverse(),
        })
      );
    }
  });
}

// 监听请求
server.on("request", function (req, res) {
  let pathname = url.parse(req.url, true).pathname;
  let query = url.parse(req.url, true).query;

  // 首页
  if (pathname == "/index.html" || pathname == "/index" || pathname == "/") {
    console.log(`Location in: ${pathname}`);
    interactingWithDatabase("SELECT * FROM comment_list", function (results) {
      renderIndex(res, results);
    });
  }

  // 跳转到评论页
  else if (pathname == "/sendComment.html") {
    console.log(`Location in: ${pathname}`);
    fs.readFile(`.${pathname}`, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.end(data.toString());
      }
    });
  }

  // 提交评论
  else if (pathname == "/send") {
    console.log(`user: ${query.name} ; comment: ${query.comment}`);
    interactingWithDatabase(
      `INSERT INTO comment_list (name , comment) VALUES ('${query.name}' , '${query.comment}')`,
      function () {
        // 设置重定向
        res.statusCode = 302;
        res.setHeader("Location", "./index.html");
        res.end();
      }
    );
  }

  // 删除评论
  else if (pathname == "/delete") {
    console.log(`delete userid: ${query.userid}`);
    interactingWithDatabase(
      `DELETE FROM comment_list WHERE id='${query.userid}'`,
      function () {
        // 设置重定向
        res.statusCode = 302;
        res.setHeader("Location", "./index.html");
        res.end();
      }
    );
  }

  // 跳转到修改评论页
  else if (pathname == "/edit.html") {
    console.log(`Location in: ${pathname}`);
    console.log(query.userid);
    fs.readFile(`.${pathname}`, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.end(data.toString());
      }
    });
  }

  // 修改评论
  else if (pathname == "/edit") {
    interactingWithDatabase(
      `UPDATE comment_list SET comment = "${query.newcomment}" WHERE id = "${query.userid}"`,
      function (results) {
        // 设置重定向
        res.statusCode = 302;
        res.setHeader("Location", "./index.html");
        res.end();
      }
    );
  }

  // 搜索评论
  else if (pathname == "/search") {
    console.log("--------------------------------------");
    console.log(`search comment: '${query.value}'`);
    interactingWithDatabase(
      `SELECT * FROM comment_list WHERE comment LIKE '%${query.value}%' or name LIKE '%${query.value}%'`,
      function (results) {
        console.log("results:\n");
        console.log(results);
        console.log("--------------------------------------");
        fs.readFile("./index.html", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            let html = template.render(data.toString(), {
              comment_list: results.reverse(),
            });
            res.end(html);
          }
        });
      }
    );
  }

  // 返回首页
  else if (pathname == "/back") {
    console.log(`Go back to: ${pathname}`);
    // 设置重定向
    res.statusCode = 302;
    res.setHeader("Location", "./index.html");
    res.end();
  }

  // 404
  else {
    fs.readFile("./404.html", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.end(data.toString());
      }
    });
  }
});

// 监听端口
server.listen("4000", function () {
  console.log("\n");
  console.log("\tlocalhost:4000\n");
  console.log("\t起飞 ~");
  console.log("\n");
});
