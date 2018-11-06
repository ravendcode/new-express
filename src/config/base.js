import path from 'path';
import dotenv from 'dotenv';

const debug = require('debug')('app:config');

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const port = env === 'production' ? 80 : process.env.PORT;
// if true render pug templates/home else send file public/index.html
const render = process.env.RENDER ? JSON.parse(process.env.RENDER) : false;
const rootDir = path.join(__dirname, '../../');
const templatesDir = path.join(rootDir, 'templates');
const staticDir = path.join(rootDir, 'static');
const publicDir = path.join(__dirname, '../../public');
const nodeModulesDir = path.join(__dirname, '../../node_modules');

debug(`NODE_ENV is ${env}`);
debug(`APP_NAME is ${process.env.APP_NAME}`);
if (render) {
  debug(`Render ${path.basename(templatesDir)}/home.pug`);
} else {
  debug(`Send ${path.basename(publicDir)}/index.html`);
}

export {
  env,
  port,
  render,
  rootDir,
  templatesDir,
  staticDir,
  publicDir,
  nodeModulesDir,
};
