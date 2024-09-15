function Formulario({ botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar }) {

    return (
        <form>
            <input type='text' value={obj.nome} onChange={eventoTeclado} name='nome' placeholder='Nome' className='form-control' />
            <input type='text' value={obj.marca} onChange={eventoTeclado}  name='marca' placeholder='Marca' className='form-control' />
            <input type='number' value={obj.preco} onChange={eventoTeclado}  name='preco' placeholder='Preço'  step='0.01' className='form-control' />

            {
                botao
                ?
                < input type='button' value='Cadastrar' onClick={cadastrar} className='btn btn-primary'/>
            :
            <div>
                <input type='button' value='Alterar'  onClick={alterar} className='btn btn-warning' />
                <input type='button' value='Remover' onClick={remover} className='btn btn-danger' />
                <input type='button' value='Cancelar' onClick={cancelar} className='btn btn-secondary' />
            </div>
            }



        </form>
    )
}

export default Formulario