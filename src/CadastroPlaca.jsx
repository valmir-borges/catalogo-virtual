import React from 'react'
import Style from './css/login.module.css'
import { Alert, Autocomplete, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import { Navigate, json, useNavigate } from 'react-router-dom';
import Header from './Header';

function CadastroPlaca() {

  const [ titulo, setTitulo]= useState("");
  const [ descricao, setDescricao]= useState("");
  const [ ano, setAno] = useState("");
  const [ duracao , setDuracao]=useState("");
  const [ capa , setCapa]=useState("");


    const options = [ "High-End", "Intermediário", "Básico"];    
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    const [ cadastrado, setCadastrado]=useState(false);
    const [ erro, setErro]=useState(false);

    function Cadastrar(e){
      e.preventDefault();
      fetch( process.env.REACT_APP_BACKEND + "produtos",//O fetch manda uma requisição para url digitada, futuramente será o link do banco de dados feitos por nós
      {method: "Post",//A requisição irá ser do método post, ou seja, por baixo dos panos (Existe 5 métodos de requisição)
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(//O corpo da requisição será essa
        {
          titulo: titulo,
          descricao: descricao,
          ano: ano,
          duracao: duracao,
          categoria: inputValue,
          imagem: capa,
          usuario: localStorage.getItem('usuario')
        }
      )})
      .then((resposta) => resposta.json())//Então se tudo deu certo pega a resposta e transforma em JSON
      .then((json) => {
        if (json._id)//Se a resposta do json tiver um id quer dizer que o cadastro foi bem sucedido
        {
          setCadastrado(true)
          setErro(false)
        }
        else{//Caso contrário, não foi aceito o cadastrado, portanto dará um erro
          setErro(true);
          setCadastrado(false)
        }
      })
      .catch((erro) => { setErro(true)})
    }
      //limpando os campos após o cadastro, quando o cadastro for alterado
      useEffect( () =>
      {
          setTitulo("")
          setAno("")
          setDuracao("")
          setCapa("")
          setDescricao("")
      },[cadastrado])
    
  return (
    <>
    <Header/>
        <div className={Style.fundologin}>
        <Container component="section" maxWidth="xs">
            <Box sx={{ backgroundColor:"rgba(0, 0, 0, 0.6)",padding: "40px", borderRadius: "10px", boxShadow: "2px", display:"flex", flexDirection:"column", alignItems:"center"}}>
            {cadastrado && (<Alert severity="success" sx={{backgroundColor:"black", textAlign:"center"}}>Sua placa de vídeo foi cadastrada com sucesso</Alert>)}
            {erro && (<Alert severity='warning' sx={{mt:2, mb:2, backgroundColor:"black", textAlign:"center"}}>Desculpe tente novamente</Alert>)}
            <Typography component="h1" variant='span' sx={{fontWeight:"bolder", fontFamily: 'Aldrich', fontSize:"2rem"}}>Cadastre sua placa</Typography>
            <Box component="form" onSubmit={Cadastrar}>
            <TextField 
            label="Nome da Placa" 
            variant='filled' 
            type='name'
            margin='normal' 
            fullWidth
            value={titulo}
            onChange={(e)=> setTitulo(e.target.value)}
            />
            <TextField 
            label="Linha" 
            variant='filled' 
            type='text' 
            margin='normal' 
            fullWidth
            value={descricao}
            onChange={(e)=> setDescricao(e.target.value)}
            />
            <Autocomplete
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => <TextField {...params} label="Categoria" variant='filled' 
            />}
            />
            <TextField 
            label="Ano de Lançamento" 
            variant='filled' 
            type='number'
            margin='normal' 
            fullWidth
            value={ano}
            onChange={(e)=> setAno(e.target.value)}
            />
            <TextField 
            label="Preço" 
            variant='filled' 
            type='text'
            margin='normal' 
            fullWidth
            value={duracao}
            onChange={(e)=> setDuracao(e.target.value)}
            />
            <TextField 
            label="Foto da placa" 
            variant='filled' 
            type='text'
            margin='normal' 
            fullWidth
            value={capa}
            onChange={(e)=> setCapa(e.target.value)}
            />
            <Button type='submit' variant="contained" fullWidth sx={{mt:2, mb:2}}>Cadastrar</Button>
            </Box>
            </Box>
      </Container>
      </div>
    </>
  )
}

export default CadastroPlaca