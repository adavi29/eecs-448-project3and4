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
      echo "<script>alert('Error: Username and password can not be empty.');window.history.go(-1);";
    }
    else
    {
      
      $query = "SELECT * FROM AccountInfo WHERE username='$username'";
       if ($result = $mysqli->query($query))
       {
      
         $row = $result->fetch_assoc();
         //printf($row["user_id"]);
         if(password_verify($password, $row["password"])){
            echo "<script> window.location.replace('homePage.html');</script>";
	    
         }
         else{
             echo "<script>alert('Username or password is incorrect.');window.history.go(-1);</script>";
	     
         }
      
       }



    }




  // if($userFound == false && $username != ""){
  //
  //   $query = "INSERT INTO AccountInfo (username) VALUES ('" . $username . "')";
  //   if ($result = $mysqli->query($query))
  //   {
  //       echo "New user " . $username . " created successfully.";
  //       echo "<br>";
  //   }
  //
  //
  //   $query = "INSERT INTO AccountInfo (password) VALUES ('" . $password . "')";
  //   if ($result = $mysqli->query($query))
  //   {
  //       echo "New password created successfully.";
  //   }
  //
  // }

    /* close connection */
    $mysqli->close();

?>
