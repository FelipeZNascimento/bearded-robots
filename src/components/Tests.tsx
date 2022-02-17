import { useState } from "react";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Upload } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";

import { TestModal } from "components/index";

import classNames from "classnames";
import styles from "./Tests.module.scss";
const testJson = require("test.json");

const Input = styled("input")({
  display: "none",
});

const Tests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTestId, setModalTestId] = useState<null | GridRowId>(null);

  const containerClass = classNames("GFlexCenter", {
    [styles.container]: true,
  });

  const handleModalOpening = (id: GridRowId) => {
    setModalTestId(id);
    setIsModalOpen(true);
  };

  const renderButtons = (id: GridRowId) => {
    return (
      <>
        <Button
          className={styles.button}
          color="warning"
          variant="outlined"
          onClick={() => handleModalOpening(id)}
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
          variant="contained"
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
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
        />
        <Button component="span" variant="contained" startIcon={<Upload />}>
          Upload
        </Button>
      </label>
      <TestModal testDescription={JSON.stringify(testJson)} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Tests;
