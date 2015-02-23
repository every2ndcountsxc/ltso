<?php

        if ($_SERVER["REQUEST_METHOD"] == "POST") {

            $email = filter_var(trim($_POST["email-mailing-list"]), FILTER_SANITIZE_EMAIL);

            if ( !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo "Oops. There was a problem with your submission.\n Please complete the form and try again.";
                exit;
            }

            $recipient = "jamesbarracca@yahoo.com";

            $subject = "Someone wants to join the Leads Til Sold Out Mailing List!";


            $email_content = "Email: $email\n";

            $email_headers = "From: $email <$email>";

            if (mail($recipient, $subject, $email_content, $email_headers)) {
                echo "Thanks for joining the Leads Til Sold Out Mailing List!\n Stay tuned for more updates!";
            } else {
                echo "Oops! Something went wrong and we couldn't send your message.";
            }

        } else {
            echo "There was a problem with your submission, please try again.";
        }

?>
