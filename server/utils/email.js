const nodemailer = require("nodemailer");
const customErrorHandler = require("./customError"); // Adjust the path as needed

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const orderItemsHTML = options.orderItems
    .map(
      (item, _) => `
      <li>${item.title} - Quantity: ${item.quantity}, Price: Rs. ${(
        item.price * item.quantity
      ).toFixed(2)}</li>
    `
    )
    .join("");

  const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - A.R. Landscape</title>
        <style>
            body {
                font-family: 'Times New Roman', sans-serif, Helvetica;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 20px;
            }
            .title {
                background-color:  #14532d;
                color: #ffffff;
                font-size: 24px;
                font-weight: 600;
                text-align: center;
                margin: 20px 0;
                padding: 5px 0;
            }
            .content {
                padding: 20px;
                text-align: left;
                line-height: 1.6;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #666666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="title">
                <h3>A.R. Landscape</h3>
            </div>
            <div class="content">
                <h2>Order Confirmation</h2>
                <p>Dear ${options.username},</p>
                <p>This email confirms your recent order with A.R. Landscape.</p>
                <h3>Order Summary:</h3>
                <h4><strong>Order Id:</strong> ${options._id}</h4>
                <ol>
                    ${orderItemsHTML}
                </ol>
                <p><strong>Shipping Cost:</strong> Rs. ${options.shippingCost.toFixed(
                  2
                )}</p>
                <p><strong>Total Price:</strong> Rs. ${(
                  options.totalPrice + options.shippingCost
                ).toFixed(2)}</p>
                <p>Thank you for choosing A.R. Landscape. We truly value your trust in our services and look forward to serving you again.</p>
                <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
                <p>Sincerely,</p>
                <p>The A.R. Landscape Team</p>
            </div>
            <div class="footer">
                <p>© Copyright 2024 A.R. Landscape. All Rights Reserved</p>
            </div>
        </div>
    </body>
    </html>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: "Order Confirmation - A.R. Landscape",
    text: "Thank you for your order!",
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
