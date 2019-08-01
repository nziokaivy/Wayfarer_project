import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.json());

app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to Wayfarer API.'}));

app.use('/api/v1', routes);

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}....`);
});
export default app;