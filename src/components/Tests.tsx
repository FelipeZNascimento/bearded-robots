import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { Upload } from "@mui/icons-material";

import classNames from "classnames";
import styles from "./Tests.module.scss";

function Tests() {
  const containerClass = classNames("GFlexCenter", {
    [styles.container]: true,
  });

  const renderButtons = (id: GridRowId) => {
    return (
      <>
        <Button
          className={styles.button}
          color="warning"
          variant="outlined"
          onClick={() => alert(`Viewing id ${id}`)}
        >
          View
        </Button>
        &nbsp;
        <Button
          className={styles.button}
          color="error"
          variant="outlined"
          onClick={() => alert(`Deleting id ${id}`)}
        >
          Delete
        </Button>
        &nbsp;
        <Button
          className={styles.button}
          variant="outlined"
          onClick={() => alert(`Testing id ${id}`)}
        >
          Test
        </Button>
      </>
    );
  };

  const columns: GridColDef[] = [
    {
      cellClassName: styles.rows,
      disableColumnMenu: true,
      field: "device",
      flex: 1,
      headerClassName: styles.header,
      headerName: "Device",
    },
    {
      cellClassName: styles.rows,
      disableColumnMenu: true,
      field: "testName",
      flex: 2,
      headerClassName: styles.header,
      headerName: "Test",
      sortable: false,
    },
    {
      align: "center",
      cellClassName: styles.rows,
      disableColumnMenu: true,
      field: "actions",
      flex: 2,
      headerAlign: "center",
      headerClassName: styles.header,
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => renderButtons(params.id),
    },
  ];

  const rows = [
    {
      id: 1,
      device: "Xbox",
      testName: "Explode the console",
    },
    {
      id: 2,
      device: "Playstation",
      testName: "Brick the console",
    },
    { id: 3, device: "Vidaa", testName: "Is this real life" },
    { id: 4, device: "X1 Infinity", testName: "And beyond" },
    {
      id: 5,
      device: "Nintendo Switch",
      testName: "Pokémon Legends: Arceus",
    },
  ];

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
      <Button
        variant="contained"
        startIcon={<Upload />}
        onClick={() => alert(`Upload`)}
      >
        Upload
      </Button>
    </section>
  );
}

export default Tests;
