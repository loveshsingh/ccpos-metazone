import React, {useEffect, useRef} from 'react';
import Toast from "react-native-easy-toast";

/**
 * @author Vipin Joshi.
 * @since 09-12-2021
 * @description AppToast.
 * @returns {JSX.Element}
 // * @param ref toast reference function.
 */
const AppToast = ({ref}): JSX.Element => {

    const toastRef = useRef();
    useEffect(() => {
        ref = toastRef
    }, [toastRef])

    return (
        <>
            <Toast ref={toastRef}/>
        </>
    )
}

export default AppToast;