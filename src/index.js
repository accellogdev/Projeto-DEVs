import { APP_PORT } from './config/env';
import app from './app';

try {
  app.listen(APP_PORT || 3333);
  if (app.get('env') === 'development')
    console.log(`Server started on port ${APP_PORT}`);
} catch (error) {
  console.log(error);
  process.exit(1);
}