const nodemailer = require("nodemailer");

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
  const isOrderComplete = options.emailType === "orderComplete";
  const subject = isOrderComplete
    ? "Your Order is Complete - A.R Landscape"
    : "Order Confirmation - A.R Landscape";
  const headerTitle = isOrderComplete
    ? "Your Order is Complete!"
    : "Order Confirmation";
  const message = isOrderComplete
    ? `<p>We’re happy to inform you that your order has been successfully delivered.</p>
       <p>We’d love to hear your thoughts! Click the review links below to share your feedback.</p>`
    : `<p>This email confirms your recent order with A.R. Landscape.</p>`;

  const orderItemsHTML = options.orderItems
    .map(
      (item) => `
      <li key=${item._id}>
        <strong>${item.title}</strong> - Quantity: ${
        item.quantity
      }, Price: Rs. ${(item.price * item.quantity).toFixed(2)}  
        ${
          isOrderComplete
            ? `<br><a href="${process.env.CLIENT_URL}/product/${item?.slug}" style="color: #14532d; text-decoration: none;">Leave a Review</a>`
            : ""
        }
      </li>`
    )
    .join("");

  const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
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
                <h3>A.R Landscape</h3>
            </div>
            <div class="content">
                <h2>${headerTitle}</h2>
                <p>Dear ${options.username},</p>
                ${message}
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
                <p>If you have any questions or need assistance, please don't hesitate to contact us at 
                  <a href="mailto:info.plant.nursry@gmail.com" style="color: #14532d; text-decoration: none;">
                    info.plant.nursry@gmail.com
                  </a>
                </p>
                <p>Sincerely,</p>
                <p>The A.R. Landscape Team</p>
            </div>
            <div class="footer">
                <p>©  ${new Date().getFullYear()} A.R. Landscape. All Rights Reserved</p>
            </div>
        </div>
    </body>
    </html>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: subject,
    text: isOrderComplete
      ? "Your order has been delivered! Don't forget to leave a review."
      : "Thank you for your order!",
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
