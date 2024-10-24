class TabulatorComponent extends ViewComponent {

    template = `
        <div>
            <section class="tabulator-table-menu-container">
                <div (click)="myEvent()">Menu 1</div>
            </section>
            <div>
                <div id="@dynCmpGeneratedId"></div>
            </div>

            <style>
                .tabulator-paginator{
                    display: flex;
                    align-items: center;
                    justify-content: right;
                }

                .tabulator-page-size{
                    width: 65px;
                }
            </style>

        </div>
    `;

    table = Prop;
    tableHeader = Prop;
    dataSource;
    firstLoad = false;
    /** @type { Array<{ pos, icon }> } */
    deleteColMetadata = Prop;
    /** @type { Array<{ pos, icon }> } */
    editColMetadata = Prop;
    paginate = Prop(false);
    pageSizeSelector = Prop(null);
    pageSize = Prop(null);

    async load() {

        const fields = JSON.parse(this.tableHeader);
        this.parseDeleteRowColumn(fields);
        this.parseEditRowColumn(fields);

        let dataSource = [{}];
        this.table = new Tabulator(`#${this.dynCmpGeneratedId}`, {
            layout: "fitColumns",
            reactiveData: true, //turn on data reactivity
            data: dataSource, //load data into table,
            movableColumns: true,
            columns: fields,
            ...this.#getPaginationSetting()
        });

        setTimeout(() => {
            if (this.paginate) this.table.setLocale('pt-pt');
        })
        this.#handleClickEvent();
        this.#handleDataSourceChange();

    }

    #getPaginationSetting() {
        if (this.paginate) {
            const paginationSizeSelector = this.pageSizeSelector
                ? this.pageSizeSelector
                : [10, 20];
            const paginationSize = this.pageSize
                ? this.pageSize
                : paginationSizeSelector[0];
            return {
                pagination: 'local',
                paginationCounter: 'rows',
                paginationSizeSelector,
                paginationSize,
                locale: true,
                ...this.#paginationLabels(),
            }
        }
        return {};
    }

    #paginationLabels() {
        return {
            langs: {
                "pt-pt": {
                    "pagination": {
                        first: "Primeira", //text for the first page button
                        first_title: "Primeira Página", //tooltip text for the first page button
                        last: "Última",
                        last_title: "Última Página",
                        prev: "Anterior",
                        prev_title: "Página Anterior",
                        next: "Próxima",
                        next_title: "Próxima  Página",
                        all: "Tudo",
                        page_size: "Total registos",
                        counter: {
                            "showing": "Vendo",
                            "of": "de",
                            "rows": "registos",
                            "pages": "páginas",
                        }
                    },
                }
            }
        }
    }

    #handleClickEvent() {
        this.table.on('cellClick', (e, cell) => {

            const clickedCol = cell.getField();
            const rowData = cell.getData();

            if (clickedCol == 'tabulatorEditColumn') {
                return this.onEditColumn(clickedCol, rowData);
            }

            if (clickedCol == 'tabulatorDelColumn') {
                return this.onDeleteRow(clickedCol, rowData);
            }

            const clickedRow = cell.getRow()._row.position;
            this.onCellClick(clickedRow, clickedCol, rowData);

        });
    }

    #handleDataSourceChange() {
        const table = this.table;
        this.dataSource.onChange((value) => table.setData(value));
    }

    clearTable() {
        alert(`Clearing table data`);
    }

    parseDeleteRowColumn(fieldList) {

        this.deleteColMetadata = [];
        const deleteCol = fieldList.filter((r, pos) => {
            if (r.deleteRow) {
                this.deleteColMetadata.push({
                    pos, icon: fieldList[pos].icon
                })
                return r.deleteRow;
            }
        });

        if (deleteCol.length == 1) {
            const colOptions = this.deleteColMetadata[0];
            const formatter = () => colOptions.icon;
            fieldList[colOptions.pos] = {
                ...fieldList[colOptions.pos], formatter,
                field: "tabulatorDelColumn"
            };
        }

        return this;

    }

    parseEditRowColumn(fieldList) {

        this.editColMetadata = [];
        const editCol = fieldList.filter((r, pos) => {
            if (r.editRow) {
                this.editColMetadata.push({
                    pos, icon: fieldList[pos].icon
                })
                return r.editRow;
            }
        });

        if (editCol.length == 1) {
            const colOptions = this.editColMetadata[0];
            const formatter = () => colOptions.icon;
            fieldList[colOptions.pos] = {
                ...fieldList[colOptions.pos], formatter,
                field: "tabulatorEditColumn"
            };
        }

        return this;

    }

    /**
     * Method signature for parent to call as event
     * @type {{componentEvent: true}} 
     * @returns { boolean } 
     * */
    onEditColumn(fieldName, data) { }

    /**
     * Method signature for parent to call as event
     * @type {{componentEvent: true}} 
     * @returns { boolean } 
     * */
    onDeleteRow(fieldName, data) { }

    /**
     * Method signature for parent to call as event
     * @type {{componentEvent: true}} 
     * @returns { boolean } 
     * */
    onCellClick(col, row, data) { }

}