<?php
    
    if (isset($_POST['toPHP'])) { // takes post that is named toPHP
                                 // create and show table
        
        $dataToPHP = json_decode($_POST["toPHP"]); // decode to php
        $PHPinput = test_input($dataToPHP);  // validate
        
            switch ($PHPinput) {

                case 'showActives': // show table

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
                    
                $sql = "SELECT ID, dateAdded, usermessage FROM diario3";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    // output data of each row
                    while($row = $result->fetch_assoc()) {
                        echo "<br><br> ID: ". $row["ID"]. " - Date: ". $row["dateAdded"]. " <br><br>". $row["usermessage"]. " <br><br>";  
                     //   echo "<br> id: ". $row["id"]. " - Name: ". $row["name"]. " -Value " . $row["value"] . " Quantity: ". $row["quantity"]." <br>";
                    }
                } else {
                    echo "0 results";
                }                    
                
                $conn->close();     
                    
                break;                    
                    

            } // of switch 


    }
   
    else if (isset($_POST['newNote'])) { // takes post that is named addProduct
   
         $toPHP = json_decode($_POST["newNote"]); // decode to php
         $PHPinput1 = test_input($toPHP[0]);  // validate
         $PHPinput2 = test_input($toPHP[1]);  // validate
        
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

                $sql = "INSERT INTO diario3 (dateAdded, usermessage)
                VALUES ('$PHPinput1', '$PHPinput2')";

                if ($conn->query($sql) === TRUE) {
                    echo "New record created successfully";
                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }                    
                    
                $conn->close();     
   
   
   } // if addProduct

       function test_input($data) {  // tester of input
       
          $data = trim($data);   // Strip unnecessary characters (extra space, tab, newline)
          $data = stripslashes($data);  // strips backslashes
          $data = htmlspecialchars($data); // converts specials to htm-entites //disabled for now as messes Decode
          return $data;  // returns this to sender.
        }
   
   
?>
