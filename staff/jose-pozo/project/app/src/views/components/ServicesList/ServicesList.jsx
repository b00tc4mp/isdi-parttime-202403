import { useState, useEffect } from 'react';

import { useUserProfileContext } from '../../../contexts/UserProfileProvider';

import logic from '../../../logic/index';

import Text from '../../../components/core/Text';

import ViewBox from '../../../components/library/ViewBox';

const ServicesList = () => {




    useEffect(() => {
        try { }
    }, [])


    return <>

        <ViewBox tag={'section'} className='ServicesListSection'>

            <Text>Services</Text>

            <hr className='border-1 border-fast-velvet'></hr>


        </ViewBox>

    </>
}