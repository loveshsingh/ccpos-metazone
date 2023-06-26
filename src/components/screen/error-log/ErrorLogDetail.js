import React from 'react';
import {StyleSheet, ScrollView, View} from "react-native";
import {useSelector} from "react-redux";
import AppText from "../../lib/AppText";
import {getDynamicFontSize} from "../../../helper/Utility";
import {AppFonts} from "../../../assets/AppFonts";
import I18N from "../../../helper/translation";
import {AppColors} from "../../../assets/AppColors";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @description Error Log Detail Component.
 * @since 01-04-2022
 */
const ErrorLogDetail = (): JSX.Element => {
    // noinspection JSUnusedLocalSymbols
    const TAG = "ErrorLogDetail"

    const selectedErrorLog = useSelector((state: any) => state.errorLogReducer?.selectedErrorLogDetail?.errorLog);

    return (
        selectedErrorLog ?
            (<ScrollView style={styles.errorLogDetailContainer}>
                <AppText text={selectedErrorLog?.message} style={{fontSize: getDynamicFontSize(15), fontFamily: AppFonts.bold}}/>
                <AppText text={selectedErrorLog?.info?.componentStack}/>
            </ScrollView>) :
            (
                <View style={styles.emptyComponentContainer}>
                    <AppText
                        style={styles.emptyComponentText}
                        text={I18N.t("NoErrorDetailsFoundMsg")}
                    />
                </View>
            )
    )
}

const styles = StyleSheet.create({
    errorLogDetailContainer: {
        flex: 1,
        padding: 12,
    },
    emptyComponentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
    },
    emptyComponentText: {
        // color: AppColors.arsenic,
        textAlign: "center",
        fontSize: getDynamicFontSize(18),
        fontWeight: "bold",
        fontFamily: AppFonts.bold,
    },
})

export default React.memo(ErrorLogDetail, () => true)
