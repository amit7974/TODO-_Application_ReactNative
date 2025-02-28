import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { firebase } from '../config';

const Home = () => {

    const[todos,setTodos] =  useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData,setAddData] = useState('');
    const navigation = useNavigation();
    //fetch or read the data from firestore
    useEffect(()=>{
        todoRef.orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapShot =>{
                const todos =[]
                forEach((doc)=>{
                const{heading} = doc.data()
                todos.push({
                    id:doc.id,
                    heading,
                })
            })

            setTodos(todos)
            }
    )
},[])
// delete todo from firebase db
const deleteTodo = (todos) => {
    todoRef
    .doc(todos.id)
    .delete()
    .then(() =>{
        //show a  successfully alert

        alert("Deleted Successfully")
    })
    .catch(error =>{
        alert(error);
    })
}
// add a todo
const  addTodo =() =>{
    //check if we have a todo
    if(addData && addData.length > 0){
        // get the timestamp

        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
heading:addData,
createdAt:timestamp

        };

todoRef
.add(data)
.then(()=>{
    setAddData('');

    // release keyword
Keyboard.dismiss();

})
.catch((error)=>{
    alert(error);
})
    }  
}

return(
<View style={{flex:1}}>
<View style={styles.formContainer}>
<TextInput
style={styles.input}
placeholder='Add A New Todo'
placeholderTextColor='#aaaaaa'
onChangeText={(heading) => setAddData(heading)}
value={addData}
underlineColorAndroid='transparent'
autoCapitalize='none'
/>
<TouchableOpacity style={styles.button} onPress={addTodo}>
<Text style={styles.buttonText}>
Add
</Text>
</TouchableOpacity>
</View>
<FlatList 
data={todos}
numColumns={1}
renderItem={({item}) => (
<View>
<Pressable
style={styles.container}
onPress={()=> navigation.navigate('Detail',{item})}
>
<FontAwesome
name='trash-0'
color='red'
onPress={()=> deleteTodo(item)}
style={styles.todoIcon}
/>
<View style={styles.innerContainer}>
<Text style={styles.itemHeading}>
{item.heading[0].toUpperCase()+item.heading.slice(1)}

</Text>

</View>

</Pressable>

</View>
)}
/>
    </View>
)
}

export default Home

const styles =StyleSheet.create({
    container:{
        backgroundColor:'#e5e5e5',
        padding: 15,
        boderRadius:15,
        margin:5,
        marginHorizental:10,
        flexDirection:'row',
        alignItems:'center'
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
        marginRight:45,
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:18,
        marginRight:22,
    },
    formContainer:{
        flexDirection:'row',
        height:80,
        marginleft:10,
        marginRight:10,
        marginTop:100,
    },
    input:{
        height:48,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'white',
        paddingLeft:16,
        flex:1,
        marginRight:5,
    },
    button:{
        height:47,
        boderRadius:5,
        backgroundColor:'#788eec',
        width:80,
        alignContent: 'center',
        justifyContent:'center'
    },
    buttomText:{
        color:'white',
        fontSize:20
    },

todoIcon:{
    marginTop:5,
    fontSize:20,
    marginleft:14
}
})