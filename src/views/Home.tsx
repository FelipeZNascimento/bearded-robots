import Typography from "@mui/material/Typography";

import classNames from "classnames";
import styles from "./Home.module.scss";
import { Results, Tests } from "components/index";
import { useEffect, useState } from "react";
import { initMqttClient } from "bff/mqtt";
import { initDB,getTests, storeTest,deleteTest } from "bff/localstorage";
import { fileUploadHandler } from "bff/files";

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
  const [runningTests, setRunningTests] = useState<any[]>([]);
  useEffect(() => {
    initMqttClient();
    initDB();
  setAvailableTests(getTests());
  },[])
  const handleUpload = (e:any) => {
    fileUploadHandler(e, (result) => {
      console.log("hehe",result);
      storeTest({Device: result.Device, Steps: result.Steps})
      setAvailableTests(getTests());
      console.log("available tests", availableTests)
    })
  }


  const runTest = (test:any) => {
    setRunningTests([...runningTests, test]);
  }

  const attemptDeleteTest = (id: any) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Deleting id ${id}`)) {
      deleteTest(id as string)
      setAvailableTests(getTests());
    }
  }
  return (
    <div className={containerClass}>
      <header className={headerClass}>
        <Typography margin={2} variant="h3">
          <img src="/peacock.png" alt="Peacock logo" />
          Bearded Robots
          <img src="/peacock.png" alt="Peacock logo" />
        </Typography>
      </header>
      <main className={mainClass}>
        <input type="file" onChange={handleUpload}/>
          <Tests rows={availableTests} runTest={runTest} attemptDeleteTest={attemptDeleteTest} />
          <Results rows={runningTests} />
      </main>
      <footer className={footerClass}>
        <img src="/sky.png" alt="Sky logo" />
        <Typography margin={1} variant="h6">
          Developed for Sky by Hugo Dias, André Gomes and Felipe Nascimento
        </Typography>
        <img src="/sky.png" alt="Sky logo" />
      </footer>
    </div>
  );
};

export default Home;
