import React from "react";
import {View} from "react-native";
import AppIcon, {Icons} from "../../components/lib/AppIcon";
import {getDynamicFontSize} from "../../helper/Utility";
import {connect} from "react-redux";
import {setShowErrorLog, setErrorLogs} from '../../actions/errorLog/index'
import {setErrorLogsAsyncStorage} from "../../storage/getAuthAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppText from "../../components/lib/AppText";
import {AppColors} from "../../assets/AppColors";
import {StorageConstant} from "../../storage";
import * as Sentry from 'sentry-expo';

export const ErrorContext = React.createContext();

/**
 * @author Lovesh Singh.
 * @since 28-03-2022.
 * @description to handle exception.
 */
class ErrorHandler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: undefined,
            showErrorLog: false,
        }
    }

    showErrorLog(error, errorInfo) {
        let errorObject = {};
        errorObject.date = new Date();
        errorObject.type = error?.name;
        errorObject.message = error?.message;
        errorObject.info = errorInfo;
        errorObject.nursery = this.props.authReducer?.sessionDetails?.shopName;
        errorObject.sessionId = this.props.authReducer?.sessionDetails?.sessionId;
        setErrorLogsAsyncStorage(errorObject, this.props.setErrorLogs)
        Sentry.Native.setTags({
            "nursery": this.props.authReducer?.sessionDetails?.shopName,
            "sessionId": this.props.authReducer?.sessionDetails?.sessionId
        })
        Sentry.Native.captureException(error)
        this.props.setShowErrorLog(true)
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        // You can also log error messages to an error reporting service here
        // crashlytics().log('Updating user count.');
        // crashlytics().recordError(error);
        this.setState({errorMessage: error.message})
        this.showErrorLog(error, errorInfo)
        // console.log("Error Info: ", error.dirname)
        // console.log("Error Logging: ", error, errorInfo)
    }

    /**
     * @author Vipin Joshi.
     * @since 17-12-2021.
     * @description to check component will re-render or not.
     */
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        return true
    }


    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                    <View style={{
                        display: 'flex',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <AppIcon type={Icons.MaterialIcons}
                                 name={'error'}
                                 color={"red"}
                                 size={getDynamicFontSize(30)}
                        />
                        <AppText style={{fontSize: getDynamicFontSize(20), color: AppColors.arsenic}}
                                 text={this.state.errorMessage}/>
                    </View>
            )
        }
        return (
            <ErrorContext.Provider value={this.showErrorLog}>
                {this.props.children}
            </ErrorContext.Provider>)
    }
}

const mapStateToProps = ({
                             homeReducer,
                             authReducer
                         }) => {
    return {
        homeReducer,
        authReducer
    };
};

const mapDispatchToProps = {
    setShowErrorLog, setErrorLogs
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler);
