/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description to hold app utilities.
 */
import {
    Alert,
    AlertButton,
    AlertOptions,
    Dimensions,
    PixelRatio,
    Platform,
} from "react-native";
import {getUniqueId} from "react-native-device-info";
import * as Network from "expo-network";
import {NetworkStatus} from "../network/NetworkConnection";
import moment from "moment";
import I18N from "./translation";
import {getCustomerById, getDistrictById} from "../storage/Schema_Helpers";
import * as Print from "expo-print";
import {Constant} from "./constant";

export const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    scale,
} = Dimensions.get("window");
export const width = SCREEN_WIDTH;
export const height = SCREEN_HEIGHT;
/*export const gstTamilNaduStartDigit: number = 33
export const gstKarnatakaStartDigit: number = 29
export const serverTamilNaduId: number = 607
export const serverKarnatakaId: number = 593*/

/*export const printCurrentAsyncStorage = () => {
    AsyncStorage.getAllKeys().then((keys) => {
        return AsyncStorage.multiGet(keys)
            .then((currentAsyncStorageDetails) => {
                console.log('Utility.js currentAsyncStorageDetails  --> ', currentAsyncStorageDetails);
            });
    });
}*/
/*
/!**
 * @author Vipin Joshi
 * @since 22-07-2021
 * @description to get default JSON farm region Object.
 *!/
export const defaultFarm = () => {
    return {
        id: '',
        type: '',
        name: '',
        street: '',
        street2: '',
        city: '',
        state: {
            id: -1,
            name: '',
        },
        postcode: '', //zip code
        taluk: {
            id: -1,
            name: '',
        },
        district: {
            id: -1,
            name: '',
        },
        village: {
            id: -1,
            name: '',
        },
        country: {
            id: -1,
            name: '',
            vat_label: ''
        },
        is_farmer: false,
        is_vendor: false,
        is_cash_vendor: false,
        is_meditator: false,
        isSynced: false,
        isOffline: false
    }
}
*/
/**
 * @author Vipin Joshi
 * @since 22-07-2021
 * @description to get default JSON country region Object.
 */
export const defaultCountry = () => {
    return {
        id: -1,
        name: "",
        vat_label: "",
    };
};
/**
 * @author Vipin Joshi
 * @since 22-07-2021
 * @description to get default JSON village region Object.
 */
export const defaultVillage = () => {
    return {
        id: -1,
        name: "",
    };
};
/**
 * @author Vipin Joshi
 * @since 22-07-2021
 * @description to get default JSON village region Object.
 */
export const defaultDistrict = () => {
    return {
        id: -1,
        name: "",
    };
};
/**
 * @author Vipin Joshi
 * @since 22-07-2021
 * @description to get default JSON state region Object.
 */
export const defaultState = () => {
    return {
        id: -1,
        name: "",
    };
};
/**
 * @author Vipin Joshi
 * @since 22-07-2021
 * @description to get default JSON taluk Object.
 */
export const defaultTaluk = () => {
    return {
        id: -1,
        name: "",
    };
};

/**
 * @author Lovesh Singh
 * @since 27-01-2021
 * @description to get Density Independent Pixel of given points.
 */
export const getDynamicFontSize = (size: number) => {
    size += 4;

    const dynamicScale = width / 1024;
    const newSize =
        (PixelRatio.getPixelSizeForLayoutSize(size) * dynamicScale) / scale;
    if (Platform.OS === "ios") {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

/*
/!**
* @author Vipin Joshi
* @since 07-07-2021
* @description to get default JSON customer Object.
*!/
export const defaultCustomer = () => {
   return {
       id: -1,
       name: '',
       email: '',
       phone: '',
       whatsAppNo: '',
       street: '',
       city: '',
       postcode: '',
       barcode: '',
       tax: '',
       aadhaarNo: '',
       panNo: '',
       farmLandArea: '',
       farmAddress: '',
       country: defaultCountry(),
       state: defaultState(),
       district: defaultDistrict(),
       taluk: defaultTaluk(),
       village: defaultVillage(),
       villageText: '',
       farmList: [],
       isOffline: false,
       isSynced: false
   }
}*/

/**
 * @author Vipin Joshi
 * @since 03-08-2021
 * @description to get default payment method details.
 */
/*export const defaultPaymentMethodDetails = () => {
    return {
        transactionId: '',
        transactionDate: undefined,
        bankName: '',
        branchName: '',
        ccApprovalCode: ''
    }
}*/

/**
 * @author Vipin Joshi
 * @since 22-07-2021
 * @description to check passed value is valid string.
 */
/*export const isString = (value) => {
    return value && typeof (value) == 'string'
}*/

/*export const isEmptyObject = (obj) => {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
};*/

export const objectHasProperty = (object, propertyName) => {
    if (object == null) return false;
    if (object.length === 0) return false;
    if (hasOwnProperty.call(object, propertyName)) {
        return object[propertyName] !== undefined;
    } else {
        return false;
    }
};

export const isNetworkAvailable = (): Promise =>
    new Promise(async (resolve, reject) => {
        await Network.getNetworkStateAsync().then((state) => {
            console.log("GET NETWORK STATE", state);
            // "isConnected": true, "isInternetReachable": true, "type": "CELLULAR",
            resolve(state.isConnected);
        });
        /*NetInfo.fetch().then(async state => {
                resolve(state.isConnected)
            })*/
    });

/**
 * @author Vipin Joshi
 * @param before value
 * @param after value
 * @param separator value, default: Empty String.
 * @returns {string}
 * @since 30-06-2021
 */
/*export const appendString = (before: string, after: string, separator: string = '') => {
    return before + separator + after;
};*/
/*

/!**
 * @author Vipin Joshi
 * @param data to be send on printing app.
 * @param callback called when success.
 * @description method will open printing app & pass specified data.
 * @since 30-06-2021
 *!/
export const openPrintApp = async (data, callback?: Function): void => {
    let SendIntentAndroid = require("react-native-send-intent");
    SendIntentAndroid.openApp("com.qd.wash", {
        "com.qd.wash.data": data,
    }).then(wasOpened => {
        console.log('AAAAAAAAAAAAAAA', wasOpened)
    }).finally(callback);
}

*/
/**
 * @author Vipin Joshi
 * @param value string
 * @description to check passed value string is valid numeric (integer, float) string e.g. 0, 0.1
 * @since 15-07-2021
 */
export const isValidNumber = (value: string): boolean => {
    return value && !value.match(/^[+-]?\d+(\.\d+)?$/);
};

/**
 * @author Vipin Joshi.
 * @param value string.
 * @description to check passed value string is valid GST Number e.g.: 99AAAAA9999A9A(9/A) 33AABCU9603R1ZU 33AABCU9603R1Z5.
 * @since 26-07-2021.
 */
/*export const isValidGST = (value: string): boolean => {
    return value && value.match(/^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9a-zA-Z]){1}?$/)
}*/

/**
 * @author Vipin Joshi.
 * @param value Object holding key as a string & any type value.
 * @param valuePrefix string that would be append at start of value.
 * @param valuePostfix string that would be append at end of value.
 * @param join string that would be append in between of object elements.
 * @return string for db LIKE query.
 * @description to convert DB Object to Like String format.
 * @since 13-08-2021.
 */
export const convertObjectToLikeQuery = (
    value: { [key: string]: any },
    valuePrefix: string,
    valuePostfix: string,
    join: string
): string => {
    let returnValue = "";
    Object.keys(value).forEach((key, index) => {
        if (index > 0) {
            returnValue += join;
        }
        returnValue +=
            key + ' LIKE[c] "' + valuePrefix + value[key] + valuePostfix + '"';
    });
    return returnValue;
};

/**
 * @author Vipin Joshi
 * @description method will generate order printing String.
 * @since 30-06-2021
 * @param agent current agent.
 * @param nursery current nursery.
 * @param orderData Order JSON data.
 * @param withDiscount default: false.
 */
/*export const getOrderPrintFormat = (agent, nursery, orderData, withDiscount: boolean = false): string => {
    let AGENT_NAME = agent;
    let NURSERY_NAME = nursery;
    // Formatting & Sending Receipt data
    // orderData = JSON.parse(orderData.orderDetailsString);
    let CUSTOMER_NAME = orderData.partner_name
    let BILL_NO = orderData.id
    let SERIAL_NO = orderData.reference_seq_no
    let DATE = moment(orderData.creation_date).format('DD/MM/yyyy');//"10/06/2021";
    let TIME = moment(orderData.creation_date).format('hh:mm:ss');
    let PHONE_NUM = orderData.partner_phone === undefined ? "" : orderData.partner_phone;//"7904419812";
    let SIZE = orderData.lines.length;// DONT KNOW ABOUT THIS VAR its in bracket with particular name
    let PARTICULAR = ""
    let SPACE_STR = "      "
    // let SPACE_STR_30 = "                        "
    let SPACE_STR_10 = "          "
    let TOTAL_QUANTITY = 0
    let TOTAL_AMOUNT = 0.00
    let DISCOUNT_APPLIED = 0
    let DISCOUNTED_TOTAL = orderData.amount_total
    let CHANGE = 0.00
    let CASH = orderData.amount_paid
    console.log("orderData--------------->", orderData)
    //"Isha Outreach\nVelliangiri Foothills, Ishana Vihar Post,\nCoimbatore , Tamil Nadu (IN)\nIndia , 641114\ncontactus@ishaoutreach.org\nhttps://ishaoutreach.org/\n--------------------------------\n\nBill of Supply\n\nTo: Balaji Selvam\nBill No: 00476-001-0001\nDate & Time: "+DATE+", "+TIME+"\nPhone No: "+PHONE_NUM+"\n\nS.No" + SPACE_STR + "Particulars" + SPACE_STR + "Qty" + SPACE_STR + "Rate" + SPACE_STR + "Amount\n1" + SPACE_STR + "Avalanda (3)" + SPACE_STR + "1" + SPACE_STR + "50.00" + SPACE_STR + "50.00\n2" + SPACE_STR + "Avalanda (2)" + SPACE_STR + "1" + SPACE_STR + "40.00" + SPACE_STR + "40.00\n3" + SPACE_STR + "Avalanda (1)" + SPACE_STR + "1" + SPACE_STR + "30.00" + SPACE_STR + "30.00\n4" + SPACE_STR + "Badam (2)" + SPACE_STR + "1" + SPACE_STR + "40.00" + SPACE_STR + "40.00\n5" + SPACE_STR + "Badam (5)" + SPACE_STR + "1" + SPACE_STR + "75.00" + SPACE_STR + "75.00\n6" + SPACE_STR + "Badam (1)" + SPACE_STR + "1" + SPACE_STR + "30.00" + SPACE_STR + "30.00\n\nTOTAL" + SPACE_STR + "Rs 265.00\nCHANGE" + SPACE_STR + "₹ 846.00\nCash" + SPACE_STR + "₹ 1,111.00\n\nFor Isha Outreach\n--------------------------------\nServed by Administrator\nPilamedu\n";
    let HTML_DEMO = "                Isha Outreach\n\n    Velliangiri Foothills, Ishana Vihar Post,\n           Coimbatore, Tamil Nadu (IN)\n                 India, 641114\n" +
        /!*"          contactus@ishaoutreach.org\n           https://ishaoutreach.org/\n" +*!/
        "       --------------------------------\n\n               Bill of Supply\n\nTo: " + CUSTOMER_NAME + "\nRef No: " + BILL_NO + "\nBill No: " + SERIAL_NO + "\nDate & Time: " + DATE + ", " + TIME + "\nPhone No: " + PHONE_NUM + "\n\n\nS.No  " + "Particulars" + "    " + "Qty" + "     " + "Rate" + SPACE_STR + "   " + "Amount\n";//"1" + SPACE_STR + "Avalanda (3)" + SPACE_STR + "1" + SPACE_STR + "50.00" + SPACE_STR + "50.00\n2" + SPACE_STR + "Avalanda (2)" + SPACE_STR + "1" + SPACE_STR + "40.00" + SPACE_STR + "40.00\n3" + SPACE_STR + "Avalanda (1)" + SPACE_STR + "1" + SPACE_STR + "30.00" + SPACE_STR + "30.00\n4" + SPACE_STR + "Badam (2)" + SPACE_STR + "1" + SPACE_STR + "40.00" + SPACE_STR + "40.00\n5" + SPACE_STR + "Badam (5)" + SPACE_STR + "1" + SPACE_STR + "75.00" + SPACE_STR + "75.00\n6" + SPACE_STR + "Badam (1)" + SPACE_STR + "1" + SPACE_STR + "30.00" + SPACE_STR + "30.00\n\nTOTAL" + SPACE_STR + "Rs 265.00\nCHANGE" + SPACE_STR + "₹ 846.00\nCash" + SPACE_STR + "₹ 1,111.00\n\nFor Isha Outreach\n--------------------------------\nServed by Administrator\nPilamedu\n";

    for (let i = 1; i <= SIZE; i++) {
        //TOTAL = TOTAL + RATE;
        let itemQty = +orderData.lines[i - 1].qty;
        DISCOUNT_APPLIED += orderData.lines[i - 1].discount * itemQty
        console.log("Discount on give item ---> ", orderData.lines[i - 1].discount)

        TOTAL_AMOUNT += parseFloat(orderData.lines[i - 1].price_unit) * itemQty
        TOTAL_QUANTITY += itemQty;
        PARTICULAR = orderData.lines[i - 1].display_name;
        HTML_DEMO = HTML_DEMO + i + (i < 10 ? ".   " : ".  ");
        /////////////////////
        let length_String = PARTICULAR.length;
        while (PARTICULAR.length > 13) {
            HTML_DEMO = HTML_DEMO + PARTICULAR.substring(0, 13) + "\n     ";
            PARTICULAR = PARTICULAR.substring(13, length_String);
        }
        HTML_DEMO = HTML_DEMO + PARTICULAR;
        let length = 16 - PARTICULAR.length; // 16 OR 22 DEPENDS ON how many times SPACE_STR var. used between particulars and qty i have used 2 times
        while (length > 0) {
            HTML_DEMO = HTML_DEMO + " ";
            length--;
        }
        let ITEM_RATE = /!*+orderData.lines[i - 1].price_unit - +orderData.lines[i - 1].discount*!/ +orderData.lines[i - 1].price_unit
        HTML_DEMO = HTML_DEMO + itemQty + (itemQty < 10 ? "    " : "") + (itemQty < 100 && itemQty > 10 ? "   " : "") + (itemQty < 1000 && itemQty > 100 ? "  " : "") + (itemQty < 10000 && itemQty > 1000 ? " " : "") + "   " +
            ITEM_RATE + (ITEM_RATE < 10 ? "  " : "") + ((ITEM_RATE < 100) && (ITEM_RATE > 10) ? " " : "") + "   " +
            ((orderData.lines[i - 1].price_subtotal_incl) < 10 ? "      " : "") + ((orderData.lines[i - 1].price_subtotal_incl) < 100 && (orderData.lines[i - 1].price_subtotal_incl) > 10 ? "     " : "") + ((orderData.lines[i - 1].price_subtotal_incl) < 1000 && (orderData.lines[i - 1].price_subtotal_incl) > 100 ? "    " : "") + ((orderData.lines[i - 1].price_subtotal_incl) < 10000 && (orderData.lines[i - 1].price_subtotal_incl) > 1000 ? "   " : "") + (((orderData.lines[i - 1].price_subtotal_incl)) < 100000 && (orderData.lines[i - 1].price_subtotal_incl) > 10000 ? "  " : "") + ((orderData.lines[i - 1].price_subtotal_incl) < 1000000 && (orderData.lines[i - 1].price_subtotal_incl) > 100000 ? " " : "") + (orderData.lines[i - 1].price_subtotal_incl) + ".00\n";//AMOUNT
        if (i === SIZE) {//length (last index)

            CHANGE = CASH - DISCOUNTED_TOTAL
            HTML_DEMO = HTML_DEMO + "\n" + SPACE_STR_10 + "ITEMS" + (SIZE < 10 ? "                            " : "") + (SIZE < 100 && SIZE > 10 ? "                           " : "") + (SIZE < 1000 && SIZE > 100 ? "                          " : "") + (SIZE < 10000 && SIZE > 1000 ? "                         " : "") + " " + SIZE // TOTAL ITEMS
            HTML_DEMO = HTML_DEMO + "\n" + SPACE_STR_10 + "QUANTITY" + (TOTAL_QUANTITY < 10 ? "                         " : "") + (TOTAL_QUANTITY < 100 && TOTAL_QUANTITY > 10 ? "                        " : "") + (TOTAL_QUANTITY < 1000 && TOTAL_QUANTITY > 100 ? "                       " : "") + (TOTAL_QUANTITY < 10000 && TOTAL_QUANTITY > 1000 ? "                      " : "") + " " + TOTAL_QUANTITY
            HTML_DEMO = HTML_DEMO + "\n" + SPACE_STR_10 + "TOTAL AMOUNT" + (TOTAL_AMOUNT < 10 ? "                  " : "") + (TOTAL_AMOUNT < 100 && TOTAL_AMOUNT > 10 ? "                 " : "") + (TOTAL_AMOUNT < 1000 && TOTAL_AMOUNT > 100 ? "                " : "") + (TOTAL_AMOUNT < 10000 && TOTAL_AMOUNT > 1000 ? "               " : "") + (TOTAL_AMOUNT < 100000 && TOTAL_AMOUNT > 10000 ? "              " : "") + (TOTAL_AMOUNT < 1000000 && TOTAL_AMOUNT > 100000 ? "             " : "") + " Rs " + TOTAL_AMOUNT
            /!*HTML_DEMO = HTML_DEMO + "\n" + SPACE_STR_10 + "TOTAL" + (TOTAL_AMOUNT < 10 ? "                         " : "") + (TOTAL_AMOUNT < 100 && TOTAL_AMOUNT > 10 ? "                        " : "") + (TOTAL_AMOUNT < 1000 && TOTAL_AMOUNT > 100 ? "                       " : "") + (TOTAL_AMOUNT < 10000 && TOTAL_AMOUNT > 1000 ? "                      " : "") + (TOTAL_AMOUNT < 100000 && TOTAL_AMOUNT > 10000 ? "                     " : "") + (TOTAL_AMOUNT < 1000000 && TOTAL_AMOUNT > 100000 ? "                    " : "") + " Rs " + TOTAL_AMOUNT*!/

            HTML_DEMO += withDiscount ? ("\n" + SPACE_STR_10 + "DISCOUNT APPLIED" + (DISCOUNT_APPLIED < 10 ? "             " : "") + (DISCOUNT_APPLIED < 100 && DISCOUNT_APPLIED > 10 ? "             " : "") + (DISCOUNT_APPLIED < 1000 && DISCOUNT_APPLIED > 100 ? "             " : "") + (DISCOUNT_APPLIED < 10000 && DISCOUNT_APPLIED > 1000 ? "              " : "") + " Rs " + DISCOUNT_APPLIED +
                "\n" + SPACE_STR_10 + "DISCOUNTED TOTAL" + (DISCOUNTED_TOTAL < 10 ? "          " : "") + (DISCOUNTED_TOTAL < 100 && DISCOUNTED_TOTAL > 10 ? "          " : "") + (DISCOUNTED_TOTAL < 1000 && DISCOUNTED_TOTAL > 100 ? "          " : "") + (DISCOUNTED_TOTAL < 10000 && DISCOUNTED_TOTAL > 1000 ? "           " : "") + (DISCOUNTED_TOTAL < 100000 && DISCOUNTED_TOTAL > 10000 ? "          " : "") + (DISCOUNTED_TOTAL < 1000000 && DISCOUNTED_TOTAL > 100000 ? "         " : "") + " Rs " + DISCOUNTED_TOTAL) : ""

            HTML_DEMO +=    /!*"\n" + SPACE_STR_10 + "CHANGE" + SPACE_STR + "Rs " + CHANGE +
                "\n" + SPACE_STR_10 + "CASH  " + SPACE_STR + "Rs " + CASH +*!/
                "\n\n\n               For Isha Outreach\n       --------------------------------\n"

            for (let j = 1; j <= (24 - Math.round(("Served by" + AGENT_NAME).length / 2)); j++) {
                HTML_DEMO = HTML_DEMO + " ";
            }
            HTML_DEMO = HTML_DEMO + "Served by " + AGENT_NAME + "\n"
            for (let k = 1; k <= (24 - Math.round((NURSERY_NAME).length / 2)); k++) {
                HTML_DEMO = HTML_DEMO + " ";
            }
            HTML_DEMO = HTML_DEMO + NURSERY_NAME + "\n";
        }

    }
    console.log("ORDER PRINTING DATA:")
    console.log(HTML_DEMO)
    return HTML_DEMO
}*/

/**
 * @author Vipin Joshi.
 * @since 23-08-2021.
 * @param title dialog title.
 * @param description dialog message.
 * @param cancelButtonHandler cancel button handler.
 * @param retryButtonHandler retry button handler.
 * @param options alert dialog options.
 */
export const showNetworkRetryDialog = (
    title: string,
    description: string,
    cancelButtonHandler: Function,
    retryButtonHandler: Function,
    options = {cancelable: false}
) => {
    Alert.alert(
        title,
        description,
        [
            {
                text: I18N.t("CancelAction"),
                style: "cancel",
                onPress: cancelButtonHandler,
            },
            {
                text: I18N.t("RetryButtonLabel"),
                style: "cancel",
                onPress: retryButtonHandler,
            },
        ],
        options
    );
};

/**
 * @author Vipin Joshi.
 * @since 30-08-2021.
 * @param title dialog title.
 * @param description dialog message.
 * @param buttons dialog control buttons.
 * @param options alert dialog options.
 */
export const showAlertDialog = (
    title: string,
    description?: string,
    buttons?: AlertButton[],
    options: AlertOptions = {cancelable: false}
) => {
    Alert.alert(title, description, buttons, options);
};

/**
 * @author Vipin Joshi.
 * @since 23-08-2021.
 * @description to show Error message.
 * @param title dialog title.
 * @param message dialog message.
 */
export const showErrorMessage = (title: string, message: string = "") => {
    Alert.alert(title, message);
};

/*
/!**
 * @author Vipin Joshi.
 * @since 25-08-2021.
 * @description to show Error Toast message.
 * @param message dialog message.
 * @param duration toast duration default: 5000
 * <p>
 *     To use this user must've to bind current component instance with this method.
 *     </p>
 *!/
export const showErrorToast = (message: string = ''): void => {
    this.toast.show(message)
}

/!**
 * @author Vipin Joshi.
 * @since 25-08-2021.
 * @description to show simple Toast message.
 * @param message dialog message.
 * @param duration toast duration default: 3000
 *!/
export const showSimpleToast = (message: string = '', duration: number = 3000): void => {
    Toasts.show(message, duration)
}
*/

/**
 * @author Vipin Joshi.
 * @since 24-08-2021.
 * @param error details
 * @param description error description, default: Something went wrong.
 * @description to handle errors.
 */
export const errorHandler = (error, description?: string) => {
    console.log("handling Error");
    console.log(error);
    console.log(description);
    if (error?.status === NetworkStatus.REQUEST_TIMEOUT) {
        error.message = error.message
            ? error.message
            : I18N.t("InternetConnectionProblemMsg");
        showErrorMessage(error.message, description ? description : "");
    } else if (error.status && error.message) {
        showErrorMessage(
            error.status + "  " + error.statusText,
            description ? description : error.message
        );
    } else if (error.message) {
        showErrorMessage(error.message, description ? description : "");
    } else {
        showErrorMessage(
            error.status + "  " + error.statusText,
            description
                ? description
                : I18N.t("SomethingWentWrongTryAfterSomeTimeMsg")
        );
    }
};

/**
 * @author Vipin Joshi.
 * @since 24-08-2021.
 * @param error details
 * @param description error description, default: Something went wrong.
 * @description to handle errors & show as a toast.
 */
/*export const showErrorToast = (error, description?: string): void => {
    console.log("handling Error")
    console.log(error)
    console.log(description)
    if (error?.status === NetworkStatus.REQUEST_TIMEOUT) {
        error.message = error.message ? error.message : I18N.t('LogoutAlertMsgMsg')
        showErrorMessage(error.message, description ? description : '')
    } else if (error.status && error.message) {
        showErrorMessage(error.status + "  " + error.statusText, description ? description : error.message)
    } else if (error.message) {
        showErrorMessage(error.message, description ? description : '')
    } else {
        showErrorMessage(error.status + "  " + error.statusText, description ? description : I18N.t('SomethingWentWrongTryAfterSomeTime')
    }
}*/

/**
 * @author Vipin Joshi.
 * @since 25-08-2021.
 * @description to convert date.
 * @param date selected date.
 * @param format date conversion pattern.
 */
export const convertDate = (date: Date, format: string): moment.Moment => {
    return moment(date, format);
};

/**
 * @author Vipin Joshi
 * @description to check order is normal or complimentary (entire cart will be sold as 0).
 * @since 25-10-2021
 * @param orderData Order JSON data.
 * @return boolean true, if order data is complementary.
 */
export const isOrderComplimentary = (orderData): boolean => {
    const DISCOUNTED_TOTAL = orderData.amount_total; // total amount have to pay.
    return DISCOUNTED_TOTAL <= 0; // total amount will be 0 if order hold only free products.
};

/**
 * @author Vipin Joshi.
 * @since 14-09-2021.
 * @description to generate order serial number.
 * @param serialIndex static order serial index.
 * @param currentNurseryPrefix nursery short name prefix.
 * @return order serial number.
 */
export const generateOrderSerialNo = (
    serialIndex: string,
    currentNurseryPrefix: string
): string => {
    let deviceId = getUniqueId();

    if (deviceId.length < 7) {
        // if somehow device id < 7 character.
        deviceId = deviceId + "0".repeat(7 - deviceId.length); // repeat 0 for rest of the characters.
    } else {
        deviceId = deviceId.substr(0, 7); // device id hold maximum 7 character.
    }

    /*console.log("....................Device Id: " + deviceId)*/

    let serialIndexPrefix = "";
    if (serialIndex.length < 6) {
        serialIndexPrefix = "0".repeat(6 - serialIndex.length);
    }
    // return deviceId + '-' + serialIndexPrefix + serialIndex
    return (
        currentNurseryPrefix +
        "-" +
        deviceId +
        "-" +
        serialIndexPrefix +
        serialIndex
    );
};

/**
 * @author Vipin Joshi.
 * @since 16-09-2021.
 * @description to show print popup.
 * @param orderData Order Data.
 * @param withoutDiscountCallback without discount pressed callback.
 * @param withDiscountCallback with discount pressed callback.
 */
/*export const showPrintReceiptPopup = (orderData, withoutDiscountCallback: Function | undefined, withDiscountCallback: Function | undefined): void => {
    showAlertDialog("Print receipt for " + orderData?.reference_seq_no, '',
        [
            {
                text: "Without Discount Info", style: "cancel",
                onPress: debounce(InteractionManager.runAfterInteractions.bind(this, withoutDiscountCallback))
            },
            {
                text: "With Discount Info", style: "cancel",
                onPress: debounce(InteractionManager.runAfterInteractions.bind(this, withDiscountCallback))
            }
        ])
}*/

/*
export const showReactCompToast = () => {
    this.refs.toast.show(StringConstants.InternetConnectionProblemMsg, 5000)
}
export class objectHasProperty {
}*/

/**
 * @author Vipin Joshi
 * @since 22-07-2021
 * @description to check passed value is valid string.
 */
export const isString = (value): boolean => {
    return value && typeof value == "string";
};

/**
 * @author Vipin Joshi
 * @since 15-12-2021
 * @description to check passed value is valid number.
 */
export const isNumber = (value): boolean => {
    return value && typeof value == "number";
};

/**
 * @author Vipin Joshi
 * @since 04-01-2022
 * @description to check passed value is valid array.
 */
export const isArray = (value): boolean => {
    return value && Array.isArray(value);
};

/**
 * @author Vipin Joshi
 * @since 23-12-2021
 * @description to check passed value is valid float number.
 */
export const isFloat = (value): boolean => {
    return value && value.includes(".");
};

/**
 * @author Vipin Joshi
 * @since 23-12-2021
 * @description to get total digits on a number.
 */
export const getLength = (value): number => {
    return value.toString().length;
};

/**
 * @author Vipin Joshi
 * @since 24-12-2021
 * @description to get value after first decimal point.
 */
export const getValueAfterDecimal = (value): string => {
    return parseFloat(value)
        .toString()
        .substring(value.toString().indexOf(".") + 1);
};

/**
 * @author Vipin Joshi
 * @since 23-12-2021
 * @description to check passed value is valid integer number.
 */
export const isInt = (value): boolean => {
    return value && +value % 1 === 0;
};

/**
 * @author Vipin Joshi.
 * @since 15-12-2021.
 * @description to check active session is current day session or not.
 * @param sessionDetails active session details.
 * @return {boolean} true/false.
 */
export const isCurrentDateSession = (sessionDetails: any): boolean => {
    const sessionStartAt = sessionDetails?.sessionStartAt;
    if (sessionStartAt) {
        const parts = sessionStartAt.split(" ")[0].split("-");
        const sessionStartDate = new Date(parts[0], parts[1] - 1, parts[2]);
        const currDate = new Date();
        currDate.setHours(0, 0, 0, 0);
        return sessionStartDate.getTime() === currDate.getTime();
    }
};

/**
 * @author Vipin Joshi.
 * @since 27-09-2021.
 * @param str String to split.
 * @param count minimum number of characters count in return each string.
 * @return {RegExpMatchArray} Array of split strings.
 */
export const splitString = (
    str: string,
    count: number
): RegExpMatchArray | null => {
    // /.{1, 10}/g
    const regex = RegExp(".{1," + count + "}", "g");
    return str.match(regex);
};

/**
 * @author Lovesh Singh
 * @description method will generate order printing String.
 * @since 08-02-2022
 * @param agent current agent.
 * @param nursery current nursery.
 * @param orderData Order JSON data.
 * @param sessionDetails Session Details.
 * //todo need to check complimentary string
 */
export const getOrderPrintFormat = async (agent: string, nursery: string, orderData: any, sessionDetails: any) => {
    const isComplementary: boolean = orderData.discount_remarks === "Complementary";

    console.log("Order data: ", agent, nursery, sessionDetails)

    if (isComplementary) {
        const complementaryPromise = new Promise(async (resolve, reject) => {
            await getCustomerById(orderData.partner_id).then(
                (customer) => {
                    getDistrictById(customer.district_id).then(
                        (district) => {
                            resolve({customer: customer, district: district});
                        },
                        (error) => {
                            console.log("getOrderDebitNote", "District Error", error);
                            resolve({customer: customer, district: error});
                        }
                    );
                },
                (error) => {
                    console.log("getOrderDebitNote", "Customer By Id Error", error);
                    reject(error);
                }
            );
        });
        return await complementaryPromise.then(
            (value: { customer: {}, district: {} }) => {
                console.log("generate complimentary bill");
                return generateOrderBill(
                    agent,
                    nursery,
                    orderData,
                    isComplementary,
                    sessionDetails,
                    value.customer,
                    value.district
                );
            }
        );

    } else {
        console.log("generate normal bill");
        return generateOrderBill(
            agent,
            nursery,
            orderData,
            isComplementary,
            sessionDetails,
        );
    }
};

/**
 * @author Lovesh Singh
 * @description method will generate order bill String.
 * @since 08-02-2022
 * @param agent current agent.
 * @param nursery current nursery.
 * @param orderData Order JSON data.
 * @param isComplementary whether bill is complementary or not.
 * @param sessionDetails Session Details.
 * @param orderCustomer order customer detail (optional required only for Complementary Bill).
 * @param orderCustomerDistrict order customer district detail (optional required only for Complementary Bill).
 */
const generateOrderBill = (agent: string, nursery: string, orderData: any, isComplementary: boolean, sessionDetails: any,
                           orderCustomer?: any, orderCustomerDistrict?: any): string => {

    let address = "";
    if (isComplementary) {
        const add = [];
        if (orderData?.partner_name) {
            add.push(orderData.partner_name.trim());
        }
        if (orderCustomer?.street) {
            add.push(orderCustomer.street.trim());
        }
        if (orderCustomer?.city) {
            add.push(orderCustomer.city.trim());
        }
        if (orderCustomerDistrict?.name) {
            add.push(orderCustomerDistrict.name.trim());
        }
        if (orderCustomer?.zip) {
            add.push(orderCustomer.zip.trim());
        }
        address = add.join(", ");

        //Note: A bill at-most hold 48 characters per line for data.
        //If an address string comes up in more than one line.
        if (address.length > 44) {
            address = splitString(address, 44).join("\n"); //Split string into multiple lines & add enter on long string.
        }
    }

    // Formatting & Sending Receipt data
    // orderData = JSON.parse(orderData.orderDetailsString);
    let CUSTOMER_NAME = !isComplementary ? orderData?.partner_name : address;
    let SERIAL_NO = orderData?.reference_seq_no;
    let DATE = convertDate(orderData.creation_date).format(Constant.FORMAT_DD_MM_yyyy) //"10/06/2021";
    let TIME = convertDate(orderData.creation_date).format(Constant.FORMAT_hh_mm_ss)
    let PHONE_NUM = orderData.partner_phone === undefined ? "" : orderData.partner_phone //"7904419812";

    console.log("orderData--------------->", orderData);

    const htmlReceipt = BillFormatString(
        agent,
        nursery,
        orderData,
        isComplementary,
        sessionDetails,
        CUSTOMER_NAME,
        SERIAL_NO,
        DATE,
        TIME,
        PHONE_NUM
    );
    console.log("ORDER PRINTING HTML RECEIPT:");
    console.log(htmlReceipt);
    return htmlReceipt;
};

/**
 * @author Lovesh Singh.
 * @since 08-02-2022.
 * @param agent agent name.
 * @param nursery nursery name.
 * @param orderData order details.
 * @param isComplementary order complementary or not.
 * @param sessionDetails Session Details.
 * @param CUSTOMER_NAME customer name.
 * @param SERIAL_NO serial no.
 * @param DATE date.
 * @param TIME time.
 * @param PHONE_NUM phone number.
 * @return {string} non-complementary bill tabular formatted string.
 */
const BillFormatString = (agent: string, nursery: string, orderData: any,
                          isComplementary: boolean, sessionDetails: any, CUSTOMER_NAME: string,
                          SERIAL_NO: string, DATE: string, TIME: string, PHONE_NUM: string): string => {

    const AGENT_NAME = agent;
    const NURSERY_NAME = nursery;

    const SIZE = +orderData?.lines?.length;
    let PARTICULAR = "";
    let TOTAL_QUANTITY = 0;
    let TOTAL_AMOUNT = 0.00;
    let DISCOUNT_APPLIED = 0;
    const DISCOUNTED_TOTAL = +orderData?.amount_total; // total amount have to pay.

    const productArray = [];


    for (let i = 1; i <= SIZE; i++) {
        const productObject = {}

        const itemQty = +orderData.lines[i - 1].qty
        DISCOUNT_APPLIED += orderData.lines[i - 1].discount * itemQty

        productObject.id = i
        productObject.particulars = orderData.lines[i - 1].display_name
        productObject.qty = itemQty
        TOTAL_QUANTITY += itemQty

        productObject.itemRate = +orderData.lines[i - 1].price_unit
        productObject.itemAmount = (orderData.lines[i - 1].price_unit) * itemQty
        TOTAL_AMOUNT += productObject.itemAmount

        productObject.discountApplied = orderData.lines[i - 1].discount * itemQty

        productArray.push(productObject)
    }

    let totalAmountWithCurrency
    let discountAppliedWithCurrency
    let discountedTotalWithCurrency //total payable amount
    const currencySymbol = sessionDetails.currencySymbol

    if (sessionDetails.currencyPosition === 'before') {
        totalAmountWithCurrency = currencySymbol + TOTAL_AMOUNT
        discountAppliedWithCurrency = currencySymbol + DISCOUNT_APPLIED
        discountedTotalWithCurrency = currencySymbol + DISCOUNTED_TOTAL
    } else {
        totalAmountWithCurrency = TOTAL_AMOUNT + currencySymbol
        discountAppliedWithCurrency = DISCOUNT_APPLIED + currencySymbol
        discountedTotalWithCurrency = DISCOUNTED_TOTAL + currencySymbol
    }

    // noinspection CssInvalidPseudoSelector
    const html = `
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
</head>

<style>
@page {
    margin: 20px;
  }
#invoice-POS{
    /*box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);*/
    padding:2mm;
    margin: 0 auto;
    width: 100%;
    background: #FFF;
}
    
    
  ::selection {background: #f31544; color: #FFF;}
  ::moz-selection {background: #f31544; color: #FFF;}
  h1{
    font-size: 1.5em;
    color: #222;
  }
  h2{font-size: .9em;}
  h3{
    font-size: 1.2em;
    font-weight: 300;
    line-height: 2em;
  }
  p{
    font-size: .9em;
    color: #666;
    line-height: 1.2em;
  }
   
  #top, #mid,#bot{ /* Targets all id with 'col-' */
    border-bottom: 1px solid #EEE;
  }
  
  #top{min-height: 100px;}
  #mid{min-height: 80px;} 
  #bot{ min-height: 50px;}
  
  #top .logo{
    /* float: left; */
      height: 60px;
      width: 60px;
      /* background: url(http://michaeltruong.ca/images/logo1.png) no-repeat; */
      background-size: 60px 60px;
  }
  .clientlogo{
    float: left;
      height: 60px;
      width: 60px;
      background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
      background-size: 60px 60px;
    border-radius: 50px;
  }
  .info{
    display: block;
    /* float:left; */
    margin-left: 0;
  }
  .divider{
    width: 30%;
    border-style: dashed; 
    border-bottom: #222;
  }
  .title{
    float: right;
  }
  .title p{text-align: right;} 
  table{
    width: 100%;
    border-collapse: collapse;
  }
  #itemsTable{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  #itemsTable table{
    width: 20%;
    border-collapse: collapse;
  }
  #itemsTable table .itemtext{
    text-align: center;
  }
  td{
    /* padding: 5px 0 5px 15px;
    border: 1px solid #EEE */
  }
  .tabletitle{
    /* padding: 5px; */
    font-size: 1em;
    /*background: #EEE;*/
  }
  .service{border-bottom: 1px solid #EEE;}
  .item,.tableitem{max-width: 24mm;padding-top: 4px; padding-left: 3px}
  .itemtext{font-size: .9em; margin-bottom: 0;}
  
  .bottominfo{
    margin-top: 5mm;
  }

</style>
<body>


    <div id="invoice-POS">
    
        <center id="top">
          <!-- <div class="logo"></div> -->
          <div class="info"> 
            <h1>Isha Outreach</h1>
            <address>
                Velliangiri Foothills, Ishana Vihar Post,<br>
                Coimbatore, Tamil Nadu (IN)<br>
                India, 641114<br>
                </address>
            <hr class="divider">
            ${
        isComplementary
            ? `<h5 style="color: #28a745;">Compliment</h5>`
            : `<h5>Bill of Supply</h5>`
    }
          </div><!--End Info-->
        </center><!--End InvoiceTop-->
        
        <div id="mid">
          <div class="info">
            <!-- <h2>Contact Info</h2> -->
            <p> 
                To : ${CUSTOMER_NAME}</br>
                ${!isComplementary ? "Bill " : ""} No.   : ${SERIAL_NO}</br>
                Date & Time   : ${DATE + ", " + TIME}</br>
                Phone   : ${PHONE_NUM}</br>
            </p>
          </div>
        </div><!--End Invoice Mid-->
        
        <div id="bot">
                        <div id="table">
                            <table>
                                <tr class="tabletitle">
                                    <td class="item"><h2 class="itemtext" style="padding-left: 4px;">S. No.</h2></td>
                                    <td class="item"><h2 class="itemtext" style="padding-right: 1px">Particulars</h2></td>
                                    <td class="item"><h2 class="itemtext">Qty</h2></td>
                                    ${
        !isComplementary
            ? `<td class="item"><h2 class="itemtext">Rate</h2></td>
                                    <td class="item"><h2 class="itemtext">Amount</h2></td>`
            : `<span></span>`
    }                                    
                                                                        
                                </tr>
                                ${productArray.map((item) => {
        return `<tr class="service">
                                    <td class="tableitem" style="width: 10mm"><p class="itemtext" style="padding-left: 4px;">${
            item.id
        }</p></td>
                                    <td class="tableitem"><p class="itemtext">${
            item.particulars
        }</p></td>
                                    <td class="tableitem"><p class="itemtext">${
            item.qty
        }</p></td>
                                    ${
            !isComplementary
                ? `<td class="tableitem"><p class="itemtext">${item.itemRate}</p></td>  
                                    <td class="tableitem"><p class="itemtext">${(item.itemAmount).toFixed(2)}</p></td>`
                : `<span></span>`
        }  
                                </tr>`;
    }).join(" ")}

                                <tr class="tabletitle" style="border-top: 1px solid">
                                  <td></td>
                                  ${!isComplementary ? `<td></td>
                                  <td></td>` : `<span></span>`}
                                  <td class="item"><h2 class="itemtext">Items</h2></td>
                                  <td class="item"><p class="itemtext">
                                  ${productArray.length}
                                  </p></td>
                              </tr>

                              <tr class="tabletitle">
                                <td></td>
                                  ${!isComplementary ? `<td></td>
                                  <td></td>` : `<span></span>`}
                                  <td class="item"><h2 class="itemtext">Quantity</h2></td>
                                  <td class="item"><p class="itemtext">${TOTAL_QUANTITY}</p></td>
                              </tr>

                              ${
        !isComplementary
            ? `<tr class="tabletitle">
                                    <td></td>
                                  ${!isComplementary ? `<td></td>
                                  <td></td>` : `<span></span>`}
                                  <td class="item"><h2 class="itemtext">Total Amount</h2></td>
                                  <td class="item"><p class="itemtext">${totalAmountWithCurrency}</p></td>
                              </tr>

                              ${
                DISCOUNT_APPLIED > 0
                    ? `<tr class="tabletitle">
                                    <td></td>
                                  ${!isComplementary ? `<td></td>
                                  <td></td>` : `<span></span>`}
                                  <td class="item"><h2 class="itemtext">Discount Applied</h2></td>
                                  <td class="item"><p class="itemtext">${discountAppliedWithCurrency}</p></td>
                              </tr>

                              <tr class="tabletitle" style="border-bottom: 1px solid">
                                <td></td>
                                  ${!isComplementary ? `<td></td>
                                  <td></td>` : `<span></span>`}
                                  <td class="item"><h2 class="itemtext">Discounted Total</h2></td>
                                  <td class="item"><p class="itemtext">${discountedTotalWithCurrency}</p></td>
                              </tr>`
                    : `<span></span>`
            }`
            : `<span></span>`
    }
                            </table>
                        </div><!--End Table-->

    
                    </div><!--End InvoiceBot-->
      </div><!--End Invoice-->
    

</body>
</html>
`;
    return html;
};

/**
 * @author Lovesh Singh
 * @since 10-01-2022
 * @description to print passed html.
 * @param html html string.
 */
export const printHtml = async (html: string): void => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
        html,
    });
}
