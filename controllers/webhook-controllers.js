require('dotenv').config()
const axios = require('axios')

const get = (req,res)=>{
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === process.env.TOKEN) {
      // Respond with the challenge token from the request
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }

}

const post = async (req,res)=>{
    let body = req.body
    if (body.object === "page") {
        try {
              const a = body.entry[0].messaging[0].recipient.id
              const b = body.entry[0].messaging[0].sender.id
              const corps = {
              recipient:{
              id:`${b}`
              },
              messaging_type: "RESPONSE",
              message:{
              text:`${body.entry[0].messaging[0].message.text}(1)` 
            }
            }
            const data = await axios.post(`https://graph.facebook.com/v17.0/${a}/messages?access_token=${process.env.TOKEN}`,corps)
        } catch (error) {
        console.log(error)
       }
       // Determine which webhooks were triggered and get sender PSIDs and locale, message content and more.
       res.status(200).send("EVENT_RECEIVED");
      } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
      }
}

module.exports = {get,post}
