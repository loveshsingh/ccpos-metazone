import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {FlatList} from "react-native";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @description custom Button Component.
 * @since 07-07-2022
 * @param style object | array to style button.
 * @param labelStyle object | array to style button title.
 * @param type enum primary, secondary.
 */
const AppFlatList = forwardRef(({
                                    style,
                                    scrollEnabled,
                                    data,
                                    columnWrapperStyle,
                                    contentContainerStyle,
                                    nestedScrollEnabled,
                                    initialNumToRender,
                                    keyExtractor,
                                    numColumns,
                                    extraData,
                                    removeClippedSubviews,
                                    onEndReached,
                                    onEndReachedThreshold,
                                    onScrollBeginDrag,
                                    onScrollToIndexFailed,
                                    renderItem,
                                    ListEmptyComponent,
                                    ListHeaderComponent,
                                    ListFooterComponent,
                                    horizontal,
                                    showsHorizontalScrollIndicator,
                                    stickyHeaderIndices,
                                    children
                                }
    , ref): JSX.Element => {

    const flatListRef = useRef(null)

    /**
     * @author Lovesh Singh
     * @since 07-07-2022
     * @description to reference handlers.
     */
    useImperativeHandle(ref, () => ({scrollToIndex, scrollToOffset}))

    /**
     * @author Lovesh Singh
     * @since 07-07-2022
     * @description to scroll to index.
     */
    const scrollToIndex = (selectedProduct: any): void => flatListRef.current?.scrollToIndex(selectedProduct);

    /**
     * @author Lovesh Singh
     * @since 07-07-2022
     * @description to scroll to offset.
     */
    const scrollToOffset = (offset: number): void => flatListRef.current?.scrollToOffset(offset);

    return (
        <FlatList
            ref={flatListRef}
            stickyHeaderIndices={stickyHeaderIndices}
            style={style}
            horizontal={horizontal}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            scrollEnabled={scrollEnabled}
            data={data}
            columnWrapperStyle={columnWrapperStyle}
            contentContainerStyle={contentContainerStyle}
            nestedScrollEnabled={nestedScrollEnabled}
            initialNumToRender={initialNumToRender}
            keyExtractor={keyExtractor}
            numColumns={numColumns}
            extraData={extraData}
            removeClippedSubviews={removeClippedSubviews}
            onEndReached={onEndReached}
            onEndReachedThreshold={onEndReachedThreshold}
            onScrollBeginDrag={onScrollBeginDrag}
            onScrollToIndexFailed={onScrollToIndexFailed}
            renderItem={renderItem}
            ListEmptyComponent={ListEmptyComponent}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
        >
            {children}
        </FlatList>
    )
});

export default AppFlatList