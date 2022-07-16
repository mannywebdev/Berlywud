const jwt = require("jsonwebtoken");
const config = require("./config");
const mg = require("mailgun.js");

module.exports = {
  generateToken: (user) => {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      `${config.JWT_KEY}`
    );
  },

  restAuth: (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(token, `${config.JWT_KEY}`, (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).send({ message: "No Token" });
    }
  },

  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: "Invalid Admin Token" });
    }
  },

  mailgun: () =>
    mg({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    }),

  payOrderEmailMessage: (order) => {
    return `<div>
        <h3 style="color:blue;"}>Berlywud</h3>
        <h4>ORDER CONFIRMATION</h4>
        <p>Thank you for your order!</p>
        <p>We've recieved you order and will contact you as soon as your package is shipped. You can find your purchase information below.</p>
  
        <h3>Order Items</h3>
        <div>
        ${order.orderItems.map(
          (item) => `
                <div className="cardinner">
                    <div className="cardleft">
                        <div className="cardleft__img">
                            ${
                              item.size === "Retail"
                            } && <img src={item.url[0]} alt=""/>
                            ${
                              item.size === "30ml"
                            } && <img src={item.url[1]} alt=""/>
                            ${
                              item.size === "10ml"
                            } && <img src={item.url[2]} alt=""/>
                            ${
                              item.size === "5ml"
                            } && <img src={item.url[3]} alt=""/>
                        </div>
                        <div className="cardleft__info">
                            <p>${item.brand}</p>
                            <p>${item.title}</p>
                            <span>Qty: ${item.qty} </span>
                            <span>Price: ${item.price}</span>
                            <span>${item.size}</span>
                        </div>
                    </div>
                    <span className="cardright">Total Rs.${
                      item.qty * item.price
                    }</span>
                </div>`
        )}
        </div>
      </div>`;
  },

  sendResetPasswordEmail: (code) => {
    return `<div>
        <p>Code for Reset Password ${code}</p>
      </div>`;
  },
};
