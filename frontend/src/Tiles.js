import React from 'react'
import './Tiles.css'
import men_tile from './images/men_tile.png'
import women_tile from './images/women_tile.png'
import unisex_tile from './images/unisex_tile.png'
import gift_tile from './images/gift_tile.png'
import minatures_tile from './images/minatures_tile.png'
import tester_tile from './images/tester_tile.png'

function Tiles() {
    return (
        <div className='tiles'>
            <img className='tiles__img' src={men_tile} width="100%" alt=""/>
            <img className='tiles__img' src={women_tile} width="100%" alt=""/>
            <img className='tiles__img' src={unisex_tile} width="100%" alt=""/>
            <img className='tiles__img' src={gift_tile} width="100%" alt=""/>
            <img className='tiles__img' src={minatures_tile} width="100%" alt=""/>
            <img className='tiles__img' src={tester_tile} width="100%" alt=""/>
        </div>
    )
}
export default Tiles