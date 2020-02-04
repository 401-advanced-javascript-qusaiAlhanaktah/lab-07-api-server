

const logRequest = require('./logger.js');
const experss = require('express');
const app = experss();



app.use(experss.json());
app.use(timestamp);
app.use(logRequest);

let dbProduct = [];
let dbCategory = [];
function timestamp (req,res,next){
  let requestTime = new Date();
  req.timeStamp = requestTime;
  next();
}
function hanlderError(err, req, res) {
  res.status(500);
  res.message = 'Server Error';
  res.json({ error: err });
}
function notFoundHandler(req, res) {
  res.status(404);
  res.message = 'Not FOUND!!';
  res.json({ error: 'Not FOUND!!' });
}
app.get('/error',hanlderError);
app.get('/real-error',()=>{
  throw new Error('SORY YOU HAVE AN ERROR!!');
});
app.get('/timeStamp',timestamp);
app.get('/products', (req, res) => {
  let productsOutput = {
    name: req.query.name,
    displayName: req.query.displayName,
    description: req.query.description,
  };
  res.status(200).json(productsOutput);
});
app.get('/categories',timestamp, (req, res) => {
  let categoriesOutput = {
    name: req.query.name,
    displayName: req.query.displayName,
    description: req.query.description,
  };
  res.status(200).json(categoriesOutput);
});
app.get('/api/v1/categories/:id',timestamp, (req, res) => {
  let id = req.params.id;
  let record = dbCategory.filter((record)=>record.id === parseInt(id));
  res.json(record);
  let categoriesOutput = {
    name: req.query.name,
    description: req.query.description,
  };
  res.status(200).json(categoriesOutput);
});
app.get('/api/v1/products/:id', (req, res) => {
  let id = req.params.id;
  let record = dbProduct.filter((record)=>record.id === parseInt(id));
  res.json(record);
});
app.get('/api/v1/categories', timestamp,(req, res) => {
  let countCatg = dbCategory.length;
  let resultsCatg = dbCategory;
  res.json({ countCatg, resultsCatg });
});
app.get('/api/v1/products', timestamp,(req, res) => {
  let countProd = dbProduct.length;
  let resultsProd = dbProduct;
  res.json({ countProd, resultsProd });
});

app.post('/api/v1/products',timestamp, (req, res) => {
  let { name } = req.body;
  let record = { name };
  record.id = dbProduct.length + 1;
  dbProduct.push(record);
  res.status(201).json(record);
});
app.post('/api/v1/categories',timestamp, (req, res) => {
  let { name } = req.body;
  let record = { name };
  record.id = dbCategory.length + 1;
  dbCategory.push(record);
  res.status(201).json(record);
});
app.put('/api/v1/categories/:id',timestamp,(req,res)=>{
  let idUpdated = req.params.id;
  let {name, id} = req.body;
  let updatedRecord = {name, id};
  dbCategory = dbCategory.map((record)=>(record.id === parseInt(idUpdated) ? updatedRecord : record));
  res.json(updatedRecord);
});
app.put('/api/v1/products/:id',timestamp,(req,res)=>{
  let idUpdated = req.params.id;
  let {name, id} = req.body;
  let updatedRecordProd = {name, id};
  dbProduct = dbProduct.map((record)=>(record.id === parseInt(idUpdated) ? updatedRecordProd : record));
  res.json(updatedRecordProd);
});
app.delete('/api/v1/categories/:id',timestamp,(req,res)=>{
  let id = req.params.id;
  dbCategory = dbCategory.filter((record)=>record.id !== parseInt(id));
  res.json({msg:'item deleted'});
});
app.delete('/api/v1/products/:id',timestamp,(req,res)=>{
  let id = req.params.id;
  dbProduct = dbProduct.filter((record)=>record.id !== parseInt(id));
  res.json({msgProd:'item deleted'});
});
app.get('*',notFoundHandler);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listerning on ${PORT}`));
  },
};