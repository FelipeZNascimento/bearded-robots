import Typography from "@mui/material/Typography";

import classNames from "classnames";
import styles from "./Home.module.scss";
import { Results, Tests } from "components/index";

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
        <Tests />
        <Results />
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
