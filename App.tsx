import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Header } from "./components/Header";
import { HiraganaKeyboard } from "./components/HiraganaKeyboard";
import { TextComposer } from "./components/TextComposer";
import { styles } from "./styles/appStyles";


export default function App() {
  const [text, setText] = useState("");

  function addText(value: string) {
    setText((current) => `${current}${value}`);
  }

  function deleteLast() {
    setText((current) => current.slice(0, -1));
  }

  function deleteAll() {
    setText("");
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <Header />

      <ScrollView contentContainerStyle={styles.content}>
        <TextComposer
          text={text}
          setText={setText}
          addText={addText}
          deleteLast={deleteLast}
          deleteAll={deleteAll}
        />

        <HiraganaKeyboard addText={addText} />
      </ScrollView>
    </View>
  );
}