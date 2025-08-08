// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   Linking
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

// const HomeScreen = () => {
//   const subjects = [
//     { id: '1', title: 'CPP', icon: require('../assets/cppb.png'), bgColor: '#FDE8E4' },
//     { id: '2', title: 'C', icon: require('../assets/cb.png'), bgColor: '#FFF3D6' },
//     { id: '3', title: 'Java', icon: require('../assets/javab.png'), bgColor: '#FFE6EA' },
//     { id: '4', title: 'Python', icon: require('../assets/pythonb.png'), bgColor: '#FFE8ED' },
//     { id: '5', title: 'ReactJS', icon: require('../assets/reactb.png'), bgColor: '#F0F8FF' },
//     { id: '6', title: 'SQL', icon: require('../assets/sqlb.png'), bgColor: '#E6E6FA' },
//   ];

//   const videoCourses = [
//     {
//       id: 'v1',
//       title: 'CPP',
//       author: 'By Nozomi Sasaki',
//       rating: '4.6',
//       thumbnail: require('../assets/C++.png'),
//       sourceUrl: 'https://youtu.be/-TkoO8Z07hI?si=pIY8GVGrTXKVf8kx'
//     },
//     {
//       id: 'v2',
//       title: 'SQL',
//       author: 'By Alan Turing',
//       rating: '4.9',
//       thumbnail: require('../assets/sql.jpeg'),
//       sourceUrl: 'https://youtu.be/7S_tz1z_5bA?si=NsUPtGZkLnrllLET'
//     },
//     {
//       id: 'v3',
//       title: 'HTML',
//       author: 'By Grace Hopper',
//       rating: '4.7',
//       thumbnail: require('../assets/html2.jpg'),
//       sourceUrl: 'https://youtu.be/qz0aGYrrlhU?si=gcHGnmIdGUMszm6x'
//     },
//     {
//       id: 'v4',
//       title: 'C',
//       author: 'By Mark Zuckerberg',
//       rating: '4.8',
//       thumbnail: require('../assets/c2.jpg'),
//       sourceUrl: 'https://youtu.be/mEsleV16qdo?si=7B84cSSTQnzgaw7y'
//     },
//   ];

//   const features = [
//     {
//       image: require('../assets/quiz-pic.jpeg'),
//       title: 'Gamified Quizzes',
//       description: 'Interactive quizzes to test knowledge and enhance learning.'
//     },
//     {
//       image: require('../assets/chatbot-pic.jpeg'),
//       title: 'Live Chatbot',
//       description: 'AI chatbot offering instant, 24/7 support and guidance.'
//     },
//     {
//       image: require('../assets/progg-pic.jpg'),
//       title: 'Progress Tracker',
//       description: 'Track learning goals with real-time analytics.'
//     },
//     {
//       image: require('../assets/ach-pic.jpg'),
//       title: 'Achievements',
//       description: 'Earn certificates to showcase your skills.'
//     },
//   ];

//   const renderSubjectCard = ({ item }) => (
//     <SubjectCard
//       icon={item.icon}
//       title={item.title}
//       bgColor={item.bgColor}
//     />
//   );

//   const renderFeatureCard = ({ item }) => (
//     <FeatureCard
//       image={item.image}
//       title={item.title}
//       description={item.description}
//     />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>

//         <View style={styles.header}>
//           <Text style={styles.helloText}>Hello, Divya!!</Text>
//         </View>

//         <View style={styles.growCard}>
//           <View style={styles.growCardContent}>
//             <Text style={styles.growCardTitle}>Grow through learning ....</Text>
//           </View>
//           <Image
//             source={require('../assets/computer.jpg')}
//             style={styles.growCardImage}
//             resizeMode="contain"
//           />
//         </View>

//         {/* Courses Section */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Courses</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeAllText}>See all</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={subjects}
//           renderItem={renderSubjectCard}
//           keyExtractor={item => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.subjectListContainer}
//         />

//         {/* Video Courses */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Video Course</Text>
//         </View>

//         <View style={styles.videoCourseVerticalList}>
//           {videoCourses.map(course => (
//             <VideoCourseCard
//               key={course.id}
//               title={course.title}
//               author={course.author}
//               rating={course.rating}
//               thumbnail={course.thumbnail}
//               sourceUrl={course.sourceUrl}
//             />
//           ))}
//         </View>

//         {/* Features Section (Moved Below Video Courses) */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Features</Text>
//         </View>

//         <FlatList
//           data={features}
//           renderItem={renderFeatureCard}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.subjectListContainer}
//         />

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // Subject Card
// const SubjectCard = ({ icon, title, bgColor }) => (
//   <TouchableOpacity style={styles.subjectCard}>
//     <View style={[styles.subjectIconContainer, { backgroundColor: bgColor }]}>
//       <Image source={icon} style={styles.subjectIcon} resizeMode="contain" />
//     </View>
//     <Text style={styles.subjectTitle}>{title}</Text>
//   </TouchableOpacity>
// );

// // Feature Card
// const FeatureCard = ({ image, title, description }) => (
//   <View style={styles.featureCard}>
//     <Image source={image} style={styles.featureImage} />
//     <Text style={styles.featureTitle}>{title}</Text>
//     <Text style={styles.featureDescription}>{description}</Text>
//   </View>
// );

// // Video Course Card
// const VideoCourseCard = ({ title, author, rating, thumbnail, sourceUrl }) => {
//   const handlePress = () => {
//     Linking.canOpenURL(sourceUrl).then(supported => {
//       if (supported) {
//         Linking.openURL(sourceUrl);
//       } else {
//         console.log("Don't know how to open URI: " + sourceUrl);
//       }
//     }).catch(err => console.error('An error occurred', err));
//   };

//   return (
//     <TouchableOpacity style={styles.videoCourseCardItem} onPress={handlePress}>
//       <Image source={thumbnail} style={styles.videoCourseThumbnail} resizeMode="cover" />
//       <View style={styles.videoCourseDetails}>
//         <View style={styles.ratingContainer}>
//           <Text style={styles.ratingText}>⭐ {rating}</Text>
//         </View>
//         <Text style={styles.videoCourseTitle} numberOfLines={2}>{title}</Text>
//         <Text style={styles.videoCourseAuthor}>{author}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 20 },
//   helloText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
//   growCard: {
//     backgroundColor: '#3B82F6',
//     marginHorizontal: 20,
//     borderRadius: 20,
//     padding: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//     height: 150,
//     overflow: 'hidden',
//   },
//   growCardContent: { flex: 1, marginRight: 10 },
//   growCardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
//   growCardImage: { width: 120, height: 120, position: 'absolute', right: 10, bottom: 10, borderRadius: 70 },
//   sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 },
//   sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
//   seeAllText: { fontSize: 16, color: '#007AFF', fontWeight: '600' },
//   subjectListContainer: { paddingHorizontal: 15, marginBottom: 30 },
//   subjectCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     alignItems: 'center',
//     paddingVertical: 10,
//     marginHorizontal: 5,
//     width: 90,
//     height: 100,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   subjectIconContainer: { padding: 12, borderRadius: 50, marginBottom: 8, alignItems: 'center' },
//   subjectIcon: { width: 35, height: 35 },
//   subjectTitle: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'center' },
//   videoCourseVerticalList: { paddingHorizontal: 20, marginBottom: 20 },
//   videoCourseCardItem: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 15,
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//     width: '100%',
//   },
//   videoCourseThumbnail: { width: 100, height: 100, borderRadius: 10, marginRight: 15 },
//   videoCourseDetails: { flex: 1 },
//   ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
//   ratingText: { fontSize: 14, color: '#FFD700', fontWeight: 'bold' },
//   videoCourseTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
//   videoCourseAuthor: { fontSize: 13, color: '#666' },
//   featureCard: {
//     backgroundColor: '#F0F8FF',
//     borderRadius: 15,
//     padding: 10,
//     width: 200,
//     marginRight: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   featureImage: { width: '100%', height: 100, borderRadius: 10, marginBottom: 10 },
//   featureTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
//   featureDescription: { fontSize: 13, color: '#666' },
// });

// // export default HomeScreen;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   Linking
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

// const HomeScreen = () => {
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     fetch('http://192.168.225.47:3002/get-profile')
//       .then(res => res.json())
//       .then(data => {
//         if (data.name) {
//           setUserName(data.name);
//         }
//       })
//       .catch(err => {
//         console.error('Failed to fetch user profile:', err);
//       });
//   }, []);

//   const subjects = [
//     { id: '1', title: 'CPP', icon: require('../assets/cppb.png'), bgColor: '#FDE8E4' },
//     { id: '2', title: 'C', icon: require('../assets/cb.png'), bgColor: '#FFF3D6' },
//     { id: '3', title: 'Java', icon: require('../assets/javab.png'), bgColor: '#FFE6EA' },
//     { id: '4', title: 'Python', icon: require('../assets/pythonb.png'), bgColor: '#FFE8ED' },
//     { id: '5', title: 'ReactJS', icon: require('../assets/reactb.png'), bgColor: '#F0F8FF' },
//     { id: '6', title: 'SQL', icon: require('../assets/sqlb.png'), bgColor: '#E6E6FA' },
//   ];

//   const videoCourses = [
//     {
//       id: 'v1',
//       title: 'CPP',
//       author: 'By Nozomi Sasaki',
//       rating: '4.6',
//       thumbnail: require('../assets/C++.png'),
//       sourceUrl: 'https://youtu.be/-TkoO8Z07hI?si=pIY8GVGrTXKVf8kx'
//     },
//     {
//       id: 'v2',
//       title: 'SQL',
//       author: 'By Alan Turing',
//       rating: '4.9',
//       thumbnail: require('../assets/sql.jpeg'),
//       sourceUrl: 'https://youtu.be/7S_tz1z_5bA?si=NsUPtGZkLnrllLET'
//     },
//     {
//       id: 'v3',
//       title: 'HTML',
//       author: 'By Grace Hopper',
//       rating: '4.7',
//       thumbnail: require('../assets/html2.jpg'),
//       sourceUrl: 'https://youtu.be/qz0aGYrrlhU?si=gcHGnmIdGUMszm6x'
//     },
//     {
//       id: 'v4',
//       title: 'C',
//       author: 'By Mark Zuckerberg',
//       rating: '4.8',
//       thumbnail: require('../assets/c2.jpg'),
//       sourceUrl: 'https://youtu.be/mEsleV16qdo?si=7B84cSSTQnzgaw7y'
//     },
//   ];

//   const features = [
//     {
//       image: require('../assets/quiz-pic.jpeg'),
//       title: 'Gamified Quizzes',
//       description: 'Interactive quizzes to test knowledge and enhance learning.'
//     },
//     {
//       image: require('../assets/chatbot-pic.jpeg'),
//       title: 'Live Chatbot',
//       description: 'AI chatbot offering instant, 24/7 support and guidance.'
//     },
//     {
//       image: require('../assets/progg-pic.jpg'),
//       title: 'Progress Tracker',
//       description: 'Track learning goals with real-time analytics.'
//     },
//     {
//       image: require('../assets/ach-pic.jpg'),
//       title: 'Achievements',
//       description: 'Earn certificates to showcase your skills.'
//     },
//   ];

//   const renderSubjectCard = ({ item }) => (
//     <SubjectCard icon={item.icon} title={item.title} bgColor={item.bgColor} />
//   );

//   const renderFeatureCard = ({ item }) => (
//     <FeatureCard image={item.image} title={item.title} description={item.description} />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <Text style={styles.helloText}>Hello, {userName || 'Learner'}!!</Text>
//         </View>

//         <View style={styles.growCard}>
//           <View style={styles.growCardContent}>
//             <Text style={styles.growCardTitle}>Grow through learning ....</Text>
//           </View>
//           <Image
//             source={require('../assets/computer.jpg')}
//             style={styles.growCardImage}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Courses</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeAllText}>See all</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={subjects}
//           renderItem={renderSubjectCard}
//           keyExtractor={item => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.subjectListContainer}
//         />

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Video Course</Text>
//         </View>

//         <View style={styles.videoCourseVerticalList}>
//           {videoCourses.map(course => (
//             <VideoCourseCard key={course.id} {...course} />
//           ))}
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Features</Text>
//         </View>

//         <FlatList
//           data={features}
//           renderItem={renderFeatureCard}
//           keyExtractor={(_, index) => index.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.subjectListContainer}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const SubjectCard = ({ icon, title, bgColor }) => (
//   <TouchableOpacity style={styles.subjectCard}>
//     <View style={[styles.subjectIconContainer, { backgroundColor: bgColor }]}>
//       <Image source={icon} style={styles.subjectIcon} resizeMode="contain" />
//     </View>
//     <Text style={styles.subjectTitle}>{title}</Text>
//   </TouchableOpacity>
// );

// const FeatureCard = ({ image, title, description }) => (
//   <View style={styles.featureCard}>
//     <Image source={image} style={styles.featureImage} />
//     <Text style={styles.featureTitle}>{title}</Text>
//     <Text style={styles.featureDescription}>{description}</Text>
//   </View>
// );

// const VideoCourseCard = ({ title, author, rating, thumbnail, sourceUrl }) => {
//   const handlePress = () => {
//     Linking.canOpenURL(sourceUrl).then(supported => {
//       if (supported) {
//         Linking.openURL(sourceUrl);
//       } else {
//         console.log("Can't open URI: " + sourceUrl);
//       }
//     }).catch(err => console.error('Error opening link', err));
//   };

//   return (
//     <TouchableOpacity style={styles.videoCourseCardItem} onPress={handlePress}>
//       <Image source={thumbnail} style={styles.videoCourseThumbnail} />
//       <View style={styles.videoCourseDetails}>
//         <View style={styles.ratingContainer}>
//           <Text style={styles.ratingText}>⭐ {rating}</Text>
//         </View>
//         <Text style={styles.videoCourseTitle}>{title}</Text>
//         <Text style={styles.videoCourseAuthor}>{author}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 20 },
//   helloText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
//   growCard: {
//     backgroundColor: '#3B82F6',
//     marginHorizontal: 20,
//     borderRadius: 20,
//     padding: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//     height: 150,
//     overflow: 'hidden',
//   },
//   growCardContent: { flex: 1, marginRight: 10 },
//   growCardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
//   growCardImage: { width: 120, height: 120, position: 'absolute', right: 10, bottom: 10, borderRadius: 70 },
//   sectionHeader: {
//     flexDirection: 'row', justifyContent: 'space-between',
//     alignItems: 'center', paddingHorizontal: 20, marginBottom: 10
//   },
//   sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
//   seeAllText: { fontSize: 16, color: '#007AFF', fontWeight: '600' },
//   subjectListContainer: { paddingHorizontal: 15, marginBottom: 30 },
//   subjectCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     alignItems: 'center',
//     paddingVertical: 10,
//     marginHorizontal: 5,
//     width: 90,
//     height: 100,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   subjectIconContainer: { padding: 12, borderRadius: 50, marginBottom: 8, alignItems: 'center' },
//   subjectIcon: { width: 35, height: 35 },
//   subjectTitle: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'center' },
//   videoCourseVerticalList: { paddingHorizontal: 20, marginBottom: 20 },
//   videoCourseCardItem: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 15,
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//     width: '100%',
//   },
//   videoCourseThumbnail: { width: 100, height: 100, borderRadius: 10, marginRight: 15 },
//   videoCourseDetails: { flex: 1 },
//   ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
//   ratingText: { fontSize: 14, color: '#FFD700', fontWeight: 'bold' },
//   videoCourseTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
//   videoCourseAuthor: { fontSize: 13, color: '#666' },
//   featureCard: {
//     backgroundColor: '#F0F8FF',
//     borderRadius: 15,
//     padding: 10,
//     width: 200,
//     marginRight: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   featureImage: { width: '100%', height: 100, borderRadius: 10, marginBottom: 10 },
//   featureTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
//   featureDescription: { fontSize: 13, color: '#666' },
// });

// export default HomeScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   Linking
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

// const HomeScreen = ({ navigation }) => {
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     fetch('http://10.16.63.81:3002/get-profile')
//       .then(res => res.json())
//       .then(data => {
//         if (data.name) {
//           setUserName(data.name);
//         }
//       })
//       .catch(err => {
//         console.error('Failed to fetch user profile:', err);
//       });
//   }, []);

//   const subjects = [
//     { id: '1', title: 'CPP', icon: require('../assets/cppb.png'), bgColor: '#FDE8E4' },
//     { id: '2', title: 'C', icon: require('../assets/cb.png'), bgColor: '#FFF3D6' },
//     { id: '3', title: 'Java', icon: require('../assets/javab.png'), bgColor: '#FFE6EA' },
//     { id: '4', title: 'Python', icon: require('../assets/pythonb.png'), bgColor: '#FFE8ED' },
//     { id: '5', title: 'ReactJS', icon: require('../assets/reactb.png'), bgColor: '#F0F8FF' },
//     { id: '6', title: 'SQL', icon: require('../assets/sqlb.png'), bgColor: '#E6E6FA' },
//   ];

//   const videoCourses = [
//     {
//       id: 'v1',
//       title: 'CPP',
//       author: 'By Nozomi Sasaki',
//       rating: '4.6',
//       thumbnail: require('../assets/C++.png'),
//       sourceUrl: 'https://youtu.be/-TkoO8Z07hI?si=pIY8GVGrTXKVf8kx'
//     },
//     {
//       id: 'v2',
//       title: 'SQL',
//       author: 'By Alan Turing',
//       rating: '4.9',
//       thumbnail: require('../assets/sql.jpeg'),
//       sourceUrl: 'https://youtu.be/7S_tz1z_5bA?si=NsUPtGZkLnrllLET'
//     },
//     {
//       id: 'v3',
//       title: 'HTML',
//       author: 'By Grace Hopper',
//       rating: '4.7',
//       thumbnail: require('../assets/html2.jpg'),
//       sourceUrl: 'https://youtu.be/qz0aGYrrlhU?si=gcHGnmIdGUMszm6x'
//     },
//     {
//       id: 'v4',
//       title: 'C',
//       author: 'By Mark Zuckerberg',
//       rating: '4.8',
//       thumbnail: require('../assets/c2.jpg'),
//       sourceUrl: 'https://youtu.be/mEsleV16qdo?si=7B84cSSTQnzgaw7y'
//     },
//   ];

//   const features = [
//     {
//       image: require('../assets/quiz-pic.jpeg'),
//       title: 'Gamified Quizzes',
//       description: 'Interactive quizzes to test knowledge and enhance learning.'
//     },
//     {
//       image: require('../assets/chatbot-pic.jpeg'),
//       title: 'Live Chatbot',
//       description: 'AI chatbot offering instant, 24/7 support and guidance.'
//     },
//     {
//       image: require('../assets/progg-pic.jpg'),
//       title: 'Progress Tracker',
//       description: 'Track learning goals with real-time analytics.'
//     },
//     {
//       image: require('../assets/ach-pic.jpg'),
//       title: 'Achievements',
//       description: 'Earn certificates to showcase your skills.'
//     },
//   ];

//   const renderSubjectCard = ({ item }) => (
//     <SubjectCard icon={item.icon} title={item.title} bgColor={item.bgColor} />
//   );

//   const renderFeatureCard = ({ item }) => (
//     <FeatureCard image={item.image} title={item.title} description={item.description} />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <Text style={styles.helloText}>Hello, {userName || 'Learner'}!!</Text>
//         </View>

//         <View style={styles.growCard}>
//           <View style={styles.growCardContent}>
//             <Text style={styles.growCardTitle}>Grow through learning ....</Text>
//           </View>
//           <Image
//             source={require('../assets/computer.jpg')}
//             style={styles.growCardImage}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Courses</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
//             <Text style={styles.seeAllText}>See all</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={subjects}
//           renderItem={renderSubjectCard}
//           keyExtractor={item => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.subjectListContainer}
//         />

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Video Course</Text>
//         </View>

//         <View style={styles.videoCourseVerticalList}>
//           {videoCourses.map(course => (
//             <VideoCourseCard key={course.id} {...course} />
//           ))}
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Features</Text>
//         </View>

//         <FlatList
//           data={features}
//           renderItem={renderFeatureCard}
//           keyExtractor={(_, index) => index.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.subjectListContainer}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const SubjectCard = ({ icon, title, bgColor }) => (
//   <TouchableOpacity style={styles.subjectCard}>
//     <View style={[styles.subjectIconContainer, { backgroundColor: bgColor }]}>
//       <Image source={icon} style={styles.subjectIcon} resizeMode="contain" />
//     </View>
//     <Text style={styles.subjectTitle}>{title}</Text>
//   </TouchableOpacity>
// );

// const FeatureCard = ({ image, title, description }) => (
//   <View style={styles.featureCard}>
//     <Image source={image} style={styles.featureImage} />
//     <Text style={styles.featureTitle}>{title}</Text>
//     <Text style={styles.featureDescription}>{description}</Text>
//   </View>
// );

// const VideoCourseCard = ({ title, author, rating, thumbnail, sourceUrl }) => {
//   const handlePress = () => {
//     Linking.canOpenURL(sourceUrl).then(supported => {
//       if (supported) {
//         Linking.openURL(sourceUrl);
//       } else {
//         console.log("Can't open URI: " + sourceUrl);
//       }
//     }).catch(err => console.error('Error opening link', err));
//   };

//   return (
//     <TouchableOpacity style={styles.videoCourseCardItem} onPress={handlePress}>
//       <Image source={thumbnail} style={styles.videoCourseThumbnail} />
//       <View style={styles.videoCourseDetails}>
//         <View style={styles.ratingContainer}>
//           <Text style={styles.ratingText}>⭐ {rating}</Text>
//         </View>
//         <Text style={styles.videoCourseTitle}>{title}</Text>
//         <Text style={styles.videoCourseAuthor}>{author}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 20 },
//   helloText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
//   growCard: {
//     backgroundColor: '#3B82F6',
//     marginHorizontal: 20,
//     borderRadius: 20,
//     padding: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//     height: 150,
//     overflow: 'hidden',
//   },
//   growCardContent: { flex: 1, marginRight: 10 },
//   growCardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
//   growCardImage: { width: 120, height: 120, position: 'absolute', right: 10, bottom: 10, borderRadius: 70 },
//   sectionHeader: {
//     flexDirection: 'row', justifyContent: 'space-between',
//     alignItems: 'center', paddingHorizontal: 20, marginBottom: 10
//   },
//   sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
//   seeAllText: { fontSize: 16, color: '#007AFF', fontWeight: '600' },
//   subjectListContainer: { paddingHorizontal: 15, marginBottom: 30 },
//   subjectCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     alignItems: 'center',
//     paddingVertical: 10,
//     marginHorizontal: 5,
//     width: 90,
//     height: 100,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   subjectIconContainer: { padding: 12, borderRadius: 50, marginBottom: 8, alignItems: 'center' },
//   subjectIcon: { width: 35, height: 35 },
//   subjectTitle: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'center' },
//   videoCourseVerticalList: { paddingHorizontal: 20, marginBottom: 20 },
//   videoCourseCardItem: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 15,
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//     width: '100%',
//   },
//   videoCourseThumbnail: { width: 100, height: 100, borderRadius: 10, marginRight: 15 },
//   videoCourseDetails: { flex: 1 },
//   ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
//   ratingText: { fontSize: 14, color: '#FFD700', fontWeight: 'bold' },
//   videoCourseTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
//   videoCourseAuthor: { fontSize: 13, color: '#666' },
//   featureCard: {
//     backgroundColor: '#F0F8FF',
//     borderRadius: 15,
//     padding: 10,
//     width: 200,
//     marginRight: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   featureImage: { width: '100%', height: 100, borderRadius: 10, marginBottom: 10 },
//   featureTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
//   featureDescription: { fontSize: 13, color: '#666' },
// });

// export default HomeScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   Linking,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

// const HomeScreen = ({ navigation }) => {
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     fetch('http://10.16.63.81:3002/get-profile')
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.name) {
//           setUserName(data.name);
//         }
//       })
//       .catch((err) => {
//         console.error('Failed to fetch user profile:', err);
//       });
//   }, []);

//   const subjects = [
//     { id: '1', title: 'CPP', icon: require('../assets/cppb.png'), bgColor: '#FDE8E4' },
//     { id: '2', title: 'C', icon: require('../assets/cb.png'), bgColor: '#FFF3D6' },
//     { id: '3', title: 'Java', icon: require('../assets/javab.png'), bgColor: '#FFE6EA' },
//     { id: '4', title: 'Python', icon: require('../assets/pythonb.png'), bgColor: '#FFE8ED' },
//     { id: '5', title: 'ReactJS', icon: require('../assets/reactb.png'), bgColor: '#F0F8FF' },
//     { id: '6', title: 'SQL', icon: require('../assets/sqlb.png'), bgColor: '#E6E6FA' },
//   ];

//   const videoCourses = [
//     {
//       id: 'v1',
//       title: 'CPP',
//       author: 'By Nozomi Sasaki',
//       rating: '4.6',
//       thumbnail: require('../assets/C++.png'),
//       sourceUrl: 'https://youtu.be/-TkoO8Z07hI?si=pIY8GVGrTXKVf8kx',
//     },
//     {
//       id: 'v2',
//       title: 'SQL',
//       author: 'By Alan Turing',
//       rating: '4.9',
//       thumbnail: require('../assets/sql.jpeg'),
//       sourceUrl: 'https://youtu.be/7S_tz1z_5bA?si=NsUPtGZkLnrllLET',
//     },
//     {
//       id: 'v3',
//       title: 'HTML',
//       author: 'By Grace Hopper',
//       rating: '4.7',
//       thumbnail: require('../assets/html2.jpg'),
//       sourceUrl: 'https://youtu.be/qz0aGYrrlhU?si=gcHGnmIdGUMszm6x',
//     },
//     {
//       id: 'v4',
//       title: 'C',
//       author: 'By Mark Zuckerberg',
//       rating: '4.8',
//       thumbnail: require('../assets/c2.jpg'),
//       sourceUrl: 'https://youtu.be/mEsleV16qdo?si=7B84cSSTQnzgaw7y',
//     },
//   ];

//   const features = [
//     {
//       image: require('../assets/quiz-pic.jpeg'),
//       title: 'Gamified Quizzes',
//       description: 'Interactive quizzes to test knowledge and enhance learning.',
//       targetScreen: 'Quiz',
//     },
//     {
//       image: require('../assets/chatbot-pic.jpeg'),
//       title: 'Live Chatbot',
//       description: 'AI chatbot offering instant, 24/7 support and guidance.',
//       targetScreen: 'Chatbot',
//     },
//     {
//       image: require('../assets/progg-pic.jpg'),
//       title: 'Progress Tracker',
//       description: 'Track learning goals with real-time analytics.',
//     },
//     {
//       image: require('../assets/ach-pic.jpg'),
//       title: 'Achievements',
//       description: 'Earn certificates to showcase your skills.',
//     },
//   ];

//   const renderSubjectCard = ({ item }) => (
//     <SubjectCard icon={item.icon} title={item.title} bgColor={item.bgColor} />
//   );

//   const renderFeatureCard = ({ item }) => (
//     <FeatureCard
//       image={item.image}
//       title={item.title}
//       description={item.description}
//       targetScreen={item.targetScreen}
//       navigation={navigation}
//     />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <Text style={styles.helloText}>Hello, {userName || 'Learner'}!!</Text>
//         </View>

//         <View style={styles.growCard}>
//           <View style={styles.growCardContent}>
//             <Text style={styles.growCardTitle}>Grow through learning ....</Text>
//           </View>
//           <Image
//             source={require('../assets/computer.jpg')}
//             style={styles.growCardImage}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Courses</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
//             <Text style={styles.seeAllText}>See all</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={subjects}
//           renderItem={renderSubjectCard}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.subjectListContainer}
//         />

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Video Course</Text>
//         </View>

//         <View style={styles.videoCourseVerticalList}>
//           {videoCourses.map((course) => (
//             <VideoCourseCard key={course.id} {...course} />
//           ))}
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Features</Text>
//         </View>

//         <FlatList
//           data={features}
//           renderItem={renderFeatureCard}
//           keyExtractor={(_, index) => index.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.subjectListContainer}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const SubjectCard = ({ icon, title, bgColor }) => (
//   <TouchableOpacity style={styles.subjectCard}>
//     <View style={[styles.subjectIconContainer, { backgroundColor: bgColor }]}>
//       <Image source={icon} style={styles.subjectIcon} resizeMode="contain" />
//     </View>
//     <Text style={styles.subjectTitle}>{title}</Text>
//   </TouchableOpacity>
// );

// const FeatureCard = ({ image, title, description, targetScreen, navigation }) => {
//   const handlePress = () => {
//     if (targetScreen) {
//       navigation.navigate(targetScreen);
//     }
//   };

//   return (
//     <TouchableOpacity onPress={handlePress} style={styles.featureCard}>
//       <Image source={image} style={styles.featureImage} />
//       <Text style={styles.featureTitle}>{title}</Text>
//       <Text style={styles.featureDescription}>{description}</Text>
//     </TouchableOpacity>
//   );
// };

// const VideoCourseCard = ({ title, author, rating, thumbnail, sourceUrl }) => {
//   const handlePress = () => {
//     Linking.canOpenURL(sourceUrl)
//       .then((supported) => {
//         if (supported) {
//           Linking.openURL(sourceUrl);
//         } else {
//           console.log("Can't open URI: " + sourceUrl);
//         }
//       })
//       .catch((err) => console.error('Error opening link', err));
//   };

//   return (
//     <TouchableOpacity style={styles.videoCourseCardItem} onPress={handlePress}>
//       <Image source={thumbnail} style={styles.videoCourseThumbnail} />
//       <View style={styles.videoCourseDetails}>
//         <View style={styles.ratingContainer}>
//           <Text style={styles.ratingText}>⭐ {rating}</Text>
//         </View>
//         <Text style={styles.videoCourseTitle}>{title}</Text>
//         <Text style={styles.videoCourseAuthor}>{author}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 20 },
//   helloText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
//   growCard: {
//     backgroundColor: '#3B82F6',
//     marginHorizontal: 20,
//     borderRadius: 20,
//     padding: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//     height: 150,
//     overflow: 'hidden',
//   },
//   growCardContent: { flex: 1, marginRight: 10 },
//   growCardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
//   growCardImage: { width: 120, height: 120, position: 'absolute', right: 10, bottom: 10, borderRadius: 70 },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 10,
//   },
//   sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
//   seeAllText: { fontSize: 16, color: '#007AFF', fontWeight: '600' },
//   subjectListContainer: { paddingHorizontal: 15, marginBottom: 30 },
//   subjectCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     alignItems: 'center',
//     paddingVertical: 10,
//     marginHorizontal: 5,
//     width: 90,
//     height: 100,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   subjectIconContainer: { padding: 12, borderRadius: 50, marginBottom: 8, alignItems: 'center' },
//   subjectIcon: { width: 35, height: 35 },
//   subjectTitle: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'center' },
//   videoCourseVerticalList: { paddingHorizontal: 20, marginBottom: 20 },
//   videoCourseCardItem: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 15,
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//     width: '100%',
//   },
//   videoCourseThumbnail: { width: 100, height: 100, borderRadius: 10, marginRight: 15 },
//   videoCourseDetails: { flex: 1 },
//   ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
//   ratingText: { fontSize: 14, color: '#FFD700', fontWeight: 'bold' },
//   videoCourseTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
//   videoCourseAuthor: { fontSize: 13, color: '#666' },
//   featureCard: {
//     backgroundColor: '#F0F8FF',
//     borderRadius: 15,
//     padding: 10,
//     width: 200,
//     marginRight: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   featureImage: { width: '100%', height: 100, borderRadius: 10, marginBottom: 10 },
//   featureTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
//   featureDescription: { fontSize: 13, color: '#666' },
// });

// // export default HomeScreen;
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   Linking,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

// const HomeScreen = ({ navigation }) => {
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     fetch('http://10.16.63.81:3002/get-profile')
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.name) {
//           setUserName(data.name);
//         }
//       })
//       .catch((err) => {
//         console.error('Failed to fetch user profile:', err);
//       });
//   }, []);

//   const subjects = [
//     { id: '1', title: 'CPP', icon: require('../assets/cppb.png'), bgColor: '#FDE8E4' },
//     { id: '2', title: 'C', icon: require('../assets/cb.png'), bgColor: '#FFF3D6' },
//     { id: '3', title: 'Java', icon: require('../assets/javab.png'), bgColor: '#FFE6EA' },
//     { id: '4', title: 'Python', icon: require('../assets/pythonb.png'), bgColor: '#FFE8ED' },
//     { id: '5', title: 'ReactJS', icon: require('../assets/reactb.png'), bgColor: '#F0F8FF' },
//     { id: '6', title: 'SQL', icon: require('../assets/sqlb.png'), bgColor: '#E6E6FA' },
//   ];

//   const videoCourses = [
//     {
//       id: 'v1',
//       title: 'CPP',
//       author: 'By Nozomi Sasaki',
//       rating: '4.6',
//       thumbnail: require('../assets/C++.png'),
//       sourceUrl: 'https://youtu.be/-TkoO8Z07hI?si=pIY8GVGrTXKVf8kx',
//     },
//     {
//       id: 'v2',
//       title: 'SQL',
//       author: 'By Alan Turing',
//       rating: '4.9',
//       thumbnail: require('../assets/sql.jpeg'),
//       sourceUrl: 'https://youtu.be/7S_tz1z_5bA?si=NsUPtGZkLnrllLET',
//     },
//     {
//       id: 'v3',
//       title: 'HTML',
//       author: 'By Grace Hopper',
//       rating: '4.7',
//       thumbnail: require('../assets/html2.jpg'),
//       sourceUrl: 'https://youtu.be/qz0aGYrrlhU?si=gcHGnmIdGUMszm6x',
//     },
//     {
//       id: 'v4',
//       title: 'C',
//       author: 'By Mark Zuckerberg',
//       rating: '4.8',
//       thumbnail: require('../assets/c2.jpg'),
//       sourceUrl: 'https://youtu.be/mEsleV16qdo?si=7B84cSSTQnzgaw7y',
//     },
//   ];

//   const features = [
//     {
//       image: require('../assets/quiz-pic.jpeg'),
//       title: 'Gamified Quizzes',
//       description: 'Interactive quizzes to test knowledge and enhance learning.',
//       targetScreen: 'Quiz',
//     },
//     {
//       image: require('../assets/chatbot-pic.jpeg'),
//       title: 'Live Chatbot',
//       description: 'AI chatbot offering instant, 24/7 support and guidance.',
//       targetScreen: 'Chatbot',
//     },
//     {
//       image: require('../assets/progg-pic.jpg'),
//       title: 'Progress Tracker',
//       description: 'Track learning goals with real-time analytics.',
//       targetScreen: 'ProgressStorage',
//     },
//     {
//       image: require('../assets/ach-pic.jpg'),
//       title: 'Achievements',
//       description: 'Earn certificates to showcase your skills.',
//       targetScreen: 'Profile',
//     },
//   ];

//   const renderSubjectCard = ({ item }) => (
//     <SubjectCard icon={item.icon} title={item.title} bgColor={item.bgColor} />
//   );

//   const renderFeatureCard = ({ item }) => (
//     <FeatureCard
//       image={item.image}
//       title={item.title}
//       description={item.description}
//       targetScreen={item.targetScreen}
//       navigation={navigation}
//     />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <Text style={styles.helloText}>Hello, {userName || 'Learner'}!!</Text>
//         </View>

//         <View style={styles.growCard}>
//           <View style={styles.growCardContent}>
//             <Text style={styles.growCardTitle}>Grow through learning ....</Text>
//           </View>
//           <Image
//             source={require('../assets/computer.jpg')}
//             style={styles.growCardImage}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Courses</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
//             <Text style={styles.seeAllText}>See all</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={subjects}
//           renderItem={renderSubjectCard}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.subjectListContainer}
//         />

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Video Course</Text>
//         </View>

//         <View style={styles.videoCourseVerticalList}>
//           {videoCourses.map((course) => (
//             <VideoCourseCard key={course.id} {...course} />
//           ))}
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Features</Text>
//         </View>

//         <FlatList
//           data={features}
//           renderItem={renderFeatureCard}
//           keyExtractor={(_, index) => index.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.subjectListContainer}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const SubjectCard = ({ icon, title, bgColor }) => (
//   <TouchableOpacity style={styles.subjectCard}>
//     <View style={[styles.subjectIconContainer, { backgroundColor: bgColor }]}>
//       <Image source={icon} style={styles.subjectIcon} resizeMode="contain" />
//     </View>
//     <Text style={styles.subjectTitle}>{title}</Text>
//   </TouchableOpacity>
// );

// const FeatureCard = ({ image, title, description, targetScreen, navigation }) => {
//   const handlePress = () => {
//     if (targetScreen) {
//       navigation.navigate(targetScreen);
//     }
//   };

//   return (
//     <TouchableOpacity onPress={handlePress} style={styles.featureCard}>
//       <Image source={image} style={styles.featureImage} />
//       <Text style={styles.featureTitle}>{title}</Text>
//       <Text style={styles.featureDescription}>{description}</Text>
//     </TouchableOpacity>
//   );
// };

// const VideoCourseCard = ({ title, author, rating, thumbnail, sourceUrl }) => {
//   const handlePress = () => {
//     Linking.canOpenURL(sourceUrl)
//       .then((supported) => {
//         if (supported) {
//           Linking.openURL(sourceUrl);
//         } else {
//           console.log("Can't open URI: " + sourceUrl);
//         }
//       })
//       .catch((err) => console.error('Error opening link', err));
//   };

//   return (
//     <TouchableOpacity style={styles.videoCourseCardItem} onPress={handlePress}>
//       <Image source={thumbnail} style={styles.videoCourseThumbnail} />
//       <View style={styles.videoCourseDetails}>
//         <View style={styles.ratingContainer}>
//           <Text style={styles.ratingText}>⭐ {rating}</Text>
//         </View>
//         <Text style={styles.videoCourseTitle}>{title}</Text>
//         <Text style={styles.videoCourseAuthor}>{author}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 20 },
//   helloText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
//   growCard: {
//     backgroundColor: '#3B82F6',
//     marginHorizontal: 20,
//     borderRadius: 20,
//     padding: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//     height: 150,
//     overflow: 'hidden',
//   },
//   growCardContent: { flex: 1, marginRight: 10 },
//   growCardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
//   growCardImage: {
//     width: 120,
//     height: 120,
//     position: 'absolute',
//     right: 10,
//     bottom: 10,
//     borderRadius: 70,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 10,
//   },
//   sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
//   seeAllText: { fontSize: 16, color: '#007AFF', fontWeight: '600' },
//   subjectListContainer: { paddingHorizontal: 15, marginBottom: 30 },
//   subjectCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     alignItems: 'center',
//     paddingVertical: 10,
//     marginHorizontal: 5,
//     width: 90,
//     height: 100,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   subjectIconContainer: {
//     padding: 12,
//     borderRadius: 50,
//     marginBottom: 8,
//     alignItems: 'center',
//   },
//   subjectIcon: { width: 35, height: 35 },
//   subjectTitle: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'center' },
//   videoCourseVerticalList: { paddingHorizontal: 20, marginBottom: 20 },
//   videoCourseCardItem: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 15,
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//     width: '100%',
//   },
//   videoCourseThumbnail: { width: 100, height: 100, borderRadius: 10, marginRight: 15 },
//   videoCourseDetails: { flex: 1 },
//   ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
//   ratingText: { fontSize: 14, color: '#FFD700', fontWeight: 'bold' },
//   videoCourseTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
//   videoCourseAuthor: { fontSize: 13, color: '#666' },
//   featureCard: {
//     backgroundColor: '#F0F8FF',
//     borderRadius: 15,
//     padding: 10,
//     width: 200,
//     marginRight: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   featureImage: { width: '100%', height: 100, borderRadius: 10, marginBottom: 10 },
//   featureTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
//   featureDescription: { fontSize: 13, color: '#666' },
// });

// export default HomeScreen;
// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('http:// 172.19.211.47:3002/get-profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.name) {
          setUserName(data.name);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch user profile:', err);
      });
  }, []);

  const subjects = [
    { id: '1', title: 'CPP', icon: require('../assets/cppb.png'), bgColor: '#FDE8E4' },
    { id: '2', title: 'C', icon: require('../assets/cb.png'), bgColor: '#FFF3D6' },
    { id: '3', title: 'Java', icon: require('../assets/javab.png'), bgColor: '#FFE6EA' },
    { id: '4', title: 'Python', icon: require('../assets/pythonb.png'), bgColor: '#FFE8ED' },
    { id: '5', title: 'ReactJS', icon: require('../assets/reactb.png'), bgColor: '#F0F8FF' },
    { id: '6', title: 'SQL', icon: require('../assets/sqlb.png'), bgColor: '#E6E6FA' },
  ];

  const videoCourses = [
    {
      id: 'v1',
      title: 'CPP',
      author: 'By Nozomi Sasaki',
      rating: '4.6',
      thumbnail: require('../assets/C++.png'),
      sourceUrl: 'https://youtu.be/-TkoO8Z07hI?si=pIY8GVGrTXKVf8kx',
    },
    {
      id: 'v2',
      title: 'SQL',
      author: 'By Alan Turing',
      rating: '4.9',
      thumbnail: require('../assets/sql.jpeg'),
      sourceUrl: 'https://youtu.be/7S_tz1z_5bA?si=NsUPtGZkLnrllLET',
    },
    {
      id: 'v3',
      title: 'HTML',
      author: 'By Grace Hopper',
      rating: '4.7',
      thumbnail: require('../assets/html2.jpg'),
      sourceUrl: 'https://youtu.be/qz0aGYrrlhU?si=gcHGnmIdGUMszm6x',
    },
    {
      id: 'v4',
      title: 'C',
      author: 'By Mark Zuckerberg',
      rating: '4.8',
      thumbnail: require('../assets/c2.jpg'),
      sourceUrl: 'https://youtu.be/mEsleV16qdo?si=7B84cSSTQnzgaw7y',
    },
  ];

  const features = [
    {
      image: require('../assets/quiz-pic.jpeg'),
      title: 'Gamified Quizzes',
      description: 'Interactive quizzes to test knowledge and enhance learning.',
      targetScreen: 'Quiz',
    },
    {
      image: require('../assets/chatbot-pic.jpeg'),
      title: 'Live Chatbot',
      description: 'AI chatbot offering instant, 24/7 support and guidance.',
      targetScreen: 'Chatbot',
    },
    {
      image: require('../assets/progg-pic.jpg'),
  title: 'Progress Tracker',
  description: 'Track learning goals with real-time analytics.',
  targetScreen: { tab: 'Quiz', screen: 'Results' }, // ✅ fixed format
},

    // {
    //   image: require('../assets/progg-pic.jpg'),
    //   title: 'Progress Tracker',
    //   description: 'Track learning goals with real-time analytics.',
    //   targetScreen: 'Results', // we will intercept this
    // },
    {
      image: require('../assets/ach-pic.jpg'),
      title: 'Achievements',
      description: 'Earn certificates to showcase your skills.',
      targetScreen: 'ProfileScreenApp',
    },
  ];

  const renderSubjectCard = ({ item }) => (
    <SubjectCard icon={item.icon} title={item.title} bgColor={item.bgColor} />
  );

  const renderFeatureCard = ({ item }) => (
    <FeatureCard
      image={item.image}
      title={item.title}
      description={item.description}
      targetScreen={item.targetScreen}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.helloText}>Hello, {userName || 'Learner'}!!</Text>
        </View>

        <View style={styles.growCard}>
          <View style={styles.growCardContent}>
            <Text style={styles.growCardTitle}>Grow through learning ....</Text>
          </View>
          <Image
            source={require('../assets/computer.jpg')}
            style={styles.growCardImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Courses</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={subjects}
          renderItem={renderSubjectCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectListContainer}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Video Course</Text>
        </View>

        <View style={styles.videoCourseVerticalList}>
          {videoCourses.map((course) => (
            <VideoCourseCard key={course.id} {...course} />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Features</Text>
        </View>

        <FlatList
          data={features}
          renderItem={renderFeatureCard}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectListContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const SubjectCard = ({ icon, title, bgColor }) => (
  <TouchableOpacity style={styles.subjectCard}>
    <View style={[styles.subjectIconContainer, { backgroundColor: bgColor }]}>
      <Image source={icon} style={styles.subjectIcon} resizeMode="contain" />
    </View>
    <Text style={styles.subjectTitle}>{title}</Text>
  </TouchableOpacity>
);

const FeatureCard = ({ image, title, description, targetScreen, navigation }) => {
  const handlePress = () => {
  if (targetScreen === 'ProgressStorage') {
    navigation.navigate('CourseDetail', {
      course: {
        title: 'Progress Tracker',
        topics: ['Completed Modules', 'Badges Earned', 'Daily Goals', 'Certificates'],
      },
    });
  } else if (typeof targetScreen === 'object' && targetScreen.tab && targetScreen.screen) {
    navigation.navigate(targetScreen.tab, {
      screen: targetScreen.screen,
    });
  } else if (typeof targetScreen === 'string') {
    navigation.navigate(targetScreen);
  }
};


  return (
    <TouchableOpacity onPress={handlePress} style={styles.featureCard}>
      <Image source={image} style={styles.featureImage} />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </TouchableOpacity>
  );
};

const VideoCourseCard = ({ title, author, rating, thumbnail, sourceUrl }) => {
  const handlePress = () => {
    Linking.canOpenURL(sourceUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(sourceUrl);
        } else {
          console.log("Can't open URI: " + sourceUrl);
        }
      })
      .catch((err) => console.error('Error opening link', err));
  };

  return (
    <TouchableOpacity style={styles.videoCourseCardItem} onPress={handlePress}>
      <Image source={thumbnail} style={styles.videoCourseThumbnail} />
      <View style={styles.videoCourseDetails}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {rating}</Text>
        </View>
        <Text style={styles.videoCourseTitle}>{title}</Text>
        <Text style={styles.videoCourseAuthor}>{author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 20 },
  helloText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  growCard: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    height: 150,
    overflow: 'hidden',
  },
  growCardContent: { flex: 1, marginRight: 10 },
  growCardTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  growCardImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderRadius: 70,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  seeAllText: { fontSize: 16, color: '#007AFF', fontWeight: '600' },
  subjectListContainer: { paddingHorizontal: 15, marginBottom: 30 },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    width: 90,
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  subjectIconContainer: {
    padding: 12,
    borderRadius: 50,
    marginBottom: 8,
    alignItems: 'center',
  },
  subjectIcon: { width: 35, height: 35 },
  subjectTitle: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'center' },
  videoCourseVerticalList: { paddingHorizontal: 20, marginBottom: 20 },
  videoCourseCardItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    width: '100%',
  },
  videoCourseThumbnail: { width: 100, height: 100, borderRadius: 10, marginRight: 15 },
  videoCourseDetails: { flex: 1 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  ratingText: { fontSize: 14, color: '#FFD700', fontWeight: 'bold' },
  videoCourseTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  videoCourseAuthor: { fontSize: 13, color: '#666' },
  featureCard: {
    backgroundColor: '#F0F8FF',
    borderRadius: 15,
    padding: 10,
    width: 200,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  featureImage: { width: '100%', height: 100, borderRadius: 10, marginBottom: 10 },
  featureTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  featureDescription: { fontSize: 13, color: '#666' },
});

export default HomeScreen;
