import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import {
  CheckCircleOutline,
  ClearAll,
  ErrorOutline,
  HelpOutline,
  ImportExport,
  Loop,
} from "@mui/icons-material";

import classNames from "classnames";
import styles from "./Results.module.scss";

interface ContainerProps {
  rows: any[];
}
const Results = ({rows }: ContainerProps) => {
  const containerClass = classNames("GFlexCenter", {
    [styles.container]: true,
  });

  const buttonContainerClass = classNames("GFlexCenter", {
    [styles.buttonContainer]: true,
  });

  const renderCell = (id: GridRowId) => {
    const testObject = rows.find((row) => row.id === id);
    let icon = () => <HelpOutline color="warning" />;
    if (testObject) {
      switch (testObject.status) {
        case "done":
          icon = () => (
            <Tooltip title="Success">
              <CheckCircleOutline color="success" />
            </Tooltip>
          );
          break;
        case "error":
          icon = () => (
            <Tooltip title="Error">
              <ErrorOutline color="error" />
            </Tooltip>
          );
          break;
        case "loading":
          icon = () => (
            <Tooltip title="Loading">
              <Loop className={styles.testStatusLoading} color="warning" />
            </Tooltip>
          );
          break;
      }

      return (
        <div className={styles.testResult}>
          <p className={styles.testName}>{testObject.testName}</p>
          <p className={styles.testStatus}>{icon()}</p>
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

  // const rows = [
  //   {
  //     id: 1,
  //     status: "done",
  //     testName: "Explode the console",
  //   },
  //   {
  //     id: 2,
  //     status: "loading",
  //     testName: "Brick the console",
  //   },
  //   { id: 3, status: "done", testName: "Is this real life" },
  //   { id: 4, status: "done", testName: "And beyond" },
  //   {
  //     id: 5,
  //     status: "error",
  //     testName: "Pokémon Legends: Arceus",
  //   },
  // ];

  return (
    <section className={containerClass}>
      <div className={styles.table}>
        <DataGrid
          hideFooterSelectedRowCount
          rows={rows}
          columns={columns}
          autoPageSize
          rowsPerPageOptions={[5]}
        />
      </div>
      <div className={buttonContainerClass}>
        <Button
          variant="contained"
          startIcon={<ClearAll />}
          onClick={() => alert(`Clear All`)}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          startIcon={<ImportExport />}
          onClick={() => alert(`Export`)}
        >
          Export
        </Button>
      </div>
    </section>
  );
};

export default Results;
