<?php

  $username = $_POST["username"];
  $password = $_POST["password"];
  $password2 = $_POST["password2"];

  $mysqli = new mysqli("mysql.eecs.ku.edu", "gkschnett", "Lae4tai9", "gkschnett");
  $userFound = false;
  $passwordsMatch = true;

  /* check connection */
  if ($mysqli->connect_error)
  {
      printf("Connect failed: %s\n", $mysqli->connect_error);
      exit();
    }


    if ($username == ""|| $password == "" || $password2 == "")
    {
      echo "<script> alert('Error: both username and password fields must be filled out to create account'); window.history.go(-1);</script>";
	//echo "both username and password fields must be filled out to create account'";
    }
    else if($password != $password2 ){
	echo "<script> alert('Error: Passwords do not match!'); window.history.go(-1);</script>";
        $passwordsMatch = false;
    }else
    {

      $query = "SELECT username FROM AccountInfo WHERE username='" . $username . "'";
      if ($result = $mysqli->query($query))
      {
      /* fetch associative array */
      if($row = $result->fetch_assoc())
      {
        $userFound = true;
        echo "<script> alert('Error: Username already exists'); window.history.go(-1);</script>";
	//echo "Username already exists";
      }
      /* free result set */
      $result->free();
    }

  }



  if($userFound == false && $username != "" && $password != "" && $passwordsMatch == true){

    $query = "INSERT INTO AccountInfo (username, password) VALUES ('" . $username ."', '" . $password . "');";
    if ($result = $mysqli->query($query))
    {
      
    }
	
	
	
	
    echo "<script> alert('Your account was created successfully! Now login to enjoy the arcade!');window.location.replace('../index.html')</script>";
  	//echo "Your account was created successfully!";
  }

    /* close connection */
    $mysqli->close();

?>
