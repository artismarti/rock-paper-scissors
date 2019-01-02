let mobilenet
let classifier
let video
let label = 'test'
let rockButton
let paperButton
let trainButton
// let classifyButton

function modelReady () {
  console.log('--000000--')
  console.log('Model is ready!!!')
  // classifier.load('./src/model.json ', customModelReady)
}

function customModelReady () {
  console.log('Custom Model is ready!!!')
  label = 'model ready'
  // classifyButton = createButton('classify!')
  // classifyButton.mousePressed(function () {
  //   classifier.classify(gotResults)
  // })
}

function videoReady () {
  console.log('Video is ready!!!')
}

function whileTraining(loss) {
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
  classifier = mobilenet.classification(video, videoReady)

  rockButton = createButton('rock')
  rockButton.mousePressed(function() {
    classifier.addImage('rock')
  })

  paperButton = createButton('paper')
  paperButton.mousePressed(function() {
    classifier.addImage('paper')
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
