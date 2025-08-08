import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Code as Code2, Trophy, Target, Clock } from 'lucide-react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useNavigation } from '@react-navigation/native';
import { quizCategories } from '../data/quizData';
import { getStoredResults } from '../utils/storage';
import SidebarMenu from '../components/SidebarMenu';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalTime: 0,
  });

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const results = await getStoredResults();
      if (results.length > 0) {
        const totalScore = results.reduce((sum, result) => sum + result.score, 0);
        const totalTime = results.reduce((sum, result) => sum + result.timeSpent, 0);
        
        setStats({
          totalQuizzes: results.length,
          averageScore: Math.round(totalScore / results.length),
          bestScore: Math.max(...results.map(r => r.score)),
          totalTime: Math.round(totalTime / 60), // Convert to minutes
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Get unique languages from quiz categories
  const getUniqueLanguages = () => {
    const languageMap = new Map();
    
    quizCategories.forEach(category => {
      if (!languageMap.has(category.name)) {
        // Count total questions for this language across all difficulties
        const totalQuestions = quizCategories
          .filter(cat => cat.name === category.name)
          .reduce((sum, cat) => sum + cat.questions.length, 0);
        
        languageMap.set(category.name, {
          name: category.name,
          gradient: category.gradient,
          totalQuestions,
          difficulties: quizCategories
            .filter(cat => cat.name === category.name)
            .map(cat => cat.difficulty)
        });
      }
    });
    
    return Array.from(languageMap.values());
  };

  const handleLanguagePress = (language) => {
    // Navigate to quiz selection with the selected language
    navigation.navigate('Quiz', { 
      screen: 'QuizScreen',
      params: { selectedLanguage: language.name }
    });
  };

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  const uniqueLanguages = getUniqueLanguages();

  return (
    <View style={styles.container}>
      <SidebarMenu />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#8B5CF6', '#3B82F6']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.headerTitle}>Quiz</Text>
          <Text style={styles.headerSubtitle}>Test your coding knowledge</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Trophy size={24} color="#F59E0B" />
                <Text style={styles.statValue}>{stats.totalQuizzes}</Text>
                <Text style={styles.statLabel}>Quizzes</Text>
              </View>
              <View style={styles.statCard}>
                <Target size={24} color="#10B981" />
                <Text style={styles.statValue}>{stats.averageScore}%</Text>
                <Text style={styles.statLabel}>Avg Score</Text>
              </View>
              <View style={styles.statCard}>
                <Trophy size={24} color="#EF4444" />
                <Text style={styles.statValue}>{stats.bestScore}%</Text>
                <Text style={styles.statLabel}>Best Score</Text>
              </View>
              <View style={styles.statCard}>
                <Clock size={24} color="#8B5CF6" />
                <Text style={styles.statValue}>{stats.totalTime}m</Text>
                <Text style={styles.statLabel}>Time</Text>
              </View>
            </View>
          </View>

          <View style={styles.categoriesContainer}>
            <Text style={styles.sectionTitle}>Choose a Language</Text>
            <View style={styles.categoriesGrid}>
              {uniqueLanguages.map((language, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryCard}
                  activeOpacity={0.8}
                  onPress={() => handleLanguagePress(language)}
                >
                  <LinearGradient
                    colors={language.gradient}
                    style={styles.categoryGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Code2 size={32} color="#FFFFFF" />
                    <Text style={styles.categoryTitle}>{language.name}</Text>
                    <Text style={styles.categoryQuestions}>
                      {language.totalQuestions} questions
                    </Text>
                    <Text style={styles.categoryDifficulties}>
                      {language.difficulties.join(' • ')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 40,
    paddingTop: 80, // Space for menu button
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  content: {
    padding: 20,
  },
  statsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 60) / 2,
    height: 140,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  categoryGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  categoryQuestions: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    marginTop: 4,
  },
  categoryDifficulties: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#F3F4F6',
    marginTop: 4,
    textTransform: 'uppercase',
  },
});