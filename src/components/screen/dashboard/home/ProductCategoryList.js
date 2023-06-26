import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from "react-native";
import {AppColors} from "../../../../assets/AppColors";
import AppTouchableOpacity from "../../../lib/AppTouchableOpacity";
import AppText from "../../../lib/AppText";
import {AppFonts} from "../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../helper/Utility"
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useSelector} from "react-redux";
import AppFlatList from "../../../lib/AppFlatList";
import {Constant} from "../../../../helper/constant";

/**
 * @author Vipin Joshi.
 * @since 03-01-2022.
 * @description to render Product Category List.
 * @param data category data.
 * @param onPress category press event callback.
 * @return {JSX.Element}
 */
const ProductCategoryList = ({data, onPress}): JSX.Element => {

    const [categories, setCategories] = useState(data)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const purpose = useSelector((state: any) => state.dashboardHomeReducer?.purpose)

    useEffect(() => {
        setSelectedLocale(locale)
    }, [locale])

    useEffect(() => {
        const initCategories = async (): void => {
            setCategories(data)
        }
        initCategories()
    }, [data])


    /**
     * @author Vipin Joshi.
     * @since 03-01-2022.
     * @description to render Item Separator.
     */
    const renderItemSeparator = (): JSX.Element => <View style={styles.separatorContainer}/>

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
        const categoryOpacity = new Animated.Value(0)
        const categoryTransform = new Animated.Value(-10)

        Animated.timing(categoryOpacity, {
            toValue: 1,
            duration: Constant.ANIMATION_DURATION,
            delay: index * 100,
            useNativeDriver: true
        }).start()
        Animated.timing(categoryTransform, {
            toValue: 0,
            duration: Constant.ANIMATION_DURATION,
            delay: index * 100,
            useNativeDriver: true
        }).start()

        return (
            <Animated.View style={{opacity: categoryOpacity, transform: [{translateX: categoryTransform}]}}>
                <AppTouchableOpacity onPress={onPress?.bind(this, item, index)}>
                    <View style={[styles.itemContainer, {display: (item?.id === 1 && purpose === "general") ? 'none' : 'flex'}]}>
                        <AppText style={styles.itemName} text={item.name}/>
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
            data={categories}
            extraData={categories}
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
        maxHeight: getDynamicFontSize(42),
    },
    itemContainer: {
        padding: 8,
    },
    itemName: {
        fontSize: getDynamicFontSize(16),
        // color: AppColors.arsenic,
        fontFamily: AppFonts.bold
    },
    separatorContainer: {backgroundColor: AppColors.americanSilver, width: 1},
    footerContainer: {
        height: '100%',
        backgroundColor: AppColors.americanSilver,
        width: 1
    }
})

export default React.memo(ProductCategoryList, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data && prevProps.data?.length === nextProps.data?.length;
});
