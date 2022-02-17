import Typography from '@mui/material/Typography';

import classNames from "classnames";
import styles from "./Tests.module.scss";

function Tests() {
    const containerClass = classNames("GFlexCenter", {
        [styles.container]: true,
    });
        
  return (
      <section className={containerClass}>
          <Typography margin={1} variant="h5">Tests</Typography>
      </section>
  )
}

export default Tests;
