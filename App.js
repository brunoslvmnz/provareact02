import { useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';

const App = () => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [nasa, setNasa] = useState(null);

    const nasaAPI = ()=> {
        console.log('------------', date.getFullYear() + ' ' + date.getMonth() + ' ' + date.getDate());

    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date='+date.getFullYear()+'-'+date.getMonth()+'-'+date.getgetDate())
        .then(response=>response.json())
        .then(json=>setNasa(json.url))
        .catch(error => console.log('Houve um erro: ', error));
    };

    return (
        <View style={styles.container}>
            {!nasa ? (
                <>
                <Text style={styles.texto}>{date.toLocaleDateString('br')}</Text>
                <View style={styles.btn} />
                <Button title="Alterar data" onPress={() => setOpen(true)} />
                <View style={styles.btn} />
                <Button title='Buscar' onPress={() => nasaAPI()} />
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={dataEscolhida =>{
                        console.log('============', dataEscolhida);
                        setOpen(false);
                        setDate(dataEscolhida);
                    }}
                />
                </>
            ):(
                <>
                <Button title="Buscar outra foto" onPress={() => setNasa(null)} />
                <Image source={{ uri : nasa}} style = {styles.imagem} resizeMode="contain" />
                </>
            )}
        </View>
    );
};
export default App;
const styles = StyleSheet.create({
  container: {
  },
  imagem: {
    height: 200,
    width: 200
  },
  btn: {
    backgroundColor : '#0074E0',
  },
  texto: {
    color: '#F0901A',
  },
});