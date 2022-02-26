class Matrix {
  constructor(rows, cols){    
    this.matrix = []
    for(let i = 0; i < rows; i++){
      this.matrix[i] = []
      for(let j = 0; j < cols; j++){
        this.matrix[i][j] = 0
      }
    }
  }
  add(n){
    for(let i = 0; i < this.matrix.length; i++){
      for(let j = 0; j < this.matrix[i].length; j++){
        this.matrix[i][j] += n
      }
    }
  }
  mult(n){
    // matrix multiplication
    if(n instanceof Matrix){
       if(n.matrix.length != this.matrix[0].length){
          console.log("the cols of a must match the rows of b")
          return null
        } else {
          let a = this.matrix
          let b = n.matrix
          let rowsA = a.length
          let colsA = a[0].length
          let colsB = b[0].length
          let res = new Matrix(rowsA, colsB)
          for(let i = 0; i < rowsA; i++){
            for(let j = 0; j < colsB; j++){
              let sum = 0
              for(let k = 0; k < colsA; k++){
                sum += a[i][k] * b[k][j] 
              }
              res.matrix[i][j] = sum
            }
          }
          return res.matrix
        }
    } else {
      // ..else n is a number/scalar that scales the values elementwise
      for(let i = 0; i < this.matrix.length; i++){
        for(let j = 0; j < this.matrix[i].length; j++){
          this.matrix[i][j] *= n
        }
      }
    }
  }
  static multiply(a, b){
    if(a.matrix[0].length != b.matrix.length) {
      console.log("the cols of a must match the rows of b")
      return null
    } else {
    let rowsA = a.matrix.length
    let colsA = a.matrix[0].length
    let colsB = b.matrix[0].length
   
    let res = new Matrix(rowsA, colsB)

    for(let i = 0; i < rowsA; i++) {      
      for(let j = 0; j < colsB; j++){
         let sum = 0
         for(let k = 0; k < colsA; k++){
           sum += a.matrix[i][k] * b.matrix[k][j] 
         }
         res.matrix[i][j] = sum
       }
     }
     return res
    }  
  }

  randomize(){
    for(let i = 0; i < this.matrix.length; i++){
     for(let j = 0; j < this.matrix[i].length; j++){
      this.matrix[i][j] = Math.random() * 10 | 0
     }
    }  
  }
  transpose() {
    let rows = this.matrix.length
    let cols = this.matrix[0].length
    let res = new Matrix(cols, rows)
    for(let i = 0; i < rows; i++) {
      for(let j = 0; j < cols; j++) {
        res.matrix[j][i] = this.matrix[i][j]
      }
    }
    return res.matrix
  }
  
  // receives a function as param
  map(fn) {
    // ...and applies it to every element of the matrix
    for(let i = 0; i < this.matrix.length; i++) {
      for(let j = 0; j < this.matrix[i].length; j++) {
        let value = this.matrix[i][j]
        this.matrix[i][j] = fn(value)  // fn(value, i, j)
      }
    }
  }

  print() {
    console.table(this.matrix)
  }
}




(function test(){

  let m1 = new Matrix(2,3)
  let m2 = new Matrix(3,2)
  m1.randomize()
  m2.randomize()
  m1.print()
  m2.print()
  let m3 = Matrix.multiply(m1, m2)
  m3.print()
  


  // test the "map" function:

  /*
  let m = new Matrix(2,3)
  m.add(2)

  function doubleIt(x){
    return x * 2
  }

  m.map(doubleIt)
  m.print()


  function doubleIt(x, i, j) {
    if(i > 0) return x * 2
  }
  // you kinda skip the 1st row in the matrix

  */

})()

