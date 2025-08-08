import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Trophy, Target, Clock, Award, Settings } from 'lucide-react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { getStoredResults, clearResults } from '../utils/storage';
import SidebarMenu from '../components/SidebarMenu';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const [userStats, setUserStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalTime: 0,
    strongestCategory: '',
    weakestCategory: '',
    badges: [],
  });

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      const results = await getStoredResults();
      if (results.length === 0) return;

      // Calculate basic stats
      const totalScore = results.reduce((sum, result) => sum + result.score, 0);
      const totalTime = results.reduce((sum, result) => sum + result.timeSpent, 0);
      const bestScore = Math.max(...results.map(r => r.score));
      const averageScore = Math.round(totalScore / results.length);

      // Calculate category performance
      const categoryStats = {};
      results.forEach(result => {
        if (!categoryStats[result.category]) {
          categoryStats[result.category] = { total: 0, count: 0 };
        }
        categoryStats[result.category].total += result.score;
        categoryStats[result.category].count += 1;
      });

      let strongestCategory = '';
      let weakestCategory = '';
      let highestAvg = 0;
      let lowestAvg = 100;

      Object.keys(categoryStats).forEach(category => {
        const avg = categoryStats[category].total / categoryStats[category].count;
        if (avg > highestAvg) {
          highestAvg = avg;
          strongestCategory = category;
        }
        if (avg < lowestAvg) {
          lowestAvg = avg;
          weakestCategory = category;
        }
      });

      // Calculate badges
      const badges = calculateBadges(results, averageScore, bestScore);

      setUserStats({
        totalQuizzes: results.length,
        averageScore,
        bestScore,
        totalTime: Math.round(totalTime / 60),
        strongestCategory,
        weakestCategory,
        badges,
      });
    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  };

  const calculateBadges = (results, averageScore, bestScore) => {
    const badges = [];

    if (results.length >= 1) badges.push({ name: 'First Quiz', icon: '🎯', description: 'Completed your first quiz' });
    if (results.length >= 10) badges.push({ name: 'Quiz Master', icon: '🏆', description: 'Completed 10 quizzes' });
    if (results.length >= 25) badges.push({ name: 'Dedicated Learner', icon: '📚', description: 'Completed 25 quizzes' });
    if (bestScore === 100) badges.push({ name: 'Perfect Score', icon: '⭐', description: 'Achieved 100% in a quiz' });
    if (averageScore >= 80) badges.push({ name: 'High Achiever', icon: '🎖️', description: 'Maintained 80%+ average' });
    if (results.filter(r => r.score >= 90).length >= 5) badges.push({ name: 'Consistent Excellence', icon: '💎', description: 'Scored 90%+ in 5 quizzes' });

    return badges;
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all quiz data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearResults();
            loadUserStats();
          },
        },
      ]
    );
  };

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <SidebarMenu />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#8B5CF6', '#3B82F6']}
          style={styles.header}
        >
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <User size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.profileName}>Quiz Master</Text>
            <Text style={styles.profileTitle}>Programming Enthusiast</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Performance Stats */}
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Performance Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Trophy size={24} color="#F59E0B" />
                <Text style={styles.statValue}>{userStats.totalQuizzes}</Text>
                <Text style={styles.statLabel}>Quizzes Taken</Text>
              </View>
              <View style={styles.statCard}>
                <Target size={24} color="#10B981" />
                <Text style={styles.statValue}>{userStats.averageScore}%</Text>
                <Text style={styles.statLabel}>Average Score</Text>
              </View>
              <View style={styles.statCard}>
                <Award size={24} color="#EF4444" />
                <Text style={styles.statValue}>{userStats.bestScore}%</Text>
                <Text style={styles.statLabel}>Best Score</Text>
              </View>
              <View style={styles.statCard}>
                <Clock size={24} color="#8B5CF6" />
                <Text style={styles.statValue}>{userStats.totalTime}m</Text>
                <Text style={styles.statLabel}>Total Time</Text>
              </View>
            </View>
          </View>

          {/* Category Performance */}
          {userStats.strongestCategory && (
            <View style={styles.categoryContainer}>
              <Text style={styles.sectionTitle}>Category Performance</Text>
              <View style={styles.categoryCard}>
                <View style={styles.categoryItem}>
                  <Text style={styles.categoryLabel}>Strongest Subject</Text>
                  <Text style={styles.categoryValue}>{userStats.strongestCategory}</Text>
                </View>
                <View style={styles.categoryItem}>
                  <Text style={styles.categoryLabel}>Needs Improvement</Text>
                  <Text style={styles.categoryValue}>{userStats.weakestCategory}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Badges */}
          <View style={styles.badgesContainer}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {userStats.badges.length === 0 ? (
              <View style={styles.noBadges}>
                <Trophy size={48} color="#9CA3AF" />
                <Text style={styles.noBadgesText}>No badges earned yet</Text>
                <Text style={styles.noBadgesSubtext}>Take more quizzes to unlock achievements!</Text>
              </View>
            ) : (
              <View style={styles.badgesGrid}>
                {userStats.badges.map((badge, index) => (
                  <View key={index} style={styles.badgeCard}>
                    <Text style={styles.badgeIcon}>{badge.icon}</Text>
                    <Text style={styles.badgeName}>{badge.name}</Text>
                    <Text style={styles.badgeDescription}>{badge.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Settings */}
          <View style={styles.settingsContainer}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <TouchableOpacity style={styles.settingItem} onPress={handleClearData}>
              <Settings size={20} color="#EF4444" />
              <Text style={styles.settingText}>Clear All Data</Text>
            </TouchableOpacity>
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
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileTitle: {
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
  categoryContainer: {
    marginBottom: 30,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  categoryValue: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  badgesContainer: {
    marginBottom: 30,
  },
  noBadges: {
    alignItems: 'center',
    padding: 40,
  },
  noBadgesText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginTop: 16,
  },
  noBadgesSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    backgroundColor: '#FFFFFF',
    width: (width - 60) / 2,
    padding: 16,
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
  badgeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  settingsContainer: {
    marginBottom: 20,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
    marginLeft: 12,
  },
});