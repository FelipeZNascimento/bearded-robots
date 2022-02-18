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
import { Alert, Button, ButtonGroup } from "@mui/material";

interface ITestModal {
  isOpen: boolean;
  resultInstance: any;
  onClose: () => void;
  updateResultStatus: (id:string,status:string) => void;
}

type TStep = {
  Command: string;
  Value: string;
};

const ResultModal = ({ isOpen, resultInstance, onClose,updateResultStatus }: ITestModal) => {
  let screenshotCount = 0;
  let screenshots: any = [];
  let keys: any = [];
  if(resultInstance &&  resultInstance.results && resultInstance.test){
    keys = [
      {key: "Status", value:resultInstance.status},
      {key: "Device", value:resultInstance.test.Device},
      {key: "Steps", value:resultInstance.test.Steps.length},
      {key: "Start Time", value:resultInstance.results.StartTime},
      {key: "End Time", value:resultInstance.results.EndTime},
    ]
  resultInstance.test.Steps.forEach((step: TStep) => {
    if (step.Command === "SCREENSHOT") {
      const newComparison = {
        expected : step.Value,
        result : resultInstance.results.Screenshots[screenshotCount].ActualScreenshot,
        similarity: resultInstance.results.Screenshots[screenshotCount].Similarity
      }
      screenshots.push(newComparison);
      screenshotCount++;
    }
  });
}
if(!resultInstance?.results){
  return null;
}
  return (
    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={isOpen}
      onClose={onClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={isOpen}>
        <Box className={styles.modal}>
          <Typography id="transition-modal-title" variant="h4">
            Test Run Details
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              {resultInstance?.status === "done" && (
                              <TableHead>
                              <TableRow>
                                <TableCell align="center">Validate Test</TableCell>
                                <TableCell align="center">     <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => {updateResultStatus(resultInstance.id, "pass")}}>PASS</Button>
                <Button onClick={() => {updateResultStatus(resultInstance.id, "fail")}}>FAIL</Button>
              </ButtonGroup></TableCell>
                              </TableRow>
                </TableHead>
           
              )}
              <TableBody>
                {keys &&
                keys.map((key: any) => (
                <TableRow>
                  <TableCell align="center">{key.key}</TableCell>
                  <TableCell align="center">{key.value}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Typography variant="h4">
            Screenshots
          </Typography>
          {screenshots &&
          screenshots.map((shot: any) => (
          <div>
            <div className={styles.screenshotCompare}>
              <div>
                <Typography variant="h6">
                  Expected
                </Typography>
                <img src={`data:image/jpeg;base64,${shot.expected}`} alt="a screenshot" />
              </div>
              <div>
                <Typography variant="h6">
                  Actual Result
                </Typography>
                <img src={`data:image/jpeg;base64,${shot.result}`} alt="another screenshot" />
              </div>
            </div>
            <Alert severity="info">Similarity: {shot.similarity}</Alert>

          </div>
          ))}
          {!screenshots.length && <Typography variant="h6">No screenshots to show</Typography>}

        </Box>
      </Fade>
    </Modal>
  );
};

export default ResultModal;
