<?php

  $username = $_POST["username"];
  $password = $_POST["password"];

  $mysqli = new mysqli("mysql.eecs.ku.edu", "gkschnett", "Lae4tai9", "gkschnett");
  $userFound = false;

  /* check connection */
  if ($mysqli->connect_error)
  {
      printf("Connect failed: %s\n", $mysqli->connect_error);
      exit();
    }


    if ($username == ""||$password == "")
    {
      echo "<script> alert('Error: both username and password fields must be filled out to create account'); window.history.go(-1);";
    }
    else
    {

      $query = "SELECT username FROM AccountInfo WHERE username='" . $username . "'";
      if ($result = $mysqli->query($query))
      {
      /* fetch associative array */
      if($row = $result->fetch_assoc())
      {
        $userFound = true;
        echo "<script> alert('Error: Username already exists'); window.history.go(-1);</script>";

      }
      /* free result set */
      $result->free();
    }

  }



  if($userFound == false && $username != ""){

    $query = "INSERT INTO AccountInfo (username) VALUES ('" . $username . "')";
    if ($result = $mysqli->query($query))
    {
      $query = "INSERT INTO AccountInfo (password) VALUES ('" . $password . "')";
      if ($result = $mysqli->query($query))
      {

      }
    }
    echo "<script> alert('Your account was created successfully! Now login to enjoy the arcade!');window.location.replace('https://people.eecs.ku.edu/~a035d579/eecs-448-project3and4/index.html')</script>";
  }

    /* close connection */
    $mysqli->close();

?>
