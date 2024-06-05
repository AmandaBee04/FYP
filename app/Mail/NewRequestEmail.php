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
        $this->url = url('/requests/' . $this->lec_req->id);
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
    

        // $url = url('/requests/' . $this->lec_req->id);

        // $message = "A new request has been sent by the lecturer:\n\n";
        // $message .= "Lecturer ID: " . $this->lec_req->lec_id . "\n";
        // $message .= "Subject: " . $this->lec_req->subject . "\n";
        // $message .= "Message: " . $this->lec_req->message . "\n\n";
        // $message .= "Click the following link to view the request:\n";
        // $message .= $url;
                
        // return $this->from('admin@example.com')
        //     ->subject('New Request')
        //     ->text($message);
    }

}
