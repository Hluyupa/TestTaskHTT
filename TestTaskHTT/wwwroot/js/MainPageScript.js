CreateJoinedTable();
CreateDynamicList();
async function CreateJoinedTable() {
    
    let responce = await fetch("/MainPage/GetProductsCategories", {
        method: 'GET',
        headers: {
                accept:'application/json'
            },
        });
    let jsonResult = await responce.json();
   
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    const titleRow = document.createElement("tr");

    const titleCell1 = document.createElement("td");
    const titleCellText1 = document.createTextNode("Товар");
    titleCell1.appendChild(titleCellText1);
    titleRow.appendChild(titleCell1);

    const titleCell2 = document.createElement("td");
    const titleCellText2 = document.createTextNode("Категория");
    titleCell2.appendChild(titleCellText2);
    titleRow.appendChild(titleCell2);

    tableBody.appendChild(titleRow);

    for (var i = 0; i < jsonResult.length; i++) {
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        const cellText1 = document.createTextNode(jsonResult[i].productName);
        cell1.appendChild(cellText1);
        row.appendChild(cell1);

        const cell2 = document.createElement("td");
        const cellText2 = document.createTextNode(jsonResult[i].categoryName);
        cell2.appendChild(cellText2);
        row.appendChild(cell2);

        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    document.getElementsByClassName("variant1")[0].appendChild(table);
    
}

async function CreateDynamicList() {
    let responce = await fetch("/MainPage/GetCategories", {
        method: 'GET',
        headers: {
            accept: 'application/json'
        },
    });
    let categories = await responce.json();
    //let variant2div = document.getElementsByClassName("variant2")[0];
    console.log(categories);
    for (var i = 0; i < categories.length; i++) {
        const blockList = document.createElement('div');
        blockList.innerHTML = categories[i].name;
        blockList.id = categories[i].categoryId;
        blockList.addEventListener('click', async (e) => {
            
            let responceProducts = await fetch("/MainPage/GetProductsOfCategory/" + e.target.id, {
                method: 'GET',
                headers: {
                    accept: 'application/json'
                },
            });
            let products = await responceProducts.json();
            const list = document.createElement("ul")
            for (var i = 0; i < products.length; i++) {
                const listElement = document.createElement("li");
                listElement.innerHTML = products[i].name;
                list.appendChild(listElement);
            }
            blockList.appendChild(list);
        });
        document.getElementsByClassName("variant2")[0].appendChild(blockList);
    }
}
