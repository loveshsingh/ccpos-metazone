import React, {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {View} from "react-native";
import AppText from "../../lib/AppText";
import {Constant} from "../../../helper/constant";
import AppCard from "../../lib/AppCard";
import {width, getDynamicFontSize} from "../../../helper/Utility";
import I18N from "../../../helper/translation";
import {AppColors} from "../../../assets/AppColors";
import {AppFonts} from "../../../assets/AppFonts";
import {useMessage} from "../../../base/contexts/MessageProvider";
import AppIcon, {Icons} from "../../lib/AppIcon"
import AppRoundButton from "../../lib/AppRoundButton";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @description Nursery Card Component.
 * @since 29-11-2021
 */
const NurseryCard = ({data, agentData, onNewSessionPress, onResumeSessionPress, onCloseSessionPress}): JSX.Element => {

    const message = useMessage()
    const [nursery, setNursery] = useState(data)
    const [agent, setAgent] = useState(agentData)

    useEffect(() => {
        const initNursery = async ():void => {
            setNursery(data)
            setAgent(agentData)
        }
        initNursery()
    }, [data, agentData])

    const onPressNewSessionButton = (): void => onNewSessionPress(nursery)
    const onPressResumeSessionButton = (): void => onResumeSessionPress(nursery)
    const onPressCloseSessionButton = (): void => onCloseSessionPress(nursery)

    return (
        <View style={styles.container}>
            <AppCard
                style={styles.card}
                title={nursery.name}
                titleStyle={styles.cardTitle}
                subtitle={nursery.display_button_resume ? I18N.t('InProgress') : (nursery.display_button_new ? I18N.t('Unused') : '')}
                subtitleStyle={[styles.cardSubtitle, {
                    backgroundColor: (nursery.display_button_new ? AppColors.chineseWhite : AppColors.americanGreen),
                    color: (nursery.display_button_new ? AppColors.sonicSilver : AppColors.white),
                    marginTop: 8,
                    marginBottom: 4
                }]}
                childrenStyle={styles?.cardContent}>

                <AppText
                    style={styles.name}
                    text={nursery.display_button_resume ? agent : ''}
                />

                <View style={styles.buttonContainer}>
                    {nursery.display_button_new ?
                        <AppRoundButton
                            type="primary"
                            uppercase={false}
                            height={40}
                            margin={8}
                            onPress={onPressNewSessionButton}
                            title={I18N.t('NewSessionAction')}
                            style={styles.actionButton}
                            icon={({size, color}) => (
                                <AppIcon type={Icons.Entypo} name={'new'} color={color}
                                         size={20}/>
                            )}
                        /> : null}

                    {nursery.display_button_resume ?
                        <AppRoundButton
                            type="primary"
                            uppercase={false}
                            height={40}
                            margin={8}
                            onPress={onPressResumeSessionButton}
                            title={I18N.t('ResumeSessionAction')}
                            style={styles.actionButton}
                            icon={({size, color}) => (
                                <AppIcon type={Icons.EvilIcons} name={'refresh'} color={color}
                                         size={20}/>
                            )}
                        /> : null}

                    {nursery.display_button_close ?
                        <AppRoundButton
                            height={40}
                            margin={8}
                            uppercase={false}
                            // color={AppColors.arsenic}
                            onPress={onPressCloseSessionButton}
                            style={styles.closeButton}
                            icon={({ size, color }) => (
                                <AppIcon type={Icons.EvilIcons} name={'close'} color={color}
                                    size={20} />
                            )}
                            title={I18N.t('CloseSessionAction')}
                        /> : null}
                </View>

            </AppCard>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    card: {
        flex: 1,
        width: (width / 2) - 10,
        maxWidth: (width / 2) - 10,
        borderColor: AppColors.chineseWhite,
        borderWidth: 0.75,
        marginBottom: 2,
        marginRight: 2,
        marginTop: 2,
        marginLeft: 2,
    },
    cardTitle: {
        // ...AppStyleSheet.TextStyleBig,
        fontSize: getDynamicFontSize(Constant.TEXT_SIZE_BIG),
        margin: 8,
        paddingTop: 20,
        paddingBottom: 2,
        fontFamily: AppFonts.bold
    },
    cardSubtitle: {
        fontSize: getDynamicFontSize(10),
        margin: 8,
        fontWeight: "bold",
        alignSelf: 'baseline',
        paddingLeft: 20,
        paddingVertical: 2,
        fontFamily: AppFonts.regular,
        textAlign: 'center',
        borderRadius: 6
    },
    name: {marginHorizontal: 8},
    buttonContainer: {flex: 1, flexWrap: "wrap", flexDirection: "row", marginTop: 8},
    actionButton: {
        fontFamily: AppFonts.regular,
        alignSelf: "center"
    },
    closeButton: {
        fontFamily: AppFonts.regular,
        alignSelf: "center"
    }
})

export default NurseryCard
