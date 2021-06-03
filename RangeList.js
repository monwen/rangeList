class RangeList {


    constructor(range){
        this.range = [];
        if(Array.isArray(range)){
            // for(let i = range[0]; i < range[1]; i++){
            //     console.log(i);
            //     this.range.push(i)
            // }

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
        
    }

    add(range){
        //Check if the input is an array
        if(Array.isArray(range)){

            let min = this.range[0][0];
            let max = this.range[this.range.length-1][1];
            let endElement = this.range[this.range.length-1];

            //case 1
            if(range[0] > max){
                this.range.push(range);
                console.log('case 1');
                return;
            }

            //case 2
            if(range[1] < min){
               this.range.unshift(range);  
               console.log('case 2');
                return;

            }

            let last  = null;

            for(let i = 0 ; i < this.range.length; i++){
                let element = this.range[i];
                if(last != null){
                    //case 3
                    if(range[0] >= element[0] && range[0] <= element[1] && range[1] >= element[1]){
                        element[1] = range[1];
                        console.log('case 3');
                        return;
                    }
                    //case 4
                    if(range[0] <= last[1] && range[1] > last[1] && range[1] < element[0]){
                        last[1] = range[1];
                        console.log('case 4');
                        return;
                    }

                    //case 5
                    if(last[1] < range[0] && element[0] > range[1]){
                        this.range.splice(i,0,range);
                        console.log('case 5');
                        return;
                    }
                    //case 6
                    if(range[0] >= last[1]  &&range[0] < element[0] && range[1] <= element[1]){
                        this.range.splice(i-1, 2, [last[0], element[1]]);
                        console.log('case 6');
                        return;
                    }
                }

                    last = element
            }

            }
            else{
                console.log("please input an array as a parameter.");
        }
       
        };

    remove(range){

    };

    print(){
       console.log(this.range);
      
    }
}

let rangeList = new RangeList([1,5]);
rangeList.add([10,20]);
rangeList.add([20,20]);
rangeList.add([20,21]);
// rangeList.add([10,21]);
// rangeList.add([2,4]);
rangeList.add([6,7]);
rangeList.add([3,8]);
// rangeList.add([3,6]);

rangeList.print();

// console.log(Array(1000).keys());