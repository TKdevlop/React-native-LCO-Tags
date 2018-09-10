import React, { Component } from 'react'
import * as tags from "./tags.json"; 
import { Text, View,ScrollView, StyleSheet,TouchableOpacity,Image} from "react-native";
import bookMark from "./bookmark-black-shape.png";
import Title from "./title";
import Icon from "./icon_app.png";

export default class HomeScreen extends Component {
    static navigationOptions = {
        headerTitle:<Title/>,
    headerRight: (
     <Image style={{width:48,height:48,padding:10,marginRight:10}} source={Icon}/>
    ),
    headerStyle: { 
        backgroundColor: '#3344C1', 
        elevation: null},
        };  

    state = {
        tags: [] 
    }
    LoadTags = (tag) => {
      const { navigate } = this.props.navigation;
navigate("HashTag",{tag});
    }
    componentWillMount = () => {
   
        const tagArr = [];
        for (let tag in tags) {
            if (tags[tag].name) {
                tagArr.push(tags[tag].name)
            }
          
            this.setState({ tags: tagArr }); 
        }    
    }    
    render() {
        let renderArr = this.state.tags.map((tag,i) => (<TouchableOpacity onPress={() => this.LoadTags(tag)} key={i} style={{flex:1,padding:2}}>
        <View style={{flexDirection:"row"}}>   
              <Image style={{marginTop:"3%",marginLeft:"5%" }} source={bookMark}/>
            <Text style={styles.tag}  >{tag}</Text>
            </View>
            </TouchableOpacity>))
        return (
            <React.Fragment>  
             
            
            <ScrollView style={styles.container}>
            <View> 
                {renderArr}
                </View>
            </ScrollView> 
            </React.Fragment>
        )
    }  
}
const styles = StyleSheet.create({

    tag:{
        fontSize:18,
        padding:10
    },
    container: { 
        flex: 1,
        backgroundColor: '#fff',
    },
}); 
// 3344C1