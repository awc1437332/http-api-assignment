const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

// Respond Function
const respond = (request, response, content, status, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// HTML responses
const getIndex = (request, response) => {
  respond(request, response, index, 200, 'text/html');
};

const getStyle = (request, response) => {
  respond(request, response, style, 200, 'text/css');
};

// Request Responses
// 200
const success = (request, response) => {
  // Check to see if we are returning xml
  if (request.headers.accept === 'text/xml') {
    const responseXml = '<response><message>This is a successful response</message></response>';
    respond(request, response, responseXml, 200, request.headers.accept);
  } else if (request.headers.accept === 'application/json' || request.headers.accept === undefined) {
    const responseJSON = {
      message: 'This is a successful response',
    };
    respond(request, response, JSON.stringify(responseJSON), 200, request.headers.accept);
  } else {
    request.headers.accept = 'application/json';
    const responseJSON = {
      message: 'This is a successful response',
    };
    respond(request, response, JSON.stringify(responseJSON), 200, request.headers.accept);
  }
};

// 400
const badRequest = (request, response, params) => {
  // Check to see if we are returning xml
  if (!params.valid) {
    if (request.headers.accept === 'text/xml') {
      const responseXml = '<response><message>Missing valid query parameter set to true.</message><id>badRequest</id></response>';
      respond(request, response, responseXml, 400, request.headers.accept);
    } else if (request.headers.accept === 'application/json' || request.headers.accept === undefined) {
      const responseJSON = {
        message: 'Missing valid query parameter set to true.',
        id: 'badRequest',

      };
      respond(request, response, JSON.stringify(responseJSON), 400, request.headers.accept);
    } else {
      request.headers.accept = 'application/json';
      const responseJSON = {
        message: 'Missing valid query parameter set to true.',
        id: 'badRequest',

      };
      respond(request, response, JSON.stringify(responseJSON), 400, request.headers.accept);
    }
  } else {
    request.headers.accept = 'application/json';
    const responseJSON = {
      message: 'The request has the required parameters',
    };
    respond(request, response, JSON.stringify(responseJSON), 200, request.headers.accept);
  }
};

// 401
const unauthorized = (request, response, params) => {
  // Check to see if we are returning xml
  if (params.loggedIn !== 'yes') {
    if (request.headers.accept === 'text/xml') {
      const responseXml = '<response><message>Missing loggedIn query parameter set to yes.</message><id>unauthorized</id></response>';
      respond(request, response, responseXml, 401, request.headers.accept);
    } else if (request.headers.accept === 'application/json' || request.headers.accept === undefined) {
      const responseJSON = {
        message: 'Missing loggedIn query parameter set to yes.',
        id: 'unauthorized',
      };
      respond(request, response, JSON.stringify(responseJSON), 401, request.headers.accept);
    } else {
      request.headers.accept = 'application/json';
      const responseJSON = {
        message: 'Missing loggedIn query parameter set to yes.',
        id: 'unauthorized',
      };
      respond(request, response, JSON.stringify(responseJSON), 401, request.headers.accept);
    }
  } else {
    request.headers.accept = 'application/json';
    const responseJSON = {
      message: 'You have successfully viewed the content',
    };
    respond(request, response, JSON.stringify(responseJSON), 200, request.headers.accept);
  }
};

// 403
const forbidden = (request, response) => {
  // Check to see if we are returning xml
  if (request.headers.accept === 'text/xml') {
    const responseXml = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';
    respond(request, response, responseXml, 403, request.headers.accept);
  } else if (request.headers.accept === 'application/json' || request.headers.accept === undefined) {
    const responseJSON = {
      message: 'You do not have access to this content.',
      id: 'forbidden',
    };
    respond(request, response, JSON.stringify(responseJSON), 403, request.headers.accept);
  } else {
    request.headers.accept = 'application/json';
    const responseJSON = {
      message: 'You do not have access to this content.',
      id: 'forbidden',
    };
    respond(request, response, JSON.stringify(responseJSON), 403, request.headers.accept);
  }
};

// 500
const internalerror = (request, response) => {
  // Check to see if we are returning xml
  if (request.headers.accept === 'text/xml') {
    const responseXml = '<response><message>Internal Server Error. Something went wrong.</message><id>internalerror</id></response>';
    respond(request, response, responseXml, 500, request.headers.accept);
  } else if (request.headers.accept === 'application/json' || request.headers.accept === undefined) {
    const responseJSON = {
      message: 'Internal Server Error. Something went wrong.',
      id: 'internalerror',
    };
    respond(request, response, JSON.stringify(responseJSON), 500, request.headers.accept);
  } else {
    request.headers.accept = 'application/json';
    const responseJSON = {
      message: 'Internal Server Error. Something went wrong.',
      id: 'internalerror',
    };
    respond(request, response, JSON.stringify(responseJSON), 500, request.headers.accept);
  }
};

// 501
const notImplemented = (request, response) => {
  // Check to see if we are returning xml
  if (request.headers.accept === 'text/xml') {
    const responseXml = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';
    respond(request, response, responseXml, 501, request.headers.accept);
  } else if (request.headers.accept === 'application/json' || request.headers.accept === undefined) {
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
      id: 'notImplemented',
    };
    respond(request, response, JSON.stringify(responseJSON), 501, request.headers.accept);
  } else {
    request.headers.accept = 'application/json';
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
      id: 'notImplemented',
    };
    respond(request, response, JSON.stringify(responseJSON), 501, request.headers.accept);
  }
};

// 404
const notFound = (request, response) => {
  // Check to see if we are returning xml
  if (request.headers.accept === 'text/xml') {
    const responseXml = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
    respond(request, response, responseXml, 404, request.headers.accept);
  } else if (request.headers.accept === 'application/json' || request.headers.accept === undefined) {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
    respond(request, response, JSON.stringify(responseJSON), 404, request.headers.accept);
  } else {
    request.headers.accept = 'application/json';
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
    respond(request, response, JSON.stringify(responseJSON), 404, request.headers.accept);
  }
};

module.exports = {
  getIndex,
  getStyle,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalerror,
  notImplemented,
  notFound,
};
