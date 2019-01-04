let mobilenet
let classifier
let video
let label = 'test'
let rockButton
let paperButton
let trainButton
let scissorButton

function modelReady () {
  console.log('Model is ready!!!')
}

function customModelReady () {
  console.log('Custom Model is ready!!!')
  label = 'model ready'
}

function videoReady () {
  console.log('Video is ready!!!')
}

function whileTraining (loss) {
  if (loss == null) {
    console.log('Training Complete')
    classifier.classify(gotResults)
  } else {
    console.log(loss)
  }
}

function gotResults (error, result) {
  if (error) {
    console.error(error)
    label = result
    classifier.classify(gotResults)
  } else {
    label = result
    classifier.classify(gotResults)
  }
}

function setup () {
  createCanvas(320, 270)
  video = createCapture(VIDEO)
  video.hide()
  background(0)
  mobilenet = ml5.featureExtractor('MobileNet', modelReady)
  mobilenet.numClasses = 3
  classifier = mobilenet.classification(video, videoReady)

  rockButton = createButton('rock')
  rockButton.mousePressed(function() {
    classifier.addImage('rock')
  })

  paperButton = createButton('paper')
  paperButton.mousePressed(function() {
    classifier.addImage('paper')
  })

  scissorButton = createButton('scissors')
  scissorButton.mousePressed(function() {
    classifier.addImage('scissors')
  })

  trainButton = createButton('train model')
  trainButton.mousePressed(function() {
    classifier.train(whileTraining)
  })

  saveButton = createButton('save')
  saveButton.mousePressed(function () {
    classifier.save()
})
}

function draw () {
  background(0)
  image(video, 0, 0, 320, 240)
  fill(255)
  textSize(16)
  text(label, 10, height - 10)
}
