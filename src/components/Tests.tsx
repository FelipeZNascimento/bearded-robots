import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

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
          variant="contained"
          onClick={() => alert(`Viewing id ${id}`)}
          color="warning"
        >
          View
        </Button>
        &nbsp;
        <Button
          variant="contained"
          onClick={() => alert(`Deleting id ${id}`)}
          color="error"
        >
          Delete
        </Button>
        &nbsp;
        <Button variant="contained" onClick={() => alert(`Testing id ${id}`)}>
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
    </section>
  );
}

export default Tests;
