<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        body {
            background-color: #ffffffb5;
            font-family: Arial, sans-serif;
            overflow-y: scroll;
            overflow-x: hidden;
            white-space: nowrap; 
            height: 100vh;
        }
        .container {
            background-color: white;
            border-radius: 2px;
            padding: 20px;
            width: 50%;
            margin: 0 auto;
            border: 1px solid #ccc; /* Fallback for box-shadow */
            box-shadow: 2px 2px 4px 1px black;
        }
        .Quiz-Logo {
            color: coral;
            font-size: 2rem;
            font-weight: bold;
            font-family: Raleway, Arial, sans-serif;
            text-align: center;
            padding-bottom: 20px;
        }
        p {
            color: grey;
        }
        .Reset-btn {
            background-color: #091410;
            color: white;
            font-size: 0.6rem;
            border-radius: 4px;
            padding: 10px 20px;
            text-align: center;
            display: inline-block;
            text-decoration: none;
        }
        .Reset-btn:hover {
            background-color: coral;
            color: black;
            transition: ease-in 0.2s;
        }
        .Regards {
            padding-top: 10px;
        }
        .copyright {
            color: rgb(151, 149, 149);
            font-size: 0.7rem;
            text-align: center;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <table align="center" width="100%" cellpadding="0" cellspacing="0" margin="auto" box-shadow="0 0 11px #090909">
        <tr>
            <td>
                <div class="Quiz-Logo">Quiztopia</div>
            </td>
        </tr>
        <tr>
            <td>
                <table align="center" width="60%" cellpadding="0" cellspacing="0" class="container">
                    <tr>
                        <td>
                            <h2 style="text-align: center;">Password Reset Successfully</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><b>Hello, {{ $userName }}</b></p>
                            <p>Your password has been successfully reset. Please proceed to login with your new credentials.</p>
                            <p>If you did not perform this action, please contact our support team through <i><u>quiztopia@gmail.com.</u></i> </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="Regards">
                            <span>Regards,</span><br>
                            <span>Quiztopia</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <hr>
                        </td>
                    </tr>
                    <tr>
                        <td class="copyright">
                            <sup>&copy; 2024 QUIZTOPIA. All Rights Reserved.</sup>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
