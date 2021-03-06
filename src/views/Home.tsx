import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import classNames from "classnames";
import styles from "./Home.module.scss";
import { Results, Tests } from "components/index";
import { useEffect, useState } from "react";
import {
    initMqttClient,
    killMqttClient,
    requestMqttTest,
    updateTestRuns,
} from "bff/mqtt";
import {
    initDB,
    getTests,
    storeTest,
    deleteTest,
    getTest,
} from "bff/localstorage";
import { fileUploadHandler } from "bff/files";
import { CircularProgress } from "@mui/material";
import { TestRun } from "bff/types";
const Home = () => {
    const containerClass = classNames({
        [styles.container]: true,
    });

    const headerClass = classNames("GFlexCenter", {
        [styles.header]: true,
    });

    const mainClass = classNames("GFlexCenter", {
        [styles.main]: true,
    });

    const footerClass = classNames("GFlexCenter", {
        [styles.footer]: true,
    });

    const [availableTests, setAvailableTests] = useState<any[]>([]);
    const [currentWorkstation, setCurrentWorkstation] = useState<any>(null);
    const [runningTests, setRunningTests] = useState<TestRun[]>([]);

    useEffect(() => {
        initMqttClient(setRunningTests, setCurrentWorkstation);
        initDB();
        setAvailableTests(getTests());
        return () => {
            killMqttClient();
        };
    }, []);
    const handleUpload = (e: any) => {
        fileUploadHandler(e, (result) => {
            storeTest({
                Device: result.Device,
                Steps: result.Steps,
                name: result.name,
            });
            setAvailableTests(getTests());
        });
    };

    const runTest = (id: string) => {
        const selectedTest = getTest(id);
        if (currentWorkstation && currentWorkstation.AppId) {
            const TestId = id + Date.now();
            const newTest: TestRun = {
                TestId,
                test: selectedTest,
                status: "loading",
            };
            requestMqttTest(newTest, currentWorkstation.AppId);
        }
    };

    const attemptDeleteTest = (id: string) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Deleting id ${id}`)) {
            deleteTest(id);
            setAvailableTests(getTests());
        }
    };

    const clearRunningTests = () => {
        console.log("zxcvzxcvzxcv");
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure? Test results will be lost`)) {
            setRunningTests([]);
            updateTestRuns([]);
        }
    };

    const exportRunningTests = () => {
        navigator.clipboard.writeText(JSON.stringify(runningTests));
    };

    return (
        <div className={containerClass}>
            <header className={headerClass}>
                <div className={styles.bender}>
                    <Tooltip title="Felipe Nascimento">
                        <img
                            src="/bender.png"
                            alt="Bender robot with a beard"
                        />
                    </Tooltip>
                    <Tooltip title="Andr?? Gomes">
                        <img
                            src="/bender.png"
                            alt="Bender robot with a beard"
                        />
                    </Tooltip>
                    <Tooltip title="Hugo Dias">
                        <img
                            src="/bender.png"
                            alt="Bender robot with a beard"
                        />
                    </Tooltip>
                </div>
                <Typography margin={2} variant="h3">
                    <img src="/sky.png" alt="Sky logo" />
                    Bearded Robots
                    <img src="/peacock.png" alt="Peacock logo" />
                </Typography>
            </header>
            <main className={mainClass}>
                <Tests
                    rows={availableTests}
                    runTest={runTest}
                    attemptDeleteTest={attemptDeleteTest}
                    handleUpload={handleUpload}
                    canRunTests={currentWorkstation !== null}
                />
                <Results
                    rows={runningTests}
                    clearRunningTests={clearRunningTests}
                    exportRunningTests={exportRunningTests}
                    setRunningTests={setRunningTests}
                />
            </main>
            <footer className={footerClass}>
                <Typography margin={1} variant="h6">
                    {currentWorkstation ? (
                        <>Connected to workstation. Ready to test</>
                    ) : (
                        <>
                            Searching for workstation <CircularProgress />
                        </>
                    )}
                </Typography>
            </footer>
        </div>
    );
};

export default Home;
