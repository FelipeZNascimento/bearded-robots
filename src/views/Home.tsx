import Typography from "@mui/material/Typography";

import classNames from "classnames";
import styles from "./Home.module.scss";
import { Results, Tests } from "components/index";
import { useEffect, useState } from "react";
import { initMqttClient,killMqttClient,requestMqttTest } from "bff/mqtt";
import { initDB,getTests, storeTest,deleteTest, getTest } from "bff/localstorage";
import { fileUploadHandler } from "bff/files";
import { CircularProgress } from "@mui/material";
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
  const [runningTests, setRunningTests] = useState<any[]>([]);

  useEffect(() => {
    initMqttClient(setRunningTests,setCurrentWorkstation);
    initDB();
  setAvailableTests(getTests());
  return () => {
    killMqttClient()
  }
  },[])
  const handleUpload = (e:any) => {
    fileUploadHandler(e, (result) => {
      storeTest({Device: result.Device, Steps: result.Steps})
      setAvailableTests(getTests());
    })
  }


  const runTest = (id:string) => {
    const selectedTest = getTest(id)
    if (currentWorkstation && currentWorkstation.AppId ){
      const testID = id+Date.now();
      requestMqttTest(testID,selectedTest,currentWorkstation.AppId);
    }
  }

  const attemptDeleteTest = (id: any) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Deleting id ${id}`)) {
      deleteTest(id as string)
      setAvailableTests(getTests());
    }
  }

  const clearRunningTests = () => {
      // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure? Test results will be lost`)) {
      setRunningTests([])
    }
  }

  const exportRunningTests = () => {
    navigator.clipboard.writeText(JSON.stringify(runningTests));

  }
  return (
    <div className={containerClass}>
      <header className={headerClass}>
        <Typography margin={2} variant="h3">
        <img src="/sky.png" alt="Sky logo" />
          Bearded Robots
          <img src="/peacock.png" alt="Peacock logo" />
        </Typography>
      </header>
      <main className={mainClass}>
          <Tests rows={availableTests} runTest={runTest} attemptDeleteTest={attemptDeleteTest} handleUpload={handleUpload} />
          <Results rows={runningTests} clearRunningTests={clearRunningTests} exportRunningTests={exportRunningTests} setRunningTests={setRunningTests} />
      </main>
      <footer className={footerClass}>
        <Typography margin={1} variant="h6" >
          {currentWorkstation ? <>Connected to workstation. Ready to test</>: <>Searching for workstation <CircularProgress /></>}
        </Typography>
      </footer>
    </div>
  );
};

export default Home;
