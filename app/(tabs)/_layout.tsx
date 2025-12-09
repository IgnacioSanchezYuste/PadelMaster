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
          title: 'Palas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="pelotas"
        options={{
          title: 'Pelotas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'tennisball' : 'tennisball-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="pala_Detail"
        options={{
          title: 'pala Detail',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
    
  );
}
