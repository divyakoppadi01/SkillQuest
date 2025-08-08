import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import CourseDetailScreen from './CourseDetailScreen';
import 'react-native-reanimated';
import AllTopicsScreen from './AllTopicsScreen';
import TopicDetailScreen from './TopicDetailScreen';

const FILTERS = [
  { label: 'All Topics', key: 'all', color: '#2196F3', icon: 'apps' },
  { label: 'Popular', key: 'popular', color: '#FFD600', icon: 'star' },
  { label: 'Newest', key: 'newest', color: '#7C4DFF', icon: 'fiber-new' },
  { label: 'Advanced', key: 'advanced', color: '#00C853', icon: 'school' },
];

const COURSES = [
  {
    id: '1',
    title: 'C',
    duration: '40 min',
    // image: require('./assets/icon.png'),
    image: require('../assets/C.png'),
    tags: ['popular'],
    popular: true,
    topics: [
      { title: 'Introduction to C', desc: 'Overview of C programming', level: 'Basic' },
      { title: 'Variables and Data Types', desc: 'Understanding variables and types', level: 'Basic' },
      { title: 'Control Structures', desc: 'If, else, switch, loops', level: 'Intermediate' },
      { title: 'Functions', desc: 'Defining and using functions', level: 'Intermediate' },
      { title: 'Pointers', desc: 'Introduction to pointers', level: 'Advanced' },
      { title: 'Memory Management', desc: 'Dynamic memory allocation', level: 'Advanced' },
    ],
  },
  {
    id: '2',
    title: 'C++',
    duration: '45 min',
    // image: require('./assets/adaptive-icon.png'),
    image: require('../assets/C++.png'),
    tags: ['New'],
    newest: true,
    topics: [
      { title: 'C++ Introduction', desc: 'Get started with C++ programming', level: 'Basic' },
      { title: 'Variables', desc: 'Learn about C++ variables', level: 'Basic' },
      { title: 'Data Types', desc: 'Understanding C++ data types', level: 'Basic' },
      { title: 'Classes and Objects', desc: 'OOP in C++', level: 'Intermediate' },
      { title: 'Inheritance', desc: 'OOP inheritance', level: 'Intermediate' },
      { title: 'Templates', desc: 'Generic programming', level: 'Advanced' },
      { title: 'STL', desc: 'Standard Template Library', level: 'Advanced' },
    ],
  },
  {
    id: '3',
    title: 'Python',
    duration: '50 min',
    // image: require('./assets/splash-icon.png'),
    image: require('../assets/Python.png'),
    tags: ['New'],
    newest: true,
    topics: [
      { title: 'Introduction to Python', desc: 'Overview of Python programming', level: 'Basic' },
      { title: 'Variables and Data Types', desc: 'Understanding variables and types', level: 'Basic' },
      { title: 'Control Structures', desc: 'If, else, switch, loops', level: 'Intermediate' },
      { title: 'Functions', desc: 'Defining and using functions', level: 'Intermediate' },
      { title: 'Libraries and Modules', desc: 'Using external libraries and modules', level: 'Intermediate' },
      { title: 'Object-Oriented Programming', desc: 'Introduction to object-oriented programming', level: 'Intermediate' },
      { title: 'Advanced Topics', desc: 'Advanced topics in Python programming', level: 'Advanced' },
    ],
  },
  {
    id: '4',
    title: 'Java',
    duration: '55 min',
    // image: require('./assets/favicon.png'),
    image: require('../assets/java.jpeg'),
    tags: ['Advanced'],
    advanced: true,
    topics: [
      { title: 'Introduction to Java', desc: 'Overview of Java programming', level: 'Basic' },
      { title: 'Variables and Data Types', desc: 'Understanding variables and types', level: 'Basic' },
      { title: 'Control Structures', desc: 'If, else, switch, loops', level: 'Intermediate' },
      { title: 'Functions', desc: 'Defining and using functions', level: 'Intermediate' },
      { title: 'Object-Oriented Programming', desc: 'Introduction to object-oriented programming', level: 'Intermediate' },
      { title: 'Advanced Topics', desc: 'Advanced topics in Java programming', level: 'Advanced' },
    ],
  },
  {
    id: '5',
    title: 'AI',
    duration: '60 min',
    // image: require('../assets/icon.png'),
    image: require('../assets/ai.png'),
    tags: ['popular'],
    // advanced: true,
    popular: true,
    topics: [
      { title: 'Introduction to AI', desc: 'Overview of AI and its applications', level: 'Basic' },
      { title: 'Machine Learning Basics', desc: 'Introduction to machine learning', level: 'Basic' },
      { title: 'Deep Learning', desc: 'Introduction to deep learning', level: 'Intermediate' },
      { title: 'Natural Language Processing', desc: 'Introduction to natural language processing', level: 'Intermediate' },
      { title: 'Computer Vision', desc: 'Introduction to computer vision', level: 'Intermediate' },
      { title: 'Advanced Topics', desc: 'Advanced topics in AI and machine learning', level: 'Advanced' },
    ],
  },
  {
    id: '6',
    title: 'ML',
    duration: '70 min',
    // image: require('./assets/adaptive-icon.png'),
    image: require('../assets/ML.jpeg'),
    tags: ['Advanced'],
    advanced: true,
    // newest: true,
    topics: [
      { title: 'Introduction to Machine Learning', desc: 'Overview of machine learning', level: 'Basic' },
      { title: 'Supervised Learning', desc: 'Introduction to supervised learning', level: 'Basic' },
      { title: 'Unsupervised Learning', desc: 'Introduction to unsupervised learning', level: 'Intermediate' },
      { title: 'Deep Learning', desc: 'Introduction to deep learning', level: 'Intermediate' },
      { title: 'Data Preprocessing', desc: 'Introduction to data preprocessing', level: 'Intermediate' },
      { title: 'Advanced Topics', desc: 'Advanced topics in machine learning', level: 'Advanced' },
    ],
  },
  {
    id: '7',
    title: 'Data Science',
    duration: '65 min',
    // image: require('./assets/splash-icon.png'),
    image: require('../assets/DS.jpeg'),
    tags: ['Advanced'],
    advanced: true,
    topics: [
      { title: 'Introduction to Data Science', desc: 'Overview of data science', level: 'Basic' },
      { title: 'Data Collection', desc: 'Introduction to data collection', level: 'Basic' },
      { title: 'Data Cleaning', desc: 'Introduction to data cleaning', level: 'Intermediate' },
      { title: 'Data Analysis', desc: 'Introduction to data analysis', level: 'Intermediate' },
      { title: 'Data Visualization', desc: 'Introduction to data visualization', level: 'Intermediate' },
      { title: 'Advanced Topics', desc: 'Advanced topics in data science', level: 'Advanced' },
    ],
  },
  {
    id: '8',
    title: 'Development',
    duration: '80 min',
    // image: require('./assets/favicon.png'),
    image: require('../assets/web.png'),
    tags: ['New'],
    newest: true,
    topics: [
      { title: 'Introduction to Web Development', desc: 'Overview of web development', level: 'Basic' },
      { title: 'HTML', desc: 'Introduction to HTML', level: 'Basic' },
      { title: 'CSS', desc: 'Introduction to CSS', level: 'Basic' },
      { title: 'JavaScript', desc: 'Introduction to JavaScript', level: 'Intermediate' },
      { title: 'Server-Side Programming', desc: 'Introduction to server-side programming', level: 'Intermediate' },
      { title: 'Advanced Topics', desc: 'Advanced topics in web development', level: 'Advanced' },
    ],
  },
  {
    id: '9',
    title: 'JavaScript',
    duration: '35 min',
    // image: require('./assets/icon.png'),
    image: require('../assets/js.png'),
    tags: ['popular'],
    popular: true,
    topics: [
      { title: 'Introduction to JavaScript', desc: 'Overview of JavaScript', level: 'Basic' },
      { title: 'Variables and Data Types', desc: 'Understanding variables and types', level: 'Basic' },
      { title: 'Control Structures', desc: 'If, else, switch, loops', level: 'Intermediate' },
      { title: 'Functions', desc: 'Defining and using functions', level: 'Intermediate' },
      { title: 'Object-Oriented Programming', desc: 'Introduction to object-oriented programming', level: 'Intermediate' },
      { title: 'Advanced Topics', desc: 'Advanced topics in JavaScript', level: 'Advanced' },
    ],
  },
  {
    id: '10',
    title: 'React Native',
    duration: '55 min',
    // image: require('./assets/adaptive-icon.png'),
    image: require('../assets/react.png'),
    tags: ['Advanced'],
    advanced: true,
    topics: [
      { title: 'Introduction to React Native', desc: 'Overview of React Native', level: 'Basic' },
      { title: 'Setting Up the Environment', desc: 'Setting up the development environment', level: 'Basic' },
      { title: 'Basic Components', desc: 'Introduction to basic components', level: 'Intermediate' },
      { title: 'State Management', desc: 'Introduction to state management', level: 'Intermediate' },
      { title: 'Advanced Topics', desc: 'Advanced topics in React Native', level: 'Advanced' },
    ],
  },
];

function filterCourses(courses, filter) {
  if (filter === 'all') return courses;
  if (filter === 'popular') return courses.filter(c => c.popular);
  if (filter === 'newest') return courses.filter(c => c.newest);
  if (filter === 'advanced') return courses.filter(c => c.advanced);
  return courses;
}

function CoursesScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const filteredCourses = filterCourses(COURSES, selectedFilter);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Courses</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && { backgroundColor: filter.color },
            ]}
            onPress={() => setSelectedFilter(filter.key)}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name={filter.icon}
              size={18}
              color={selectedFilter === filter.key ? '#fff' : filter.color}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.key && { color: '#fff' },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>All Topics Courses</Text>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.courseList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CourseDetail', { course: item })}
            activeOpacity={0.85}
          >
            <Image source={item.image} style={styles.courseImage} />
            <Text style={styles.courseTitle}>{item.title}</Text>
            <View style={styles.durationRow}>
              <MaterialIcons name="access-time" size={16} color="#90A4AE" />
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
            <View style={styles.badgeRow}>
              {item.tags && item.tags.map(tag => (
                <View
                  key={tag}
                  style={[
                    styles.badge,
                    tag === 'New' && { backgroundColor: '#7C4DFF' },
                    tag === 'Advanced' && { backgroundColor: '#00C853' },
                  ]}
                >
                  <Text style={styles.badgeText}>{tag}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function CoursesScreen1() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Courses" component={CoursesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AllTopics" component={AllTopicsScreen} options={{ title: 'oopics' }} />
      <Stack.Screen name="TopicDetail" component={TopicDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6FAFF', paddingHorizontal: 12, paddingTop: 36 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 18, color: '#222' },
  filterRow: { flexGrow: 0, flexDirection: 'row', marginBottom: 18 },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 22,
    backgroundColor: '#fff',
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: '#E3EAF2',
    elevation: 2,
  },
  filterText: { fontSize: 16, color: '#2196F3', fontWeight: '600' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 14, color: '#222' },
  courseList: { paddingBottom: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    margin: 8,
    flex: 1,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  courseImage: { width: 70, height: 70, borderRadius: 14, marginBottom: 10 },
  courseTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 6, color: '#333' },
  durationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  durationText: { marginLeft: 4, color: '#90A4AE', fontSize: 14 },
  badgeRow: { flexDirection: 'row', marginTop: 2 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#2196F3',
    marginRight: 6,
    marginTop: 2,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});
