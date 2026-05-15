import { Pressable, Text, View } from "react-native";
import { examples } from "../data/examples";
import { styles } from "../styles/appStyles";

type ExampleButtonsProps = {
    addText: (value: string) => void;
};

export function ExampleButtons({ addText }: ExampleButtonsProps) {
    return (
        <View style={styles.examples}>
            {examples.map((example) => (
                <Pressable key={example.kana} style={styles.exampleButton} onPress={() => addText(example.kana)}>
                    <Text style={styles.exampleKana}>{example.kana}</Text>
                    <Text style={styles.exampleRomaji}>{example.romaji}</Text>
                </Pressable>
            ))}
        </View>
    );
}