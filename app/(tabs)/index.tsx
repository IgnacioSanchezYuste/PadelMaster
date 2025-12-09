import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 10;
const CARD_WIDTH = (width - CARD_MARGIN * 4) / 2;

// Datos de las categorías
const categories = [
  {
    id: 1,
    name: 'palas',
    title: 'Palas',
    icon: 'sports-tennis' as const,
    color: '#4CAF50',
    gradient: ['#4CAF50', '#8BC34A'],
  },
  {
    id: 2,
    name: 'pelotas',
    title: 'Pelotas',
    icon: 'sports-baseball' as const,
    color: '#2196F3',
    gradient: ['#2196F3', '#03A9F4'],
  },
  {
    id: 3,
    name: 'ropa',
    title: 'Ropa',
    icon: 'checkroom' as const,
    color: '#FF5722',
    gradient: ['#FF5722', '#FF9800'],
  },
  {
    id: 4,
    name: 'mochilas_paleteros',
    title: 'Mochilas y Paleteros',
    icon: 'backpack' as const,
    color: '#9C27B0',
    gradient: ['#9C27B0', '#E91E63'],
  },
  {
    id: 5,
    name: 'accesorios',
    title: 'Accesorios',
    icon: 'settings' as const,
    color: '#607D8B',
    gradient: ['#607D8B', '#78909C'],
  },
  {
    id: 6,
    name: 'zapatillas',
    title: 'Zapatillas',
    icon: 'directions-walk' as const,
    color: '#795548',
    gradient: ['#795548', '#A1887F'],
  },
] as const;

export default function CategoriesScreen() {
  const router = useRouter();

  const handleCategoryPress = (categoryName: string) => {
    console.log(`Navegando a: ${categoryName}`);
    router.navigate(`./${categoryName}` as unknown as never);
  };

  const CategoryCard = ({ category }: { category: (typeof categories)[number] }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleCategoryPress(category.name)}
        activeOpacity={0.8}>
        <View style={[styles.card, { backgroundColor: category.color }]}>
          <View style={styles.iconContainer}>
            <MaterialIcons name={category.icon} size={40} color="white" />
          </View>
          <Text style={styles.cardTitle}>{category.title}</Text>
          <View style={styles.arrowContainer}>
            <MaterialIcons name="arrow-forward" size={20} color="white" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categorías</Text>
        <Text style={styles.headerSubtitle}>
          Selecciona una categoría para explorar
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  scrollContent: {
    padding: CARD_MARGIN,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: CARD_MARGIN * 2,
  },
  card: {
    height: CARD_WIDTH * 1.2,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  arrowContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});