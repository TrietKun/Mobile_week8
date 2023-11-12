import { View, Text,StyleSheet, TextInput ,Dimensions,TouchableOpacity,FlatList, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useState, useEffect,useRef} from 'react'
import {useNavigation} from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home() {

    const flatListRef = useRef(null);
    const navigation = useNavigation();
    const [data , setData] = useState([]); 
    const [job , setJob] = useState([]);
    const [reload, setReload] = useState(false); 

    const url = 'https://655080547d203ab6626ddba7.mockapi.io/jobs';

    const getData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
    }


    useEffect(() => {
        getData();
        setReload(false); 
        flatListRef.current.scrollToEnd({ animated: true });
    }, [reload])

    function them() {
        const newJob = {
            id : (length = data.length + 1),
            job : job,
        }
        data.push(newJob);
        setJob('');
        console.log(data);
        fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                job: newJob.job,            
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        })
        .then(() => setReload(true)) 
        .catch(err => console.log(err))
        
    }

    function xoa(id) {
        fetch('https://655080547d203ab6626ddba7.mockapi.io/jobs/' + id, {
            method: 'DELETE',
          })
          .then(response => {
            if(response.ok) {
                return response.json();

            }
        })
        .then(() => {
            setReload(true);
        })
        .catch(err => console.log(err))
      }
      

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>HI Bé</Text>
    </View>
    <View style={styles.inputContainer}>
          <TextInput style={styles.input} onChangeText={setJob} placeholder='them vo cong viẹc can lam'>{job}</TextInput>
          <TouchableOpacity style={styles.button} onPress={them}>
            <Text style={{fontWeight : 'bold'}}>Add</Text>
          </TouchableOpacity>
    </View>
    <View style={styles.flatlistContainer}>
            <FlatList style={styles.wrapper}
                ref={flatListRef}
                data={data}
                renderItem={({item}) => {
                    return (
                        <View style={styles.item}>
                            <View style={styles.itemJob}>
                                <Text style={{fontSize : 14, fontWeight : 700, marginLeft : 20}}>{item.job}</Text>
                                <TouchableOpacity style={styles.doneButton} onPress={()=>xoa(item.id)}>
                              
                                    <Image style={styles.img} source={require('../assets/icons8-done.gif')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container : {
        width : windowWidth,
        height : windowHeight * 1.1,
        alignItems : 'center',
        backgroundColor : 'pink',
    },
    header : {
        width : '100%',
        height : '10%',
        backgroundColor : '#0D9fff',
        justifyContent : 'center',
        alignItems : 'center',
    },
    headerTitle : {
        fontWeight : 'bold',
        fontSize : 30,
        fontFamily : 'Roboto',
        textAlign : 'center',
    },
    inputContainer :{
        width : '100%',
        height : '5%',
        backgroundColor : 'yellow',
        justifyContent : 'space-around',
        alignItems : 'center',
        flexDirection : 'row',
    }, 
    input : {
        width : '70%',
        height : '80%',
        backgroundColor : 'white',
        borderRadius : 10,
        paddingLeft : 10,
        borderWidth : 1,
    },
    button :{
        width : 60,
        height : 30,
        backgroundColor : 'pink',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 10,
    },
    flatlistContainer : {
        width : '100%',
        height : 600,
        marginTop : 20,
    },
    item : {
        width : '100%', 
        height : 50, 
        marginTop : 10, 
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 20

    }, 
    wrapper : {
        width : '100%',
        height : '100%',
    },
    itemJob : {
        width : '85%', 
        height : '100%', 
        backgroundColor : '#DEE1E6', 
        borderRadius : 15, 
        flexDirection : 'row',
        alignItems : 'center',
        boxShadow: '0px 8px 17px 0px #171A1F26',
        justifyContent : 'space-between',
    },
    img : {
        width : 30,
        height : 30,
    },
    doneButton : {
        marginRight : 20,
    }
})