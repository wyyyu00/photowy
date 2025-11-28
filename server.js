// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// 关键修改：端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器已启动，端口：${PORT}`);
});
// 确保 uploads 目录存在
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer 配置略（你原来的那段）

// 静态文件
app.use(express.static(__dirname));
app.use('/uploads', express.static(uploadDir));

// 上传接口
app.post('/upload', upload.array('photos', 30), (req, res) => {
  const filesInfo = (req.files || []).map((f) => ({
    originalName: f.originalname,
    filename: f.filename,
    url: '/uploads/' + f.filename,
    size: f.size,
  }));

  res.json({
    ok: true,
    count: filesInfo.length,
    files: filesInfo,
  });
});

app.listen(PORT, () => {
  console.log(`服务器已启动，端口：${PORT}`);
});


// 确保 uploads 目录存在，没有就创建
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 配置 Multer：保存到 uploads/，并给文件起一个不重复的名字
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // 原始后缀，如 .jpg
    const baseName = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, baseName + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// 静态文件托管：让 index.html、styles.css、上传后的图片都能被访问
app.use(express.static(__dirname));
app.use('/uploads', express.static(uploadDir));

/**
 * 上传接口
 * 前端用 name="photos" 提交多个文件
 */
app.post('/upload', upload.array('photos', 30), (req, res) => {
  // req.files 是一个数组，包含上传成功的文件信息
  const filesInfo = (req.files || []).map((f) => ({
    originalName: f.originalname,
    filename: f.filename,
    // 这里的 url 可以直接拿来在页面上展示 <img src="这个地址">
    url: '/uploads/' + f.filename,
    size: f.size,
  }));

  res.json({
    ok: true,
    count: filesInfo.length,
    files: filesInfo,
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器已启动：http://localhost:${PORT}`);
});
