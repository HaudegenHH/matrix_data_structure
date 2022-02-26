const canvas = document.querySelector('canvas')
const ctx    = canvas.getContext('2d')

canvas.width = 500
canvas.height = 500

const WIDTH = canvas.width
const HEIGHT = canvas.height

let points = [
  [[-50], [-50], [-50]],
  [[ 50], [-50], [-50]],
  [[ 50], [ 50], [-50]],
  [[-50], [ 50], [-50]],
  [[-50], [-50], [ 50]],
  [[ 50], [-50], [ 50]],
  [[ 50], [ 50], [ 50]],
  [[-50], [ 50], [ 50]],  
]


function genMatrix(rows,cols){
  let matrix = []
  for(let i = 0; i < rows; i++){
    matrix[i] = []
    for(let j = 0; j < cols; j++){
      matrix[i][j] = 0
    }
  }
  return matrix
}


function mult(a, b){
    if(a[0].length != b.length) {
      console.log("the cols of a must match the rows of b")
      return null
    } else {
    let rowsA = a.length
    let colsA = a[0].length
    let colsB = b[0].length
   
    let res = genMatrix(rowsA, colsB)

    for(let i = 0; i < rowsA; i++) {      
      for(let j = 0; j < colsB; j++){
         let sum = 0
         for(let k = 0; k < colsA; k++){           
           sum += a[i][k] * b[k][j] 
         }
         res[i][j] = sum
       }
     }
     return res
    }  
  }

function calc(angle, point){


 // https://en.wikipedia.org/wiki/Rotation_matrix
 // chapter: basic rotations

  let rotationZ = [
    [Math.cos(angle), -Math.sin(angle), 0],
    [Math.sin(angle), Math.cos(angle), 0],
    [ 0 , 0 , 1 ]
  ]
  let rotationX = [
    [ 1 , 0 , 0 ],
    [ 0, Math.cos(angle), -Math.sin(angle)],
    [ 0, Math.sin(angle), Math.cos(angle), 0],
  ]

  let rotationY = [
    [ Math.cos(angle), 0, -Math.sin(angle) ],
    [ 0 , 1 , 0 ],
    [ Math.sin(angle), 0, Math.cos(angle) ],
  ]
  
  const projection = [
    [1, 0, 0],
    [0, 1, 0]
  ]

  let rotatedX = mult(rotationX, point)
  let rotatedY = mult(rotationY, rotatedX)  
  //let rotatedZ = mult(rotationZ, rotatedY)  
  
  let proj2d  = mult(projection, rotatedY)
  
  return proj2d
}


let angle = 0
ctx.translate(WIDTH/2, HEIGHT/2)


function draw(){
  ctx.clearRect(-WIDTH,-HEIGHT, WIDTH*2, HEIGHT*2)      
  
  for(let v of points) {         
    let projected2d = calc(angle, v)

    ctx.beginPath()    
    ctx.arc(projected2d[0][0], projected2d[1][0], 5, 0, Math.PI * 2, false)
    ctx.stroke()  
    ctx.closePath()
  }
  angle += 0.05
  requestAnimationFrame(draw)
}

draw()
