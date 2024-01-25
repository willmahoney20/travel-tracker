import React, { useState } from "react"
import { TouchableWithoutFeedback } from "react-native"
import { Path } from "react-native-svg"

export default ({ themes, theme, id, title, d, lived, been, want, oneColor, openModal }) => {
    id = id.toLowerCase()
    let fill = themes[theme]['map_fill']
    // check if the map is on the progress screen or map screen
    if(oneColor){
        if(oneColor === 'lived') lived.includes(id) ? fill = '#52b788' : null
        if(oneColor === 'been') been.includes(id) ? fill = '#e63946' : null
        if(oneColor === 'want') want.includes(id) ? fill = '#ff8c61' : null
    } else {
        fill = lived.includes(id) ? '#52b788' : been.includes(id) ? '#e63946' : want.includes(id) ? '#ff8c61' : themes[theme]['map_fill']
    }

    return (
        <TouchableWithoutFeedback style={{zIndex: 1}} onPress={() => openModal(id, title)}>
            <Path
                id={id}
                d={d}
                fill={fill}
                stroke={themes[theme]['bg2']}
                strokeWidth={0.3}
            />
        </TouchableWithoutFeedback>
    )
}