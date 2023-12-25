const express = require('express');
const router = express.Router();
const {UserController} = require('../ctrlers/user.c');
const {CategoryController} = require('../ctrlers/product.c');

function isAuthenticated(req, res, next) {
    if (req.session && req.session.isAuthenticated) {
        return next();
    } else {
        res.redirect('/login');
    }
}

router.get('/', isAuthenticated, async (req, res) => {
    const result = await CategoryController.getAllProducts();
    res.render('products', {
        layout: 'main',
        result: result
    });
});

router.get('/chat', isAuthenticated, async (req, res) => {
    const result = await CategoryController.getAllProducts();
    res.render('products', {
        layout: 'main',
        result: result
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        layout: 'index'
    });
});

router.post('/login', async (req, res) => {
    const user = await UserController.login(req, res);

    if (user) {
        req.session.isAuthenticated = true;
        req.session.user = user;
        res.redirect('/chat');
    }   
    else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
    
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        layout: 'index'
    });
});

router.post('/signup', async (req, res) => {
    await UserController.signup(req, res);
    const Message = ' signed up';
    res.render('success', {
        layout: 'main', 
        Message
    });
    res.redirect('/login');
});

router.post('/add-category', async (req, res) => {
    try {
        const { CatName } = req.body;
        await CategoryController.insertCategory(CatName);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/remove-category', async (req, res) => {
    try {
        const { CatID } = req.body;
        await CategoryController.removeCategory(CatID);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/edit-category', async (req, res) => {
    try {
        const { CatID, CatName } = req.body;
        await CategoryController.editCategory(CatID, CatName);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const messages = [];

router.post('/send-message', (req, res) => {
  const { message } = req.body;
  messages.push({ text: message, timestamp: new Date() });
  console.log(messages);
  res.status(200).end();
});

router.get('/get-messages', (req, res) => {
  if (messages.length === 0) {
      setTimeout(() => {
          res.json([]);
      }, 1000);
  } else {
      const currentMessages = messages.splice(0, messages.length);
      res.json(currentMessages);
  }
});

module.exports = router;