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
interface ContainerProps {
  rows: any[];
  runTest : (id:string) => void
  attemptDeleteTest : (id:any) => void
  handleUpload : (e:any) => void
}

function Tests({rows, runTest,attemptDeleteTest,handleUpload }: ContainerProps) {
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
          onClick={() => attemptDeleteTest(id)}
        >
          Delete
        </Button>
        &nbsp;
        <Button
          className={styles.button}
          variant="outlined"
          onClick={() => runTest(id as string)}
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
      field: "Device",
      flex: 1,
      headerClassName: styles.header,
      headerName: "Device",
    },
    {
      cellClassName: styles.rows,
      disableColumnMenu: true,
      field: "id",
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
          id="contained-button-file"
          type="file"
          multiple
          onChange={handleUpload}
        />
        <Button component="span" variant="contained" startIcon={<Upload />}>
          Upload Tests
        </Button>
      </label>
      <TestModal testDescription={JSON.stringify(testJson)} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Tests;
