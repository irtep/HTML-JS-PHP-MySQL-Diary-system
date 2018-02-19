

<?php
    
    if (isset($_POST['toPHP'])) { // takes post that is named toPHP
            
        $correctAccount = "notFound"; // this vill be assigned when username/password find
        
         $toPHP = json_decode($_POST["toPHP"]); // decode to php
         $PHPinput1 = test_input($toPHP[0]);  // validate
         $PHPinput2 = test_input($toPHP[1]);  // validate
        
         $toCompare1; // compare to this to username
         $toCompare2; // compare to this to psw
        
        // Query the database for username and password
        
                $servername = "localhost";
                $username = "xxxxx";
                $password = "xxxxx";
                $dbname = "xxxxx";

                // Create connection
                $conn = new mysqli($servername, $username, $password, $dbname);
                // Check connection
                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }
                    
                $sql = "SELECT usernames, passwords FROM dataofusers1";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    // output data of each row
                    while($row = $result->fetch_assoc()) {
                       // echo "<br> un: ". $row["usernames"]. " - pas: ". $row["passwords"].  " <br>";  
                        $toCompare1 = $row["usernames"];
                        $toCompare2 = $row["passwords"];
                    }
                } else {
                    echo "0 results";
                }                    
                
                $conn->close();       
        
    //  if(password_verify($password, $hashed_password)) {
        if (password_verify($PHPinput1, $toCompare1) && password_verify($PHPinput2, $toCompare2)) {
            // If the password inputs matched the hashed password in the database
            // Do something, you know... log them in.
                $correctAccount = "Correct"; // assign to found account.    
                $toJS = json_encode($correctAccount); // encode for JS sent.
        }         
        

            else {
                
                $correctAccount = "notFound"; //not found
                $toJS = json_encode($correctAccount); // encode for JS sent.
                
            }
                      
      
            echo "$toJS";        // need to echo so it gets printed to page
 

   } // all if post has come as toPHP.
   
       function test_input($data) {  // tester of input
       
          $data = trim($data);   // Strip unnecessary characters (extra space, tab, newline)
          $data = stripslashes($data);  // strips backslashes
          $data = htmlspecialchars($data); // converts specials to htm-entites. dis. as messes decoder 
          return $data;  // returns this to sender.
        }
   
?>
