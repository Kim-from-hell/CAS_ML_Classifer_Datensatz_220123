let model;




function setup() {
  createCanvas(100, 100, WEBGL);

  let options = {
    dataUrl:'test.csv',
    inputs: ["age","interest"],
    outputs: ["success"],
    task: "classification",
    debug: true
  }

  model =ml5.neuralNetwork(options,modelReady)

  setupButtons()

  }

function setupButtons(){
  
  trainButton= select("#train")
  trainButton.mousePressed(function(){

    let trainingOptions= {
      epoch: 30

    }

    model.train(trainingOptions, whileTraining, doneTraining)
  })

predictButton = select("#predict")
predictButton.mousePressed(classify)
predictButton.hide();

}

function whileTraining(epoch,loss) {
  console.log(epoch,loss)
}

function doneTraining(){
  predictButton.show();
  trainButton.hide();
  console.log("Training done!")


}

function classify(){
  let alter = parseInt(select("#age").value())
  let interesse = parseInt(select("#interest").value())
  //let erfolg = parseInt(select("#success").elt.value())

  let userInputs = {
    age: alter,
    interest: interesse,
    //success: erfolg,
  }
 
  model.classify(userInputs,gotResults)


}

function modelReady(){

  console.log("Model loaded")
  model.normalizeData();
}

function gotResults(error,result){

  if (error){
  console.error(error)
  return
  }

  //console.log(results)
  if(result[0].label == "yes"){

    select("#result").html("Gute Erholung im Schlaf.")
    

  }else {
    select("#result").html("Eher schlechte Erhohlung im Schlaf.")
    
  }

}
