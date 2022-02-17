import {
    Client,
    Message
} from 'paho-mqtt';
const BROKER_URL = 'broker.hivemq.com'
const BROKER_PORT = 8000;
const BROKER_PATH = "/mqtt"
export const CLIENT_ID = "batatas"
const client = new Client(BROKER_URL, BROKER_PORT, BROKER_PATH, CLIENT_ID);
export let currentWorkstation: any = null;
export let currentlyRunningTests: any[] = []
let testsCallback: (tests:any[]) => void
const TOPICS = {
    SUBSCRIBE_STATIONS: `bearded-robots/automation/${CLIENT_ID}/discoverresponse1`,
    SUBSCRIBE_TESTRESULTS: `bearded-robots/automation/${CLIENT_ID}/starttestresponse`,
    PUBLISH_DISCOVER: 'bearded-robots/automation/discover1',
    PUBLISH_STARTTEST: (appID: string) => `bearded-robots/automation/${appID}/starttest`
}

function handleConnectionLost(responseObject: any) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:", responseObject.errorMessage);
    }
}

interface TestResults {
    StartTime: string;
    EndTime: string;
    Screenshots: {ActualScreenshot: string, Similarity: string}[];
    TestId: string;
    
}

function handleMessageArrived(message: Message) {
    switch (message.destinationName) {
        case TOPICS.SUBSCRIBE_STATIONS:
            const data = JSON.parse(message.payloadString);
            currentWorkstation = data;
            break;
        case TOPICS.SUBSCRIBE_TESTRESULTS:
            const testResults = JSON.parse(message.payloadString) as TestResults;
            const currentTest = currentlyRunningTests.find((item) => {console.log(item); return item.TestId === testResults.TestId});
            currentTest.status = "done";
            currentTest.results = testResults;
            testsCallback([...currentlyRunningTests]);
            break;
        default:
            console.log("UNKNOWN TOPIC:", message.destinationName)
    }
}

function onConnect() {
    client.subscribe(TOPICS.SUBSCRIBE_STATIONS, {
        onSuccess: (e) => {
            client.send(TOPICS.PUBLISH_DISCOVER, JSON.stringify({
                "ClientAppId": CLIENT_ID
            }));
        },
        onFailure: (e) => {
            console.log("sub dead", e)
        }
    })
}


export const initMqttClient = (overrideTestsCallback: ((tests:any[]) => void )| null = null) => {
    client.onConnectionLost = handleConnectionLost;
    client.onMessageArrived = handleMessageArrived;
    if (overrideTestsCallback){
        testsCallback = (tests:any[]) => overrideTestsCallback(tests);
    }
    client.connect({
        onSuccess: onConnect,
        onFailure: (e) => {
            console.log("conn dead", e)
        }
    });
    return client;
}

export const requestMqttTest = (testID: string, testContent: any, appID: string) => {
    testID = "qwer";
    console.log("GOING TO TEST", {
        ClientAppId: CLIENT_ID,
        TestId: testID,
        ...testContent
    })
    const testRun = {
        id: testContent.id, status: "loading", testName: testContent.id,    TestId: testID,
      }
      currentlyRunningTests.push(testRun);
    client.subscribe(TOPICS.SUBSCRIBE_TESTRESULTS, {
        onSuccess: (e) => {
            console.log("SUBSCRIBED TO TEST");
            testsCallback([...currentlyRunningTests]);
            client.send(TOPICS.PUBLISH_STARTTEST(appID), JSON.stringify({
                ClientAppId: CLIENT_ID,
                TestId: testID,
                ...testContent
            }));
        },
        onFailure: (e) => {
            console.log("test did not start", e)
        }
    })

}

export const killMqttClient = () => {
    client.disconnect();
}