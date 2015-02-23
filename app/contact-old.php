<?php

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $leads = strip_tags(trim($_POST["leads"]));
    				$name = str_replace(array("\r","\n"),array(" "," "),$leads);
            $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
            $phone = trim($_POST["phone"]);

            if ( empty($leads) OR empty($phone) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo "Oops. There was a problem with your submission.\n Please complete the form and try again.";
                exit;
            }

            $recipient = "jamesbarracca@yahoo.com";

            $subject = "New Leads Til Sold Out request!";

            $email_content = "Number of Leads: $leads\n";
            $email_content .= "Email: $email\n";
            $email_content .= "Phone: $phone\n";

            $email_headers = "From: $email <$email>";

            if (mail($recipient, $subject, $email_content, $email_headers)) {
                echo "Thank you! We'll be in touch soon!";
            } else {
                echo "Oops! Something went wrong and we couldn't send your message.";
            }

        } else {
            echo "There was a problem with your submission, please try again.";
        }

?>
