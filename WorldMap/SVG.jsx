import React from "react"
import Svg, { Text } from "react-native-svg"
import Path from "./Path.jsx"
import Data from "./Data.js"

export default ({ lived, been, want, oneColor, width, height, openModal }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 1010 690`}
        >
            {Data.map(({ id, title, d }) => <Path
                key={id}
                id={id}
                title={title}
                d={d}
                lived={lived}
                been={been}
                want={want}
                oneColor={oneColor}
                openModal={openModal}
            />)}
            
            {!oneColor && Data.filter(country => country.show_title).map(({id, x, y, title}) => <Text 
                key={id}
                x={x}
                y={y}
                textAnchor="middle"
                fill='#000'
                style={{ fontSize: 10, fontWeight: '500' }}
            >
                {title}
            </Text>
            )}
        </Svg>
    )
}