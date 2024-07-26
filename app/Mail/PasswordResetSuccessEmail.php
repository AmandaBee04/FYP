<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetSuccessEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $userName;

    /**
     * Create a new message instance.
     */
    public function __construct($userName)
    {
        $this->userName = $userName;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->view('emails.password-reset-success')
                    ->subject('Password Reset Successful')
                    ->with(['userName' => $this->userName]);
    }
}
