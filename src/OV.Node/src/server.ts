import 'dotenv/config';
import App from './app';
import ConfigRoute from './routes/ConfigRoute';
import IndexRoute from './routes/IndexRoute';

const app = new App([
    new IndexRoute(),
    new ConfigRoute(),
]);

app.listen();
