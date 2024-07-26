<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $resetLink;
    public $userName;

    /**
     * Create a new message instance.
     */
    public function __construct($resetLink, $userName)
    {
        $this->resetLink = $resetLink;
        $this->userName = $userName;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Password Reset Email',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.password-reset-email',
            with: ['resetLink' => $this->resetLink,
                    'userName' => $this->userName],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    public function build()
    {
        return $this->view('emails.password-reset-email') 
                    ->subject('Password Reset Request')
                    ->with([
                        'resetLink' => $this->resetLink,
                        'userName' => $this->userName
                    ]);
    }
}
