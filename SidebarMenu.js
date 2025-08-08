import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Chrome as Home, 
  Play, 
  Trophy, 
  User, 
  Menu, 
  X,
  ChevronRight 
} from 'lucide-react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  runOnJS 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = 280;

const menuItems = [
  {
    name: 'Home',
    route: 'Index',
    icon: Home,
    gradient: ['#8B5CF6', '#3B82F6'],
    description: 'Dashboard & Overview'
  },
  {
    name: 'Quiz',
    route: 'QuizScreen',
    icon: Play,
    gradient: ['#10B981', '#059669'],
    description: 'Take Programming Quizzes'
  },
  {
    name: 'Quiz Data',
    route: 'QuizData',
    icon: Trophy,
    gradient: ['#F59E0B', '#D97706'],
    description: 'View Quiz Questions & Data'
  },
  {
    name: 'Results',
    route: 'Results',
    icon: Trophy,
    gradient: ['#F59E0B', '#D97706'],
    description: 'View Your Performance'
  },
  {
    name: 'Profile',
    route: 'Profile',
    icon: User,
    gradient: ['#EF4444', '#DC2626'],
    description: 'Settings & Achievements'
  },
];

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const translateX = useSharedValue(-SIDEBAR_WIDTH);
  const overlayOpacity = useSharedValue(0);

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  const openSidebar = () => {
    setIsOpen(true);
    translateX.value = withSpring(0, {
      damping: 20,
      stiffness: 90,
    });
    overlayOpacity.value = withTiming(1, { duration: 300 });
  };

  const closeSidebar = () => {
    translateX.value = withSpring(-SIDEBAR_WIDTH, {
      damping: 20,
      stiffness: 90,
    });
    overlayOpacity.value = withTiming(0, { duration: 300 });
    
    // Close modal after animation
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleNavigation = (route) => {
    closeSidebar();
    setTimeout(() => {
      if (route === 'Index') {
        navigation.navigate('Home', { screen: 'Index' });
      } else if (route === 'QuizScreen') {
        navigation.navigate('Quiz', { screen: 'QuizScreen' });
      } else if (route === 'QuizData') {
        navigation.navigate('Quiz', { screen: 'QuizData' });
      } else if (route === 'Results') {
        navigation.navigate('Quiz', { screen: 'Results' });
      } else if (route === 'Profile') {
        navigation.navigate('Quiz', { screen: 'ProfileApp' });
      } else {
        navigation.navigate(route);
      }
    }, 100);
  };

  const sidebarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  });

  const getCurrentRoute = () => {
    // Handle nested navigation
    const currentRoute = route.name;
    
    // Check if we're in a nested stack
    const state = navigation.getState();
    const currentStack = state.routes.find(r => r.name === currentRoute);
    
    if (currentStack && currentStack.state) {
      const currentScreen = currentStack.state.routes[currentStack.state.index];
      return currentScreen.name;
    }
    
    return currentRoute;
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      {/* Menu Button */}
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={openSidebar}
        activeOpacity={0.8}
      >
        {/* <LinearGradient
          colors={['#8B5CF6', '#3B82F6']}
          style={styles.menuButtonGradient}
        >
          <Menu size={25} color="black" />
        </LinearGradient> */}
          <Menu size={32} color="black" />
      </TouchableOpacity>

      {/* Sidebar Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closeSidebar}
      >
        <View style={styles.modalContainer}>
          {/* Overlay */}
          <Animated.View style={[styles.overlay, overlayStyle]}>
            <Pressable style={styles.overlayPressable} onPress={closeSidebar} />
          </Animated.View>

          {/* Sidebar */}
          <Animated.View style={[styles.sidebar, sidebarStyle]}>
            <LinearGradient
              colors={['#1F2937', '#111827']}
              style={styles.sidebarGradient}
            >
              {/* Header */}
              <View style={styles.sidebarHeader}>
                <View style={styles.headerContent}>
                  <Text style={styles.appTitle}>Programming Quiz</Text>
                  <Text style={styles.appSubtitle}>Master Your Skills</Text>
                </View>
                <TouchableOpacity 
                  style={styles.closeButton} 
                  onPress={closeSidebar}
                  activeOpacity={0.7}
                >
                  <X size={24} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              {/* Menu Items */}
              <View style={styles.menuContainer}>
                {menuItems.map((item, index) => {
                  const isActive = getCurrentRoute() === item.route;
                  const IconComponent = item.icon;
                  
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.menuItem,
                        isActive && styles.activeMenuItem
                      ]}
                      onPress={() => handleNavigation(item.route)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.menuItemContent}>
                        <View style={styles.menuItemLeft}>
                          <View style={[
                            styles.iconContainer,
                            isActive && styles.activeIconContainer
                          ]}>
                            <LinearGradient
                              colors={isActive ? item.gradient : ['#374151', '#374151']}
                              style={styles.iconGradient}
                            >
                              <IconComponent 
                                size={20} 
                                color={isActive ? "#FFFFFF" : "#9CA3AF"} 
                              />
                            </LinearGradient>
                          </View>
                          <View style={styles.menuTextContainer}>
                            <Text style={[
                              styles.menuItemTitle,
                              isActive && styles.activeMenuItemTitle
                            ]}>
                              {item.name}
                            </Text>
                            <Text style={styles.menuItemDescription}>
                              {item.description}
                            </Text>
                          </View>
                        </View>
                        {isActive && (
                          <ChevronRight size={16} color="#8B5CF6" />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Footer */}
              <View style={styles.sidebarFooter}>
                <View style={styles.footerDivider} />
                <Text style={styles.footerText}>
                  Version 1.0.0
                </Text>
                <Text style={styles.footerSubtext}>
                  Built with ❤️ for developers
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1000,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  menuButtonGradient: {
    width: 46,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayPressable: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: SIDEBAR_WIDTH,
    height: height,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  sidebarGradient: {
    flex: 1,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerContent: {
    flex: 1,
  },
  appTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  menuItem: {
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  activeMenuItem: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  activeIconContainer: {
    elevation: 4,
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iconGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#E5E7EB',
    marginBottom: 2,
  },
  activeMenuItemTitle: {
    color: '#FFFFFF',
  },
  menuItemDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  sidebarFooter: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#374151',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    textAlign: 'center',
  },
});