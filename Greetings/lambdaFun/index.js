'use strict';
exports.handler = function(event,context){
  //event is a request json file,here we have example event.json
  //through event object parameter we can access event.json objects(session,version,request)
  //event.json is javascript object of our request,we can find it our developer console when we are testing the skill...
  //context object has 2 methods(succeed,fail),using succeed we will responseback to the lambda service,
  //if any error happens,we need to call fail with the error message..
  try{
  var request = event.request;
  /* request.type(There are 3 types of request that alexa service can send to Lambda function)
   3 types of requests
    i)   LaunchRequest       Ex: "Open greeter"
     ii)  IntentRequest       Ex: "Say hello to John" or "ask greeter to say hello to John"
     iii) SessionEndedRequest Ex: "exit" or error or timeout*/
  if (request.type === "LaunchRequest") {
    //We can create options object separately and pass it to buildResponse Method like below:::::
    // let options = {};
    // options.speechText = "Welcome to Greetings skill. Using our skill you can greet your guests. whom you want to greet?";
    // options.repromptText = "You can say for example, say hello to john";
    // options.endSession = false;
//-------when user says "open greeter" with echo,it will gives the speechText as the response back---------
//-------if we are not response back within 8 seconds,then the repromptText given to the user.repromptText is like a helper message
//If user don't response for another 8 seconds the session will be ended.
     context.succeed(buildResponse({
      speechText: "Welcome to Greetings skill. Using our skill you can greet your guests. whom you want to greet?",
      repromptText: "You can say for example, say hello to john",
      endSession: false;
    }));

  }else if (request.type === "IntentRequest") {

    let options = {};
    if(request.intent.name ==="HelloIntent"){

      let name = request.intent.slots.FirstName.value;
      options.speechText = "Hello "+name+". " ;
      options.speechText+=getWish();
      options.endSession = true;
      context.succeed(buildResponse(options));

    }else{
      //context.fail("Unknown Intent");
      throw "Unknown Intent";
    }

  }else if (request.type === "SessionEndedRequest") {

  }else {
    //context.fail("Unknown Intent type");
    throw "Unknown Intent type";
  }
}catch(e){
  context.fail("Exception: "+e);
}
}

function getWish(){
  var myDate = new Date();
  var hours = myDate.getUTCHours()- 8;
  if(hours<0){
    hours = hours+24;
  }
  if(hours<12){
    return "Good Morning. ";
  }else if(hours<18){
    return "Good Afternoon. ";
  }else{
    return "Good Evening. ";
  }
}
//in response reprompt used to keep the session Open
//card and reprompt are optional in response
function buildResponse(options){
  var  response = {
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: options.speechText
      },
      shouldEndSession: options.endSession
    }
  };
  if(options.repromptText){
    response.response.reprompt = {
      outputSpeech: {
        type: "PlainText",
        text: options.repromptText
      }
    };
  }
  return response;
}
