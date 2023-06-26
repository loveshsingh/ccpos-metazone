import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from "react-native";
import {AppColors} from "../../../../../assets/AppColors";
import AppTouchableOpacity from "../../../../lib/AppTouchableOpacity";
import AppText from "../../../../lib/AppText";
import {isString, getDynamicFontSize, height} from "../../../../../helper/Utility";
import AppIcon, {Icons} from "../../../../lib/AppIcon";
import I18N from "../../../../../helper/translation";
import {AppFonts} from "../../../../../assets/AppFonts";
import {useLocale} from "../../../../../base/contexts/I18NProvider";
import {useCustomerListTheme} from "../../../../../base/theme contexts/CustomerListThemeProvider";
import AppFlatList from "../../../../lib/AppFlatList";
import {Constant} from "../../../../../helper/constant";

// noinspection JSUnusedLocalSymbols
/**
 * @author Vipin Joshi.
 * @since 03-01-2022.
 * @description to render Customer List.
 * @param data customers data.
 * @param columnsData customer columns data.
 * @param onPress customer press event callback.
 * @param onEditPress customer item edit button press event callback.
 * @return {JSX.Element}
 */
const CustomerList = ({data, columnsData, onPress, onEditPress}): JSX.Element => {

    const [customers, setCustomers] = useState(data)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {customerListTheme} = useCustomerListTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    }, [locale])

    useEffect(() => {
        const initCustomers = async (): void => {
            setCustomers(data)
        }
        initCustomers()
    }, [data])

    /**
     * @author Vipin Joshi.
     * @since 03-01-2022.
     * @description to render Item Separator.
     */
    const renderItemSeparator = (): JSX.Element => <View style={styles.separatorContainer}/>

    /**
     * @author Vipin Joshi.
     * @since 04-01-2022.
     * @description to render Item.
     */
    const renderItem = ({item, index}): JSX.Element => {
        const customerListOpacity = new Animated.Value(0)
        const customerListTransform = new Animated.Value(-10)

        Animated.timing(customerListOpacity, {
            toValue: 1,
            duration: Constant.ANIMATION_DURATION,
            delay: index * 100,
            useNativeDriver: true
        }).start();

        Animated.timing(customerListTransform, {
            toValue: 0,
            duration: Constant.ANIMATION_DURATION,
            delay: index * 100,
            useNativeDriver: true
        }).start();

        let displayValues = item.display_values
        if (isString(displayValues)) {
            displayValues = JSON.parse(displayValues)
        }

        return (
            <Animated.View style={{
                opacity: customerListOpacity, transform: [
                    {translateY: customerListTransform},
                ],
            }}>
                <AppTouchableOpacity style={styles.itemContainer} onPress={onPress?.bind(this, item, index)}>

                    <AppText style={[styles.itemTextField, styles.itemNameField]} text={displayValues.name}/>
                    <AppText style={[styles.itemTextField, styles.itemAddressField]} text={displayValues.address}/>
                    <AppText style={[styles.itemTextField, styles.itemPhoneField]} text={displayValues.phone}/>
                    <View style={styles.itemFunctionContainer}>

                        <AppText
                            style={[styles.itemStatusField, item.isOffline ? styles.itemStatusOfflineField : styles.itemStatusOnlineField]}
                            text={item.isOffline ? I18N.t('OfflineLabel') : I18N.t('OnlineLabel')}/>

                        <View style={styles.itemEditButtonContainer}>
                            <AppTouchableOpacity
                                style={styles.itemEditButton}
                                onPress={onEditPress?.bind(this, item, index)}>

                                <AppIcon type={Icons.MaterialIcons} name={'mode-edit'} size={30}
                                         color={AppColors.arsenic}/>

                            </AppTouchableOpacity>
                        </View>

                    </View>

                </AppTouchableOpacity>
            </Animated.View>
        )
    }

    /**
     * @author Vipin Joshi.
     * @since 04-01-2022.
     * @description list empty component.
     * @return {JSX.Element}
     */
    const renderListEmptyComponent = (): JSX.Element =>
        <View style={styles.emptyComponentContainer}>
            <AppText style={styles.emptyComponentText} text={I18N.t('CustomerListEmptyMsg')}/>
        </View>

    /**
     * @author Vipin Joshi.
     * @since 07-07-2021.
     * @description customer List header row.
     * @return {JSX.Element}
     * todo remove comments from this method
     */
    const renderListHeaderComponent = (): JSX.Element =>
        <View style={styles.headerContainer}>
            <AppText style={[styles.headerField]}
                     text={I18N.t('Name')}/>
            <AppText style={[styles.headerField, styles.headerAddressField]}
                     text={I18N.t('Address')}/>
            <AppText style={[styles.headerField]}
                     text={I18N.t('Phone')}/>
            <AppText style={[styles.headerField, styles.headerStatusField]}
                /*text={I18N.t('Status')}*//>
            <View style={[styles.headerStatusField]}/>
        </View>


    return (
        <AppFlatList
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            data={customers}
            extraData={customers}
            ListHeaderComponent={renderListHeaderComponent}
            // ItemSeparatorComponent={(renderItemSeparator)}
            ListEmptyComponent={renderListEmptyComponent}
            renderItem={renderItem}
        />
    );

}

const styles = StyleSheet.create({
    headerContainer: {flexDirection: 'row', margin: 8},
    headerField: {
        fontSize: getDynamicFontSize(18),
        flex: 2,
        fontWeight: 'bold',
        // color: AppColors.arsenic,
        fontFamily: AppFonts.bold
    },
    headerAddressField: {flex: 3},
    headerStatusField: {flex: 1},
    separatorContainer: {height: 1, backgroundColor: AppColors.americanSilver, width: '100%'},
    emptyComponentContainer: {padding: 12},
    emptyComponentText: {
        // color: AppColors.arsenic,
        textAlign: 'center',
        margin: 12,
        fontSize: getDynamicFontSize(18),
        fontWeight: 'bold',
        fontFamily: AppFonts.bold
    },

    itemContainer: {
        flexDirection: 'row',
        margin: 8,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: AppColors.americanSilver,
        paddingBottom: 4,
        marginBottom: 0
    },
    itemTextField: {
        fontSize: getDynamicFontSize(18),
        // color: AppColors.arsenic,
        fontFamily: AppFonts.regular
    },
    itemNameField: {flex: 2},
    itemAddressField: {flex: 3},
    itemPhoneField: {flex: 2},
    itemFunctionContainer: {flex: 2, flexDirection: 'row'},
    itemStatusField: {fontSize: getDynamicFontSize(18), flex: 1, textAlign: 'center', alignSelf: 'center', padding: 2},
    itemStatusOfflineField: {backgroundColor: AppColors.slateGray, color: AppColors.white,},
    itemStatusOnlineField: {backgroundColor: AppColors.americanGreen, color: AppColors.white,},
    itemEditButtonContainer: {flex: 1, alignItems: 'center'},
    itemEditButton: {
        flexDirection: 'row',
        backgroundColor: AppColors.white,
        borderColor: AppColors.chineseWhite,
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 2,
        marginHorizontal: 5,
        padding: 5
    }
})

export default React.memo(CustomerList, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data && prevProps.data?.length === nextProps.data?.length
})
