import { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Upload } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";

import classNames from "classnames";
import styles from "./Tests.module.scss";

const Input = styled("input")({
  display: "none",
});

const Tests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const handleModal = (flag: boolean) => setIsModalOpen(flag);

  const containerClass = classNames("GFlexCenter", {
    [styles.container]: true,
  });

  const handleModalOpening = (id: GridRowId) => {
    setModalContent(`Setting content for modal id ${id}`);
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

  const renderModal = () => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={() => handleModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <Box className={styles.modal}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Test Details
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {modalContent}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    );
  };
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
      {renderModal()}
    </section>
  );
};

export default Tests;
