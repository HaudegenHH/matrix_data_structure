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
  randomize(){
    for(let i = 0; i < this.matrix.length; i++){
     for(let j = 0; j < this.matrix[i].length; j++){
      this.matrix[i][j] = Math.random() * 10 | 0
     }
    }  
  }
  transpose(){
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
}

(function test(){
	// adding a number to all the values in the matrix
  let m1 = new Matrix(2,3)
  m1.add(2)
  let success = m1.matrix[0][0] == 2
  if(success) console.table(m1.matrix)
  else console.log("adding test failed")
  
  console.log("_".repeat(30))
  
  // make a new Matrix 3x1 and add number 2 
  let m2 = new Matrix(3,1)  
  m2.add(2)
  console.table(m2.matrix)
  
  console.log("_".repeat(30))
  
  // multiply the number 2 to the first matrix
  m1.mult(2)
  console.table(m1.matrix)
  
  console.log("_".repeat(30))
  
  // multiply both matrices
  let resMatrix = m1.mult(m2)
  let a = m1.matrix
  let b = m2.matrix
  let sumFirstRow = a[0][0] * b[0][0] + a[0][1] * b[1][0] + a[0][2] * b[2][0]
  if(resMatrix[0][0] == sumFirstRow) console.log("multiplying test succeed")
  else console.log("multiplying test failed")
  
  console.log("_".repeat(30))
  
  // randomize values
  let m3 = new Matrix(2,3)
  m3.randomize()
  
  // test if firstElement is different from the others
  let firstElement = m3.matrix[0][0]  
  let c = 0
  m3.matrix.forEach(row => {
  	let isDiff = row.some(val => val != firstElement)
    if(isDiff) c++
  })
  console.log((c ? 'randomized' : 'not different'))
  console.table(m3.matrix)
  
  console.log("_".repeat(30))
  
  
  // transpose from 2x3 to a 3x2 matrix
  /*
		 [ [ a, b, c ],
       [ d, e, f ] ]
  => 
     [ [a, d],
 		   [b, e],
       [c, f] ]
  */
  
  console.table(m3.matrix)
  // storing the 2nd Element of first Row in a temp variable
  let secEfirstR = m3.matrix[0][1]
  // storing the col length
  let colLen = m3.matrix[0].length
  
  let transposed = m3.transpose()
  console.table(transposed)  
  // testing transposed matrix
  let errors = []
  if(transposed.length != colLen) errors.push('num of rows should match num of cols in original matrix')
  if(secEfirstR != transposed[1][0]) errors.push('[0][1] of first matrix should match [1][0] of the 2nd')
  if(errors.length) errors.forEach(error => console.log(error))  
  
  
})()
