document.addEventListener("DOMContentLoaded", event =>{});

// sort the database
function queryGet(){
    const db = firebase.firestore();
    const productsRef = db.collection('product')
    const query = productsRef.orderBy('cost','desc')
    query.get()
         .then(product =>{
             product.forEach(doc =>{
                 data = doc.data()
                 document.write(`${data.name} at $${data.cost} <br>`)
             })
         })
}

function queryGetAsc(){
    const db = firebase.firestore();
    const productsRef = db.collection('product')
    const query = productsRef.orderBy('cost','asc')
    query.get()
         .then(product =>{
             product.forEach(doc =>{
                 data = doc.data()
                 document.write(`${data.name} at $${data.cost} <br>`)
             })
         })
}

function add(){
    document.getElementById('output').innerHTML = 'Hello world'
}

function addData(){
    var inputVal1 = document.getElementById("input1").value // get name of the product
    var inputVal2 = parseFloat(document.getElementById("input2").value) // get price of the product
    const db = firebase.firestore();
    const productsRef = db.collection('product')
    productsRef.add({
        name: inputVal1,
        cost: inputVal2
    })
    
    document.getElementById('output').innerHTML = `add item ${inputVal1}`
    input1.value = "";
    input2.value = "";
}

function deleteData(){
    var inputVal1 = document.getElementById("input1").value
    const db = firebase.firestore()
    // search for the document
    db.collection("product")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            data = doc.data()
            if (inputVal1 === data.name){
                db.collection('product').doc(doc.id).delete()
                document.getElementById('output').innerHTML = `delete item ${inputVal1}` 
                input1.value = "";
            }
        })
    })
}

function changeData(){
    var inputVal1 = document.getElementById("input1").value
    var inputVal2 = parseFloat(document.getElementById("input2").value)
    const db = firebase.firestore();
    db.collection("product")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            data = doc.data()

            if (inputVal1 === data.name){
                db.collection('product').doc(doc.id).update({
                    cost: inputVal2
                })
                document.getElementById('output').innerHTML = `update value ${inputVal1} to $${inputVal2}`
                input1.value = "";
                input2.value = "";
            }
        })
    })
}