import {
    Client,
    Message
} from 'paho-mqtt';
const BROKER_URL = 'broker.hivemq.com'
const BROKER_PORT = 8000;
const BROKER_PATH = "/mqtt"
const CLIENT_ID = "batatas"
const client = new Client(BROKER_URL, BROKER_PORT, BROKER_PATH, CLIENT_ID);
export let currentWorkstation: any = null;
export let runningTests: string[] = []
function handleConnectionLost(responseObject: any) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

function handleMessageArrived(message: Message) {
    console.log("MESSAGE YES",message)
    switch(message.destinationName) {
        case `bearded-robots/automation/${CLIENT_ID}/discoverresponse`:
            const data = JSON.parse(message.payloadString);
            console.log("DEVICES: ",data);
            currentWorkstation = data;
            break;
        default:
            console.log("UNKNOWN TOPIC:", message.destinationName)
    }
}

function onConnect() {
    console.log("CONNECTED")
    client.send('bearded-robots/automation/discover', JSON.stringify({
        "ClientAppId": CLIENT_ID
    }));
    client.subscribe(`bearded-robots/automation/${CLIENT_ID}/discoverresponse`)
    console.log("CONNECTED and subbed")

}
export const initMqttClient = () => {
    client.onConnectionLost = handleConnectionLost;
client.onMessageArrived = handleMessageArrived;
client.connect({
    onSuccess: onConnect,
    onFailure: (e) => {console.log("conn dead",e)}
});
return client;
}

export const runTest = (testID: string, testContent:any, appID:string) => {
    client.send(`bearded-robots/automation/${appID}/starttest`, JSON.stringify({
        ClientAppId : CLIENT_ID,
        TestId: testID,
        ...testContent
    }));
    runningTests.push(testID);
    client.subscribe(`bearded-robots/automation/${appID}/starttestresponse`,{
        onSuccess: (e) => {console.log("test is running",e)},
        onFailure: (e) => {console.log("test did not start",e)}
    })
    
}