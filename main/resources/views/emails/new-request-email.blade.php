<!DOCTYPE html>
<html>
<head>
    <title>New Request</title>
    <style>
        
        .container {
            display: flex;
            flex-direction: column;
            padding: 0 10%;
        }

        .Subject {
            font-weight: bold;
            color: #007bff;
            font-size: 35px;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 20px;
            color: #fff;
            background-color: #007bff;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            font-weight: bold;
        }

        .button-container {
            text-align: center;
            margin-top: 20px;
        }

        .logo {
            display: flex;
            color: #fa955b;
            align-items: center;
            font-size: 40px;
        }

        p {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 20px;
        }

        .note {
            font-size: 15px;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode';
        }
    </style>
</head>
<body>
    <div class="container">
        <h2 class="logo">Quiztopia</h2>
        <span class="Subject">New Request........</span>
        <p>Dear Admin,</p>
        <p>We are pleased to inform you that a new request has been submitted by one of our lecturers. Below are the details of the request for your review and action:</p>

        <p><strong>Lecturer ID:</strong> {{ $lec_req->lec_id }}</p>
        <p><strong>Subject:</strong> {{ $lec_req->subject }}</p>
        <p><strong>Message:</strong> {{ $lec_req->message }}</p>

        <p>Please review the request at your earliest convenience by clicking the button below:</p>

        <div class="button-container">
            <a href="{{ $url }}" class="button">View Request</a>
        </div>

    </div>
</body>
</html>
