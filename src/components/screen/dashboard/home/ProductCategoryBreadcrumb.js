import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from "react-native";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import {AppColors} from "../../../../assets/AppColors";
import AppTouchableOpacity from "../../../lib/AppTouchableOpacity";
import AppText from "../../../lib/AppText";
import {AppFonts} from "../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../helper/Utility"
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useSelector} from "react-redux";
import {useTheme} from "../../../../base/contexts/ThemeProvider";
import {Constant} from "../../../../helper/constant";
import AppFlatList from "../../../lib/AppFlatList";

/**
 * @author Vipin Joshi.
 * @since 03-01-2022.
 * @description to render Product Category Breadcrumb.
 * @param data category/breadcrumb data.
 * @param onPress breadcrumb press event callback.
 * @return {JSX.Element}
 */
const ProductCategoryBreadcrumb = ({data, onPress}): JSX.Element => {

    const [breadcrumbs, setBreadcrumbs] = useState(data)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const purpose = useSelector((state: any) => state.dashboardHomeReducer?.purpose)
    const {theme} = useTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    useEffect(() => {
        setBreadcrumbs(data)
    }, [data])


    /**
     * @author Vipin Joshi.
     * @since 03-01-2022.
     * @description to render Item Separator.
     */
    const renderItemSeparator = (): JSX.Element => {
        return (
            <View style={styles.separatorContainer}>
                <AppIcon type={Icons.MaterialIcons} name={'keyboard-arrow-right'} size={40}
                         color={AppColors.americanSilver}/>
            </View>
        )
    }

    /**
     * @author Vipin Joshi.
     * @since 03-01-2022.
     * @description to render List Footer.
     */
    const renderListFooter = (): JSX.Element => <View style={styles.footerContainer}/>

    /**
     * @author Vipin Joshi.
     * @since 03-01-2022.
     * @description to render Item.
     */
    const renderItem = ({item, index}): JSX.Element => {
        const isLastItem = index === breadcrumbs?.length - 1
        const breadcrumbOpacity = new Animated.Value(isLastItem ? 0 : 1)
        const breadcrumbTransform = new Animated.Value(isLastItem ? -10 : 0)

        let activeColor = theme?.textColor
        if (isLastItem) {
            activeColor = theme?.secondaryColor
            Animated.timing(breadcrumbOpacity, {
                toValue: 1,
                duration: Constant.ANIMATION_DURATION,
                delay: index * 100,
                useNativeDriver: true
            }).start()
            Animated.timing(breadcrumbTransform, {
                toValue: 0,
                duration: Constant.ANIMATION_DURATION,
                delay: index * 100,
                useNativeDriver: true
            }).start()
        }

        return (
            <Animated.View style={{opacity: breadcrumbOpacity, transform: [{translateX: breadcrumbTransform}]}}>
                <AppTouchableOpacity onPress={onPress?.bind(this, item, index)}>
                    <View style={[styles.itemContainer, , {display: (item?.id === 1 && purpose === "general") ? 'none' : 'flex'}]}>
                        <AppText style={[styles.itemName, {color: activeColor}]} text={item.name}/>
                    </View>
                </AppTouchableOpacity>
            </Animated.View>
        )
    }

    return (
        <AppFlatList
            style={styles.list}
            horizontal={true}
            scrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            data={breadcrumbs}
            extraData={breadcrumbs}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            ListFooterComponent={renderListFooter}
            ItemSeparatorComponent={renderItemSeparator}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flexGrow: 0,
        maxHeight: getDynamicFontSize(42)
    },
    itemContainer: {
        padding: 8
    },
    itemName: {
        fontSize: getDynamicFontSize(16),
        fontFamily: AppFonts.bold
    },
    separatorContainer: {},
    footerContainer: {
        height: '100%',
        backgroundColor: AppColors.americanSilver,
        width: 1
    }
})

export default React.memo(ProductCategoryBreadcrumb, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data && prevProps.data?.length === nextProps.data?.length;
});
