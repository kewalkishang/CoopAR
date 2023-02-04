/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// FriendlyEats.prototype.addRestaurant = function(data) {
//   var collection = firebase.firestore().collection('restaurants');
//   return collection.add(data);
// };
var valID;
function getAllRestaurantsCall() {
  console.log("GET ALL RESTUARANTS CALLED");
  var query = firebase.firestore()
  .collection('test')
  .limit(50);
 console.log(query);
 var gearVal = false;
 var shaftVal = false;
 var rotorVal = false;
 query.onSnapshot(function(snapshot) {
  console.log(snapshot);
 // if (!snapshot.size) return renderer.empty(); // Display "There are no restaurants".
 console.log("snap all");
  snapshot.docChanges().forEach(function(change) {
    if (change.type === 'removed') {
     // renderer.remove(change.doc);
    } else {
      console.log("sNAP "+change.doc.data().gear);
     // renderer.display(change.doc);
    // updateRestaurantsCall(change.doc.id);
      valID = change.doc.id;
    }
  });
 // refreshData();
});

}

function calLAllRestaurantsCall() {
  console.log("GET CALL RESTUARANTS CALLED");
  var query = firebase.firestore()
  .collection('test')
  .limit(50);
 console.log(query);
 query.onSnapshot(function(snapshot) {
  console.log(snapshot);
 // if (!snapshot.size) return renderer.empty(); // Display "There are no restaurants".
 console.log("snap all");
  snapshot.docChanges().forEach(function(change) {
    if (change.type === 'removed') {
     // renderer.remove(change.doc);
    } else {
      console.log("sNAP "+change.doc.data().gear);
     // refreshData(change.doc.data().gear, change.doc.data().shaft, change.doc.data().rotor);
      refreshModel(change.doc.data().gear, change.doc.data().shaft);
     // renderer.display(change.doc);
    // updateRestaurantsCall(change.doc.id);
    }
  });
 
});

}

function SubscribeData(){
  console.log("Subscribing data");
  calLAllRestaurantsCall()
  document.getElementById("SubscribeBut").disabled = true;
}

function refreshModel(gearVal, shaftVal){
  console.log("Model refresh");
  document.getElementById("engineModel").setAttribute('visible', shaftVal);
  document.getElementById("spoilerModel").setAttribute('visible', gearVal);
}

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


function updateRestaurantsCall(question, val) {
  console.log("update RESTUARANTS CALLED " + valID + " : "+ question);
  var collection = firebase.firestore().collection('test');
  var document = collection.doc(valID);
  // var newRatingDocument = document.collection('ratings').doc();

  return firebase.firestore().runTransaction(function(transaction) {
    return transaction.get(document).then(function(doc) {
    var data;
     switch(question){
       case 0 :  data = { shaft : val};
       break;
       case 1 : data =  { gear : val}; 
       break;
       case 2 :  data = { rotor : val}; 
        break;
     }
      transaction.update(document,data);
      
    });
  });
}

// FriendlyEats.prototype.getAllRestaurants = function(renderer) {
//   var query = firebase.firestore()
//       .collection('restaurants')
//       .orderBy('avgRating', 'desc')
//       .limit(50);
//       console.log(query);
//   this.getDocumentsInQuery(query, renderer);
// };

// FriendlyEats.prototype.getDocumentsInQuery = function(query, renderer) {
//   query.onSnapshot(function(snapshot) {
//     console.log(snapshot);
//     if (!snapshot.size) return renderer.empty(); // Display "There are no restaurants".

//     snapshot.docChanges().forEach(function(change) {
//       if (change.type === 'removed') {
//         renderer.remove(change.doc);
//       } else {
//         console.log(change.doc.data().name);
//         renderer.display(change.doc);
//       }
//     });
//   });
// };

// FriendlyEats.prototype.getRestaurant = function(id) {
//   return firebase.firestore().collection('restaurants').doc(id).get();
// };

// FriendlyEats.prototype.getFilteredRestaurants = function(filters, renderer) {
//   var query = firebase.firestore().collection('restaurants');

//   if (filters.category !== 'Any') {
//     query = query.where('category', '==', filters.category);
//   }

//   if (filters.city !== 'Any') {
//     query = query.where('city', '==', filters.city);
//   }

//   if (filters.price !== 'Any') {
//     query = query.where('price', '==', filters.price.length);
//   }

//   if (filters.sort === 'Rating') {
//     query = query.orderBy('avgRating', 'desc');
//   } else if (filters.sort === 'Reviews') {
//     query = query.orderBy('numRatings', 'desc');
//   }

//   this.getDocumentsInQuery(query, renderer);
// };

// FriendlyEats.prototype.addRating = function(restaurantID, rating) {
//   var collection = firebase.firestore().collection('restaurants');
//   var document = collection.doc(restaurantID);
//   var newRatingDocument = document.collection('ratings').doc();

//   return firebase.firestore().runTransaction(function(transaction) {
//     return transaction.get(document).then(function(doc) {
//       var data = doc.data();

//       var newAverage =
//           (data.numRatings * data.avgRating + rating.rating) /
//           (data.numRatings + 1);

//       transaction.update(document, {
//         numRatings: data.numRatings + 1,
//         avgRating: newAverage
//       });
//       return transaction.set(newRatingDocument, rating);
//     });
//   });
// };
