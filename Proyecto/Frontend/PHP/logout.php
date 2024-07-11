<?php
    session_start();
    session_destroy();

    header("Location: /Proyecto/index.html");
?>