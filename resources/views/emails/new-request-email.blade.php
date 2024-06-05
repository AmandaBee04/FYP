<!DOCTYPE html>
<html>
<head>
    <title>New Request</title>
    <style>
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <p>A new request has been sent by the lecturer</p>

    <p>Lecturer ID: {{ $lec_req->lec_id }}</p>
    <p>Subject: {{ $lec_req->subject }}</p>
    <p>Message: {{ $lec_req->message }}</p>

    <p>
        <a href="{{ $url }}" class="button">View Request</a>
    </p>
</body>
</html>