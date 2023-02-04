//TESTING OBJECT DETECTION
let net;
var reult = "hello" ; 
const webcamElement = document.getElementById('webcam');
webcamElement.width = 1280;
webcamElement.height = 720;
let rect = true;
let gameover = false;
async function app() {
    console.log('Loading COCO SSD..');
  
  

 cocoSsd.load().then(function (loadedModel) {
  net = loadedModel;
  // Show demo section now model is ready to use.
  console.log('inside loader');
  //demosSection.classList.remove('invisible');
});
    console.log('Successfully loaded model');
    
    // Create an object from Tensorflow.js data API which could capture image 
    // from the web camera as Tensor.
   const webcamConfig  = {
      facingMode: 'environment'
    };
    const webcam = await tf.data.webcam(webcamElement, webcamConfig);
    while (true) {
      console.log("detecting .....");
      const img = await webcam.capture();
      const result = await net.detect(img);
  
      if(result.length > 0){
      //  console.log("not null");
         document.getElementById('console').innerText = `
        prediction: ${result[0].class}\n
        probability: ${result[0].score}
      `;
        if(!gameover && rect && (result[0].class == "laptop" || result[0].class == "book")){
          alert("Found a rectangular "+ result[0].class);
          rect = false;
          document.getElementById('objectFind').innerText = "Find a cylindrical object"
        }
        if(!gameover && !rect && (result[0].class == "bottle" || result[0].class == "cup")){
          alert("Found a cylindrical "+ result[0].class);
          rect = false;
          gameover = true;
          document.getElementById('objectFind').innerText = "Well done"
        }
       // alert("Found "+ result[0].class);
      }
 
      img.dispose();

      await tf.nextFrame();
    }
  }
  app();