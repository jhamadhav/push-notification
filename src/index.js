const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const webpush = require('web-push') //requiring the web-push module
const app = express()
app.use(cors())
app.use(bodyParser.json())

const port = 4000
app.get('/', (req, res) => res.send('Hello World!'))



const vapidKeys = {
    publicKey:
        'BJ5IxJBWdeqFDJTvrZ4wNRu7UY2XigDXjgiUBYEYVXDudxhEs0ReOJRBcBHsPYgZ5dyV8VjyqzbQKS8V7bUAglk',
    privateKey: 'ERIZmc5T5uWGeRxedxu92k3HnpVwy_RCnQfgek1x2Y4',
}
//setting our previously generated VAPID keys
webpush.setVapidDetails(
    'mailto:myuserid@email.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend = '') => {
    webpush.sendNotification(subscription, dataToSend)
}

const dummyDb = { subscription: null } //dummy in memory store
const saveToDatabase = async subscription => {
    dummyDb.subscription = subscription
}
// The new /save-subscription endpoint
app.post('/save-subscription', async (req, res) => {
    const subscription = req.body
    await saveToDatabase(subscription) //Method to save the subscription to Database
    res.json({ message: 'success' })
})

app.get('/send-notification', (req, res) => {
    const subscription = dummyDb.subscription //get subscription from your databse here.
    const message = 'Hello World ! from server'
    sendNotification(subscription, message)
    res.json({ message: 'message sent' })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))