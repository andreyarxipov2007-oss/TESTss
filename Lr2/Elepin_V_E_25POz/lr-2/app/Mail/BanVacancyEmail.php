<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BanVacancyEmail extends Mailable
{
    use Queueable, SerializesModels;


    public $position;
    public $ban;
    /**
     * Create a new message instance.
     */
    public function __construct($position, $ban)
    {
        $this->position = $position;
        $this->ban = $ban;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        if($this->ban == 1){
            return new Envelope(
                subject: 'Вакансия заблокирована',
            );
        } else{
            return new Envelope(
                subject: 'Вакансия разблокирована',
            );
        }
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'email.ban-vacancy',
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
}
