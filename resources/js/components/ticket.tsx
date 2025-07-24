import { AreaT } from '@/types/general';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

type Props = {
    // ticketData: { area: AreaT; visible_code: string; created_at: string };
    ticketData: any;
};

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        textAlign: 'center',
    },
    centeredText: {
        textAlign: 'center',
    },
    code: { padding: '2 0', fontWeight: 'bold' },
    area: { padding: '2 0' },
    date: { fontSize: 10, margin: '10 0 0 0' },
    title: { fontSize: 10 },
});
export default function Ticket({ ticketData }: Props) {
    return (
        <Document>
            <Page size={[226.4, 1700]} style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>
                        Munincipalidad Distrital de San Miguel
                    </Text>
                    <Text>-------------------------------</Text>
                    <Text style={styles.code}>{ticketData.visible_code}</Text>
                    <Text>-------------------------------</Text>
                    <Text style={styles.area}>{ticketData.area.name}</Text>
                    <Text style={styles.date}>{ticketData.created_at}</Text>
                </View>
            </Page>
        </Document>
    );
}
