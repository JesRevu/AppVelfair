import React, {useState, useEffect, useContext} from 'react';
import { TextInput, Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AuthContext } from "../context/AuthContext";

export default function Scanner(){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [id, setId] = useState('');
    const { scanner } = useContext(AuthContext);
    const [qr, setQr] = useState(null);  

    useEffect(() => {
        (async() => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data}) => {
        setScanned(true);
        setId(data);
    };

    if(hasPermission === null) {
        return <Text>Requesting for Camera Permission</Text>
    };

    if(hasPermission === false) {
        return <Text>No Access to Camera</Text>
    };

    return (
        <View style={styles.container}> 
               <View>
                <BarCodeScanner
                 onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                 style = {StyleSheet.absoluteFillObject}

                />
                {scanned && <Button title='Tap to Scan Again' onPress={() => setScanned(false)} />}
                <TextInput
                value={qr}
                placeholder="Enter code"
                onChangeText={text => setQr(text)}                
                />
                                   
                <Button title="Datos" 
                onPress={() => scanner({ qr })}
                />
                </View>
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