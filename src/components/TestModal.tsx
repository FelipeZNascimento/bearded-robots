import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import styles from "./TestModal.module.scss";
import { Test, TKey,TStep } from "bff/types";

interface ITestModal {
  isOpen: boolean;
  selectedTest?: Test;
  onClose: () => void;
}

const TestModal = ({ isOpen, selectedTest, onClose }: ITestModal) => {
  const device = selectedTest?.Device;
  const steps = selectedTest?.Steps;

  const keys: TKey[] = [];
  let screenshot: string = "";

  steps?.forEach((step: TStep) => {
    if (step.Command === "KEY") {
      keys.push({ command: step.Command, value: step.Value });
    } else if (step.Command === "SCREENSHOT") {
      screenshot = step.Value;
    }
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box className={styles.modal}>
          <Typography id="transition-modal-title" variant="h4">
            Test Details
          </Typography>
          Device: {device}
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Command</TableCell>
                  <TableCell align="center">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keys &&
                  keys.map((key: any) => (
                    <TableRow>
                      <TableCell align="center">{key.command}</TableCell>
                      <TableCell align="center">{key.value}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {screenshot && <img className={styles.image} src={`data:image/jpeg;base64,${screenshot}`} />}
        </Box>
      </Fade>
    </Modal>
  );
};

export default TestModal;
