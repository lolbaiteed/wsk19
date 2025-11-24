import 'dotenv/config';
import app from './app/server.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})
