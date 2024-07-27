song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
function preload(){
    song = loadSound("music.mp3");
}
function gogo(){
    song.play();
}
function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("model loaded");
}


function gotPoses(results){
    if(results.length > 0 ){
        
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y
        scoreleftWrist = results[0].pose.keypoints[9].score;
       


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        
        if(leftWristY < 250){
            console.log(">");
            Status = ">";
        }
        if(rightWristY < 250){
            console.log("<");
            Status = "<";
        }
    }
}


var Status = "<";
function draw(){
    
    image(video, 600, 0, -600, 500);

    fill("ff0000");
    stroke("000000");
    circle(rightWristX, rightWristY, 20);
    circle(leftWristX, leftWristY, 20);

    if(scoreleftWrist > 0.01){
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals / 500;
    
    song.setVolume(volume);
    
    }

    
    if(Status == "<"){
        song.rate(1);
    }else{
        song.rate(2);
    }
}

