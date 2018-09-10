import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity,ScrollView, Clipboard } from 'react-native';
import * as tags from "./tags.json";
import Title from "./title";
import Icon from "./icon_app.png";
import CLipBorad from "./copy-content.png";
import Plus from "./add.png";
import Minus from "./minus.png";

export default class AllTag extends Component {
    static navigationOptions = {
        headerLeft: null,
        headerTitle: <Title />,
        headerRight: (
            <Image style={{ width: 48, height: 48, padding: 10, marginRight: 10 }} source={Icon} />
        ),
        headerStyle: {
            backgroundColor: '#3344C1',
            elevation: null
        },
    };
    state = {
        AllTag: null,
        SelectedItems: [],
        opacity:0
    
    }
    setToClipBoard = async()  => {
        Clipboard.setString(this.state.SelectedItems.join(" "));
        this.setState({opacity:1})
        setTimeout(() => {
            this.setState({opacity:0})
        },1000)
    }
    SelectAll = () => {  
        let SelectedItems = [];
        let selectedItem = this.state.AllTag.map(tag => {



            tag.flag = true;



            SelectedItems.push(tag.name)
            return tag;
        })


        this.setState({ AllTag: selectedItem, SelectedItems })


    }
    unSelectAll = () => {
        let SelectedItems = [];
        let selectedItem = this.state.AllTag.map(tag => {



            tag.flag = false;



            SelectedItems.pop(tag.name)
            return tag;
        })
        this.setState({ AllTag: selectedItem, SelectedItems })
    }

    selectItem = (eachTag) => {
        let SelectedItems = [];
        let selectedItem = this.state.AllTag.map(tag => {

            if (tag.name === eachTag.name) {

                tag.flag = !tag.flag;
            }
            if (tag.flag) {

                SelectedItems.push(tag.name)
            }
            return tag;
        })




        this.setState({ AllTag: selectedItem, SelectedItems })
    }

    componentWillMount = () => {
        const tagArr = [];
        for (let tag in tags) {
            if (tags[tag].name) {

                for (let tagCat of tags[tag].subCategories) {
                    if (tagCat.name === this.props.navigation.getParam("tagCat")) {
                        for (let i of tagCat.tags) {
                            tagArr.push({ name: "#" + i, flag: false });
                        }
                    }

                }
            }

            this.setState({ AllTag: tagArr });
        }
    }

    render() {
        let copyText = this.state.SelectedItems.length ? "Copied To Clipboard!" : "Select Item To Copy"
        let AllTags = this.state.AllTag.map((eachTag, i) => {


            return (

                <TouchableOpacity onPress={() => this.selectItem(eachTag)} style={{ paddingTop: 10, paddingBottom: 10, borderWidth: 2, borderRadius: 20, borderColor: "#3344C1", width: "47%", alignItems: "center", marginTop: 5 }} key={i}>

                    <Text style={{ color: eachTag.flag ? "#00e1ff" : "rgb(105,105,105)", fontSize: 16 }}> {eachTag.name} </Text>


                </TouchableOpacity>

            )
        })

        return (
            <React.Fragment>

                <View>

                    <View style={styles.container}>

                        <View style={styles.controls}>
                            <Text style={{ fontSize: 16 }}>{this.state.SelectedItems.length} Item Selected</Text>
                            <View style={styles.spacer}></View>
                            <TouchableOpacity onPress={this.setToClipBoard} style={{ paddingLeft: 30 }}>
                                <View>
                                    <Image source={CLipBorad} />

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.SelectAll} style={{ paddingLeft: 30 }}>
                                <View>
                                    <Image source={Plus} />

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.unSelectAll} style={{ paddingLeft: 30 }}>
                                <View>
                                    <Image source={Minus} />

                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <ScrollView >

                        <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "space-around", backgroundColor: "#fff" }}>
                            {AllTags}
                        </View>
                    
                    </ScrollView>
 
                </View>
                <Text style={{ position: "absolute", top: "80%", left: "30%", color: "#fff", borderRadius: 5, padding: 8, backgroundColor: "black",opacity:this.state.opacity }}>{copyText}</Text>
            </React.Fragment>
        )
    }
}
const styles = StyleSheet.create({

    controls: {
        padding: 18,
        maxHeight: 60,
        flexDirection: "row"
    },
    scroll: {
        flexWrap: 'wrap',

        flexDirection: 'row',
    },
    items: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: "#fff"

    },
    spacer: {
        flex: 1
    },
    container: {

        backgroundColor: '#fff',
    },
}); 