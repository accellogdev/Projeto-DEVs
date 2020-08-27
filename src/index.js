import { APP_PORT } from './config/env';
import http from 'http';

import app from './app';

try {
  const server = http.Server(app);
  server.listen(APP_PORT || 3333);
  if (app.get('env') === 'development')
    console.log(`Server started on port ${APP_PORT}`);
} catch (error) {
  console.log(error);
  process.exit(1);
}