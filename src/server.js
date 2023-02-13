const http = require('http');
const url = require('url');
const query = require('querystring');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const responseHandler = require('./responses.js');

// url struct object to direct all incoming request through
const urlStruct = {
  GET: {
    '/': responseHandler.getIndex,
    '/style.css': responseHandler.getStyle,
    '/success': responseHandler.success,
    '/badRequest': responseHandler.badRequest,
    '/unauthorized': responseHandler.unauthorized,
    '/forbidden': responseHandler.forbidden,
    '/internal': responseHandler.internal,
    '/notImplemented': responseHandler.notImplemented,
    notFound: responseHandler.notFound,
  },
};

// This method sends the user to different urls, depending on the request.
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if (urlStruct.GET[parsedUrl.pathname]) {
    urlStruct.GET[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.GET.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
