import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import axios from 'axios';

const photos = ['https://img.freepik.com/photos-gratuite/tasse-cafe-coeur-dessine-dans-mousse_1286-70.jpg?size=626&ext=jpg',
    'https://images.caradisiac.com/logos/7/3/8/5/267385/S0-somnolence-au-volant-prendre-un-cafe-avant-de-conduire-est-ce-vraiment-efficace-191004.jpg',
    'https://file1.topsante.com/var/topsante/storage/images/1/3/3/1/1331239/boire-entre-cafes-par-jour-pour-prevenir-les-maladies-chroniques.jpeg?alias=original'];

const strings = ['Hello World',
    'Comment ça va ?',
    'Il fait beau !'];
const url = 'https://dog.ceo/api/breeds/image/random';


class Inputs extends Component{
    state = {
        posts: [
            {'string': strings[0],'url': photos[0], 'id': 1},
            {'string': strings[1],'url': photos[1], 'id': 2},
            {'string': strings[2],'url': photos[2], 'id': 3},
        ],
        nextPostID: 4,
        string: '',
    }

    fetchImage =async () => {
        let urlPhoto = '';
         await axios.get(url).then(response =>  {
             urlPhoto = response.data['message']
        })
        return urlPhoto;
    }

    handleChange = (string) => {
        this.setState({string});
    }

    createPost = async () => {
        let urlPhoto = await this.fetchImage();
        console.log(urlPhoto)
        this.setState({
            posts: [
                ...this.state.posts,
                {id: this.state.nextPostID, string: this.state.string, url: urlPhoto}
            ],
            nextPostID: this.state.nextPostID + 1,
            string: ''
        })
        this.handleChange('');
    }

    renderList(){
        const tabLength = this.state.posts.length;
        const rows = [];
        for(let i = tabLength-1; i >= 0; i--){
            rows.push(
                <View key = {this.state.posts[i].id} >
                    <Text style = {styles.photoTitle}>{this.state.posts[i].string}</Text>
                    <Image style = {styles.photo} source = {{uri: this.state.posts[i].url}}
                    />
                </View>
            )
        }
        return rows;
    }

    render(){
        return(
            <View style = {styles.container}>
                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Quoi de neuf ?"
                           placeholderTextColor = "#FFF"
                           autoCapitalize = "none"
                           onChangeText = {this.handleChange}
                />

                <TouchableOpacity
                    style = {styles.submitButton}
                >
                    <Text
                        style = {styles.submitButtonText}
                        onPress = {this.createPost}
                    >Publier</Text>
                </TouchableOpacity>
                <ScrollView style = {{marginLeft: 20}}>
                    {this.renderList()}
                </ScrollView>
            </View>
        )
    }
}

export default Inputs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        fontSize: 20,
    },
    input: {
        borderRadius: 10,
        textAlign: "center",
        alignSelf: "center",
        height: 30,
        width: 250,
        marginBottom: 10,
        backgroundColor: '#AAA',
    },
    submitButton: {
        borderRadius: 10,
        alignSelf: "flex-end",
        backgroundColor: '#FFcc00',
        paddingTop: 5,
        width: 70,
        height: 30,
    },
    submitButtonText:{
        textAlign: "center",
        color: 'white'
    },
    photoTitle:{
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 400,
    },
    photo:{
        marginBottom: 15,
        width: 300,
        height: 200
    }
})
