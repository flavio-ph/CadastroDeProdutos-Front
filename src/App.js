import { useEffect, useState } from 'react'
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {
  
const produto = {

  id : 0,
  nome: '',
  marca: '',
  preco: ''

}

const [btnCadastrar, setBtnCadastrar] = useState(true);
const [produtos, setProdutos] = useState([])
const [objProduto, setObjetoProduto] = useState(produto);

useEffect(() => {

  fetch("http://localhost:8080/listar")
  .then(retorno => retorno.json())
  .then(retorno_convertido => setProdutos(retorno_convertido));

}, []);

const aoDigitar = (e) => {
  setObjetoProduto({...objProduto, [e.target.name]:e.target.value})
}

//cadastrar produto
const cadastrar = () => {
  fetch('http://localhost:8080/cadastrar',{
    method:'post',
    body:JSON.stringify(objProduto),
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  }) 
  .then(retorno => retorno.json())
  .then(retorno_convertido => {

    if(retorno_convertido.mensagem !== undefined) {
      alert(retorno_convertido.mensagem)
    }else {
      setProdutos([...produtos, retorno_convertido]);
      alert('Produto cadastrado com sucesso!')
      limparFormulario();
    }
    
  })
  
}

//alterar produto
const alterar = () => {
  fetch('http://localhost:8080/alterar',{
    method:'put',
    body:JSON.stringify(objProduto),
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  }) 
  .then(retorno => retorno.json())
  .then(retorno_convertido => {

    if(retorno_convertido.mensagem !== undefined) {
      alert(retorno_convertido.mensagem)
    }else {
      alert('Produto alterado com sucesso!');

      let vetorTemp = [...produtos];

      let indice = vetorTemp.findIndex((p) => {
        return p.id === objProduto.id
      });
  
      vetorTemp[indice] = objProduto

      setProdutos(vetorTemp)
  
      setProdutos(vetorTemp);

      limparFormulario();
    }
    
  })
  
}

const limparFormulario = () => {
  setObjetoProduto(produto);
  setBtnCadastrar(true)
}

const selecionarProduto = (indice) => {
  setObjetoProduto(produtos[indice]);
  setBtnCadastrar(false);
}

//remover produto
const remover = () => {
  fetch('http://localhost:8080/remover/'+objProduto.id,{
    method:'delete',
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  }) 
  .then(retorno => retorno.json())
  .then(retorno_convertido => {

    alert(retorno_convertido.mensagem);

    let vetorTemp = [...produtos];

    let indice = vetorTemp.findIndex((p) => {
      return p.id === objProduto.id
    });

    vetorTemp.splice(indice, 1)

    setProdutos(vetorTemp);

    limparFormulario();


  })

}

  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;
