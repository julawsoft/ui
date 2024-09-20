
const dataSource = [''];

const dd = "" +
    "${"+
        "\nthis.dataSource.map((rec) => "+
            `<tr>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>2011/04/25</td>
                <td>$320,800</td>
            </tr>`+
        ")" +
    "}";


const dd1 = "" +
    "<still-scope>"+
    "${"+
        "\nthis.dataSource.map((rec) => "+
            `<tr>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>2011/04/25</td>
                <td>$320,800</td>
            </tr>`+
        ")" +
    "}"+
    "\n"+
    "</still-scope>";

//console.log(dd1);
//console.log('this is dataSource');
const re = /\$\{[\s{0,}\r{0,}\t{0,}](\w){0,}/g;
const re1 = /\$\{[\s{0,}\r{0,}\t{0,}](this){1}(\.)/g;
//console.log(dd.search(re1));
//console.log(dd.replaceAll(re1,'-'));
//console.log(dd1.replaceAll(/still-scope/g,'script').replaceAll(re,'depois'));

const searchScriptInit = /still-scope\>[\${0,}][\{{0,}]/g;
const searchScriptEnd = /\}{0,}\}{0,}[\s{0,}]\<\/still-scope/g;

console.log(dd1
            .replaceAll(searchScriptInit,'script>')
            .replaceAll(searchScriptEnd,'<script')
            );