import React, {useState} from 'react';
import AppFlatList from "./AppFlatList";
import {useTheme} from "../../base/contexts/ThemeProvider";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description base progress loader.
 * @since 25-02-2022
 */
const AppProgressLoader = ({totalItems, listColumns = 1, renderItem, itemsDirection}): JSX.Element => {

    const flatListData = useState(Array.from(Array(totalItems).keys()))[0]
    const {theme} = useTheme()

    /**
     * @author Lovesh Singh.
     * @since 25-02-2022
     * @description to render each Product Item unique key.
     * @returns {JSX.Element}
     */
    const keyExtractor = (item, index): string => index.toString()


    return (
        <AppFlatList
            data={flatListData}
            keyExtractor={keyExtractor}
            numColumns={listColumns}
            renderItem={renderItem}
            style={{flexGrow: 0}}
            contentContainerStyle={{flexDirection: itemsDirection, backgroundColor: theme?.backgroundColor}}
        />
    );
}


export default AppProgressLoader;
