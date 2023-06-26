import React, {useEffect, useState} from "react";
import {HelperText} from "react-native-paper";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @constructor
 * @description custom Helper Text Component.
 * @since 25-11-2021
 * @see https://callstack.github.io/react-native-paper/helper-text.html For more props.
 */
const AppHelperText = ({show, text, textType}): JSX.Element => {

    const [data, setData] = useState(text)
    const [visible, setVisible] = useState(show)
    const [type, setType] = useState(textType)

    useEffect(() => {
        setData(text)
        setVisible(show)
        setType(textType)
    }, [show, text, textType])

    return (
        <HelperText type={type} visible={visible}>
            {data}
        </HelperText>
    )
}

export default AppHelperText