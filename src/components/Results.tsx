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
  ThumbUpOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";

import classNames from "classnames";
import styles from "./Results.module.scss";
import { useState } from "react";
import { ResultModal } from "components/index";
import { TestRun } from "bff/types";

interface ContainerProps {
  rows: any[];
  exportRunningTests: () => void;
  clearRunningTests: () => void;
  setRunningTests: (tests:TestRun[]) => void;
}
const Results = ({rows,exportRunningTests,clearRunningTests,setRunningTests}: ContainerProps) => {
  const containerClass = classNames("GFlexCenter", {
    [styles.container]: true,
  });

  const buttonContainerClass = classNames("GFlexCenter", {
    [styles.buttonContainer]: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const handleModalOpening = (id: GridRowId) => {
    const testObject = rows.find((row) => row.TestId === id);
    setSelectedResult(testObject);
    setIsModalOpen(true);
  };

  const updateResultStatus = (TestId: string, status:string) => {
    const testObject = rows.find((row) => row.TestId === TestId);
    testObject.status = status;
    setRunningTests([...rows])
  } 

  const renderCell = (TestId: string) => {
    const testObject = rows.find((row: TestRun) => row.TestId === TestId);
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
        case "pass":
          icon = () => (
            <Tooltip title="Success">
              <ThumbUpOutlined color="success" />
            </Tooltip>
          );
          break;
        case "fail":
          icon = () => (
            <Tooltip title="Error">
              <ThumbDownOutlined color="error" />
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
        <div className={styles.testResult} onClick={() => handleModalOpening(TestId)}>
          <p className={styles.testName} >{testObject?.test?.name.substr(0,30)}</p>
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
      renderCell: (params) => renderCell(params.id as string),
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
          getRowId={row => row.TestId}
        />
      </div>
      <div className={buttonContainerClass}>
        <Button
          variant="contained"
          startIcon={<ClearAll />}
          onClick={clearRunningTests}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          startIcon={<ImportExport />}
          onClick={exportRunningTests}
        >
          Export
        </Button>
      </div>
      <ResultModal resultInstance={selectedResult} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} updateResultStatus={updateResultStatus} />
    </section>
  );
};

export default Results;
