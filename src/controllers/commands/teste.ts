var produtos = [
  { id: 1, nome: "bhama" },
  { id : 2, nome: "skol"}
]

let index = produtos.indexOf(produtos.find(p => p.id === 1))
produtos.splice(index, 1)
console.log(produtos)