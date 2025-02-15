import express from 'express';
import { zwPromptGenerate } from './tool.js'; // 导入工具函数
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// 主页路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

// 星盘生成路由
app.post('/generate', (req, res) => {
    const { birthday, time, gender } = req.body;
    const result = zwPromptGenerate(birthday, parseInt(time), gender, false, 'zh-CN');
    res.json({ result });
});

// 启动服务器
const PORT = 2688;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});