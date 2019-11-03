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


    if ($username == "")
    {
      echo "Error: Cannot create user with empty username";
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
        echo "Error: User " . $username . " already exists";

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
          echo "<script>window.location.replace('https://people.eecs.ku.edu/~a035d579/eecs-448-project3and4/AccountManagement/accountLogin.html')</script>";
      }
    }


  }

    /* close connection */
    $mysqli->close();

?>
