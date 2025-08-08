// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
// import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
// import { useFocusEffect } from '@react-navigation/native';

// import { saveCompletedTopics, loadCompletedTopics, saveVisitedTopics, loadVisitedTopics } from './progressStorage';

// const windowWidth = Dimensions.get('window').width;

// // Global state for completed topics (in a real app, use AsyncStorage or a state management library)
// let globalCompletedTopics = new Set();

// export default function CourseDetailScreen({ route, navigation }) {
//   const { course } = route.params;
//   const topics = course.topics || [];
//   const [completedTopics, setCompletedTopics] = useState(new Set());
//   const [visitedTopics, setVisitedTopics] = useState(new Set());

//   useFocusEffect(
//     React.useCallback(() => {
//       (async () => {
//         setCompletedTopics(await loadCompletedTopics());
//         setVisitedTopics(await loadVisitedTopics());
//       })();
//     }, [])
//   );

//   const totalTopics = topics.length || 92;
//   const completedTopicsCount = completedTopics.size || 1;
//   const progress = completedTopicsCount / totalTopics;

//   const getTopicStyle = (topicTitle) => {
//     if (completedTopics.has(topicTitle)) return [styles.topicCard, styles.topicCardCompleted];
//     if (visitedTopics.has(topicTitle)) return [styles.topicCard, styles.topicCardVisited];
//     return styles.topicCard;
//   };

//   const handleTopicPress = (topic) => {
//     navigation.navigate('TopicDetail', { 
//       topic, 
//       courseTitle: course.title,
//       onComplete: () => handleTopicComplete(topic.title)
//     });
//   };

//   const handleTopicComplete = (topicTitle) => {
//     globalCompletedTopics.add(topicTitle);
//     setCompletedTopics(new Set(globalCompletedTopics));
//   };

//   const isTopicCompleted = (topicTitle) => {
//     return completedTopics.has(topicTitle);
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#F6FAFF' }}>
//       {/* Header */}
//       <View style={styles.headerBar}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <MaterialIcons name="arrow-back" size={28} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerBarTitle}>{course.title} Learning Hub</Text>
//         <View style={{ width: 36 }} />
//       </View>
//       <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
//         {/* Welcome Section */}
//         <View style={styles.welcomeSection}>
//           <Text style={styles.welcomeText}>Welcome to</Text>
//           <Text style={styles.courseTitle}>{course.title} Learning Hub</Text>
//           <Text style={styles.courseSubtitle}>Master {course.title} programming from basics to advanced concepts</Text>
//         </View>
//         {/* Progress Card */}
//         <View style={styles.progressCard}>
//           <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
//             <MaterialIcons name="trending-up" size={20} color="#2196F3" style={{ marginRight: 6 }} />
//             <Text style={styles.progressTitle}>Your Progress</Text>
//           </View>
//           <Text style={styles.progressStats}>{completedTopicsCount} of {totalTopics} topics completed <Text style={{ color: '#00C853' }}>{`  ${Math.round(progress * 100)}%`}</Text></Text>
//           <View style={styles.progressBarBg}>
//             <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
//           </View>
//           <Text style={styles.progressEncourage}>Great start! Keep going!</Text>
//         </View>
//         {/* Stats Cards */}
//         <View style={styles.statsRow}>
//           <View style={styles.statCard}>
//             <FontAwesome name="book" size={22} color="#2196F3" />
//             <Text style={styles.statValue}>{totalTopics}</Text>
//             <Text style={styles.statLabel}>Total Topics</Text>
//           </View>
//           <View style={styles.statCard}>
//             <Ionicons name="checkmark-done-circle" size={22} color="#00C853" />
//             <Text style={styles.statValue}>{completedTopicsCount}</Text>
//             <Text style={styles.statLabel}>Completed</Text>
//           </View>
//           <View style={styles.statCard}>
//             <MaterialIcons name="military-tech" size={22} color="#FFD600" />
//             <Text style={styles.statValue}>{course.levels || 3}</Text>
//             <Text style={styles.statLabel}>Levels</Text>
//           </View>
//         </View>
//         {/* Start Learning Section */}
//         <Text style={styles.startLearningTitle}>Start Learning</Text>
//         <Text style={styles.startLearningSubtitle}>Begin with these fundamental {course.title} concepts</Text>
//         <View style={{ marginTop: 10 }}>
//           {topics.map((topic, idx) => (
//             <TouchableOpacity
//               key={topic.title}
//               style={getTopicStyle(topic.title)}
//               onPress={() => handleTopicPress(topic)}
//               activeOpacity={0.7}
//             >
//               <View style={styles.topicBadge}><Text style={styles.topicBadgeText}>{topic.level}</Text></View>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.topicTitle}>{topic.title}</Text>
//                 <Text style={styles.topicDesc}>{topic.desc}</Text>
//               </View>
//               {completedTopics.has(topic.title) ? (
//                 <Ionicons name="checkmark-circle" size={22} color="#00C853" />
//               ) : (
//                 <Ionicons name="eye" size={22} color={visitedTopics.has(topic.title) ? '#4CAF50' : '#888'} />
//               )}
//             </TouchableOpacity>
//           ))}
//         </View>
//         {/* View All Topics Button */}
//         <TouchableOpacity style={styles.viewAllBtn} onPress={() => navigation.navigate('AllTopics', { topics, courseTitle: course.title })}>
//           <Text style={styles.viewAllBtnText}>View All Topics</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   headerBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#1976D2',
//     paddingTop: 36,
//     paddingBottom: 16,
//     paddingHorizontal: 16,
//     justifyContent: 'space-between',
//     elevation: 6,
//     shadowColor: '#1976D2',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.12,
//     shadowRadius: 8,
//   },
//   headerBarTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     flex: 1,
//     textAlign: 'center',
//   },
//   welcomeSection: {
//     backgroundColor: '#1976D2',
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//     padding: 24,
//     alignItems: 'center',
//     marginBottom: 18,
//   },
//   welcomeText: { color: '#E3F2FD', fontSize: 16, marginBottom: 4 },
//   courseTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 6 },
//   courseSubtitle: { color: '#E3F2FD', fontSize: 15, textAlign: 'center' },
//   progressCard: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 18,
//     marginHorizontal: 16,
//     marginTop: -32,
//     marginBottom: 18,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//   },
//   progressTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
//   progressStats: { fontSize: 15, color: '#444', marginBottom: 6 },
//   progressBarBg: {
//     width: '100%',
//     height: 8,
//     backgroundColor: '#E3EAF2',
//     borderRadius: 6,
//     marginVertical: 6,
//     overflow: 'hidden',
//   },
//   progressBarFill: {
//     height: 8,
//     backgroundColor: '#2196F3',
//     borderRadius: 6,
//   },
//   progressEncourage: { color: '#00C853', fontWeight: '600', marginTop: 2 },
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 16,
//     marginBottom: 18,
//   },
//   statCard: {
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 18,
//     marginHorizontal: 6,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//   },
//   statValue: { fontSize: 20, fontWeight: 'bold', color: '#1976D2', marginTop: 6 },
//   statLabel: { fontSize: 13, color: '#888', marginTop: 2 },
//   startLearningTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginLeft: 16, marginTop: 8 },
//   startLearningSubtitle: { fontSize: 15, color: '#666', marginLeft: 16, marginBottom: 8 },
//   topicCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF5F5',
//     borderRadius: 14,
//     padding: 16,
//     marginHorizontal: 16,
//     marginBottom: 12,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.06,
//     shadowRadius: 2,
//   },
//   topicCardCompleted: {
//     backgroundColor: '#E8F5E9',
//     borderColor: '#00C853',
//     borderWidth: 1.2,
//   },
//   topicCardVisited: { backgroundColor: '#F1F8E9' },
//   topicBadge: {
//     backgroundColor: '#E0F7FA',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 3,
//     marginRight: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   topicBadgeText: { color: '#00B8D4', fontWeight: 'bold', fontSize: 13 },
//   topicTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
//   topicDesc: { fontSize: 14, color: '#666', marginTop: 2 },
//   viewAllBtn: {
//     backgroundColor: '#1976D2',
//     borderRadius: 14,
//     marginHorizontal: 16,
//     marginTop: 18,
//     paddingVertical: 16,
//     alignItems: 'center',
//     elevation: 2,
//   },
//   viewAllBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold', letterSpacing: 0.5 },
//   backButton: {
//     padding: 8,
//   },
// }); 

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { saveCompletedTopics, loadCompletedTopics, saveVisitedTopics, loadVisitedTopics } from './progressStorage';

const windowWidth = Dimensions.get('window').width;

let globalCompletedTopics = new Set();

export default function CourseDetailScreen({ route, navigation }) {
  const course = route.params?.course || route.params?.subject || {};
  const topics = course.topics || [];
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [visitedTopics, setVisitedTopics] = useState(new Set());

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const completed = await loadCompletedTopics();
        const visited = await loadVisitedTopics();
        globalCompletedTopics = new Set(completed);
        setCompletedTopics(new Set(completed));
        setVisitedTopics(new Set(visited));
      })();
    }, [])
  );

  const totalTopics = topics.length || 1;
  const completedTopicsCount = completedTopics.size;
  const progress = totalTopics > 0 ? completedTopicsCount / totalTopics : 0;

  const getTopicStyle = (title) => {
    if (completedTopics.has(title)) return [styles.topicCard, styles.topicCardCompleted];
    if (visitedTopics.has(title)) return [styles.topicCard, styles.topicCardVisited];
    return styles.topicCard;
  };

  const handleTopicPress = (topic) => {
    navigation.navigate('TopicDetail', {
      topic,
      courseTitle: course.title,
      onComplete: () => handleTopicComplete(topic.title)
    });
  };

  const handleTopicComplete = (title) => {
    globalCompletedTopics.add(title);
    const updatedSet = new Set(globalCompletedTopics);
    setCompletedTopics(updatedSet);
    saveCompletedTopics(Array.from(updatedSet));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F6FAFF' }}>
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerBarTitle}>{course.title} Learning Hub</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.courseTitle}>{course.title} Learning Hub</Text>
          <Text style={styles.courseSubtitle}>Master {course.title} programming from basics to advanced concepts</Text>
        </View>

        <View style={styles.progressCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <MaterialIcons name="trending-up" size={20} color="#2196F3" style={{ marginRight: 6 }} />
            <Text style={styles.progressTitle}>Your Progress</Text>
          </View>
          <Text style={styles.progressStats}>{completedTopicsCount} of {totalTopics} topics completed <Text style={{ color: '#00C853' }}>{`  ${Math.round(progress * 100)}%`}</Text></Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressEncourage}>Great start! Keep going!</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <FontAwesome name="book" size={22} color="#2196F3" />
            <Text style={styles.statValue}>{totalTopics}</Text>
            <Text style={styles.statLabel}>Total Topics</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-done-circle" size={22} color="#00C853" />
            <Text style={styles.statValue}>{completedTopicsCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="military-tech" size={22} color="#FFD600" />
            <Text style={styles.statValue}>{course.levels || 3}</Text>
            <Text style={styles.statLabel}>Levels</Text>
          </View>
        </View>

        <Text style={styles.startLearningTitle}>Start Learning</Text>
        <Text style={styles.startLearningSubtitle}>Begin with these fundamental {course.title} concepts</Text>

        <View style={{ marginTop: 10 }}>
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic.title}
              style={getTopicStyle(topic.title)}
              onPress={() => handleTopicPress(topic)}
              activeOpacity={0.7}
            >
              <View style={styles.topicBadge}><Text style={styles.topicBadgeText}>{topic.level}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDesc}>{topic.desc}</Text>
              </View>
              {completedTopics.has(topic.title) ? (
                <Ionicons name="checkmark-circle" size={22} color="#00C853" />
              ) : (
                <Ionicons name="eye" size={22} color={visitedTopics.has(topic.title) ? '#4CAF50' : '#888'} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.viewAllBtn}
          onPress={() => navigation.navigate('AllTopics', { topics, courseTitle: course.title })}
        >
          <Text style={styles.viewAllBtnText}>View All Topics</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingTop: 36,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  headerBarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  welcomeSection: {
    backgroundColor: '#1976D2',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
  },
  welcomeText: { color: '#E3F2FD', fontSize: 16, marginBottom: 4 },
  courseTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 6 },
  courseSubtitle: { color: '#E3F2FD', fontSize: 15, textAlign: 'center' },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    marginTop: -32,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  progressTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  progressStats: { fontSize: 15, color: '#444', marginBottom: 6 },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#E3EAF2',
    borderRadius: 6,
    marginVertical: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#2196F3',
    borderRadius: 6,
  },
  progressEncourage: { color: '#00C853', fontWeight: '600', marginTop: 2 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 18,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#1976D2', marginTop: 6 },
  statLabel: { fontSize: 13, color: '#888', marginTop: 2 },
  startLearningTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginLeft: 16, marginTop: 8 },
  startLearningSubtitle: { fontSize: 15, color: '#666', marginLeft: 16, marginBottom: 8 },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  topicCardCompleted: {
    backgroundColor: '#E8F5E9',
    borderColor: '#00C853',
    borderWidth: 1.2,
  },
  topicCardVisited: { backgroundColor: '#F1F8E9' },
  topicBadge: {
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicBadgeText: { color: '#00B8D4', fontWeight: 'bold', fontSize: 13 },
  topicTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  topicDesc: { fontSize: 14, color: '#666', marginTop: 2 },
  viewAllBtn: {
    backgroundColor: '#1976D2',
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 18,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 2,
  },
  viewAllBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold', letterSpacing: 0.5 },
  backButton: { padding: 8 },
});
