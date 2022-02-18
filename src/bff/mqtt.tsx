import { Client, Message } from "paho-mqtt";
import { TestRun, TestResult } from "./types";
const BROKER_URL = "broker.hivemq.com";
const BROKER_PORT = 8000;
const BROKER_PATH = "/mqtt";
export const CLIENT_ID = "nabos";
const client = new Client(BROKER_URL, BROKER_PORT, BROKER_PATH, CLIENT_ID);
let setRunningTests: (testuns: TestRun[]) => void;
let currentWorkstationCallback: (workstation: any) => void;
let currentTestRuns: TestRun[] = [];
const TOPICS = {
    SUBSCRIBE_STATIONS: `bearded-robots/automation/${CLIENT_ID}/discoverresponse5`,
    SUBSCRIBE_TESTRESULTS: `bearded-robots/automation/${CLIENT_ID}/starttestresponse5`,
    PUBLISH_DISCOVER: "bearded-robots/automation/discover5",
    PUBLISH_STARTTEST: (appID: string) =>
        `bearded-robots/automation/${appID}/starttest5`,
};

const handleConnectionLost = (responseObject: any) => {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:", responseObject.errorMessage);
    }
};
export const updateTestRuns = (runs: TestRun[]) => {
    currentTestRuns = runs;
};
const handleMessageArrived = (message: Message) => {
    switch (message.destinationName) {
        case TOPICS.SUBSCRIBE_STATIONS:
            const data = JSON.parse(message.payloadString);
            currentWorkstationCallback(data);
            break;
        case TOPICS.SUBSCRIBE_TESTRESULTS:
            const testResults = JSON.parse(message.payloadString) as TestResult;
            const currentTest = currentTestRuns.find((item: TestRun) => {
                console.log(item);
                return item.TestId === testResults.TestId;
            });
            if (currentTest) {
                currentTest.status = "done";
                currentTest.results = testResults;
                setRunningTests([...currentTestRuns]);
            }

            break;
        default:
            console.log("UNKNOWN TOPIC:", message.destinationName);
    }
};

const onConnect = () => {
    client.subscribe(TOPICS.SUBSCRIBE_STATIONS, {
        onSuccess: (e) => {
            client.send(
                TOPICS.PUBLISH_DISCOVER,
                JSON.stringify({
                    ClientAppId: CLIENT_ID,
                })
            );
        },
        onFailure: (e) => {
            console.log("sub dead", e);
        },
    });
};

export const initMqttClient = (
    overrideSetRunningTests: ((testuns: TestRun[]) => void) | null,
    overrideCurrentWorkstationCallback: ((tests: any[]) => void) | null = null
) => {
    client.onConnectionLost = handleConnectionLost;
    client.onMessageArrived = handleMessageArrived;
    if (overrideSetRunningTests) {
        setRunningTests = overrideSetRunningTests;
    }
    if (overrideCurrentWorkstationCallback) {
        currentWorkstationCallback = overrideCurrentWorkstationCallback;
    }
    client.connect({
        onSuccess: onConnect,
        onFailure: (e) => {
            console.log("conn dead", e);
        },
    });
    return client;
};

export const requestMqttTest = (testRun: TestRun, appID: string) => {
    client.subscribe(TOPICS.SUBSCRIBE_TESTRESULTS, {
        onSuccess: (e) => {
            client.send(
                TOPICS.PUBLISH_STARTTEST(appID),
                JSON.stringify({
                    ClientAppId: CLIENT_ID,
                    ...testRun,
                })
            );
            currentTestRuns = [...currentTestRuns, testRun];
            setRunningTests(currentTestRuns);
        },
        onFailure: (e) => {
            console.log("test did not start", e);
        },
    });
};

export const killMqttClient = () => {
    client.disconnect();
};
