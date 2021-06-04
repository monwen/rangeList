class RangeList {
    constructor(range){
        this.range = [];
        if(Array.isArray(range)){
          
            this.range.push([range[0], range[1]]);
            console.log("range created.");
        }
        else if(range == null){
            this.range = [];
            console.log("empty range created.");
        }
        else{
            console.log("please input an array as a parameter.");
        }
        F
    }

    add(range){
        //Check if the input is an array
        if(!Array.isArray(range)){
            console.log("please input an array as a parameter.");
            return;
        }

        let overlap = false;

        //check for overlapping
        for(let i=0; i< this.range.length; i++){
            
            //checking 3 types of overlapping: left-overlapping or right-overlapping or both side overlapping

            if((range[0] >= this.range[i][0] && range[0] <=this.range[i][1]) || (range[1] >= this.range[i][0] && range[1] <=this.range[i][1])){
                overlap = true;              
                break;
            }
        }
        //checking outside overlapping
        if(range[0]< this.range[0][0] && range[1] > this.range[this.range.length-1][1]){
            overlap = true;
        }

        if(overlap == false){
            //case 1: insert new range before the rangelist
            if(range[1] < this.range[0][0]){
                this.range.unshift(range);
                console.log('case 1');
                return;
            }

             //case 2: insert new range after the rangelist
             if(range[0] > this.range[this.range.length-1][1]){
                this.range.push(range);
                console.log('case 2');
                return;
            }

            //case 3: insert new range in the rangelist
            let pre = null;
            let current = null;
            for(let i =0; i < this.range.length; i++){
                current = this.range[i];
                if(pre != null){
                    if(range[0] > pre[1] && range[1] < current[0]){
                        this.range.splice(i, 0, range);
                        console.log('case 3');
                        return;
                    }
                }
                pre = current;
                
            }
           
        }

        if(overlap == true){
            let innerOverlap = false;
            let leftOverlap = false;
            let rightOverlap = false;
            let leftIndex = null;
            let rightIndex = null;
            let current;
            for(let i=0; i< this.range.length; i++){
                current = this.range[i];
                if(leftOverlap == true && rightOverlap == true){
                    innerOverlap = true;
                    break;
                }

                if(range[0] >= current[0] && range[0] <= current[1]){
                    leftOverlap = true;
                    leftIndex = i;
                }
                if(range[1] >= current[0] && range[1] <= current[1]){
                    rightOverlap = true;
                    rightIndex = i;
                }
            }

            // case 4: both side overlap
            if(innerOverlap == true){
                let newRange = [this.range[leftIndex][0], this.range[rightIndex][1]];
                this.range.splice(leftIndex, 1+ rightIndex- leftIndex, newRange);
                console.log('case 4');
                return;
            }
            if(leftOverlap == true && rightOverlap == false ){
                //case 5: left side overlap, right side out of bound
                if(range[1] > this.range[this.range.length-1][1]){
                    let newRange = [this.range[leftIndex][0], range[1]];
                    this.range.splice(leftIndex, 2+ this.range.length-1-leftIndex, newRange);
                    console.log('case 5');
                    return;
                }else{
                    //case 6: left side overlap, right side hanging
                    this.range[leftIndex][1] = range[1];
                    console.log('case 6');
                    return;
                }
            }
            if(leftOverlap == false && rightOverlap == true){
                //case 7: right side overlap, left side out of bound
                if(range[0] < this.range[0][0]){
                    let newRange = [range[0], this.range[rightIndex][1]];
                    this.range.splice(0, 2+ rightIndex, newRange);
                    console.log('case 7');
                    return;
                }else{
                    //case 8: right side overlap, left side hanging
                    this.range[rightIndex][0] = range[0];
                    console.log('case 8');
                    return;
                }
            }
            //case 9: both side out of bound
            if(leftOverlap == false && rightOverlap == false){
                this.range = [range];
                console.log('case 9');
                return;
            }


        }
    
    };


    remove(range){
        if(!Array.isArray(range)){
            console.log("please input an array as a parameter.");
            return;
        }
        // case 10: range[0] == range[1]
        if(range[0] == range[1]){
            console.log('case 10');
            return;
        }
        let leftOverlap = false;
        let rightOverlap = false;
        let bothOverlap = false;
        let innerOverlap = false;

        let leftIndex = null;
        let rightIndex = null;
        let innerIndex = null;
        let current;
      
        for(let i=0; i< this.range.length; i++){
            current = this.range[i];
           
            if(range[0] > current[0] && range[0] < current[1] ){
                leftOverlap = true;
                leftIndex = i;
            }
            if(range[1] > current[0] && range[1] < current[1]){
                rightOverlap = true;
                rightIndex = i;
            }
            
            if(range[0] > current[0]  && range[1] < current[1] ){
                innerOverlap = true;
                innerIndex = i;
                break;
            }

            if(leftOverlap == true && rightOverlap == true){
                bothOverlap = true;
                break;
            }


        }
       
        //case 11: inner set
        if(innerOverlap == true){
            console.log('case 11');
            let newRange = [range[1],this.range[innerIndex][1]];
            this.range[innerIndex][1] = range[0];
            this.range.splice(innerIndex+1, 0, newRange);
            return;
        }
        //case 12: both overlap
        else if(bothOverlap == true){
            console.log('case 12');
            this.range[leftIndex][1] = range[0];
            this.range[rightIndex][0] = range[1];
            this.range.splice(leftIndex+1, rightIndex-leftIndex-1);
            return;
        }
        //case 13: left overlap
        else if(leftOverlap == true && rightOverlap == false){
            console.log('case 13');
            this.range[leftIndex][1] = range[0];
            return;
        }

        //case 14: right overlap
        else if(rightOverlap == true && leftOverlap == false){
            console.log('case 14');
            this.range[rightIndex][0] = range[1];
            return;
        }
        
    };

    print(){
       let s = "";
       for(let r of this.range){
           s +=" [" + r[0] +", " + r[1] + ") ";
       }
      console.log(s);
    }
}

let rangeList = new RangeList([1,5]);

// //case 1 test: insert before
rangeList.add(([-3, -2]));
rangeList.print();
// //case 2 test: insert after
rangeList.add([10,20]);
rangeList.print();

//case 3 test: insert middle
rangeList.add([6,8]);
rangeList.print();
// // //case 4 test both side overlap
rangeList.add([4,7]);
rangeList.print();
//case 5 test  left side overlap, right side out of bound
rangeList.add([7,21]);
rangeList.print();
//case 6 test left side overlap, right side hanging
rangeList.add([-2, 0]);
rangeList.print();
//case 7: right side overlap, left side out of bound
rangeList.add([-5,8]);
rangeList.print();
//case 8: right side overlap, left side hanging
rangeList.add([-10,-7]);
rangeList.print();
rangeList.add([-6,-5]);
rangeList.print();
 //case 9: both side out of bound
 rangeList.add([-20,30]);
 rangeList.print();
 //case 10: both side out of bound
 rangeList.remove([25,25]);
 rangeList.print();
//case 11: inner set
rangeList.remove([10, 20]);
rangeList.print();
//case 12: both overlap
rangeList.add([11,15]);
rangeList.print();
rangeList.remove([0, 24]);
rangeList.print();
//case 13: left overlap
rangeList.remove([-3, 5]);
rangeList.print();
//case 14: right overlap
rangeList.remove([13, 25]);
rangeList.print();
