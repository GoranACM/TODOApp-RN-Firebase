/* 
* Created by: Goran Ilievski
*
* September 2020
*
* TODOApp
*/

import React, { Component } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import colors from '../styles/Colors'
import tempData from '../tempData'

export default class AddListModal extends Component {

    backgroundColors = ["#33A8C7", "#A0E426", "#52e3e1", "#F77976", "#F050AE", "#D883FF", "#9336FD" ]

    state = {
        name: "",
        color: this.backgroundColors[0]
    };

    createTodo = () => {
        const { name, color } = this.state

        tempData.push({
            name,
            color,
            todos: []
        })

        this.setState({ name: "" })
        this.props.closeModal()
    }

    renderColors() {
        return this.backgroundColors.map(color => {
            return(
                <TouchableOpacity 
                    key={ color } 
                    style={ [styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })}
                />
            )
        })
    }

    render() {
        return (
            <KeyboardAvoidingView style={ styles.container } behavior="padding">
                <TouchableOpacity style={ styles.closeButton }>
                    <AntDesign name="close" size={24} color={ colors.black } onPress={ this.props.closeModal }/>
                </TouchableOpacity>

                <View style={ styles.expand }>
                    <Text style={ styles.title }>Create Todo list</Text>

                    <TextInput 
                        style={ styles.input } 
                        placeholder="List name?" 
                        onChangeText={ text => this.setState({ name: text }) } 
                    />

                    <View style={ styles.colorsContainer }>{ this.renderColors() }</View>

                    <TouchableOpacity 
                        style={ [styles.create, { backgroundColor: this.state.color }] }
                        onPress={ this.createTodo }
                    >
                        <Text style={ styles.textCreate } >Create!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    closeButton: {
        position: "absolute",
        top: 42,
        right: 32,
    },
    expand: {
        alignSelf: "stretch",
        marginHorizontal: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    textCreate: {
        color: colors.white,
        fontWeight: "600"
    },
    colorsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,
    }
});
