const app = require('../backend/server');

module.exports = async (req, res) => {
  try {
    await app.initializeApp();
    return app(req, res);
  } catch (error) {
    console.error('Serverless function failed:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: false,
        message: 'Internal server error',
      })
    );
  }
};
