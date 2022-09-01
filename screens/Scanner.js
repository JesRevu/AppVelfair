import React, {useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AuthContext } from "../context/AuthContext";


export default function Scanner(){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [id, setId] = useState('');

    const { scanner, productInfo, nombre } = useContext(AuthContext);



    useEffect(() => {
        (async() => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({data}) => {
        setScanned(true);
        setId(data);
        scanner(id);
        console.log(1);
        console.log(productInfo);
        console.log(1);
        alert(nombre);
        

    
    };



    if(hasPermission === null) {
        return <Text>Requesting for Camera Permission</Text>
    };

    if(hasPermission === false) {
        return <Text>No Access to Camera</Text>
    };

    return (
        <View style={styles.container}> 
                <BarCodeScanner
                 onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                 style = {StyleSheet.absoluteFillObject}
                />
                {scanned && <Button title='Tap to Scan Again' onPress={() => {setScanned(false)}}/>}
                
               
        </View>
        
    );
    
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
    },
})