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
        placeholderTextColor="#AAA"
      />
      <View style={styles.buttonContainer}>
        <Button onPress={() => onSearch(input)} title="Search" color="#FFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#EEE",
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    color: "#000",
  },
  buttonContainer: {
    backgroundColor: "#0080ff",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: "center",
  },
});
