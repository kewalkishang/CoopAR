
function refreshData(gearVal, shaftVal, rotorVal){
   console.log("Refreshing data");
   if(shaftVal && !gearVal && !rotorVal){
    var shaft = document.getElementById("shaft");
    shaft.innerHTML = "Done";
    shaft.style.color= "blue";

    var gear = document.getElementById("gear");
    gear.innerHTML = "In Progress";
    gear.style.color= "green";
   }
   
   if(shaftVal && gearVal && !rotorVal){
   
    var gear = document.getElementById("gear");
    gear.innerHTML = "Done";
    gear.style.color= "blue";
 
    var rotor = document.getElementById("rotor");
    rotor.innerHTML = "In Progress";
    rotor.style.color= "green";
   }

   if(shaftVal && gearVal && rotorVal){
   
   
    var rotor = document.getElementById("rotor");
    rotor.innerHTML = "Done";
    rotor.style.color= "blue";
   }

   //getAllRestaurantsCall();
}
