import { View, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";


export default function Codigo() {

    const [qr, setQr] = useState(null);  
    const { scanner, nombre } = useContext(AuthContext);

    const scannerLlamada = () => {
        scanner(qr);
        alert(nombre);

    };

    return(
        <View style={styles.container}>
            <TextInput 
                value={qr}
                placeholder="Enter code"
                onChangeText={text => setQr(text)}                
                />
             <Button title='datos' onPress={() => {
                    scannerLlamada();
            }}/> 
            
        </View>
    );
}

const styles = StyleSheet.create( {
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center'
    }
        

})