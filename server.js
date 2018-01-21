const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
nunjucks.configure('views', { noCache: true });


const foos = [
  { id: 1, name: 'bar' },
  { id: 2, name: 'bazz' },
];

const app = express();
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use((req, res, next)=> {
  console.log(`you requested ${req.url}`);
  next();
});

app.get('/', (req, res)=> {
  res.render('index', { message: 'Welcome to Express' });
});


app.get('/foos', (req, res)=> {
  res.render('foos', { foos });
});

app.get('/foos/:id', (req, res)=> {
  console.log(req.params);
  const foo = foos.find((foo)=> {
    return foo.id === req.params.id*1;
  });
  res.render('foo', { foo });
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});
