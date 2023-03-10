import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions,TouchableOpacity } from 'react-native'
import {useDispatch} from 'react-redux'
import { setIsSearch } from '../store/actions/StateActions';
import { Base_url } from '../utils.js/constants';

const { width, height } = Dimensions.get('window')
const imgWidth = width/2-20;


const CategoryItem = ({navigation,item}) => {

    const dispatch = useDispatch();

    const NavigateToProducts=(data)=>{
        dispatch(setIsSearch(false))
        navigation.navigate('Products', data)
      }


    return (
        <TouchableOpacity
        style={styles.button}
        onPress={() => 
        NavigateToProducts({catid: item.catid,task:"catwise"})
        }
      >
            <View style={styles.cardView}>
                <Image style={styles.image} source={{ uri: Base_url+"phps/Images/"+item.img }} />
                <View style={styles.textView}>
                    <Text style={styles.itemTitle}> {item.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: imgWidth,
        height: imgWidth+30,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        left: 5,
    },
    image: {
        width: imgWidth,
        height:imgWidth,
        borderRadius:10
    },
    itemTitle: {
        color: 'black',
        fontSize: 16,
        maxHeight:20,
        textAlign:'center'
    }
})

export default CategoryItem