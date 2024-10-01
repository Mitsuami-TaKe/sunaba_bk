import express from 'express';

const app = express();
const port = 3000;

// ルートエンドポイント
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// サーバーの起動
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});