import Typography from '@mui/material/Typography';

import classNames from "classnames";
import styles from "./Results.module.scss";

function Results() {
    const containerClass = classNames("GFlexCenter", {
        [styles.container]: true,
    });
  return (
    <section className={containerClass}>
        <Typography margin={1} variant="h5">Results</Typography>
    </section>
    );
}

export default Results;
