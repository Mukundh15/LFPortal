import Lost from './Lost';
import Found from './Found';
import ProductDescription from './ProductDescription';
import Story from './Story';
import {useEffect} from 'react';
function Home(){
    useEffect(()=>{
        const hasAlerted=sessionStorage.getItem('hasAlerted');
        if(!hasAlerted){
            alert("This application works best on a laptop or desktop device.");
            sessionStorage.setItem('hasAlerted','true');
        }
    }, []);
    return <>
        <ProductDescription/>
        <Lost/>
        <Found/>
        <Story/>
    </>
}
export default Home;