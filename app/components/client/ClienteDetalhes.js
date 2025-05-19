class ClienteDetalhes extends ViewComponent {

  id;
  denominacao;
  tipoCliente;
  nif;
  pessoaContacto;
  contacto;
  email;
  endereco;
  createdAt;

  /** @Prop */
  isEmptyDataProcesso = true;

  /** @Prop */
  isNotEmptyDataProcesso = false;

  /** @Prop */
  isNotEmptyDataFactura = false;

  /** @Prop */
  isEmptyDataFactura = true;



  /** @Proxy @type { TabulatorComponent } */
  dataTableListProcessos = Proxy;

  /** @Prop */
  dataTableProcessosLabels = [
    { title: "Estado", field: "estado", sorter: "string", width: 100 },
    { title: "Referência", field: "ref", sorter: "string" },
    { title: "Assunto", field: "assunto", sorter: "string" },
    { title: "Área", field: "area", sorter: "string" },
    { title: "Instituição", field: "instituicao", sorter: "string" },
    { title: "Modo Facturação", field: "modo_facturacao", sorter: "string" },
    { title: "Gestor", field: "gestor", sorter: "string" },
    { title: "Data Cadastro", field: "data_registo", sorter: "string" },
    {
      title: "Data Encerramento",
      field: "data_encerramento",
      sorter: "string"
    }
  ]

  /** @Proxy @type { TabulatorComponent } */
  dataTableListFacturas = Proxy;

  /** @Prop */
  dataTableFacturasLabels = [
    {
      hozAlign: "center",
      editRow: false,
      icon: "<i class='fas fa-list-alt'></i>",
      width: 20,
    },
    {
      hozAlign: "center",
      deleteRow: false,
      icon: "<i class='fas fa-money-check-alt'></i>",
      width: 20,
    },
    { title: "Estado", field: "status", sorter: "string", width: 100 },
    { title: "Referência", field: "ref", sorter: "string" },
    { title: "Assunto", field: "assunto", sorter: "string" },
    { title: "Horas", field: "horas", sorter: "string" },
    { title: "Custo", field: "custo", sorter: "string" },
    { title: "Advogado", field: "colaborador", sorter: "string" },
    { title: "Data Emissão", field: "data_registo_factura", sorter: "string" }
  ]

  /** @Proxy @type { ModalDetalhesFactura } */
  modalDetalhesFacturaProxy;

  /** @Proxy @type { ModalPagamento } */
  modalPagamentoProxy;

  /** @Proxy @type { ModalListPagamentos } */
  modalListPagamentosProxy;

  /** @Prop */
  showModalDetalhesFactura = false;
  /** @Prop */
  showModalPagamento = false;
  /** @Prop */
  showModalListPagamentos = false;
  /** @Prop */
  showModal = false;

  /**
  * @Inject
  * @type { ClienteService }  
  */
  clienteService;

  template = `
  <section class="content p-4">
      <div class="container-fluid">
      
      <!-- <div class="still-popup-curtain" (showIf)="self.showFactura"></div>-->
      <div class="d-flex flex-end">
        <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Library</li>
          </ol>
        </nav>  
      </div>


      


      </div>
  </section>
  `;

  constructor() {
    super();
    this.setup({});
  }

  detalhesProcesso(row, col, record) {

    const userLogged = JSON.parse(localStorage.getItem("_user"));
    // se for cliente não veja os detalhes do Processo!
    // if(userLogged.funcao != "cliente") {
    if (userLogged.auth.roles.includes('CAN_SEE_PROCESS_DETAILS')) {
      Router.goto("ProcessoDetalhes", {
        data: record.id,
      });
    } else {
      console.log("sem permissao para ver detalhes do Processo ")
    }
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  stAfterInit(val) {
    this.getProcessosCliente(this.id.value)
    this.getFacturasCliente(this.id.value)
  }

  async onRender() {
    const routeData = Router.data("ClienteDetalhes");

    try {
      if (routeData) {
        this.getDetalhesCliente(routeData)
        this.id = routeData
      }
    } catch (e) {
      console.log("onRender Cliente Detalhes >>>  >>>  ", e);
    } finally {
      AppTemplate.hideLoading();
    }
  }

  async getDetalhesCliente(idCliente) {

    this.clienteService.on('load', async () => {

      let response = await this.clienteService.getDetalhesCliente(idCliente)

      if (response) {

        this.id = response.id;
        this.denominacao = response.denominacao;
        this.nif = response.nif;
        this.endereco = response.endereco;
        this.pessoaContacto = response.pessoa_contacto;
        this.contacto = response.contacto_cobranca;
        this.tipoCliente = response.tipo.description;
        this.email = response.e_mail;
        this.createdAt = new Date(response.created_at)
          .toLocaleString("PT")
          .substring(0, 10);
      }

    })


  }

  getProcessosCliente(idCliente) {

    $still.HTTPClient.get(
      `/api/v1/cliente_processos/${idCliente}`
    ).then((r) => {
      let dataResponse = r.data;
      if (dataResponse) {
        this.isEmptyDataProcesso = false
        this.isNotEmptyDataProcesso = true
        this.dataTableListProcessos.dataSource = dataResponse
      }
    });
  }

  getFacturasCliente(idCliente) {
    $still.HTTPClient.get(
      `/api/v1/cliente_facturas/${idCliente}`
    ).then((r) => {
      let dataResponse = r.data;
      if (dataResponse) {
        console.log("As facturas do cliente", dataResponse)
        this.isNotEmptyDataFactura = true;
        this.isEmptyDataFactura = false;
        this.dataTableListFacturas.dataSource = dataResponse;
      }
    });
  }


  detalhessFacturaCliente(_, record) {

    this.modalDetalhesFacturaProxy.idFactura = record.id
    this.modalDetalhesFacturaProxy.itensFactura = record.items

    this.showModal = true;
    document.getElementById('idShowModalDetalhesFactura').style.display = "block"

  }

  detalhessPagamentosFacturaCliente(_, record) {

    console.log("detalhes pagamentos ", _, record)

    this.modalListPagamentosProxy.idFactura = record.id
    this.modalListPagamentosProxy.estado = record.estado
    this.modalListPagamentosProxy.ref = record.ref
    this.modalListPagamentosProxy.horas = record.horas
    this.modalListPagamentosProxy.custo = record.custo
    this.modalListPagamentosProxy.dataRegisto = record.created_at

    this.showModal = true;

    this.modalListPagamentosProxy.listPagamentos = record.pagamentos
    document.getElementById('idShowModalPagamentosFactura').style.display = "block"

  }


  callModalPagamento(row, col, record) {

    this.modalPagamentoProxy.idFactura = record.id
    this.modalPagamentoProxy.ref = record.ref
    this.modalPagamentoProxy.valor = record.custo
    this.showModal = true;

    document.getElementById('idShowModalPagamento').style.display = "block"

  }


  fecharModalPagamento(row, col, record) {
    this.showModal = false;
    document.getElementById('idShowModalPagamento').style.display = "none"
  }

  fecharModalDetalhesFactura(row, col, record) {
    this.showModal = false;
    document.getElementById('idShowModalDetalhesFactura').style.display = "none"
  }

  fecharModalPagamentosFactura(row, col, record) {
    this.showModal = false;
    document.getElementById('idShowModalPagamentosFactura').style.display = "none"
  }

}
