import React, {useEffect, useState} from "react";
import {Modal} from "react-native";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @description custom Modal Component.
 * @since 29-12-2021
 */
const AppModal = ({animationType = "slide", transparent = true, onRequestClose, show, children}): JSX.Element => {

    const [visible, setVisible] = useState(show)

    useEffect(() => {
        setVisible(show)
    }, [show])

    return (
        <Modal
            animationType={animationType}
            transparent={transparent}
            visible={visible}
            onRequestClose={onRequestClose}>

            {children}

        </Modal>
    )
}

export default AppModal
