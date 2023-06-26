import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import AppText from "../../lib/AppText";
import I18N from "../../../helper/translation";
import AppTouchableOpacity from "../../lib/AppTouchableOpacity";
import {AppColors} from "../../../assets/AppColors"
import {AppFonts} from "../../../assets/AppFonts"
import {getDynamicFontSize} from "../../../helper/Utility";
import {SetSelectedErrorLog} from '../../../actions/errorLog'
import {useTheme} from "../../../base/contexts/ThemeProvider";
import AppFlatList from "../../lib/AppFlatList";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @description Error Log List Component.
 * @since 01-04-2022
 */
const ErrorLogList = ({data}): JSX.Element => {
    // noinspection JSUnusedLocalSymbols
    const TAG = "ErrorLogList"

    const [errorLogsData, setErrorLogsData] = useState([])
    const selectedErrorLogIndex = useSelector((state: any) => +state.errorLogReducer?.selectedErrorLogDetail?.index)
    const {theme} = useTheme()

    const dispatch = useDispatch()

    useEffect(() => {
        setErrorLogsData(data)
        if (data)
            dispatch(SetSelectedErrorLog({errorLog: data[0], index: 0}))
    },[data])

    /**
     * @author Lovesh Singh.
     * @since 01-04-2022.
     * @description error log list press event handler.
     * @param errorLog pressed error log.
     * @param errorLogIndex pressed error log index.
     */
    const onPressErrorLog = (errorLog, errorLogIndex): void => {
        dispatch(SetSelectedErrorLog({errorLog: errorLog, index: errorLogIndex}))
    }

    /**
     * @author Lovesh Singh.
     * @since 01-04-2022
     * @description to render each error log Item unique key.
     * @returns {JSX.Element}
     */
    const keyExtractor = (item, index): string => index.toString()

    /**
     * @author Lovesh Singh.
     * @since 01-04-2022.
     * @description error log list empty component.
     * @returns {JSX.Element}
     */
    const renderListEmptyComponent = (): JSX.Element => {
        return (
            <View style={styles.listEmptyComponentContainer}>
                <AppText style={styles.listEmptyComponentText} text={I18N.t('NoErrorLogsFoundMsg')}/>
            </View>
        )
    }

    /**
     * @author Lovesh Singh.
     * @since 13-01-2022.
     * @description to render error log list Item.
     * @returns {JSX.Element}
     */
    const renderErrorLogItem = ({item, index}): JSX.Element => {
        const isItemSelected = selectedErrorLogIndex === index
        const itemBackgroundColor = isItemSelected ? theme?.primaryColor : undefined
        const itemTextColor = isItemSelected ? AppColors.white : theme?.textColor

        return (
                <AppTouchableOpacity
                    style={[styles.errorLogItem, {backgroundColor: itemBackgroundColor}]}
                    onPress={onPressErrorLog.bind(this, item, index)}>

                    <AppText style={[styles.errorLogText, {color: itemTextColor}]}
                             text={item?.date}/>

                </AppTouchableOpacity>
        )
    }

    return (
        <View style={styles.errorLogListContainer}>
            <AppFlatList
                contentContainerStyle={styles.listContentStyle}
                scrollEnabled={true}
                data={errorLogsData}
                keyExtractor={keyExtractor}
                extraData={errorLogsData}
                ListEmptyComponent={renderListEmptyComponent}
                renderItem={renderErrorLogItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listContentStyle: {flexGrow: 1},
    listEmptyComponentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    },
    listEmptyComponentText: {
        // color: AppColors.arsenic,
        textAlign: 'center',
        margin: 12,
        fontSize: getDynamicFontSize(18),
        fontWeight: 'bold',
        fontFamily: AppFonts.bold
    },
    errorLogListContainer: {
        flex: 1,
        padding: 8
    },
    errorLogItem: {
        marginVertical: 2,
    },
    errorLogText: {
        fontSize: getDynamicFontSize(16),
        paddingHorizontal: 8,
        paddingVertical: 4,
        textAlign: 'center',
        color: AppColors.white,
        fontFamily: AppFonts.bold
    }
})

export default React.memo(ErrorLogList, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data
})