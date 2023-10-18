class Validator {
  //constructor inicia as propriedades que o objeto possui
  constructor() {
    this.validations = [
      "data-min-length",
      "data-max-length",
      "data-required",      
    ]
  }
  //mapear os inputs do login
  validate(form) {
    //resgatar as validações
    let currentValidations = document.querySelectorAll("form .error-validation")

    if (currentValidations.length) {
      this.cleanValidations(currentValidations)
    }

    // pegar os inputs do login
    let inputs = form.getElementsByTagName("input")

    //transformar HTMLCollection em array
    let inputsArray = [...inputs]

    //loop nos inputs e validação mediante ao que for encontrado
    inputsArray.forEach(function (input) {
      //loop em todas as validações existentes
      for (let i = 0; this.validations.length > i; i++) {
        //verifica se a validação atual existe no input
        if (input.getAttribute(this.validations[i]) != null) {
          // limpando a string para virar um método
          let method = this.validations[i].replace("data-", "").replace("-", "")
          // valor do input
          let value = input.getAttribute(this.validations[i])
          // invocar o método
          this[method](input, value)
        }
      }
    }, this)
  }
  //verifica se um input tem um número mínimo de 8 caracteres
  minlength(input, minValue) {
    let inputLength = input.value.length

    let errorMessage = `A senha precisa ter ${minValue} caracteres`

    if (inputLength < minValue) {
      this.printMessage(input, errorMessage)
    }
  }
  //verifica se um input tem um número máximo de 8 caracteres
  maxlength(input, maxValue) {
    let inputLength = input.value.length

    let errorMessage = `A senha precisa ter menos que ${maxValue} caracteres`

    if (inputLength > maxValue) {
      this.printMessage(input, errorMessage)
    }
  }

  //método para imprimir mensagens de erro na tela
  printMessage(input, msg) {
    // checa os erros presentes no input
    let errorsQty = input.parentNode.querySelector(".error-validation")

    if(errorsQty === null) {
      let template = document.querySelector(".error-validation").cloneNode(true)

      template.textContent = msg

      let inputParent = input.parentNode

      template.classList.remove("template")

      inputParent.appendChild(template)
    }
  }
  //verifica se o input é requerido
  required(input) {
    let inputValue = input.value

    if (inputValue === "") {
      let errorMessage = `O campo usuário e senha é obrigatório`

      this.printMessage(input, errorMessage)
    }
  }

  //remove todas as validações para fazer a checagem novamente
  cleanValidations(validations) {
    validations.forEach((el) => el.remove())
  }
}

let form = document.getElementById("login-form")
let submit = document.getElementById("enterLogin")

let validator = new Validator()

//dispara as validações
submit.addEventListener("click", function (e) {
  e.preventDefault()
  console.log("Funcionou o click")

  validator.validate(form)
})
