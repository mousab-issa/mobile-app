import React, { FC, ReactNode, useMemo } from "react";
import {
  View,
  ViewStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  Text,
} from "react-native";

const sum = (arr: number[]): number => arr.reduce((acc, n) => acc + n, 0);

interface BorderStyle {
  borderColor?: string;
  borderWidth?: number;
}

interface TableProps {
  style?: StyleProp<ViewStyle>;
  borderStyle?: BorderStyle;
  children: ReactNode;
  testID?: string;
}

export const Table: FC<TableProps> = ({
  style,
  borderStyle,
  children,
  testID,
}) => {
  const borderLeftWidth = borderStyle?.borderWidth ?? 0;
  const borderBottomWidth = borderLeftWidth;
  const borderColor = borderStyle?.borderColor ?? "#000";

  const renderChildren = () =>
    React.Children.map(children, (child: any) =>
      React.cloneElement(
        child,
        borderStyle && child.type.displayName !== "ScrollView"
          ? { borderStyle }
          : {}
      )
    );

  return (
    <View
      testID={testID}
      style={[
        style,
        {
          borderLeftWidth,
          borderBottomWidth,
          borderColor,
        },
      ]}
    >
      {renderChildren()}
    </View>
  );
};

interface TableWrapperProps {
  style?: StyleProp<ViewStyle>;
  borderStyle?: BorderStyle;
  children: ReactNode;
}

export const TableWrapper: FC<TableWrapperProps> = ({
  style,
  borderStyle,
  children,
}) => {
  const renderChildren = () =>
    React.Children.map(children, (child: any) =>
      React.cloneElement(child, borderStyle ? { borderStyle } : {})
    );

  return <View style={style}>{renderChildren()}</View>;
};

interface RowProps {
  data: any[];
  style?: StyleProp<ViewStyle>;
  widthArr?: number[];
  height?: number;
  flexArr?: number[];
  textStyle?: StyleProp<TextStyle>;
  cellTextStyle?: (item: any) => StyleProp<TextStyle>;
}

export const Row: FC<RowProps> = ({
  data,
  style,
  widthArr,
  height,
  flexArr,
  textStyle,
  cellTextStyle,
  ...props
}) => {
  const width = widthArr ? sum(widthArr) : 0;

  const composedStyle = useMemo(() => {
    const styles: ViewStyle = {};
    if (width) {
      styles.width = width;
    }
    if (height) {
      styles.height = height;
    }
    return styles;
  }, [width, height]);

  return data ? (
    <View style={StyleSheet.flatten([composedStyle, styles.row, style])}>
      {data.map((item, i) => {
        const flex = flexArr?.[i];
        const wth = widthArr?.[i];
        return (
          <Cell
            key={i}
            data={item}
            width={wth}
            height={height}
            flex={flex}
            textStyle={StyleSheet.flatten([
              cellTextStyle && cellTextStyle(item),
              textStyle,
            ])}
            {...props}
          />
        );
      })}
    </View>
  ) : null;
};

interface RowsProps {
  data: any[][];
  style?: StyleProp<ViewStyle>;
  widthArr?: number[];
  heightArr?: number[];
  flexArr?: number[];
  textStyle?: StyleProp<TextStyle>;
}

export const Rows: FC<RowsProps> = ({
  data,
  style,
  widthArr,
  heightArr,
  flexArr,
  textStyle,
  ...props
}) => {
  const flex = flexArr ? sum(flexArr) : 0;
  const width = widthArr ? sum(widthArr) : 0;

  const composedStyle = useMemo(() => {
    const styles: ViewStyle = {};
    if (flex) {
      styles.flex = flex;
    }
    if (width) {
      styles.width = width;
    }
    return styles;
  }, [flex, width]);

  return data ? (
    <View style={composedStyle}>
      {data.map((item, i) => {
        const height = heightArr?.[i];
        return (
          <Row
            key={i}
            data={item}
            widthArr={widthArr}
            height={height}
            flexArr={flexArr}
            style={style}
            textStyle={textStyle}
            {...props}
          />
        );
      })}
    </View>
  ) : null;
};

interface CellProps {
  data: React.ReactNode;
  width?: number;
  height?: number;
  flex?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  borderStyle?: {
    borderColor?: string;
    borderWidth?: number;
  };
}

export const Cell: FC<CellProps> = ({
  data,
  width,
  height,
  flex,
  style,
  textStyle,
  borderStyle,
  ...props
}) => {
  const textDom = React.isValidElement(data) ? (
    data
  ) : (
    <Text style={StyleSheet.flatten([textStyle, styles.text])} {...props}>
      {data}
    </Text>
  );

  const borderTopWidth = borderStyle?.borderWidth ?? 0;
  const borderRightWidth = borderTopWidth;
  const borderColor = borderStyle?.borderColor ?? "#000";

  const composedStyles = useMemo(() => {
    const styles: ViewStyle = {};
    if (width) {
      styles.width = width;
    }
    if (height) {
      styles.height = height;
    }
    if (flex) {
      styles.flex = flex;
    }
    if (!width && !flex && !height && !style) {
      styles.flex = 1;
    }
    return styles;
  }, [width, height, flex, style]);

  return (
    <View
      style={StyleSheet.flatten([
        {
          borderTopWidth,
          borderRightWidth,
          borderColor,
        },
        styles.cell,
        composedStyles,
        style,
      ])}
    >
      {textDom}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: { justifyContent: "center" },
  text: { backgroundColor: "transparent" },
  row: {
    flexDirection: "row",
    overflow: "hidden",
  },
});
