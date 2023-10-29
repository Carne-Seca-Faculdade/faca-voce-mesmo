import db from './firebaseConfig.js';

const productContactButton = document.querySelector("#productContactButton");
const closeContactModal = document.querySelector("#closeContactModal");
const contactModal = document.querySelector("#contactModal");

productContactButton.addEventListener("click", () => {
    contactModal.classList.remove("hidden");
});

closeContactModal.addEventListener("click", () => {
    contactModal.classList.add("hidden");
});

window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    contactModal.classList.add("hidden");
});

function openModal() {
    const modal = document.getElementById("editModal");
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("editModal");
    modal.style.display = "none";
}

// Função para buscar os IDs dos documentos na coleção "products"
function buscarIdsDosDocumentos() {
    db.collection("products")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const idDoDocumento = doc.id;

                const botaoEditar = document.createElement("button");
                botaoEditar.textContent = `Editar Anúncio ${idDoDocumento}`;
                botaoEditar.addEventListener("click", () => {
                    openModal();
                    const novoNomeProduto = document.getElementById('produtoNome').value; // Novo nome do produto
                    const novoPrecoProduto = document.getElementById('produtoPreco').value; // Novo preço do produto

                    const docRef = db.collection("products").doc(idDoDocumento);

                    // Atualização dos dados
                    docRef.update({
                        nome: novoNomeProduto,
                        preco: novoPrecoProduto
                        // ... outros campos a serem atualizados
                    })
                        .then(() => {
                            console.log("Anúncio atualizado com sucesso!");
                            // Adicione ações após a atualização bem-sucedida, se necessário
                        })
                        .catch((error) => {
                            console.error("Erro ao atualizar anúncio:", error);
                        });
                });

                document.body.appendChild(botaoEditar); // Adiciona os botões no corpo do documento
            });
        })
        .catch((error) => {
            console.log("Erro ao buscar os IDs dos documentos:", error);
        });
}

// Chama a função para buscar os IDs dos documentos na coleção "products"
buscarIdsDosDocumentos();
