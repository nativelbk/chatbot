require('dotenv').config()
const axios = require('axios')

const get = (req,res)=>{
    console.log('ok')
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    console.log('get request')
  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === process.env.TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
}

const post = async (req,res)=>{
    
    
    let body = req.body;
    console.log(body)
    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });

    if (body.object === "page") {
        // Returns a '200 OK' response to all requests
       try {
        const data = await axios.post(`https://graph.facebook.com/16.0/${body.entry[0].messaging[0].recipient.id}/messages?recipient={'id':'${body.entry[0].messaging[0].sender.id}'}&messaging_type=RESPONSE&message={'text':'hello,world'}&access_token=${process.env.TOKEN}`)
        console.log(data)
       } catch (error) {
        console.log(error)
       }
       res.status(200).send("EVENT_RECEIVED");
    
        // Determine which webhooks were triggered and get sender PSIDs and locale, message content and more.
    
      } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
      }
}

module.exports = {get,post}
