import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './api-docs/swagger.json';
import tokenCreated from './middleware/authorization';
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.json());

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', '*');
   if (req.method === 'OPTIONS') {
     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH DELETE, GET');
     res.status(200).json({});
   }
   next();
 });
app.get('/fetchToken',(req,res) => {
   const token = tokenCreated.createToken({
      id: 3,
      email: 'testtoken@gmail.com',
      first_name: 'Test',
      last_name: 'Token',
      password: 'pass@321',
      is_admin: true,
   });
   res.send ({ token });
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', routes);

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}....`);
});
export default app;