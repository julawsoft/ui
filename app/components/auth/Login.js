import { ViewComponent } from "../../@still/component/super/ViewComponent.js";
import { Router } from "../../@still/routing/router.js";

export class Login extends ViewComponent {
    isPublic = true;

    username = null;
    password = null;

    template = `
    <div class="bg-dark vh-100 d-flex justify-content-center align-items-center">
  <div class="container container-fluid">
  <main class="form-signin w-50 m-auto text-center">
  <form onsubmit="javascript: return false;">
        <div class="text-center d-flex justify-content-center gap-2">
            <img src="assets/images/julaw-logo.png" style="width: 42px;" alt="" />
            <span style="color: #fff;  font-size: 2rem;">JULAW</span>
            </div>
            <h1 class="h3 mb-3 fw-normal mt-3 "style="color: #fff;">Faça o seu Login</h1>

    <div class="form-floating">
      <input 
      type="text" 
      name="u" 
      (value)="username"
      placeholder="Usuário" 
      required="required"
      class="form-control" 
      >
      <label for="floatingInput">Usuário</label>
    </div>
    <div class="form-floating">
      <input 
      type="password" 
      name="p"
      (value)="password"
      placeholder="Palavra-passe" 
      required="required"
      class="form-control mt-1" 
      >
      <label for="floatingPassword">Senha</label>
    </div>

    <div class="form-check text-start my-3">
        <div id="erroAuth" style="display:none; margin-top: 25px">
            <p style="color: red; text-align: center">Usuário e/ou palavra-passe, incorrectos</p>
        </div>
    </div>
    <button style="margin:0;" class="btn btn-primary w-100 py-2"
    (click)="logar()">Entrar</button>
    <p class="mt-5 mb-3 text-body-secondary">JuLaw&copy;2025</p>
  </form>
</main>
 </div>
</div>
   
    `;
    constructor() {
        super();
    }

    gotoRetrieve() {
        Router.goto("AuthBase");
    }

    logar() {

        AppTemplate.showLoading();

        const payload = {
            username: this.username.value,
            password: this.password.value,
        };

        if (this.isValidatedInputForm()) {
            $still.HTTPClient.post(
                "/api/v1/login",
                JSON.stringify(payload),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    if (response.status !== 200) {
                        document.getElementById('erroAuth').style.display = 'block'
                        AppTemplate.hideLoading();
                        //  Router.goto('init');
                    } else {
                        localStorage.setItem('_user', JSON.stringify(response.data));
                        localStorage.setItem('logged', true);
                        AppTemplate.get().store('logged', true);
                        AppTemplate.get().store('userName', response.data.nome_completo);
                        AppTemplate.get().store('persmissions', { canSeeGrid: false });
                        AppTemplate.get().setAuthN(true);

                        if (response.data.funcao == "cliente") {
                            Router.goto("ClienteDetalhes", {
                                data: response.data.id
                            });

                        } else {
                            Router.goto('ColaboradorDashboard');
                        }
                    }

                })
                .catch((err) => {
                    AppTemplate.hideLoading();
                    alert(err);
                });
        } else {
            // AppTemplate.toast({ status: 'error', message: 'usuário e/ou senha, devem ser preenchidos' })

            AppTemplate.hideLoading();
        }
    }

    isValidatedInputForm() {
        if (this.username.value == "" || this.password.value == "") return false;
        return true;
    }
}
