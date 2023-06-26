import React from 'react';
import {
    AntDesign,
    FontAwesome,
    FontAwesome5,
    Ionicons,
    Feather,
    MaterialCommunityIcons,
    Entypo,
    MaterialIcons,
    SimpleLineIcons,
    Octicons,
    Foundation,
    EvilIcons,
    Zocial,
    Fontisto
} from '@expo/vector-icons';

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @description supported icon vendors by AppIcon Component.
 * @since 08-12-2021
 * @see https://icons.expo.fyi/ for more icons.
 */
export const Icons = {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Feather,
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Foundation,
    EvilIcons,
    Zocial,
    Fontisto
}

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @description Custom AppIcon Component.
 * @since 08-12-2021
 * @param type icon vendor name.
 * @see Icons - supported vendors.
 * @param name icon name - given by vendor.
 * @param color icon color.
 * @param size icon size - default: 24.
 * @param style icon styling.
 */
const AppIcon = ({type, name, color, size = 24, style}): JSX.Element => {
    const fontSize = 24;
    const Tag = type;
    return (
        <>
            {type && name && (
                <Tag name={name} size={size || fontSize} color={color} style={style}/>
            )}
        </>
    )
}

export default AppIcon