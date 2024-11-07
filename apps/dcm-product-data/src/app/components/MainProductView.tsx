import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import ProductItemsTable from './ProductItemsTable/ProductItemsTable';
import { useSearchStore } from '@ccp-dashboard/shared-ui';
import { useProductStore } from '../state/models/Product';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

export function MainProductView() {
    const searchTxt = useSearchStore(state => state.searchTxt);
    const searchType = useSearchStore(state => state.searchType);
    const fetchProductDataById = useProductStore(state => state.fetchProductDataById);
    const clearProduct = useProductStore(state => state.clearProduct);
    const productData = useProductStore(state => state.productItems);

    useEffect(() => {
        console.log('MainProductView rendered--- ', productData);
    });

    useEffect(() => {
        if (searchTxt.length > 0) {
            console.log('searchTxt---5', searchTxt);
            fetchProductDataById(searchTxt);
        } else {
            console.log('clearing product data');
            clearProduct();
        }
    }, [searchTxt, fetchProductDataById, clearProduct]);

    const handleRefresh = () => {
        // Implement the refresh logic here
        console.log('Refreshing product data');
        fetchProductDataById(searchTxt);
    };

    const renderContent = () => {
        if (searchTxt.length === 0 && productData && productData.length === 0) {
            return (
                <Paper elevation={0} sx={{ width: '100%', mt: 4 }}>
                    <Typography
                        component="div"
                        variant="subtitle1"
                        color="textSecondary"
                        sx={{ flexGrow: 1, mb: 4, mt: 4, textAlign: 'center' }}
                    >
                        Please enter search criteria to view product items.
                    </Typography>
                </Paper>
            );
        } else if (productData && productData.length > 0) {
            return (
                <>
                    <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
                        <IconButton onClick={handleRefresh}>
                            <RefreshIcon />
                        </IconButton>
                    </Grid>
                    <ProductItemsTable />
                </>
            );
        } else {
            return (
                <Paper elevation={0} sx={{ width: '100%' }}>
                    <Typography
                        component="div"
                        variant="subtitle1"
                        color="textSecondary"
                        sx={{ flexGrow: 1, mb: 4, mt: 4, textAlign: 'center' }}
                    >
                        No products items found for - {searchType.name} : {searchTxt}.
                    </Typography>
                </Paper>
            );
        }
    };

    return (
        <Grid container spacing={3}>
            {renderContent()}
        </Grid>
    );

}

export default MainProductView;
