import { useState } from "react";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Upload } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { TestModal } from "components/index";

import classNames from "classnames";
import styles from "./Tests.module.scss";
import { Test } from "bff/types";

const Input = styled("input")({
    display: "none",
});
interface ContainerProps {
    rows: Test[];
    runTest: (id: string) => void;
    attemptDeleteTest: (id: any) => void;
    handleUpload: (e: any) => void;
    canRunTests: boolean;
}

function Tests({
    rows,
    runTest,
    attemptDeleteTest,
    handleUpload,
    canRunTests,
}: ContainerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState<Test>();

    const containerClass = classNames("GFlexCenter", {
        [styles.container]: true,
    });

    const handleModalOpening = (id: string) => {
        const testObject = rows.find((row: Test) => row.id === id);
        if (testObject) {
            setSelectedTest(testObject);
            setIsModalOpen(true);
        }
    };

    const renderButtons = (id: string) => {
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
                    onClick={() => runTest(id)}
                    disabled={!canRunTests}
                >
                    Run
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
            field: "name",
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
            renderCell: (params) => renderButtons(params.id as string),
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
                <Button
                    component="span"
                    variant="contained"
                    startIcon={<Upload />}
                >
                    Upload Tests
                </Button>
            </label>
            <TestModal
                selectedTest={selectedTest}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}

export default Tests;
