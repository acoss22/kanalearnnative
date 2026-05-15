import { Pressable, Text, View } from "react-native";
import { kanaRows, romajiRows } from "../data/kana";
import { styles } from "../styles/appStyles";

type HiraganaKeyboardProps = {
    addText: (value: string) => void;
};

export function HiraganaKeyboard({ addText }: HiraganaKeyboardProps) {
    return (
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
    );
}