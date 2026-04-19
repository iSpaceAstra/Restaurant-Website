const returnBtn = document.querySelector("#getback");
const sidebarMenus = document.querySelectorAll(".sidebarBtns")

const sidebar = [
    {
        id: "tables",
        html: "admin-panel-pages/tables.html"
    },
    {
        id: "arrangeproduct",
        html: "admin-panel-pages/arrangeproduct.html"
    },
    {
        id: "sharenew",
        html: "admin-panel-pages/sharenews.html"
    },
    {
        id: "support",
        html: "admin-panel-pages/support.html"
    },
    {
        id: "log",
        html: "admin-panel-pages/log.html"
    }
]

returnBtn.addEventListener("click", (e) => {
    e.preventDefault();
    returnMain("index.html")
})

sidebarMenus.forEach(bar => {
    bar.addEventListener("click", function (e) {
        e.preventDefault();
        const selectedId = this.id;
        sidebar.forEach(bar => {
            if (bar.id === selectedId) {
                loadPage(bar.html);
            }
        })
    })
})

function loadPage(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Dosya bulunamadı");
            return response.text();
        })
        .then(html => {
            document.querySelector("div.content").innerHTML = html;

            openTables();
            closeOverlay();
        })
        .catch(err => {
            console.log(err);
        })
}

function returnMain(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Dosya bulunamadı!");
            return response.text();
        })
        .then(html => {
            setTimeout(function () {
                document.querySelector("body").innerHTML = html;

            }, 2000);
        })
        .catch(err => {
            console.log(err);
        })
}

function closeOverlay() {
    const closeBtn = document.querySelector("#closeBtn");

    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const tablesOverlay = document.querySelector(".tables-overlay");

        tablesOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    })
}

function openTables() {
    const tables = document.querySelectorAll(".table");
    const tableTitle = document.querySelector("#table-title");
    const tablesOverlay = document.querySelector(".tables-overlay");

    tables.forEach(table => {
        table.addEventListener("click", (e) => {
            e.preventDefault()

            setTimeout(function () {
                tableTitle.textContent = table.id;

                tablesOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                
            });
        })
    })
}


