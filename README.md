# Alexa-Skill
Basic Understanding of how Amazon Alexa works and Added some Basic  Skills into that using Node.js


#Adding Greeter skill as a first step in alexa skill development using Node.js

The Greeting skill,wish our guests with their first name...

1)For sample request and response refer event.json,response.json

2)refer index.js for Detailed explanation..

To Test the skill in terminal:

1)Node install procedure for macOS/linux (reference https://github.com/creationix/nvm)
  >> curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
  >> source ~/.bash_profile
  >> nvm install v4.3.2

  For windows, please download node.js from https://nodejs.org/en/download

2)Lambda local setup (https://github.com/ashiina/lambda-local)
  >> npm install -g lambda-local

3)Local testing command
   >> lambda-local -l index.js -h handler -e event.json


SSML(Speech Synthesis Markup Language):

Whenever we are sending response back to alexa,we are sending it as a plain text(type)..In Plain text to output speech,alexa recognize the punctuations(,,?,!)...

1)SSML tags provide the control,that recognize the abbreviations , achronyms,etc..
2)audio SSML tag used to get your response from mp3 files.
3)say-as tag used,how alexa should pronounce the numbers(ordinal,cordinal),address,date,etc,..

more information you can fine here...,
"https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html"


Upload aws Lambda function from console:

AWS CLI setup
  >> pip install awscli
  >> Create a user and give permissions at IAM Management console
  >> aws configure

  >> zip -r lambda_upload.zip index.js
  >> aws lambda update-function-code --function-name Greetings --zip-file fileb://lambda_upload.zip




