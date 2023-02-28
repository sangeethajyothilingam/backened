import jwt from "jsonwebtoken";

function Authenticate(request, response, next) {
  try {
    console.log(request.headers);
    const token = request.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    response.status(401).send({ message: error.message });
  }
}

export { Authenticate };
