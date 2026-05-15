import { Text, View } from "react-native";
import { styles } from "../styles/appStyles";

export function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.logo}>
                <Text style={styles.logoText}>あ</Text>
            </View>

            <View>
                <Text style={styles.title}>KanaLearn</Text>
                <Text style={styles.subtitle}>Japanese Keyboard</Text>
            </View>
        </View>
    );
}
