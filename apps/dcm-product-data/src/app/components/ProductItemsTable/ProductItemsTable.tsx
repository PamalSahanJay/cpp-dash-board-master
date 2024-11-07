import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ProductItem, useProductStore } from '../../state/models/Product';
import { useEffect } from 'react';
import { Download, Wysiwyg } from '@mui/icons-material';
import { styled, tableCellClasses } from '@mui/material';
import { useItemMetadataStore } from '../../state/models/ItemMetaData';
import FullMetadataPopup from '../FullMetadataPopup/FullMetadataPopup';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


function renderTableCells(row: ProductItem, openDialog: (jsonData: string) => void, fetchAndDownload: (itemId: string) => void) {
    return (
        <>
            <TableCell component="th" scope="row">
                {row.fileName}
            </TableCell>
            <TableCell align="left">{row.size}</TableCell>
            <TableCell align="left">{row.modifiedDate}</TableCell>
            <TableCell align="center">{row.versionLabel}</TableCell>
            <TableCell align="center">
                <IconButton
                    aria-label="Metadata"
                    size="small"
                    onClick={() => openDialog(row.jsonData)}>
                    <Wysiwyg />
                </IconButton>
            </TableCell>
            <TableCell align="center">
                <IconButton
                    aria-label="download"
                    size="small"
                    onClick={() => fetchAndDownload(row.itemId)}>
                    <Download />
                </IconButton>
            </TableCell>
        </>
    );
}


function Row(props: { row: ProductItem }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const fetchAndDownload = useProductStore(state => state.fetchAndDownloadProductItem);
    const fetchVersions = useProductStore(state => state.fetchProductVersionDataById);
    const openDialog = useItemMetadataStore(state => state.openDialog);
    console.log('row.hasVersion:', row.hasVersions); // Log the value of row.hasVersion

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
                <TableCell>
                    {row.hasVersions && (
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                                console.log('IconButton clicked, current state:', open);
                                setOpen(!open);
                                fetchVersions(row.itemId)
                            }}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    )}
                </TableCell>
                {renderTableCells(row, openDialog, fetchAndDownload)}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Versions
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>File Name</b></TableCell>
                                        <TableCell align="left"><b>Size</b></TableCell>
                                        <TableCell align="left"><b>Modified Date</b></TableCell>
                                        <TableCell align="center"><b>Version Label</b></TableCell>
                                        <TableCell align="center"><b>Metadata</b></TableCell>
                                        <TableCell align="center"><b>Download</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.versions && row.versions.length > 0 && row.versions.map((version) => (
                                        <TableRow key={version.itemId}>
                                            {renderTableCells(version, openDialog, fetchAndDownload)}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export function ProductItemsTable() {
    const productItems = useProductStore(state => state.productItems);

    useEffect(() => {
        console.log('ProductItemsTable rendered');
    });
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 'calc(100vh - 250px)' }}>
                <Table stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell />
                        <StyledTableCell>File Name</StyledTableCell>
                        <StyledTableCell align="left">Size</StyledTableCell>
                        <StyledTableCell align="left">Modified Date</StyledTableCell>
                        <StyledTableCell align="center">Version Label</StyledTableCell>
                        <StyledTableCell align="center">Metadata</StyledTableCell>
                        <StyledTableCell align="center">Download</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productItems.map((row: ProductItem) => (
                        <Row key={row.fileName} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            <FullMetadataPopup />
        </Paper>
    );
}

export default ProductItemsTable;

