import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './api-docs/swagger.json';

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', routes);

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}....`);
});
export default app;