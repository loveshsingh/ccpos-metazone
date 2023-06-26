import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {AppStyleSheet} from "../../assets/AppStyleSheet";
import LottieView from "lottie-react-native";
import {AppColors} from "../../assets/AppColors";
import AppText from "./AppText";
import {getDynamicFontSize} from "../../helper/Utility";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @constructor
 * @description custom Button Component.
 * @since 23-11-2021
 */
const AppProgressDialog = ({visible, loadingText}): JSX.Element => {
    return (
        <Modal
            onRequestClose={() => null}
            animationType="fade"
            transparent={true}
            visible={visible}>
            <View style={AppStyleSheet.progressDialogContainer}>
                <View style={styles.container}>
                    <LottieView style={styles.loader} source={require('../../assets/animation/whiteLoader.json')} autoPlay loop/>
                    <AppText text={loadingText} style={styles.loadingText}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {width: 150, height: 150, justifyContent: 'center'},
    loader: {width: 75, height: 75, alignSelf: 'center'},
    loadingText: {textAlign: 'center', color: AppColors.azureishWhite, fontSize: getDynamicFontSize(10)}
})

export default AppProgressDialog;
