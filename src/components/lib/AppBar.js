import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import {Appbar} from "react-native-paper";
import {useTheme} from "../../base/contexts/ThemeProvider";

/**
 * @author Vipin Joshi.
 * @since 09-12-2021.
 * @description custom AppBar Component.
 * @param style component styling.
 * @param headerStyle component inner header styling.
 * @param title appbar title.
 * @param subtitle appbar subtitle.
 * @param contentStyle component inner header content styling.
 * @param beforeContent component render before Content- title, subtitle.
 * @param afterContent component render after Content - title, subtitle.
 * @param statusBarHeight by default cover statusbar also for your custom status bar customize space before title.
 * @returns {JSX.Element}
 */
const AppBar = ({
                    style,
                    headerStyle,
                    title,
                    subtitle,
                    contentStyle,
                    beforeContent,
                    afterContent,
                    statusBarHeight
                }): JSX.Element => {

    const {theme} = useTheme()

    const [backgroundColor, setBackgroundColor] = useState(undefined)

    useEffect(() => {
        setBackgroundColor(theme?.primaryColor)
    }, [theme])

    return (
        <View style={[style]}>
            <Appbar.Header style={[headerStyle, {backgroundColor: backgroundColor}]} statusBarHeight={statusBarHeight}>
                {beforeContent ? beforeContent : null}
                {title || subtitle ? <>
                    <Appbar.Content
                        title={title}
                        style={[contentStyle]}
                        subtitle={subtitle}
                    />
                </> : null}
                {afterContent ? afterContent : null}
            </Appbar.Header>
        </View>
    );
};

export default AppBar;
