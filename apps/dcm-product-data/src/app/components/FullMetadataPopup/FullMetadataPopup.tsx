import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography
} from '@mui/material';
import { useItemMetadataStore } from '../../state/models/ItemMetaData';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


interface ExpandableJsonProps {
    data: any;
    isRoot?: boolean;
    level?: number;
}

const borderRightStyle = '2px solid rgba(0,0,0,0.3)';

const ExpandableJson: React.FC<ExpandableJsonProps> = ({ data, isRoot = true, level = 0 }) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleExpand = (key: string) => {
        setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderValue = (value: any, key: string) => {
        if (Array.isArray(value)) {
            return (
                <Box>
                    {level > 1 && (
                        <IconButton onClick={() => toggleExpand(key)} size="small">
                            {expanded[key] ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    )}
                    <Typography align="right" variant="body2" component="span">
                        {`[${value.join(', ')}]`}
                    </Typography>
                    {level > 1 && (
                        <Collapse in={expanded[key]}>
                            <Box ml={2} mt={1}>
                                <ExpandableJson data={value} isRoot={false} level={level + 1} />
                            </Box>
                        </Collapse>
                    )}
                </Box>
            );
        }

        if (typeof value === 'object' && value !== null) {
            if (level <= 1) {
                return <ExpandableJson data={value} isRoot={false} level={level + 1} />;
            }
            return (
                <Box>
                    <IconButton onClick={() => toggleExpand(key)} size="small">
                        {expanded[key] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                    <Typography align="right" variant="body2" component="span">
                        {`{...}`}
                    </Typography>
                    <Collapse in={expanded[key]}>
                        <Box ml={2} mt={1}>
                            <ExpandableJson data={value} isRoot={false} level={level + 1} />
                        </Box>
                    </Collapse>
                </Box>
            );
        }

        return (
            <Typography
                variant="body2"
                sx={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    display: 'inline-block',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    paddingTop: '4px',
                    paddingBottom: '4px'
                }}
            >
                {typeof value === 'string' ? value : JSON.stringify(value)}
            </Typography>
        );
    };

    if (!data) {
        return null;
    }

    if (isRoot) {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {Object.entries(data).map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row" sx={{ borderRight: borderRightStyle }}>
                                    <Typography align={'right'} variant="body1" fontWeight="bold">{key}</Typography>
                                </TableCell>
                                <TableCell>{renderValue(value, key)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <Box

        >
            {Object.entries(data).map(([key, value]) => (
                <Box key={key} display="flex" alignItems="flex-start" mb={0}
                >
                    <Box sx={{ borderRight: borderRightStyle }} >
                        <Typography
                            pt={1}
                            variant="body1" align={'right'}
                            fontWeight="bold"
                            mr={2}
                            minWidth="130px"
                        >
                            {key}
                        </Typography>
                    </Box>

                    <Box ml={1}>
                        {renderValue(value, key)}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};


const FullMetadataPopup: React.FC = () => {
    const { open, jsonData, closeDialog } = useItemMetadataStore();

    console.log('jsonData---------------', jsonData);
    return (
        <Dialog open={open && jsonData} onClose={closeDialog} maxWidth="md" fullWidth>
            <DialogTitle>-- Metadata --</DialogTitle>
            <DialogContent dividers>
                <ExpandableJson data={jsonData} />
            </DialogContent>
        </Dialog>
    );
};

export default FullMetadataPopup;
