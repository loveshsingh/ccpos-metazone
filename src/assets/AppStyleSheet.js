import { StyleSheet} from 'react-native';
import { AppColors } from "./AppColors";
import {width, height, getDynamicFontSize} from "../helper/Utility";
import { Constant } from "../helper/constant";

export const AppStyleSheet = StyleSheet.create({
    SplashScreenContainer: {
        alignSelf: "stretch",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        width: "100%",
        height: "100%",
        backgroundColor:AppColors.colorBackgroundWhite
    },
    SplashScreenLogo: {
        alignContent: "center",
        alignSelf: "center",
        height: height / 4,
        width: height / 4,
        justifyContent: "center",
        alignItems: "center",
    },
    SplashScreenBottomLoader: {
        marginTop: 20,
        width: Constant.HORIZONTAL_PROGRESS_WIDTH,
        height: Constant.HORIZONTAL_PROGRESS_HEIGHT
    },
    LoginPageMainContainerstyle: {
        backgroundColor: AppColors.colorBackgroundWhite,
        flex: 1,
        width: width / 3,
        maxHeight: height >700 ? height/2 : height / 1.5,
        padding: 20
    },
    KeyBoardViewStyle: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        alignSelf: "stretch",
    },
    TextStyleBig: {
        fontSize: getDynamicFontSize(Constant.TEXT_SIZE_BIG),
        color: AppColors.textColorPrimary,
        justifyContent:"center",
        alignContent:"center",
        alignSelf:"center"
    },

    TextStyleBigAndBold: {
        fontWeight: "bold",
        fontSize: getDynamicFontSize(Constant.TEXT_SIZE_BIG),
        color: AppColors.textColorPrimary,
        justifyContent:"center",
        alignContent:"center",
        alignSelf:"center"

    },
    progressDialogContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressDialogContent: {
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        width: "60%",
        borderRadius: 10,
    },
    progressDialogLoading: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    progressDialogLoader: {
        flex: 1,
    },
    progressDialogLoadingContent: {
        flex: 3,
        alignSelf: 'center',
    },
    progressDialogTextHeaderStyle:{
        fontSize:getDynamicFontSize(22),
        // fontWeight: 'bold',
    },
    DashboardPageCardContainerstyle: {
        backgroundColor: AppColors.colorBackgroundWhite,
        flex: 1,
        width: (width / 3)-10,
        maxWidth:(width / 3)-10,
        borderColor:"#E0E0E0",
        borderWidth:0.75,
        marginBottom:2,
        marginRight:2,
        marginTop:2,
        marginLeft:2,
    },
    scrollviewStyle:{
        // flex:1,
        // flexGrow: 1,
        alignContent:'flex-start',
        alignSelf:'flex-start',
        justifyContent:'flex-start',
        alignItems:'flex-start',
      }
    


});