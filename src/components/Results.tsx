import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { CheckCircleOutline, ErrorOutline, Loop } from '@mui/icons-material';

import classNames from "classnames";
import styles from "./Results.module.scss";

const Results = () => {
  const containerClass = classNames("GFlexCenter", {
    [styles.container]: true,
  });

  const renderCell = (id: GridRowId) => {
    const testObject = rows.find((row) => row.id === id);
    if (testObject && testObject.status === "done") {
      return (
        <div className={styles.testResult}>
          <p className={styles.testName}>{testObject.testName}</p>
          <p className={styles.testStatus}><CheckCircleOutline color="success" /></p>
        </div>
      );
    } else if (testObject && testObject.status === "error") {
      return (
        <div className={styles.testResult}>
          <p className={styles.testName}>{testObject.testName}</p>
          <p className={styles.testStatus}><ErrorOutline color="error" /></p>
        </div>
      );
    } else if (testObject && testObject.status === "loading") {
      return (
        <div className={styles.testResult}>
          <p className={styles.testName}>{testObject.testName}</p>
          <p className={styles.testStatus}><Loop className={styles.testStatusLoading} color="warning" /></p>
        </div>
      );
    }
  };

  const columns: GridColDef[] = [
    {
      align: "center",
      cellClassName: styles.rows,
      disableColumnMenu: true,
      field: "results",
      flex: 2,
      headerAlign: "center",
      headerClassName: styles.header,
      headerName: "Results",
      sortable: false,
      renderCell: (params) => renderCell(params.id),
    },
  ];

  const rows = [
    {
      id: 1,
      status: "done",
      testName: "Explode the console",
    },
    {
      id: 2,
      status: "loading",
      testName: "Brick the console",
    },
    { id: 3, status: "done", testName: "Is this real life" },
    { id: 4, status: "done", testName: "And beyond" },
    {
      id: 5,
      status: "error",
      testName: "Pokémon Legends: Arceus",
    },
  ];

  return (
    <section className={containerClass}>
      <div className={styles.table}>
        <DataGrid
          hideFooterSelectedRowCount
          showColumnRightBorder
          rows={rows}
          columns={columns}
          autoPageSize
          rowsPerPageOptions={[5]}
        />
      </div>
    </section>
  );
};

export default Results;
