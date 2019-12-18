import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text,ActivityIndicator,Image} from 'react-native';
import {Card,CardItem,Header} from 'native-base';




export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLoading:true,
      dataSource: []
    };
  }

  getUserfromApi=()=>{
    return(
      fetch("https://randomuser.me/api/?results=50")
      .then(response=>response.json())
      .then(responseJson=>{
        this.setState({
          isLoading:false,
          dataSource:this.state.dataSource.concat(responseJson.results)
        })
      })
      .catch(error=>console.log(error))
    )
  }

  _keyExtractor=(datasource,index)=>datasource.email;

  componentDidMount(){
    this.getUserfromApi();
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.progress}>
          <ActivityIndicator size="large" color='#01CBC6' />
        </View>
      )
    }else{
    return(
      <FlatList
      data={this.state.dataSource}
      keyExtractor={this._keyExtractor}
      renderItem={({item})=>(
        
       <Card>
         <View>
           <Header>

           </Header>
         </View>
       <CardItem>
         <View style={styles.container}>
           <Image
           style={styles.profilepic}
           source={
             {
               uri:item.picture.medium
             }
           } />
         </View>
         <View style={styles.userinfo}>
        <Text>
          Name:{item.name.title} {item.name.first} {item.name.last}
        </Text>
        <Text>
        Email:{item.email}
        </Text>
        <Text>
        City:{item.location.city}
        </Text>
         </View>
       </CardItem>
       </Card> 
      )}
      >
      </FlatList>  
       );
  }}
}

const styles=StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#fff',
   alignItems:"center",
   justifyContent:'center'
  },
  profilepic:{
    flex:2,
    height:100,
    width:100,
    marginEnd:10
  },
  userinfo:{
    flex:1,
    flexDirection:'column'
  },
  progress:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})