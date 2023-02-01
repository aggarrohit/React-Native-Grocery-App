import React, { useState,useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'
import { addToCart } from '../store/actions/CartActions';
import { updateWishlist } from '../store/actions/WishlistActions';
import Feather from 'react-native-vector-icons/Feather';
import { ButtonPlus,ButtonMinus } from './Elements';
import { Base_url } from '../utils.js/constants';
import { lightVioletColor } from '../utils.js/colors';

const ProductItem = ({ item,setModalVisible,width,setCurrentItem,navigation }) => {
  
  const imgWidth = width / 2 - 20;
  const [cartqty, setCartqty] = useState(0)
  const [isInWishlist,setIsInWishlist] = useState(false)
  const [cartentries, setCartentries] = useState([])
  const [wishlist, setWishlist] = useState([])
  const redux_cart = useSelector(state => state.cartItems);
  const redux_wishlist = useSelector(state => state.wishlistItems);


 
const dispatch = useDispatch();

const checkWishlist = () => {
  setWishlist(redux_wishlist)
  var isTrue = false
  wishlist.forEach(element => {
    if(element.itemid == item.itemid && element.packoption == "no_packs"){
      setIsInWishlist(true)
      isTrue = true
    }else 
    if(element.itemid == item.itemid && item.selected_pack == undefined){
      if(element.selected_pack == undefined && element.packs[0].packageid == item.packs[0].packageid){
        setIsInWishlist(true)
        isTrue = true
      }else if(element.selected_pack != undefined && element.selected_pack.packageid == item.packs[0].packageid){
        setIsInWishlist(true)
        isTrue = true
      }
     
    }else         
    if(element.itemid == item.itemid && item.selected_pack != undefined){
      if(element.selected_pack == undefined && element.packs[0].packageid == item.selected_pack.packageid){
        setIsInWishlist(true)
        isTrue = true
      }else if(element.selected_pack != undefined && element.selected_pack.packageid == item.selected_pack.packageid){
        setIsInWishlist(true)
        isTrue = true
      }
    }
   
})
if(!isTrue){
  setIsInWishlist(false)
}
}

const checkCartData = () => {

  setCartentries(redux_cart)
  
      var isTrue = false
      cartentries.forEach(element => {
        if(element.itemid == item.itemid && element.packageid == 0){
          setCartqty(element.cartqty)
          isTrue = true
        }else 
        if(element.itemid == item.itemid && item.selected_pack == undefined && element.packageid == item.packs[0].packageid){
          setCartqty(element.cartqty)
          isTrue = true
        }else         
        if(element.itemid == item.itemid && item.selected_pack != undefined && element.packageid == item.selected_pack.packageid){
          setCartqty(element.cartqty)
          isTrue = true
        }
      });
      if(!isTrue){
        setCartqty(0)
      }          

};




useEffect(() => {
 
  checkCartData()
  checkWishlist()

});

// useEffect(() => {
 
//   checkCartData()
//   checkWishlist()

// },[item.selected_pack]);

const AddToWishlist = () => {
   dispatch(updateWishlist([...wishlist,item]))
};

const RemoveFromWishlist = () =>{
  
  var i=0;
  wishlist.forEach(element => {
    if(element.itemid == item.itemid  && item.packoption == "no_packs"){
    
        wishlist.splice(i,1)
   
        dispatch(updateWishlist([...wishlist]))
    }else 
    if(element.itemid == item.itemid && item.selected_pack == undefined){
      if(element.selected_pack == undefined && element.packs[0].packageid == item.packs[0].packageid){
        wishlist.splice(i,1)
      dispatch(updateWishlist([...wishlist]))
      }else if(element.selected_pack != undefined && element.selected_pack.packageid == item.packs[0].packageid){
        wishlist.splice(i,1)
      dispatch(updateWishlist([...wishlist]))
      }
     
    }else         
    if(element.itemid == item.itemid && item.selected_pack != undefined){
      if(element.selected_pack == undefined && element.packs[0].packageid == item.selected_pack.packageid){
        wishlist.splice(i,1)
      dispatch(updateWishlist([...wishlist]))
      }else if(element.selected_pack != undefined && element.selected_pack.packageid == item.selected_pack.packageid){
        wishlist.splice(i,1)
      dispatch(updateWishlist([...wishlist]))
      }
    }
    
    i++;
  });
  
};

const AddItem = () => {
  let qty = 0;
  let price = 0;
  let unit="";
  if(item.packoption == "no_packs"){
    item.packageid = 0;
    price = item.price
    qty = item.qty
    unit = item.unit;
  }else if(item.selected_pack == undefined){
    item.packageid = item.packs[0].packageid
    if(item.packoption == "pack_auto"){
      qty = item.packs[0].qty
      unit = item.unit;
      price = item.price*(item.packs[0].qty/item.qty)
    }else 
    if(item.packoption == "pack_manual"){
      qty = item.packs[0].qty
      unit = item.packs[0].unit;
      price = item.packs[0].price
    }
    
  }else if(item.selected_pack != undefined){
    item.packageid = item.selected_pack.packageid
    if(item.packoption == "pack_auto"){
      qty = item.selected_pack.qty
    unit = item.unit;
    price = item.price*(item.selected_pack.qty/item.qty)
    }else 
    if(item.packoption == "pack_manual"){
      qty = item.selected_pack.qty
      unit = item.selected_pack.unit;
      price = item.selected_pack.price
    }
  }

 

  let cartitem = {
    "itemid" : item.itemid,
    "productid" : item.itemid,
    "packageid" : item.packageid,
    "name" : item.name,
    "img":item.img,
    "qty":qty,
    "unit":unit,
    "price":price,
    "cartqty" : 1
  }
 
   dispatch(addToCart([...cartentries,cartitem]))
};

const PlusItem = () =>{ 
  var i=0;
  cartentries.forEach(element => {
    if(element.itemid == item.itemid && item.packoption == "no_packs"){
      element.cartqty++
      cartentries[i] = element
    }else
    if(element.itemid == item.itemid && item.selected_pack == undefined && element.packageid == item.packs[0].packageid){
      element.cartqty++
      cartentries[i] = element
    }else
    if(element.itemid == item.itemid && item.selected_pack == undefined && element.packageid == item.packs[0].packageid){
      element.cartqty++
      cartentries[i] = element
    }else
    if(element.itemid == item.itemid && item.selected_pack != undefined && element.packageid == item.selected_pack.packageid){
      element.cartqty++
      cartentries[i] = element
    }
    dispatch(addToCart([...cartentries]))
    i++;
  });
  
};

const MinusItem = () =>{
  
  var i=0;
  cartentries.forEach(element => {
    if(element.itemid == item.itemid  && item.packoption == "no_packs"){
      if(element.cartqty == 1){
        cartentries.splice(i,1)
      }else{
        element.cartqty--
        cartentries[i] = element
      }
      dispatch(addToCart([...cartentries]))
    }else
    if(element.itemid == item.itemid  && item.selected_pack == undefined && element.packageid == item.packs[0].packageid){
      if(element.cartqty == 1){
        cartentries.splice(i,1)
      }else{
        element.cartqty--
        cartentries[i] = element
      }
      dispatch(addToCart([...cartentries]))
    }else
    if(element.itemid == item.itemid  && item.selected_pack != undefined && element.packageid == item.selected_pack.packageid){
      if(element.cartqty == 1){
        cartentries.splice(i,1)
      }else{
        element.cartqty--
        cartentries[i] = element
      }
      
      dispatch(addToCart([...cartentries]))
    }
    i++;
  });
  
};

const ShowPacks = () =>{
  setModalVisible(true);
  setCurrentItem(item);
};

const styles = StyleSheet.create({
  cardView: {
   // flex: 1,
    width: imgWidth,
    height: 'auto',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  buttonsLayout: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    margin:5
  },

  qtyStyle:{
    height:30,
    width:30,
    paddingTop:5,
    textAlign:'center'
  },

  textView: {
    left: 5,
    textAlign: 'center'
  },
  itemImage: {
    width: imgWidth,
    height: imgWidth,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor:'#EBF0EB',
    
  },
  wimage: {
    position:'absolute',
    right:5,
    top:5,
    width: 30,
    height: 30,
  },
  wimage1: {
    width: 30,
    height: 30,
  },
  itemTitle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center'
  },
  itemPriceNP: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    marginVertical:5
  },
  itemPrice: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    borderColor:'grey',
    borderWidth:1,
    marginRight:10,
    borderRadius:5,
    paddingLeft:5,
    paddingRight:5,
    paddingVertical:5,
    marginVertical:5
  
  },
  itemSubscribe:{
    width: 150,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    height: 30,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor:'#2DCA2D',
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center',
  },
  itemAdd: {
    width: 150,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    color: 'black',
    fontSize: 16,
    height: 'auto',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 5,
    borderColor:'green',
    borderRadius:5,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
  },



  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: lightVioletColor,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

return (
  <TouchableOpacity onPress={()=>navigation.navigate('ProductDetails',{item:item})}>
    <View style={styles.cardView}>
      
     
      <Image style={styles.itemImage} source={{ uri: Base_url+"phps/Images/" + item.img }} />
      {isInWishlist && 
        <TouchableOpacity  style={styles.wimage} onPress={() => RemoveFromWishlist()}>
          <Image style={styles.wimage1} source={require('../assets/added_to_wishlist.png')}/>
        </TouchableOpacity>
      }
      {!isInWishlist && 
        <TouchableOpacity style={styles.wimage} onPress={() => AddToWishlist()}>
          <Image  style={styles.wimage1} source={require('../assets/add_to_wishlist.png')}/>
        </TouchableOpacity>
      }
      <View style={styles.textView}>
        <Text style={styles.itemTitle}> {item.name}</Text>
        
        {item.packoption == "no_packs" &&  <Text style={styles.itemPriceNP}> Rs.{item.price} / {item.qty} {item.unit} </Text>}
        <TouchableOpacity onPress={() => ShowPacks()}>
          {(item.packs.length>0 && item.packoption == "pack_auto" && item.selected_pack == undefined) &&  <Text style={styles.itemPrice}> Rs.{item.price*(item.packs[0].qty/item.qty)} / {item.packs[0].qty} {item.unit} </Text>}
          {(item.packs.length>0 && item.packoption == "pack_manual" && item.selected_pack == undefined) &&   <Text style={styles.itemPrice}> Rs.{item.packs[0].price} / {item.packs[0].qty} {item.packs[0].unit} </Text>}

          {(item.packoption == "pack_auto" && item.selected_pack != undefined) &&  <Text style={styles.itemPrice}> Rs.{item.price*(item.selected_pack.qty/item.qty)} / {item.selected_pack.qty} {item.unit} </Text>}
          {(item.packoption == "pack_manual" && item.selected_pack != undefined) &&  <Text style={styles.itemPrice}> Rs.{item.selected_pack.price} / {item.selected_pack.qty} {item.selected_pack.unit} </Text>}
        </TouchableOpacity>

       

        {cartqty == 0 && <TouchableOpacity style={styles.itemAdd} onPress={() => AddItem()}>
          <View style={{flexDirection:'row'}}>
            <Feather name="shopping-cart" size={16} color={'green'}/>
            <Text style={{color:'green',marginLeft:5}}> Add</Text>
          </View>
         
        </TouchableOpacity>
        }
        {cartqty != 0 &&
          <View style={styles.buttonsLayout}>
            
            <TouchableOpacity onPress={()=>MinusItem()}>
              <ButtonMinus />
            </TouchableOpacity>
            <Text style={styles.qtyStyle}>{cartqty}</Text>
            <TouchableOpacity onPress={()=>PlusItem()}>
              <ButtonPlus />
            </TouchableOpacity>
           
          </View>
        }
      </View>
    </View>
    </TouchableOpacity>
  )


}



export default ProductItem