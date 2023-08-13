import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import MediaItem from '../components/common/MediaItem';
import Container from '../components/common/Container';
import uiConfigs from '../configs/ui.config';
import favoriteApi from '../api/modules/favorite.api';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { removeFavorite } from '../redux/features/userSlice';

const FavoriteItem = ({ media, onRemoved }) => {
    const dispatch = useDispatch();

    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if (onRequest) return;
        setOnRequest(true);
        const { response, err } = await favoriteApi.remove({favoriteId: media._id});
        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            dispatch(removeFavorite({ mediaId: media.mediaId}))
            onRemoved(media.id)
        }
    }
    return (
        <>
            <MediaItem media={media} mediaType={media.mediaType} />
            <LoadingButton
                fullWidth
                variant="contained"
                sx={{ marginTop: 2}}
                startIcon={<DeleteIcon />}
                loadingPosition='start'
                loading={onRequest}
                onClick={onRemove}
            >
                remove
            </LoadingButton>
        </>
    )
}

const FavoriteList = () => {
    
    return (
        <div>
        <h1>FavoriteList Page</h1>
        </div>
    )
}

export default FavoriteList;