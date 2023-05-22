import React, { useState } from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";

interface SearchInput {
  onSearch: (input: string) => void;
}

export const SearchInput: React.FC<SearchInput> = ({ onSearch }) => {
  const [input, setInput] = useState<string>("");

  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Search user"
      />
      <Button onPress={() => onSearch(input)} title="Search" />
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginRight: 10,
    flex: 1,
  },
});
