<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewRequestEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $lec_req;
    public $url;

    /**
     * Create a new message instance.
     */
    public function __construct($lec_req)
    {
        $this->lec_req = $lec_req;
        $this->url = url('/requests/getLecRequest');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Request from Lecturer',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.new-request-email',
            with: ['lec_req' => $this->lec_req],
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
        return $this->view('emails.new-request-email')
                    ->subject('New Request from Lecturer')
                    ->with([
                        'lec_req' => $this->lec_req,
                        'url' => $this->url
                    ]);
    }

}
