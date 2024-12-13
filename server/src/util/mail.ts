import nodemailer from "nodemailer";

export const sendEmail = async (
  receiverEmail: string,
  userDetails: any,
  eventDetails: any,
  qrCode: string,
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "anujgill212@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  });
  const baseUrl = process.env.FRONTEND_URL; // Define your base URL in .env
  const detailsUrl = `${baseUrl}/event/info?eventName=${eventDetails.eventName}`;

  // Convert base64 URL to base64 string if needed
  const base64Data = qrCode.includes("base64,")
    ? qrCode.split("base64,")[1]
    : qrCode;

  try {
    const info = await transporter.sendMail({
      from: "anujgill212@gmail.com",
      to: receiverEmail,
      subject: "Event Registration Confirmation ✔",
      html: `
           <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Registration Confirmation</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #181a20; /* Matching your website's background color */
            color: #ffffff;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #242633; /* Dark section background */
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
        }
        .header {
            background-color: #3b3f58; /* Header color matching website */
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            color: #ffffff;
            font-size: 26px;
            margin: 0;
        }
        .header p {
            font-size: 14px;
            color: #dddddd;
            margin-top: 8px;
        }
        .content {
            padding: 20px 30px;
        }
        .content h2 {
            color: #e6e6e6;
            font-size: 20px;
            margin-bottom: 15px;
        }
        .content p {
            color: #cccccc;
            font-size: 16px;
            margin: 10px 0;
        }
        .qr-container {
            text-align: center;
            background-color: #3b3f58; /* QR code section background color */
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .qr-container img {
            border: 2px solid #ffffff;
            border-radius: 8px;
        }
        .qr-container p {
            margin-top: 10px;
            font-size: 14px;
            color: #bbbbbb;
        }
        .footer {
            background-color: #3b3f58; /* Footer background color */
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #888888;
        }
        .footer p {
            margin: 5px 0;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #6c63ff; /* Purple button */
            text-decoration: none;
            border-radius: 5px;
            font-size: 14px;
            margin-top: 15px;
        }
        .button:hover {
            background-color: #4b47cc;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>Welcome to the Event!</h1>
            <p>We're excited to have you join us!</p>
        </div>

        <!-- Content -->
        <div class="content">
            <h2>Event Details</h2>
            <p><b>Name:</b> ${eventDetails.eventName}</p>
            <p><b>Date:</b> ${eventDetails.dateTime.toISOString().split("T")[0]}</p>
            <p><b>Time:</b> ${eventDetails.dateTime.toISOString().split("T")[1]}</p>
            <p><b>Venue:</b> ${eventDetails.venue}</p>
            <p>We look forward to seeing you there! Please ensure you bring this QR code with you for entry.</p>

            <!-- QR Code -->
            <div class="qr-container">
                <p>Your Entry QR Code:</p>
                <img src="cid:unique-qr" alt="QR Code" style="width:200px; height:200px;">
                <p>Scan this code at the event entrance for quick check-in.</p>
            </div>

            <!-- Button -->
            <p style="text-align: center;">
                <a href="${detailsUrl}" class="button">View Event Details</a>
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Need help? Contact us at <a href="mailto:eventspro03@gmail.com" style="color: #cccccc;">eventspro03@gmail.com</a></p>
            <p>© 2024 EventsPRO. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
      `,
      attachments: [
        {
          filename: "qr.png",
          content: Buffer.from(base64Data, "base64"),
          cid: "unique-qr",
        },
      ],
    });
    return info;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const sendVerificationEmail = async (
  receiverEmail: string,
  verificationToken: string,
) => {
  const baseUrl = process.env.FRONTEND_URL; // Define your base URL in .env
  const verifyUrl = `${baseUrl}/verify/account?token=${verificationToken}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "anujgill212@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"EventsPRO" <anujgill212@gmail.com>',
      to: receiverEmail,
      subject: "Account Verification Email",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Account</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .email-header {
              text-align: center;
              color: #4CAF50;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .email-content {
              font-size: 16px;
              color: #333333;
              line-height: 1.6;
            }
            .verify-button {
              display: block;
              width: fit-content;
              margin: 20px auto;
              padding: 10px 20px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              font-weight: bold;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
            .verify-button:hover {
              background-color: #45a049;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #888888;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">Verify Your Account</div>
            <div class="email-content">
              <p>Hello,</p>
              <p>
                Thank you for signing up! Please verify your account by clicking the button below:
              </p>
              <a href="${verifyUrl}" class="verify-button">Verify Account</a>
              <p>
                If you didn’t create this account, you can safely ignore this email.
              </p>
            </div>
            <div class="footer">

            <p>Need help? Contact us at <a href="mailto:eventspro03@gmail.com" style="color: #cccccc;">eventspro03@gmail.com</a></p>
            <p>© 2024 EventsPRO. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    return info;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
