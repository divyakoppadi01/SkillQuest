import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, ChevronRight, Code, BookOpen } from 'lucide-react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { quizCategories } from './data/quizData';
import SidebarMenu from './components/SidebarMenu';

const { width } = Dimensions.get('window');

export default function QuizDataScreen() {
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleQuestion = (questionId) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const getUniqueLanguages = () => {
    const languageMap = new Map();
    
    quizCategories.forEach(category => {
      if (!languageMap.has(category.name)) {
        languageMap.set(category.name, {
          name: category.name,
          gradient: category.gradient,
          categories: quizCategories.filter(cat => cat.name === category.name)
        });
      }
    });
    
    return Array.from(languageMap.values());
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
          <Text style={styles.headerTitle}>Quiz Data</Text>
          <Text style={styles.headerSubtitle}>All available questions and answers</Text>
        </LinearGradient>

        <View style={styles.content}>
          {uniqueLanguages.map((language, languageIndex) => (
            <View key={languageIndex} style={styles.languageSection}>
              <TouchableOpacity
                style={styles.languageHeader}
                onPress={() => toggleCategory(language.name)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={language.gradient}
                  style={styles.languageGradient}
                >
                  <View style={styles.languageHeaderContent}>
                    <Code size={24} color="#FFFFFF" />
                    <View style={styles.languageInfo}>
                      <Text style={styles.languageTitle}>{language.name}</Text>
                      <Text style={styles.languageSubtitle}>
                        {language.categories.length} difficulty levels
                      </Text>
                    </View>
                    {expandedCategories.has(language.name) ? (
                      <ChevronDown size={24} color="#FFFFFF" />
                    ) : (
                      <ChevronRight size={24} color="#FFFFFF" />
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {expandedCategories.has(language.name) && (
                <View style={styles.categoriesContainer}>
                  {language.categories.map((category, categoryIndex) => (
                    <View key={categoryIndex} style={styles.categorySection}>
                      <TouchableOpacity
                        style={styles.categoryHeader}
                        onPress={() => toggleQuestion(`${language.name}-${category.difficulty}`)}
                        activeOpacity={0.8}
                      >
                        <View style={styles.categoryHeaderContent}>
                          <BookOpen size={20} color="#6B7280" />
                          <View style={styles.categoryInfo}>
                            <Text style={styles.categoryTitle}>
                              {category.difficulty} Level
                            </Text>
                            <Text style={styles.categorySubtitle}>
                              {category.questions.length} questions
                            </Text>
                          </View>
                          {expandedQuestions.has(`${language.name}-${category.difficulty}`) ? (
                            <ChevronDown size={20} color="#6B7280" />
                          ) : (
                            <ChevronRight size={20} color="#6B7280" />
                          )}
                        </View>
                      </TouchableOpacity>

                      {expandedQuestions.has(`${language.name}-${category.difficulty}`) && (
                        <View style={styles.questionsContainer}>
                          {category.questions.map((question, questionIndex) => (
                            <View key={questionIndex} style={styles.questionCard}>
                              <Text style={styles.questionText}>
                                {questionIndex + 1}. {question.question}
                              </Text>
                              <View style={styles.optionsContainer}>
                                {question.options.map((option, optionIndex) => (
                                  <View
                                    key={optionIndex}
                                    style={[
                                      styles.optionItem,
                                      optionIndex === question.correct && styles.correctOption
                                    ]}
                                  >
                                    <Text style={[
                                      styles.optionText,
                                      optionIndex === question.correct && styles.correctOptionText
                                    ]}>
                                      {String.fromCharCode(65 + optionIndex)}. {option}
                                    </Text>
                                    {optionIndex === question.correct && (
                                      <Text style={styles.correctLabel}>✓ Correct</Text>
                                    )}
                                  </View>
                                ))}
                              </View>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
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
    paddingTop: 80,
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
  languageSection: {
    marginBottom: 20,
  },
  languageHeader: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  languageGradient: {
    padding: 20,
  },
  languageHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageInfo: {
    flex: 1,
    marginLeft: 16,
  },
  languageTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  languageSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    marginTop: 2,
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  categoryHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  categorySubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  questionsContainer: {
    marginTop: 12,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  questionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    lineHeight: 20,
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 8,
  },
  optionItem: {
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  correctOption: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  optionText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  correctOptionText: {
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  correctLabel: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
    marginTop: 4,
  },
}); 