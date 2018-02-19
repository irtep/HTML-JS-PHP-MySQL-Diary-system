   var logCounter = 3; // three tries per load.
   var selectedDate; // to save selected date. 

    function allNotes() {

              $.ajax({  // to get all notes and to add them to site.
                  type: "POST",
                  url: "php/diario.php",
                  data: {"toPHP" : JSON.stringify("showActives")},
                  success: (data) => {

                  $('#feedback').html(data);
                  var backFromPHP = data;
                  //console.log("back from php:",backFromPHP); 
                  // Do something with data that came back. 
                  document.getElementById("allTheNotes").innerHTML = backFromPHP;
                  }
          
              }); // ajax            
        
        
    }

    function daySetter() {
        
        var d = new Date(); // declare date.
        var dayNow = d.getDay(); // gets weekday 0-6
        var whatDate = d.getDate(); // gets date 1-31
        var monthNow = d.getMonth(); // gets month 0-11
        var showToday; // show today
        var whatDay = ""; // this will get value below
        var whatMonth = monthNow+1; //need to put +1 as getDate gives 0-11
        var whatYear = d.getFullYear(); // year
        var nextMonth = whatMonth + 1;  // next one
        
                if (monthNow === 11) {
              
                    nextMonth = 1;
                
                }         
        
        var nextNextMonth;  // after that
        var nextYear = whatYear + 1; // next year
        var assDate; // These three to be assigned to bigger calendar picture
        var assMonth; //
        var maxDate; //
        var nextMaxDate;
        var assYear;
        
        var compare1; // these will get values that will be compared to notes
        var compare2;
        var compare3;
        var toCompare1;
        var toCompare2;
        var toCompare3;
       
        switch (dayNow) {
            
            case 0:
                
                whatDay = "Sunday";
                
                break;
                
            case 1:
                
                whatDay = "Monday";
                
                break;
                
            case 2:
                
                whatDay = "Tuesday";
                
                break;
                
            case 3:
                
                whatDay = "Wednesday";
                
                break;
                
            case 4:
                
                whatDay = "Thursday";
                
                break;
                
            case 5:
                
                whatDay = "Friday";
                
                break;
                
            case 6:
                
                whatDay = "Saturday";
                
                break;
                                
                
            default: console.log("not found!"); 
                
                } // switch for dayNow
        
        showToday = whatDay + ". " + whatDate + ". " + whatMonth + ". " + whatYear;
        
        document.getElementById("todayIs").innerHTML = showToday; // show today in todayIs place
           
        } // day setter ---------------------------------------------   Day setter.
    
    function buttonX(butID, butVal) {   // ---------------------------------------------- buttonX 
        
        console.info("buttonX fired, butID/value:",butID,butVal);
        
        switch (butID) {
        
          case "submit": // if button is submit button
                          // at login phaze
              console.log("validation fired.");

            	// add vars for password and username:
            	var usari = document.getElementById("username");
            	var passu = document.getElementById("password");
            	var username = usari.value;
            	var password = passu.value
            	
                // changed slightly as added stuff to php  
                var usePa = [username, password];                
                //	
            	console.log("ajax request->");
                            
                $.ajax({  
                    type: "POST",
                    url: "php/userit.php",
                    data: {"toPHP" : JSON.stringify(usePa)},
                    success: function(data) {
            
                    $('#feedback').html(data);
                    //var backFromPHP = JSON.parse(data);
                    let backFromPHP = data;
                    console.log("back from php:",data);
                    let parsed = JSON.parse(backFromPHP);
                        if (parsed === "Correct")  { 
                            
                          $("#centerPage").fadeIn("slow"); console.log("päiväkirja esiin");                            
                          $("#loginit").hide(); console.log("loginit pois");
                          daySetter(); // set day
                          allNotes(); // show notes
                      
                        } // if correct.
                        
                        else {
                            logCounter--; // one try less
                            
                            if (logCounter === 0) {
                                
                                $("#loginit").hide(); console.log("loginit pois");
                                
                            } // if log counter is zero
                            
                            else {
                                
                              console.log("not correct");  
                                
                            } // if tries left.
                            
                        } // fail
            
                    } // success
            
                });  // ajax  
            
            break;
            
            case "addNote":

              $("#detailForm").fadeIn();
              $(".admins").fadeOut();
              $("#allTheNotes").fadeOut();

            break;

             case "noteSubmit":

             $("#detailForm").hide();

              let dNote = document.getElementById("textAlue1");
              let dDate = document.getElementById("todayIs");

              let toBeSent = [dDate.innerHTML, dNote.value];

              console.log("to be sent:",dDate,dNote);
              console.log("in array:",toBeSent);

              $.ajax({  
                  type: "POST",
                  url: "php/diario.php",
                  data: {"newNote" : JSON.stringify(toBeSent)},
                  success: (data) => {
          
                  $('#feedback').html(data);
                  // var backFromPHP = JSON.parse(data);
                  console.log("back from php:",data);                
                   
                  } // success
          
              });  // ajax
              $(".admins").fadeIn();
              $("#allTheNotes").fadeIn();
              allNotes();

             break;
 
              default:
              console.log("button id not found");
              
          } // switch
            
        } // buttonX
    
        
    $(document).ready( () => {
      
        $("#loginit").hide();    
        $("#centerPage").hide();
        $("#detailForm").hide();
        $("#loginit").fadeIn("slow");
        
        $(":button").click( function(event) {  // event listener for buttons.

            var makeVal = this.value;
            var ValNew = makeVal.split('.').join(""); // remove dots.

            buttonX(this.id, ValNew); // fires buttonX with id of button and value
            
            console.log("event listener for buttons fired");

            });
    
        });