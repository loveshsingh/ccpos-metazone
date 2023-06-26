import React, {useEffect, useState} from "react";
import {Card} from "react-native-paper";
import {useTheme} from "../../base/contexts/ThemeProvider";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @constructor
 * @description custom Card Component.
 * <br/>
 * Note: Default Card.Content add Padding Horizontal: 16. padding Bottom: 24
 * @since 23-11-2021
 */
const AppCard = ({
                     style,
                     title,
                     titleStyle,
                     subtitle,
                     subtitleStyle,
                     children,
                     childrenStyle,
                     elevation,
                     onPress
                 }): JSX.Element => {

    const {theme} = useTheme()
    const [backgroundColor, setBackgroundColor] = useState(undefined)
    const [titleColor, setTitleColor] = useState(undefined)
    const [subtitleColor, setSubtitleColor] = useState(undefined)

    useEffect(() => {
        setBackgroundColor(theme?.card?.backgroundColor)
        setTitleColor(theme?.card?.titleColor)
        setSubtitleColor(theme?.card?.subtitleColor)
    }, [theme])

    const pressProp = () => {
        onPress?.call()
    }

    return (
        <Card onPress={onPress ? pressProp : null} style={[{backgroundColor: backgroundColor}, style]}
              elevation={elevation}>

            { // if there is title or subtitle than only show card title.
                title || subtitle ? (
                    <Card.Title
                        titleStyle={[{color: titleColor}, titleStyle]}
                        title={title}
                        subtitle={subtitle}
                        subtitleStyle={[{color: subtitleColor}, subtitleStyle]}/>
                ) : null
            }

            <Card.Content style={childrenStyle}>
                {children}
            </Card.Content>
        </Card>
    )
}

export default AppCard
