import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/appStyles";
import { ExampleButtons } from "./ExampleButtons";


type TextComposerProps = {
    text: string;
    setText: (value: string) => void;
    addText: (value: string) => void;
    deleteLast: () => void;
    deleteAll: () => void;
};

export function TextComposer({ text, setText, addText, deleteLast, deleteAll }: TextComposerProps) {
    const canDelete = text.length > 0;

    function copyText() {
        Alert.alert("Copied", text || "Nothing to copy yet");
    }

    return (
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

            <ExampleButtons addText={addText} />
        </View>
    );
}