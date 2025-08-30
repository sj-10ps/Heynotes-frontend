import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, FlatList, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { viewnote } from '../redux/noteviewslice';
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deletetask } from '../redux/deletetaskslice';
import { Alert } from 'react-native';


const Tasks = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector(state => state.viewnote);
  const {backgroundColor}=useSelector(state=>state.notecolor)
  const navigator = useNavigation().navigate
  const [pinned, setPinned] = useState([])
  const [searchdata, setSearchdata] = useState([])
  const [sortedTasks, setSortedTasks] = useState([])
  const [refreshing,setrefreshing]=useState(false)

  
    useEffect(() => {
      dispatch(viewnote());
      loadpinned()
    }, [dispatch])
  

  const loadpinned = async () => {
    const stored = await AsyncStorage.getItem("PINNED")
    if (stored) {
      setPinned(JSON.parse(stored))
    }
  }

  const handlepin = async (task) => {
    let updated
    const ispinned = pinned.some(p => p.id === task.id)
    if (ispinned) {
      updated = pinned.filter(p => p.id !== task.id)
    } else {
      if (pinned.length >= 3) {
        alert("only 3 task can be pinned")
        return
      } else {
        updated = [task, ...pinned]
      }
    }
    setPinned(updated)
    await AsyncStorage.setItem("PINNED", JSON.stringify(updated))
  }

  useEffect(() => {
    const sorted = [   
      ...pinned,
      ...data.filter(item => !pinned.some(p => p.id === item.id))
    ];
    setSortedTasks(sorted); 
    setSearchdata(sorted);  
  }, [data, pinned]);

  const handledelete = (id) => {
    Alert.alert(
      "Delete task",
      "Are you sure you want to delete this task??", [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'ok',
        onPress: async () => {
          await dispatch(deletetask(id))
          const updatedpins = pinned.filter(p => p.id !== id)
          setPinned(updatedpins)
          await AsyncStorage.setItem("PINNED", JSON.stringify(updatedpins))
          dispatch(viewnote())
        }

      }
    ],
      {
        cancelable: true
      }
    )
  }

  const handlesearch = (text) => {
    if (text.trim() === "") setSearchdata(sortedTasks) 
    else {
      setSearchdata(
        sortedTasks.filter(s =>
          s.title.toLowerCase().startsWith(text.toLowerCase())
        )
      )
    }
  }

  const handlerefresh=async()=>{
    setrefreshing(true)
    await dispatch(viewnote())
    setrefreshing(false)
  }

  const renderItem = ({ item }) => {
    let ispinned = pinned.some(p => p.id === item.id)

    return (

      <View style={[styles.card,{backgroundColor:backgroundColor}]}>

        <View>
          <TouchableOpacity style={styles.pinbox} onPress={() => handlepin(item)}>
            {ispinned ? <Ionicons name="pin" size={20} color="red" style={styles.icon} /> : <Ionicons name="pin" size={20} color="blue" style={styles.icon} />}
            {ispinned ? <Text style={styles.text}>Pinned</Text> : <Text style={styles.text}>Pin Task</Text>}
          </TouchableOpacity>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content.split(" ").slice(0, 4).join(" ")}...</Text>

          <Pressable onPress={() => navigator('Taskdetails', { id: item.id })}><Text style={{ color: 'red', marginTop: 4 }}>View details</Text></Pressable>

        </View>

        <View>
          <TouchableOpacity onPress={() => navigator('Edittask', { data: item })}><Ionicons size={24} color='white' name='pencil' style={{ backgroundColor: 'black', padding: 5, borderRadius: 50 }} /></TouchableOpacity>
          <TouchableOpacity onPress={() => handledelete(item.id)}><Ionicons size={24} color='red' name='trash' style={{ backgroundColor: 'black', padding: 5, borderRadius: 50, marginTop: 4 }} /></TouchableOpacity>
        </View>

      </View>

    )
  };

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigator('Settings')}><Ionicons name='settings' size={20}></Ionicons></TouchableOpacity>
      <Text style={styles.heading}>Your Tasks</Text>
      <TextInput placeholder='Search tasks...' style={{ marginBottom: 10, padding: 10, backgroundColor: '#fdf8f8ff' }} onChangeText={handlesearch}></TextInput>
      <FlatList
        data={searchdata}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notes yet. Add one!</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={refreshing}
        onRefresh={handlerefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "grey",
  },
  pinbox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginBottom:5
  }

});

export default Tasks;
