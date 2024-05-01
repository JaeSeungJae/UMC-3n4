import { useState } from 'react'
import React, {useEffect} from 'react'
import GridCards from '../commons/GridCards'
// import './App.css'
import { Row } from 'antd';
import MainImage from '../commons/MainImage';

function MainPage() {

    return (
        <>
        <div style={{display: 'flex', width: '100%', height: '300px', backgroundColor: 'black', margin: '10px'
        , alignContent: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
            <span style={{fontSize: '36px', color: 'white', alignContent: 'center'}}>환영합니다</span>
        </div>
        <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%', margin: '10px'}}>
            <span style={{fontSize: '36px', color: 'white', fontWeight: 'bold'}}>Find your movies!</span>
        </div>
        <div style={{display: 'flex', alignContent: 'center', alignItems: 'center', 
        justifyContent: 'center', marginTop: '30px'}}>
            <input type="text" style={{height: '50px', width: '500px', borderRadius: '50px'}}/>
        </div>
        </>
    )
}

export default MainPage
