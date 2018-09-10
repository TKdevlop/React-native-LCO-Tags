import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Title from "./title";
import Icon from "./icon_app.png";
import * as tags from "./tags.json";
import bookMark from "./bookmark-black-shape.png";
export default class HashTagCat extends Component {
    state = {
        tagsCat: null
    }
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
    LoadTags = (tagCat) => {
        const { navigate } = this.props.navigation;
        navigate("AllTag", { tagCat });
    }
    componentWillMount = () => {
        const tagArr = [];
        for (let tag in tags) {
            if (tags[tag].name) {
                if (tags[tag].name === this.props.navigation.getParam("tag")) {
                    for (let tagCat of tags[tag].subCategories) {
                        tagArr.push(tagCat.name)
                    }
                }
            }

            this.setState({ tagsCat: tagArr });
        }
    }
    render() {
        console.log(this.state.tagsCat)
        let tagCats = this.state.tagsCat.map((tagCat, i) => (<TouchableOpacity onPress={() => this.LoadTags(tagCat)} key={i} style={{ flex: 1, padding: 2 }}>
            <View style={{ flexDirection: "row" }}>
                <Image style={{ marginTop: "3%", marginLeft: "5%" }} source={bookMark} />
                <Text style={styles.tag}  >{tagCat}</Text>
            </View>
        </TouchableOpacity>))
        return (
            <React.Fragment>


                <ScrollView style={styles.container}>
                    <View>
                        {tagCats}
                    </View>
                </ScrollView>
            </React.Fragment>
        )
    }
}
const styles = StyleSheet.create({

    tag: {
        fontSize: 18,
        padding: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
}); 