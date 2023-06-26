import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from "react-native";
import AppTouchableOpacity from "../../lib/AppTouchableOpacity";
import AppText from "../../lib/AppText";
import {AppColors} from "../../../assets/AppColors";
import {AppFonts} from "../../../assets/AppFonts";
import I18N from "../../../helper/translation";
import {getDynamicFontSize} from "../../../helper/Utility";
import AppIcon, {Icons} from "../../lib/AppIcon";
import {removeAuthDetailAsyncStorage} from "../../../storage/getAuthAsyncStorage";
import {useMessage} from "../../../base/contexts/MessageProvider";
import {useLocale} from "../../../base/contexts/I18NProvider";
import {useTheme} from "../../../base/contexts/ThemeProvider";
import AppFlatList from "../../lib/AppFlatList";
import {Constant} from "../../../helper/constant";

// noinspection JSUnusedLocalSymbols
/**
 * @author Lovesh Singh.
 * @since 22-02-2022.
 * @description to render Saved User List.
 * @param data saved users.
 * @param onPress saved user press event callback.
 * @param show
 * @param onPressCancel
 * @return {JSX.Element}
 */
const SavedUserList = ({data, onPress, show, onPressCancel}): JSX.Element => {

    const [savedUsers, setSavedUsers] = useState(data)
    const [visible, setVisible] = useState(show)
    const message = useMessage()
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {theme} = useTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    useEffect(() => {
        setSavedUsers(data)
        setVisible(show)
    }, [data, show])


    /**
     * @author Lovesh Singh.
     * @since 22-02-2022.
     * @description to render Item Separator.
     */
    const renderItemSeparator = (): JSX.Element => <View style={styles.separatorContainer}/>

    /**
     * @author Lovesh Singh.
     * @since 23-02-2022.
     * @description to handle remove saved user item.
     */
    const onRemoveSaveUserPress = (item) => {
        message.showAlert(
            `${I18N.t('RemoveSavedUserLabel')} (${item?.username})`, {
                message: I18N.t('RemoveSavedUserMsg'),
                buttons: [
                    {
                        text: I18N.t('NoAction'),
                        style: {
                            backgroundColor: AppColors.chineseWhite,
                            borderColor: AppColors.arsenic
                        },
                        buttonTextStyle: {
                            color: AppColors.arsenic
                        },
                        icon: <AppIcon type={Icons.MaterialIcons} name={'undo'} color={AppColors.arsenic}
                                       size={12} style={{marginRight: 8}}/>
                    },
                    {
                        text: I18N.t('YesAction'),
                        icon: <AppIcon type={Icons.MaterialCommunityIcons} name={'page-next'} color={AppColors.white}
                                       size={12} style={{marginRight: 8}}/>,
                        onPress: () => {
                            const userSavedArrayAfterDelete = (savedUsers.filter(user => user?.username !== item?.username))
                            setSavedUsers(userSavedArrayAfterDelete)
                            removeAuthDetailAsyncStorage(item)
                        }
                    }
                ]
            })
    }

    /**
     * @author Lovesh Singh.
     * @since 22-02-2022.
     * @description to render Item.
     */
    const renderItem = ({item, index}): JSX.Element => {
        const savedUserListOpacity = new Animated.Value(0)
        const savedUserListTransform = new Animated.Value(-10)

        Animated.timing(savedUserListOpacity, {
            toValue: 1,
            duration: Constant.ANIMATION_DURATION,
            delay: index * 350,
            useNativeDriver: true
        }).start();

        Animated.timing(savedUserListTransform, {
            toValue: 0,
            duration: Constant.ANIMATION_DURATION,
            delay: index * 350,
            useNativeDriver: true
        }).start();

        return (
            <Animated.View style={{
                opacity: savedUserListOpacity, transform: [
                    {translateY: savedUserListTransform},
                ],
            }}>
                <AppTouchableOpacity style={styles.itemContainer} onPress={onPress?.bind(this, item, index)}>

                    <AppText style={styles.itemTextField} text={item?.username}/>
                    <AppTouchableOpacity onPress={onRemoveSaveUserPress.bind(this, item, index)}>
                        <AppIcon type={Icons.AntDesign} name={'close'} color={theme?.primaryColor}
                                 size={getDynamicFontSize(20)}/>
                    </AppTouchableOpacity>

                </AppTouchableOpacity>
            </Animated.View>
        )
    }

    /**
     * @author Lovesh Singh.
     * @since 22-02-2022.
     * @description list empty component.
     * @return {JSX.Element}
     */
    const renderListEmptyComponent = (): JSX.Element =>
        <View style={styles.emptyComponentContainer}>
            <AppText style={styles.emptyComponentText} text={I18N.t('EmptySavedUsersMsg')}/>
        </View>

    return (
        <View style={[styles.scrollviewViewContainer, {display: visible ? 'flex' : 'none', backgroundColor: theme?.backgroundColor,}]}>
            <AppText text={I18N.t('SelectSavedUsersMsg')}
                     style={styles.selectSavedUserText}/>
            <AppFlatList
                scrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                data={savedUsers}
                extraData={savedUsers}
                // ItemSeparatorComponent={(renderItemSeparator)}
                ListEmptyComponent={renderListEmptyComponent}
                renderItem={renderItem}
                style={{marginTop: 10}}
            />
            <AppTouchableOpacity onPress={onPressCancel} style={styles.closeIcon}>
                <AppIcon type={Icons.AntDesign} name={'closecircle'} color={theme?.primaryColor}
                         size={getDynamicFontSize(20)}/>
            </AppTouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollviewViewContainer: {
        borderRadius: 20,
        padding: 35,
    },
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
        marginBottom: 0,
        justifyContent: 'space-between'
    },
    itemTextField: {
        fontSize: getDynamicFontSize(18),
        // color: AppColors.arsenic,
        fontFamily: AppFonts.regular},
    closeIcon: {position: 'absolute', right: 10, top: 10},
    selectSavedUserText: {fontSize: getDynamicFontSize(20), fontFamily: AppFonts.bold}
})

export default React.memo(SavedUserList, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data && prevProps.data?.length === nextProps.data?.length && prevProps.show === nextProps.show
})
