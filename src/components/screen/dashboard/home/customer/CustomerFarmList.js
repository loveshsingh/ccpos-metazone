import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {View, StyleSheet} from "react-native";
import {AppColors} from "../../../../../assets/AppColors";
import AppText from "../../../../lib/AppText";
import AppTouchableOpacity from "../../../../lib/AppTouchableOpacity";
import I18N from "../../../../../helper/translation";
import {getDynamicFontSize} from "../../../../../helper/Utility"
import {useLocale} from "../../../../../base/contexts/I18NProvider";

/**
 * @author Vipin Joshi
 * @since 06-07-2021
 * @description Farm list.
 * @param data farm array
 * @param style Farm List style
 * @param onPress farm press event callback.
 */
const CustomerFarmList = ({data, style, onPress}) => {

    const [farms: [], setFarms] = useState([])
    const {countries, states} = useSelector((currentState: any) => currentState.customerReducer)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    useEffect(() => {
        if (data) {
            setFarms(data)
        }
    }, [data])

    /**
     * @author Vipin Joshi
     * @since 06-07-2021
     * @description method will render each farm list form.
     */
    const renderEachFarmView = ({item, index}) => {
        const farmCountry = countries.find(country => country.id === item.country_id)
        const farmState = states.find(state => state.id === item.state_id)

        let role = ''
        if (item.is_farmer) {
            role += I18N.t('Farmer') + ' ';
        }
        if (item.is_vendor) {
            role += I18N.t('Vendor') + ' ';
        }
        if (item.is_cash_vendor) {
            role += I18N.t('CashVendor') + ' ';
        }
        if (item.is_meditator) {
            role += I18N.t('Mediator');
        }

        let address = item.zip
        address += " " + item.city

        let region = farmState ? farmState.name + ' ' : ''
        region += farmCountry ? farmCountry.name : ''

        return (
            <AppTouchableOpacity
                style={styles.itemContainer}
                onPress={onPress?.bind(this, item, index)}>

                <View>
                    <AppText numberOfLines={2} style={styles.titleText} text={`${item.name} (${item.type})`}/>
                    <AppText style={styles.addressText} text={address}/>
                    <View style={styles.regionContainer}>
                        <AppText style={styles.regionText} text={region}/>
                        <AppText style={styles.roleText} text={role}/>
                    </View>
                </View>

            </AppTouchableOpacity>
        )
    }

    /**
     * @author Vipin Joshi.
     * @since 06-01-2022.
     * @description list empty component.
     * @return {JSX.Element}
     */
    const renderListEmptyComponent = (): JSX.Element =>
        <View style={styles.emptyComponentContainer}>
            <AppText style={styles.emptyComponentText} text={I18N.t('FarmListEmptyMsg')}/>
        </View>

    /**
     * @author Vipin Joshi.
     * @since 06-01-2022.
     * @description list empty component.
     * @return {JSX.Element}
     */
    const renderListView = (): JSX.Element =>
        <View style={style}>
            <View style={styles.contentContainer}>
                {
                    farms.map((farm, index) => {
                        return renderEachFarmView({item: farm, index: index})
                    }, this)
                }
            </View>
        </View>

    return farms && farms.length > 0 ? (renderListView()) : (renderListEmptyComponent())
}

const styles = StyleSheet.create({
    contentContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    itemContainer: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderColor: AppColors.slateGray,
        borderWidth: 1,
        borderRadius: 8,
        height: 'auto',
        minWidth: 350,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
    },
    titleText: {
        fontSize: getDynamicFontSize(18),
        fontWeight: 'bold',
        // color: AppColors.arsenic
    },
    addressText: {
        fontSize: getDynamicFontSize(18),
        // color: AppColors.arsenic
    },
    regionContainer: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'},
    regionText: {
        fontSize: getDynamicFontSize(18),
        // color: AppColors.arsenic
    },
    roleText: {fontWeight: 'bold', color: AppColors.americanGreen, fontSize: getDynamicFontSize(15)},
    emptyComponentContainer: {
        padding: 12,
        flex: 1
    },
    emptyComponentText: {
        // color: AppColors.arsenic,
        textAlign: 'center',
        margin: 12,
        fontSize: getDynamicFontSize(18),
        fontWeight: 'bold'
    },
})

export default React.memo(CustomerFarmList, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data && prevProps.data?.length === nextProps.data?.length
})
