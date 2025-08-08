import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, ChevronRight, Check, X, ArrowLeft } from 'lucide-react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useRoute } from '@react-navigation/native';
import { quizCategories } from '../data/quizData';
import { storeResult } from '../utils/storage';
import SidebarMenu from '../components/SidebarMenu';

const { width } = Dimensions.get('window');

export default function QuizScreen() {
  const route = useRoute();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showDifficultySelection, setShowDifficultySelection] = useState(false);

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (route.params?.selectedLanguage) {
      setSelectedLanguage(route.params.selectedLanguage);
      setShowDifficultySelection(true);
    }
  }, [route.params?.selectedLanguage]);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, showResult]);

  const getLanguageCategories = (languageName) => {
    return quizCategories.filter(category => category.name === languageName);
  };

  const startQuiz = (category) => {
    setCurrentCategory(category);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(30);
    setQuizStarted(true);
    setAnswers([]);
    setShowDifficultySelection(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = async () => {
    const question = currentCategory.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    
    const newAnswers = [...answers, {
      question: question.question,
      selectedAnswer: selectedAnswer,
      correctAnswer: question.correct,
      isCorrect: isCorrect,
    }];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < currentCategory.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      const finalScore = isCorrect ? score + 1 : score;
      const percentage = Math.round((finalScore / currentCategory.questions.length) * 100);
      
      // Store result
      await storeResult({
        category: `${currentCategory.name} (${currentCategory.difficulty})`,
        score: percentage,
        timeSpent: (currentCategory.questions.length * 30) - timeLeft,
        date: new Date().toISOString(),
        answers: newAnswers,
      });
      
      setShowResult(true);
      setQuizStarted(false);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(30);
    setAnswers([]);
    setShowDifficultySelection(true);
  };

  const goBackToLanguageSelection = () => {
    setSelectedLanguage(null);
    setShowDifficultySelection(false);
    setQuizStarted(false);
    setShowResult(false);
  };

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  if (showResult) {
    const percentage = Math.round((score / currentCategory.questions.length) * 100);
    return (
      <View style={styles.container}>
        <SidebarMenu />
        <LinearGradient
          colors={percentage >= 80 ? ['#10B981', '#059669'] : percentage >= 60 ? ['#F59E0B', '#D97706'] : ['#EF4444', '#DC2626']}
          style={styles.resultContainer}
        >
          <Text style={styles.resultTitle}>Quiz Complete!</Text>
          <Text style={styles.resultScore}>{percentage}%</Text>
          <Text style={styles.resultText}>
            You scored {score} out of {currentCategory.questions.length} questions
          </Text>
          <Text style={styles.resultCategory}>
            {currentCategory.name} - {currentCategory.difficulty}
          </Text>
          
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetQuiz}
          >
            <Text style={styles.resetButtonText}>Try Again</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  if (showDifficultySelection && selectedLanguage) {
    const languageCategories = getLanguageCategories(selectedLanguage);
    const languageGradient = languageCategories[0]?.gradient || ['#8B5CF6', '#3B82F6'];

    return (
      <View style={styles.container}>
        <SidebarMenu />
        <LinearGradient
          colors={languageGradient}
          style={styles.header}
        >
          <View style={styles.headerWithBack}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={goBackToLanguageSelection}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>{selectedLanguage}</Text>
              <Text style={styles.headerSubtitle}>Choose Difficulty Level</Text>
            </View>
          </View>
        </LinearGradient>
        
        <View style={styles.difficultiesContainer}>
          {languageCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.difficultyButton}
              onPress={() => startQuiz(category)}
            >
              <LinearGradient
                colors={category.gradient}
                style={styles.difficultyButtonGradient}
              >
                <View style={styles.difficultyContent}>
                  <Text style={styles.difficultyTitle}>{category.difficulty}</Text>
                  <Text style={styles.difficultyInfo}>
                    {category.questions.length} questions
                  </Text>
                </View>
                <ChevronRight size={24} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  if (!quizStarted) {
    return (
      <View style={styles.container}>
        <SidebarMenu />
        <LinearGradient
          colors={['#8B5CF6', '#3B82F6']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Select a Quiz</Text>
        </LinearGradient>
        
        <View style={styles.categoriesContainer}>
          {quizCategories
            .filter((category, index, self) => 
              index === self.findIndex(c => c.name === category.name)
            )
            .map((category) => (
              <TouchableOpacity
                key={category.name}
                style={styles.categoryButton}
                onPress={() => {
                  setSelectedLanguage(category.name);
                  setShowDifficultySelection(true);
                }}
              >
                <LinearGradient
                  colors={category.gradient}
                  style={styles.categoryButtonGradient}
                >
                  <Text style={styles.categoryButtonTitle}>{category.name}</Text>
                  <Text style={styles.categoryButtonInfo}>
                    Multiple difficulty levels
                  </Text>
                  <ChevronRight size={24} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  }

  const question = currentCategory.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentCategory.questions.length) * 100;

  return (
    <View style={styles.container}>
      <SidebarMenu />
      <LinearGradient
        colors={currentCategory.gradient}
        style={styles.quizHeader}
      >
        <View style={styles.quizInfo}>
          <Text style={styles.categoryName}>
            {currentCategory.name} - {currentCategory.difficulty}
          </Text>
          <Text style={styles.questionNumber}>
            Question {currentQuestion + 1} of {currentCategory.questions.length}
          </Text>
        </View>
        
        <View style={styles.timerContainer}>
          <Clock size={16} color="#FFFFFF" />
          <Text style={styles.timerText}>{timeLeft}s</Text>
        </View>
      </LinearGradient>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
        
        <View style={styles.answersContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerButton,
                selectedAnswer === index && styles.selectedAnswer,
              ]}
              onPress={() => handleAnswerSelect(index)}
            >
              <Text style={[
                styles.answerText,
                selectedAnswer === index && styles.selectedAnswerText,
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !selectedAnswer && styles.disabledButton]}
          onPress={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion + 1 === currentCategory.questions.length ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 40,
    paddingTop: 80, // Space for menu button
    alignItems: 'center',
  },
  headerWithBack: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    marginTop: 4,
  },
  categoriesContainer: {
    padding: 20,
  },
  categoryButton: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryButtonGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryButtonTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    flex: 1,
  },
  categoryButtonInfo: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    marginRight: 12,
  },
  difficultiesContainer: {
    padding: 20,
  },
  difficultyButton: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  difficultyButtonGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  difficultyContent: {
    flex: 1,
  },
  difficultyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  difficultyInfo: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    marginTop: 4,
  },
  quizHeader: {
    padding: 20,
    paddingTop: 80, // Space for menu button
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  questionNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    marginTop: 4,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timerText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  progressContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  questionContainer: {
    flex: 1,
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    lineHeight: 28,
    marginBottom: 30,
  },
  answersContainer: {
    marginBottom: 30,
  },
  answerButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedAnswer: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F3F4F6',
  },
  answerText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  selectedAnswerText: {
    fontFamily: 'Inter-SemiBold',
    color: '#8B5CF6',
  },
  nextButton: {
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  resultTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  resultScore: {
    fontSize: 72,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  resultCategory: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  resetButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});