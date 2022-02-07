class QueenAttack {
    constructor(x1, y1, x2, y2) {
        this.queen1 = {
            x: 0,
            y: 0
        }
        this.queen2 = {
            x: 0,
            y: 0
        }
        this.matrix = {
            x: 7,
            y: 7
        }
    }

    setQueen1(x, y) {
        this.queen1.x = x
        this.queen1.y = y
    }
    setQueen2(x, y) {
        this.queen2.x = x
        this.queen2.y = y
    }

    getQueens() {
        return [this.queen1, this.queen2]
    }

    checkHorizontal() {
        if (this.queen1.y === this.queen2.y) { return true }
        else { return false }
    }
    checkVertical() {
        if (this.queen1.x === this.queen2.x) { return true }
        else { return false }
    }
    checkDiagonal() {
        let x = this.queen1.x-1
        let y = this.queen1.y-1

/* -------------------------------------------------- check left top --------------------------------------------------------------- */
        console.log("left top")
        while (x >= 0 && y >= 0) {

            if (x === this.queen2.x && y === this.queen2.y) {
                console.log("here")
                return true
            }

            x -= 1
            y -= 1
        }

        x = this.queen1.x-1
        y = this.queen1.y+1
/* -------------------------------------------------- check left bottom --------------------------------------------------------------- */
        
        console.log("left bottom")
        while (x >= 0 && y <= this.matrix.y) {

            console.log(x, y)
            if (x === this.queen2.x && y === this.queen2.y) {
                return true
            }

            x -= 1
            y += 1
        }

        x = this.queen1.x+1
        y = this.queen1.y-1
/* -------------------------------------------------- check right top --------------------------------------------------------------- */
        
        console.log("right top")
        while (x <= this.matrix.x && y >= 0) {

            console.log(x, y)
            if (x === this.queen2.x && y === this.queen2.y) {
                return true
            }

            x += 1
            y -= 1
        }

        x = this.queen1.x + 1
        y = this.queen1.y + 1
/* -------------------------------------------------- check right bottom --------------------------------------------------------------- */
        
        console.log("right bottom")
        while (x <= this.matrix.x && y <= this.matrix.y) {
            console.log(x, y)
            if (x === this.queen2.x && y === this.queen2.y) {
                return true
            }
            x += 1
            y += 1
        }

        return false
    }

    canAttack() {
        return this.checkHorizontal() || this.checkVertical() || this.checkDiagonal()
    }
}

function getFormData() {
    let x1 = parseInt(document.getElementById('q-1-x').value)
    let y1 = parseInt(document.getElementById('q-1-y').value)
    let x2 = parseInt(document.getElementById('q-2-x').value)
    let y2 = parseInt(document.getElementById('q-2-y').value)
    return [x1, y1, x2, y2]
}

function submitQ2() {
    let arr = getFormData()
    let qa = new QueenAttack()
    qa.setQueen1(arr[0], arr[1])
    qa.setQueen2(arr[2], arr[3])
    console.log(qa.getQueens())
    console.log(qa.canAttack())
    let res = document.getElementById('attack-result')
    res.innerHTML = qa.canAttack()
}