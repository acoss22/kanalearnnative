import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const kanaRows = [
  ["あ", "い", "う", "え", "お"],
  ["か", "き", "く", "け", "こ"],
  ["さ", "し", "す", "せ", "そ"],
  ["た", "ち", "つ", "て", "と"],
  ["な", "に", "ぬ", "ね", "の"],
  ["は", "ひ", "ふ", "へ", "ほ"],
  ["ま", "み", "む", "め", "も"],
  ["や", "", "ゆ", "", "よ"],
  ["ら", "り", "る", "れ", "ろ"],
  ["わ", "", "ん", "", "を"],
];

const romajiRows = [
  ["a", "i", "u", "e", "o"],
  ["ka", "ki", "ku", "ke", "ko"],
  ["sa", "shi", "su", "se", "so"],
  ["ta", "chi", "tsu", "te", "to"],
  ["na", "ni", "nu", "ne", "no"],
  ["ha", "hi", "fu", "he", "ho"],
  ["ma", "mi", "mu", "me", "mo"],
  ["ya", "", "yu", "", "yo"],
  ["ra", "ri", "ru", "re", "ro"],
  ["wa", "", "n", "", "wo"],
];

const examples = [
  { kana: "おはよう", romaji: "Ohayō" },
  { kana: "おはようございます", romaji: "Ohayō gozaimasu" },
  { kana: "元気ですか？", romaji: "Genki desu ka?" },
  { kana: "ありがとう", romaji: "Arigatō" },
  { kana: "すみません", romaji: "Sumimasen" },
  { kana: "はい", romaji: "Hai" },
  { kana: "いいえ", romaji: "Iie" },
];

export default function App() {
  const [text, setText] = useState("");

  const canDelete = useMemo(() => text.length > 0, [text]);

  function addText(value: string) {
    setText((current) => `${current}${value}`);
  }

  function deleteLast() {
    setText((current) => current.slice(0, -1));
  }

  function deleteAll() {
    setText("");
  }

  function copyText() {
    Alert.alert("Copied", text || "Nothing to copy yet");
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>あ</Text>
        </View>

        <View>
          <Text style={styles.title}>KanaLearn</Text>
          <Text style={styles.subtitle}>Japanese Keyboard</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <TextInput
            value={text}
            onChangeText={setText}
            multiline
            style={styles.input}
            placeholder="Tap kana below..."
            placeholderTextColor="#94a3b8"
          />

          <View style={styles.actions}>
            <Pressable
              style={[styles.actionButton, !canDelete && styles.disabledButton]}
              onPress={deleteLast}
              disabled={!canDelete}
            >
              <Text style={styles.actionText}>Delete</Text>
            </Pressable>

            <Pressable
              style={[styles.actionButton, !canDelete && styles.disabledButton]}
              onPress={deleteAll}
              disabled={!canDelete}
            >
              <Text style={styles.actionText}>Delete all</Text>
            </Pressable>

            <Pressable
              style={[styles.actionButton, !canDelete && styles.disabledButton]}
              onPress={copyText}
              disabled={!canDelete}
            >
              <Text style={styles.actionText}>Copy</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Examples</Text>

          <View style={styles.examples}>
            {examples.map((example) => (
              <Pressable key={example.kana} style={styles.exampleButton} onPress={() => addText(example.kana)}>
                <Text style={styles.exampleKana}>{example.kana}</Text>
                <Text style={styles.exampleRomaji}>{example.romaji}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.keyboardCard}>
          <Text style={styles.keyboardTitle}>Hiragana</Text>

          <View style={styles.columnLabels}>
            {["a", "i", "u", "e", "o"].map((label) => (
              <Text key={label} style={styles.columnLabel}>
                {label}
              </Text>
            ))}
          </View>

          {kanaRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.kanaRow}>
              {row.map((kana, columnIndex) => {
                const romaji = romajiRows[rowIndex][columnIndex];

                if (!kana) {
                  return <View key={`${rowIndex}-${columnIndex}`} style={styles.emptyKey} />;
                }

                return (
                  <Pressable key={kana} style={styles.kanaKey} onPress={() => addText(kana)}>
                    <Text style={styles.kana}>{kana}</Text>
                    <Text style={styles.romaji}>{romaji}</Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },
  header: {
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 18,
    backgroundColor: "#14213d",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#ff4d6d",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "white",
    fontSize: 26,
    fontWeight: "800",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 13,
    marginTop: 2,
  },
  content: {
    padding: 18,
    gap: 18,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 22,
    padding: 16,
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  input: {
    minHeight: 120,
    borderWidth: 2,
    borderColor: "#ff4d6d",
    borderRadius: 14,
    padding: 14,
    fontSize: 24,
    textAlignVertical: "top",
    color: "#0f172a",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#14213d",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#d8dee8",
  },
  actionText: {
    color: "white",
    fontWeight: "800",
    textTransform: "uppercase",
    fontSize: 11,
  },
  sectionTitle: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
  },
  examples: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  exampleButton: {
    borderWidth: 1,
    borderColor: "#dbe3ef",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: "30%",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  exampleKana: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
  },
  exampleRomaji: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  keyboardCard: {
    backgroundColor: "white",
    borderRadius: 22,
    padding: 16,
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  keyboardTitle: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ff4d6d",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "900",
    color: "#14213d",
    fontSize: 16,
  },
  columnLabels: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  columnLabel: {
    flex: 1,
    textAlign: "center",
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },
  kanaRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  kanaKey: {
    flex: 1,
    minHeight: 62,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dbe3ef",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyKey: {
    flex: 1,
    minHeight: 62,
  },
  kana: {
    fontSize: 26,
    color: "#0f172a",
    fontWeight: "800",
  },
  romaji: {
    marginTop: 2,
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },
});