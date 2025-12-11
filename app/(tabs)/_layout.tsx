import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fa8911ff',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'scan' : 'scan-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Categorías',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="NewProduct"
        options={{
          title: 'Añadir Producto',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
    
  );
}
