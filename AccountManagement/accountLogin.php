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
      echo "Error: Username can not be empty";
    }
    else
    {

      $query = "SELECT * FROM AccountInfo WHERE username='$username' AND password='$password'";
      if ($result = $mysqli->query($query))
      {

        $row = $result->fetch_assoc();
        printf($row["user_id"]);
         if($row["user_id"] >= 0){
           echo "<script>window.location.replace('https://people.eecs.ku.edu/~a035d579/eecs-448-project3and4/homePage.html')";
        }
        else{
          echo "Username and password are incorrect.";
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