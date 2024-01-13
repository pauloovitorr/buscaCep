let cep = document.querySelector('#cep')
let pai = document.querySelector('.pai')

cep.addEventListener('blur', function(){
    let pesquisar = cep.value.replace('-','')
        pesquisar = cep.value.replace('.','')

    
      if(validarCep(pesquisar)){

            fetch(`https://viacep.com.br/ws/${pesquisar}/json/`)

            .then((res)=>{
                 return res.json()
                })

            .then((dados)=>{

                if(dados.hasOwnProperty('erro')){

                     document.querySelector('#logradouro').value = 'CEP não encontrado' 
                            
                    limparCampos()
                    
                }
                else
                     preencher_form(dados)
                     
                 })

            .catch((e)=>{
                    console.log('Deu erro: '+e,message)
                })
    
        
        }
        else document.querySelector('#logradouro').value = 'CEP inválido'
        limparCampos()
        

      


    function preencher_form(result){

        if( result.bairro=='' && result.logradouro==''){
            document.querySelector('#logradouro').value = 'CEP NÃO TEM UM BAIRRO EM ESPECÍFICO'
            document.querySelector('#bairro').value = 'CEP NÃO TEM UMA RUA EM ESPECÍFICO'
            document.querySelector('#localidade').value = result.localidade
            document.querySelector('#uf').value = result.uf
            document.querySelector('#ddd').value = result.ddd


            pai.classList.remove('pai')
            pai.classList.add('paiCerto')
            pai.style.border = '3px solid rgb(24, 237, 9)'

            return
        }

        document.querySelector('#logradouro').value = result.logradouro
        document.querySelector('#bairro').value = result.bairro
        document.querySelector('#localidade').value = result.localidade
        document.querySelector('#uf').value = result.uf
        document.querySelector('#ddd').value = result.ddd

        

        pai.classList.remove('pai')
        pai.classList.add('paiCerto')
        pai.style.border = '3px solid rgb(24, 237, 9)'
        
    }

    function validarCep(cep) {
        const regexCep = /^[0-9]{5}-?[0-9]{3}$/;
        return regexCep.test(cep);
      }
      

      function limparCampos(){
                document.querySelector('#bairro').value = ''
                document.querySelector('#localidade').value = ''
                document.querySelector('#uf').value = ''
                document.querySelector('#ddd').value = '' 

                pai.classList.remove('paiCerto')
                pai.classList.add('pai')
                pai.style.border = '3px solid red'
                
      }
}
)

function mCEP () {
    var cep = event.target.value;
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/^(\d{2})(\d)/, "$1.$2")
    cep = cep.replace(/.(\d{3})(\d)/, ".$1-$2")
    event.target.value = cep;
 }