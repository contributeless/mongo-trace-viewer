import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/IndexRoute';

const app = new App([new IndexRoute()]);

app.listen();
