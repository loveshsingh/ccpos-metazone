import React, {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import NurseryCard from "./NurseryCard";
import AppFlatList from "../../lib/AppFlatList";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @description Nursery List Component.
 * @since 29-11-2021
 */
const NurseryList = ({data, agentData, onPressNewSession, onPressResumeSession, onPressCloseSession}): JSX.Element => {

    const [dataList, setDataList] = useState(undefined);
    const [agent, setAgent] = useState(undefined);

    useEffect(() => {
        const initAgentData = async ():void => {
            setDataList(data)
            setAgent(agentData)
        }
        initAgentData()
    }, [data, agentData])

    /**
     * @author Vipin Joshi.
     * @since 02-12-2021
     * @description to render each Nursery Item unique key.
     * @returns {JSX.Element}
     */
    const keyExtractor = (item, index): string => index.toString()

    /**
     * @author Vipin Joshi.
     * @since 02-12-2021
     * @description to render Nursery List Item UI.
     * @returns {JSX.Element}
     */
    const renderItem = ({item}): JSX.Element => {
        return <NurseryCard
            data={item}
            agentData={agent}
            onNewSessionPress={onPressNewSession}
            onResumeSessionPress={onPressResumeSession}
            onCloseSessionPress={onPressCloseSession}
        />
    }

    return (
        <AppFlatList
            style={styles.list}
            scrollEnabled={true}
            data={dataList}
            keyExtractor={keyExtractor}
            // ItemSeparatorComponent={this.renderSeparator}
            // ListFooterComponent={this.renderSeparator}
            numColumns={3}
            extraData={dataList}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    list: {marginVertical: 2, marginHorizontal: 2},
    // listItemSeparator: {flex: 1, marginHorizontal: 10, height: 1, color: '#E0E0E0', backgroundColor: '#E0E0E0',}
})

export default NurseryList
