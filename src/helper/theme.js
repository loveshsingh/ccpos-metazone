/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description hold app themes.
 */

import {AppColors} from "../assets/AppColors";

export const defaultTheme = {
    light: {
        backgroundColor: AppColors.white,
        secondaryBackgroundColor: AppColors.platinum,
        headingTextColor: AppColors.black, // not in use
        primaryColor: AppColors.oxfordBlue,
        secondaryColor: AppColors.greenSheen,// not in use
        primaryTextColor: AppColors.white, // not in use
        grayTextColor: AppColors.davysGrey,
        selectionTextColor: AppColors.arsenic,
        disabledTextColor: AppColors.americanSilver,

        statusBarColor: AppColors.transparent,
        textColor: AppColors.arsenic,
        card: {
            backgroundColor: AppColors.white,
            titleColor: AppColors.arsenic,
            subtitleColor: AppColors.arsenic
        },
        checkbox: {
            // uncheckedColor: undefined/*AppColors.black*/, // will pick default native color.
            uncheckedColor: AppColors.white/*AppColors.black*/, // will pick default native color.
            checkedColor: AppColors.greenSheen,
        },
        textInput: {
            selectionColor: undefined, //selection bar | color inside input.
            outlineColor: undefined, /*{'#FAAAAF'}*/
            activeOutlineColor: AppColors.greenSheen,
            textColor: AppColors.arsenic,
            placeholderColor: AppColors.slateGray,
            backgroundColor: AppColors.white,
            disabledTextColor: AppColors.americanSilver,
        },
        button: {
            primaryBackgroundColor: AppColors.oxfordBlue,
            primaryTextColor: AppColors.white,
            secondaryBackgroundColor: AppColors.white,
            secondaryTextColor: AppColors.arsenic,
            // pressedColor: undefined
            pressedColor: AppColors.chineseWhite
        },
        roundButton: {
            primaryBackgroundColor: AppColors.oxfordBlue,
            primaryTextColor: AppColors.white,
            secondaryBackgroundColor: AppColors.azureishWhite,
            secondaryTextColor: AppColors.arsenic,
            // pressedColor: undefined
            pressedColor: AppColors.chineseWhite
        },
        bottomTabNav: {
            backgroundColor: AppColors.white,
            activeColor: AppColors.oxfordBlue,
            inactiveColor: AppColors.slateGray,
        },
        dashboardTheme: {
            backgroundColor: AppColors.white,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.oxfordBlue, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
            card: {
                backgroundColor: AppColors.white,
                titleColor: AppColors.arsenic,
                subtitleColor: AppColors.arsenic
            },
        },
        productTheme: {
            backgroundColor: AppColors.white,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.oxfordBlue, // not in use
            primaryTextColor: AppColors.white, // not in use
            secondaryColor: AppColors.greenSheen,

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
            card: {
                backgroundColor: AppColors.white,
                titleColor: AppColors.arsenic,
                subtitleColor: AppColors.arsenic
            },
        },
        cartListTheme: {
            backgroundColor: AppColors.white,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.oxfordBlue, // not in use
            primaryTextColor: AppColors.white, // not in use
            secondaryColor: AppColors.greenSheen,
            selectionTextColor: AppColors.arsenic,

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
            card: {
                backgroundColor: AppColors.white,
                titleColor: AppColors.arsenic,
                subtitleColor: AppColors.arsenic
            },
        },
        cartFeatureTheme: {
            backgroundColor: AppColors.platinum,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.oxfordBlue, // not in use
            primaryTextColor: AppColors.white, // not in use
            secondaryColor: AppColors.greenSheen,

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
            disabledTextColor: AppColors.americanSilver,
        },
        customerListTheme: {
            backgroundColor: AppColors.white,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.oxfordBlue, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
        },
        paymentTheme: {
            backgroundColor: AppColors.white,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.oxfordBlue, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
        },
        orderTheme: {
            backgroundColor: AppColors.white,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.oxfordBlue, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
        },
        holdOrderTheme: {
            backgroundColor: AppColors.white,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.oxfordBlue, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
        },
        viewMoreTheme: {
            backgroundColor: AppColors.white,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.oxfordBlue, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
            card: {
                backgroundColor: AppColors.white,
                disabledBackgroundColor: AppColors.chineseSilver,
                titleColor: AppColors.black,
                subtitleColor: AppColors.black
            },
        },
        // textColor: '#202124',

        //test
        /*nav: {
            backgroundColor: '#202124',
            active: '#fff',
            inActive: '#c489bc'
        },*/
        themeMode: 'default'
    },
    dark: {
        backgroundColor: AppColors.raisinBlack, //not in use
        secondaryBackgroundColor: AppColors.raisinBlack,
        headingTextColor: AppColors.white, // not in use
        primaryColor: AppColors.ube, //not in use
        secondaryColor: AppColors.greenSheen,// not in use
        primaryTextColor: AppColors.white, // not in use
        secondaryTextColor: AppColors.white,
        selectionTextColor: AppColors.arsenic,
        grayTextColor: AppColors.davysGrey,
        disabledTextColor: AppColors.americanSilver,

        primaryActionButtonColor: AppColors.white,
        statusBarColor: AppColors.raisinBlack,
        card: {
            backgroundColor: AppColors.eerieBlack,
            titleColor: AppColors.white,
            subtitleColor: AppColors.white
        },
        textColor: AppColors.white,
        checkbox: {
            uncheckedColor: AppColors.white,
            checkedColor: AppColors.greenSheen,
        },
        textInput: {
            selectionColor: undefined, //selection bar | color inside input.
            outlineColor: AppColors.ube, /*{'#FAAAAF'}*/
            activeOutlineColor: AppColors.slateGray,
            textColor: AppColors.white,
            placeholderColor: AppColors.slateGray,
            backgroundColor: AppColors.gunmetal,
            disabledTextColor: AppColors.americanSilver,
        },
        button: {
            primaryBackgroundColor: AppColors.ube,
            primaryTextColor: AppColors.white,
            secondaryBackgroundColor: AppColors.raisinBlack,
            secondaryTextColor: AppColors.white,
            pressedColor: AppColors.chineseWhite
        },
        roundButton: {
            primaryBackgroundColor: AppColors.ube,
            primaryTextColor: AppColors.white,
            secondaryBackgroundColor: AppColors.raisinBlack,
            secondaryTextColor: AppColors.white,
            // pressedColor: undefined
            pressedColor: AppColors.chineseWhite
        },
        bottomTabNav: {
            backgroundColor: AppColors.eerieBlack,
            activeColor: AppColors.ube,
            inactiveColor: AppColors.slateGray,
        },
        dashboardTheme: {
            backgroundColor: AppColors.raisinBlack,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.ube, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
            card: {
                backgroundColor: AppColors.eerieBlack,
                titleColor: AppColors.white,
                subtitleColor: AppColors.white
            },
        },
        productTheme: {
            backgroundColor: AppColors.raisinBlack,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.ube, // not in use
            primaryTextColor: AppColors.white, // not in use
            secondaryColor: AppColors.greenSheen,

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
            card: {
                backgroundColor: AppColors.eerieBlack,
                titleColor: AppColors.white,
                subtitleColor: AppColors.white
            },
        },
        cartListTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.lightBlue,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.ube, // not in use
            primaryTextColor: AppColors.white, // not in use
            secondaryColor: AppColors.greenSheen,
            selectionTextColor: AppColors.arsenic,

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
            card: {
                backgroundColor: AppColors.eerieBlack,
                titleColor: AppColors.white,
                subtitleColor: AppColors.white
            },
        },
        cartFeatureTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.ube, // not in use
            primaryTextColor: AppColors.white, // not in use
            secondaryColor: AppColors.greenSheen,

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
            disabledTextColor: AppColors.slateGray,
        },
        customerListTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.ube, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
        },
        paymentTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.ube, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
        },
        orderTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.ube, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
        },
        holdOrderTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.ube, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
        },
        viewMoreTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.ube, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
            card: {
                backgroundColor: AppColors.eerieBlack,
                titleColor: AppColors.white,
                subtitleColor: AppColors.white
            },
        },

        //Test
        /*nav: {
            backgroundColor: '#c489bc',
            active: '#fff',
            inActive: '#202124',
        },*/
        themeMode: 'default'
    },
};

export const redTheme = {
    light: {
        backgroundColor: AppColors.white,
        secondaryBackgroundColor: AppColors.platinum,
        headingTextColor: AppColors.arsenic, // not in use
        primaryColor: AppColors.crimsonRed,
        secondaryColor: AppColors.yellow,// not in use
        primaryTextColor: AppColors.white, // not in use
        grayTextColor: AppColors.davysGrey,
        selectionTextColor: AppColors.arsenic,
        disabledTextColor: AppColors.americanSilver,

        statusBarColor: AppColors.transparent,
        textColor: AppColors.arsenic,
        card: {
            backgroundColor: AppColors.white,
            titleColor: AppColors.arsenic,
            subtitleColor: AppColors.arsenic
        },
        checkbox: {
            // uncheckedColor: undefined/*AppColors.black*/, // will pick default native color.
            uncheckedColor: AppColors.white/*AppColors.black*/, // will pick default native color.
            checkedColor: AppColors.yellow,
        },
        textInput: {
            selectionColor: undefined, //selection bar | color inside input.
            outlineColor: undefined, /*{'#FAAAAF'}*/
            activeOutlineColor: AppColors.greenSheen,
            textColor: AppColors.arsenic,
            placeholderColor: AppColors.slateGray,
            backgroundColor: AppColors.white,
            disabledTextColor: AppColors.americanSilver,
        },
        button: {
            primaryBackgroundColor: AppColors.crimsonRed,
            primaryTextColor: AppColors.white,
            secondaryBackgroundColor: AppColors.white,
            secondaryTextColor: AppColors.arsenic,
            // pressedColor: undefined
            pressedColor: AppColors.chineseWhite
        },
        roundButton: {
            primaryBackgroundColor: AppColors.crimsonRed,
            primaryTextColor: AppColors.white,
            secondaryBackgroundColor: AppColors.azureishWhite,
            secondaryTextColor: AppColors.arsenic,
            // pressedColor: undefined
            pressedColor: AppColors.chineseWhite
        },
        bottomTabNav: {
            backgroundColor: AppColors.white,
            activeColor: AppColors.crimsonRed,
            inactiveColor: AppColors.slateGray,
        },
        dashboardTheme: {
            backgroundColor: AppColors.white,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.crimsonRed, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
            card: {
                backgroundColor: AppColors.white,
                titleColor: AppColors.arsenic,
                subtitleColor: AppColors.arsenic
            },
        },
        productTheme: {
            backgroundColor: AppColors.white,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.crimsonRed, // not in use
            primaryTextColor: AppColors.white, // not in use
            secondaryColor: AppColors.yellow,

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
            card: {
                backgroundColor: AppColors.white,
                titleColor: AppColors.arsenic,
                subtitleColor: AppColors.arsenic
            },
        },
        cartListTheme: {
            backgroundColor: AppColors.white,
            selectionBackgroundColor: AppColors.lightBlue,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.crimsonRed, // not in use
            primaryTextColor: AppColors.white, // not in use
            secondaryColor: AppColors.yellow,
            selectionTextColor: AppColors.arsenic,

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
            card: {
                backgroundColor: AppColors.white,
                titleColor: AppColors.arsenic,
                subtitleColor: AppColors.arsenic
            },
        },
        cartFeatureTheme: {
            backgroundColor: AppColors.platinum,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.crimsonRed, // not in use
            primaryTextColor: AppColors.white, // not in use
            secondaryColor: AppColors.yellow,

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
            disabledTextColor: AppColors.americanSilver,
        },
        customerListTheme: {
            backgroundColor: AppColors.white,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.crimsonRed, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
        },
        paymentTheme: {
            backgroundColor: AppColors.white,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.crimsonRed, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
        },
        orderTheme: {
            backgroundColor: AppColors.white,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.crimsonRed, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
        },
        holdOrderTheme: {
            backgroundColor: AppColors.white,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.crimsonRed, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
        },
        viewMoreTheme: {
            backgroundColor: AppColors.white,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.arsenic, // not in use
            primaryColor: AppColors.crimsonRed, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.arsenic,
            card: {
                backgroundColor: AppColors.white,
                disabledBackgroundColor: AppColors.chineseSilver,
                titleColor: AppColors.arsenic,
                subtitleColor: AppColors.arsenic
            },
        },
        // textColor: '#202124',

        //test
        /*nav: {
            backgroundColor: '#202124',
            active: '#fff',
            inActive: '#c489bc'
        },*/
        themeMode: 'red'
    },
    dark: {
        backgroundColor: AppColors.raisinBlack, //not in use
        secondaryBackgroundColor: AppColors.raisinBlack, //not in use
        headingTextColor: AppColors.white, // not in use
        primaryColor: AppColors.sunsetOrange, //not in use
        secondaryColor: AppColors.yellow,// not in use
        primaryTextColor: AppColors.white, // not in use
        secondaryTextColor: AppColors.white,
        selectionTextColor: AppColors.arsenic,
        grayTextColor: AppColors.davysGrey,
        disabledTextColor: AppColors.americanSilver,

        primaryActionButtonColor: AppColors.white,
        statusBarColor: AppColors.raisinBlack,
        card: {
            backgroundColor: AppColors.eerieBlack,
            titleColor: AppColors.white,
            subtitleColor: AppColors.white
        },
        textColor: AppColors.white,
        checkbox: {
            uncheckedColor: AppColors.white,
            checkedColor: AppColors.yellow,
        },
        textInput: {
            selectionColor: undefined, //selection bar | color inside input.
            outlineColor: AppColors.sunsetOrange, /*{'#FAAAAF'}*/
            activeOutlineColor: AppColors.slateGray,
            textColor: AppColors.white,
            placeholderColor: AppColors.slateGray,
            backgroundColor: AppColors.gunmetal,
            disabledTextColor: AppColors.americanSilver,
        },
        button: {
            primaryBackgroundColor: AppColors.sunsetOrange,
            primaryTextColor: AppColors.white,
            secondaryBackgroundColor: AppColors.raisinBlack,
            secondaryTextColor: AppColors.white,
            pressedColor: AppColors.chineseWhite
        },
        roundButton: {
            primaryBackgroundColor: AppColors.sunsetOrange,
            primaryTextColor: AppColors.white,
            secondaryBackgroundColor: AppColors.raisinBlack,
            secondaryTextColor: AppColors.white,
            // pressedColor: undefined
            pressedColor: AppColors.chineseWhite
        },
        bottomTabNav: {
            backgroundColor: AppColors.eerieBlack,
            activeColor: AppColors.sunsetOrange,
            inactiveColor: AppColors.slateGray,
        },
        dashboardTheme: {
            backgroundColor: AppColors.raisinBlack,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.sunsetOrange, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
            card: {
                backgroundColor: AppColors.eerieBlack,
                titleColor: AppColors.white,
                subtitleColor: AppColors.white
            },
        },
        productTheme: {
            backgroundColor: AppColors.raisinBlack,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.sunsetOrange, // not in use
            primaryTextColor: AppColors.white, // not in use
            secondaryColor: AppColors.yellow,

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
            card: {
                backgroundColor: AppColors.eerieBlack,
                titleColor: AppColors.white,
                subtitleColor: AppColors.white
            },
        },
        cartListTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.lightBlue,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.sunsetOrange, // not in use
            primaryTextColor: AppColors.white, // not in use
            secondaryColor: AppColors.yellow,
            selectionTextColor: AppColors.arsenic,

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
            card: {
                backgroundColor: AppColors.eerieBlack,
                titleColor: AppColors.white,
                subtitleColor: AppColors.white
            },
        },
        cartFeatureTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.sunsetOrange, // not in use
            primaryTextColor: AppColors.white, // not in use
            secondaryColor: AppColors.yellow,

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
            disabledTextColor: AppColors.slateGray,
        },
        customerListTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.sunsetOrange, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
        },
        paymentTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.sunsetOrange, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
        },
        orderTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.sunsetOrange, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
        },
        holdOrderTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.sunsetOrange, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
        },
        viewMoreTheme: {
            backgroundColor: AppColors.raisinBlack,
            selectionBackgroundColor: AppColors.azureishWhite,
            headingTextColor: AppColors.white, // not in use
            primaryColor: AppColors.sunsetOrange, // not in use
            primaryTextColor: AppColors.white, // not in use

            statusBarColor: AppColors.transparent,
            textColor: AppColors.white,
            card: {
                backgroundColor: AppColors.eerieBlack,
                titleColor: AppColors.white,
                subtitleColor: AppColors.white
            },
        },

        //Test
        /*nav: {
            backgroundColor: '#c489bc',
            active: '#fff',
            inActive: '#202124',
        },*/
        themeMode: 'red'
    },
};

export const darkTheme = {
    backgroundColor: AppColors.raisinBlack, //not in use
    headingTextColor: AppColors.white, // not in use
    primaryColor: AppColors.oxfordBlue, //not in use
    primaryTextColor: AppColors.white, // not in use

    primaryActionButtonColor: AppColors.white,
    statusBarColor: AppColors.raisinBlack,
    card: {
        backgroundColor: AppColors.eerieBlack,
        titleColor: AppColors.white,
        subtitleColor: AppColors.white
    },
    textColor: AppColors.white,
    checkbox: {
        uncheckedColor: AppColors.white,
        checkedColor: AppColors.greenSheen,
    },
    textInput: {
        selectionColor: undefined, //selection bar | color inside input.
        outlineColor: AppColors.colorPrimary, /*{'#FAAAAF'}*/
        activeOutlineColor: AppColors.slateGray,
        textColor: AppColors.white,
        placeholderColor: AppColors.slateGray,
        backgroundColor: AppColors.gunmetal
    },
    button: {
        primaryBackgroundColor: AppColors.oxfordBlue,
        primaryTextColor: AppColors.white,
        secondaryBackgroundColor: AppColors.raisinBlack,
        secondaryTextColor: AppColors.white,
        pressedColor: AppColors.chineseWhite
    },
    bottomTabNav: {
        backgroundColor: AppColors.eerieBlack,
        activeColor: AppColors.greenSheen,
        inactiveColor: AppColors.slateGray,
    },

    //Test
    /*nav: {
        backgroundColor: '#c489bc',
        active: '#fff',
        inActive: '#202124',
    },*/
    themeMode: 'dark'
};
