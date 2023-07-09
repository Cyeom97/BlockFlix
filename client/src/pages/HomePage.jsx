import React from 'react';
import HeroSlide from '../components/common/HeroSlide';
import tmdbConfigs from '../api/configs/tmdb.configs'

const HomePage = () => {
    return (
        <>
            <HeroSlide mediaType={tmdbConfigs.movie} mediaCategory={tmdbConfigs.mediaCategory.popular}/>
        </>
    );
    }

export default HomePage;