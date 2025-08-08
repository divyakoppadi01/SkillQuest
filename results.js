import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Calendar, Clock, Target, TrendingUp } from 'lucide-react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { getStoredResults, clearResults } from '../utils/storage';
import SidebarMenu from '../components/SidebarMenu';

const { width } = Dimensions.get('window');

export default function ResultsScreen() {
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalTime: 0,
    improvement: 0,
  });

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const storedResults = await getStoredResults();
      setResults(storedResults.reverse()); // Show newest first
      calculateStats(storedResults);
    } catch (error) {
      console.error('Error loading results:', error);
    }
  };

  const calculateStats = (results) => {
    if (results.length === 0) {
      setStats({
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalTime: 0,
        improvement: 0,
      });
      return;
    }

    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const totalTime = results.reduce((sum, result) => sum + result.timeSpent, 0);
    const bestScore = Math.max(...results.map(r => r.score));
    const averageScore = Math.round(totalScore / results.length);

    // Calculate improvement (compare first 3 vs last 3 results)
    let improvement = 0;
    if (results.length >= 6) {
      const firstThree = results.slice(0, 3).reduce((sum, r) => sum + r.score, 0) / 3;
      const lastThree = results.slice(-3).reduce((sum, r) => sum + r.score, 0) / 3;
      improvement = Math.round(lastThree - firstThree);
    }

    setStats({
      totalQuizzes: results.length,
      averageScore,
      bestScore,
      totalTime: Math.round(totalTime / 60), // Convert to minutes
      improvement,
    });
  };

  const handleClearResults = async () => {
    try {
      await clearResults();
      setResults([]);
      calculateStats([]);
    } catch (error) {
      console.error('Error clearing results:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
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
          <Text style={styles.headerTitle}>Quiz Results</Text>
          <Text style={styles.headerSubtitle}>Track your progress</Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Statistics Overview */}
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Performance Overview</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Trophy size={24} color="#F59E0B" />
                <Text style={styles.statValue}>{stats.totalQuizzes}</Text>
                <Text style={styles.statLabel}>Total Quizzes</Text>
              </View>
              <View style={styles.statCard}>
                <Target size={24} color="#10B981" />
                <Text style={styles.statValue}>{stats.averageScore}%</Text>
                <Text style={styles.statLabel}>Average</Text>
              </View>
              <View style={styles.statCard}>
                <Trophy size={24} color="#EF4444" />
                <Text style={styles.statValue}>{stats.bestScore}%</Text>
                <Text style={styles.statLabel}>Best Score</Text>
              </View>
              <View style={styles.statCard}>
                <TrendingUp size={24} color={stats.improvement >= 0 ? '#10B981' : '#EF4444'} />
                <Text style={[styles.statValue, { color: stats.improvement >= 0 ? '#10B981' : '#EF4444' }]}>
                  {stats.improvement >= 0 ? '+' : ''}{stats.improvement}%
                </Text>
                <Text style={styles.statLabel}>Improvement</Text>
              </View>
            </View>
          </View>

          {/* Recent Results */}
          <View style={styles.resultsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Results</Text>
              {results.length > 0 && (
                <TouchableOpacity onPress={handleClearResults} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>

            {results.length === 0 ? (
              <View style={styles.emptyState}>
                <Trophy size={48} color="#9CA3AF" />
                <Text style={styles.emptyTitle}>No results yet</Text>
                <Text style={styles.emptyText}>Take your first quiz to see results here!</Text>
              </View>
            ) : (
              <View style={styles.resultsList}>
                {results.map((result, index) => (
                  <View key={index} style={styles.resultCard}>
                    <View style={styles.resultHeader}>
                      <Text style={styles.resultCategory}>{result.category}</Text>
                      <View style={[styles.scoreChip, { backgroundColor: getScoreColor(result.score) }]}>
                        <Text style={styles.scoreText}>{result.score}%</Text>
                      </View>
                    </View>
                    
                    <View style={styles.resultDetails}>
                      <View style={styles.resultDetail}>
                        <Calendar size={14} color="#6B7280" />
                        <Text style={styles.resultDetailText}>{formatDate(result.date)}</Text>
                      </View>
                      <View style={styles.resultDetail}>
                        <Clock size={14} color="#6B7280" />
                        <Text style={styles.resultDetailText}>
                          {Math.round(result.timeSpent / 60)}m {result.timeSpent % 60}s
                        </Text>
                      </View>
                    </View>

                    <View style={styles.progressBarContainer}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill, 
                            { 
                              width: `${result.score}%`,
                              backgroundColor: getScoreColor(result.score)
                            }
                          ]} 
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clearButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
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
  resultsContainer: {
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
  resultsList: {
    gap: 12,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
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
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultCategory: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  scoreChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  resultDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resultDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultDetailText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});