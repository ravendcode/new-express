import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';

import config from './config';

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100,
  message: {
    statusCode: 429,
    error: {
      type: 'TooManyRequestsError',
      message: 'Rate limiting',
    },
  },
});

app.use(limiter);

app.use(require('./middleware/throw').default);
app.use(require('./middleware/knex').default);

app.set('views', config.templatesDir);
app.set('view engine', 'pug');

app.use(morgan(config.env === 'production' ? 'short' : 'dev'));
app.locals.pretty = config.env === 'development';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (config.render) {
  app.use('/static', express.static(config.staticDir));
} else {
  app.use(express.static(config.publicDir));
}
app.use('/node_modules', express.static(config.nodeModulesDir));
app.use(require('./middleware/pug').default);

app.use(require('./config/routes').default);

app.all('*', require('./middleware/spa').default(config.render));

app.use(require('./middleware/error').default);

export default app;
