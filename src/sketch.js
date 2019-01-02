let mobilenet
let result = ''
let classifierRP
let classifierRS
let classifierPS
let video
let label = 'loading model...'
let trainRockButton
let trainPaperButton
let trainScissorsButton
let saveButton
let startTrainingButton
let rockCount = 0
let paperCount = 0
let scissorsCount = 0
let classifiers = {
  teachModels: []
}

function modelReady () {
  console.log('Model is ready!!!');
  // classifier.load('model.json', customModelReady);
}

// function customModelReady () {
//   label = 'model ready'
//   classifier.classify(gotResults)
// }

function videoReady () {
  console.log('Video is ready!!!');
}

function setup () {
  createCanvas(640, 550)
  video = createCapture(VIDEO)
  video.hide()
  background(0)
  mobilenet = ml5.featureExtractor('MobileNet', modelReady)
  classifierRP = mobilenet.classification(video, videoReady)
  classifierRS = mobilenet.classification(video, videoReady)
  classifierPS = mobilenet.classification(video, videoReady)
  classifiers.teachModels.push(classifierRP, classifierRS, classifierPS)

  trainRockButton = createButton('rock')
  trainRockButton.mousePressed(function () {
    classifierRP.addImage('rock')
    classifierRS.addImage('rock')
    console.log('rockkkkk');
  })
  trainPaperButton = createButton('paper')
  trainPaperButton.mousePressed(function () {
    classifierRP.addImage('paper')
    classifierPS.addImage('paper')
    console.log('paperrrrr');
  })
  trainScissorsButton = createButton('scissors')
  trainScissorsButton.mousePressed(function () {
    classifierRS.addImage('scissors')
    classifierPS.addImage('scissors')
    console.log('scisssssorrrs');
  })
  startTrainingButton = createButton('train machine')
  startTrainingButton.mousePressed(function () {
    classifierRS.train(whileTraining)
    classifierPS.train(whileTraining)
    classifierRP.train(whileTraining)
  })
  saveButton = createButton('save model')
  saveButton.mousePressed(function () {
    classifierRS.save()
    classifierPS.save()
    classifierRP.save()
  })
}

function draw () {
  background(0)
  image(video, 0, 0)
  fill(255)
  textSize(22)
  text(label, 10, height - 30)
}

function whileTraining (loss) {
  if (loss == null) {
    console.log('Training Complete')

    classifiers.teachModels.forEach(model => {
      this.model = model
      model.classify(gotResults)
      let allCounts = { rock: rockCount, paper: paperCount, scissors: scissorsCount }
      result = Object.keys(allCounts).reduce((a, b) => allCounts[a] > allCounts[b] ? a : b)
    })
  } else {
    // console.log(loss)
  }
}

function gotResults (error, result) {
  console.log(error)
  if (result === 'rock') {
    ++rockCount
  } else if (result === 'paper') {
    ++paperCount
  } else {
    ++scissorsCount
  }
  this.model.classify()
}
