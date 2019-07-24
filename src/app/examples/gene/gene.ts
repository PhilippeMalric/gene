import { Observable, of } from "rxjs";

export class Gene{

  id:string;
  type:string;
  desc:string;
  summary:string;
  wordCount:Object;

  gene$:Observable<Gene>
  wordArray: any[];

banWordDict = { "a":1,"of":1,"the":1,"is":1,"by":1,"in":1,"or":1,"to":1,"which":1,"and":1,"are":1,"has":1,"as":1}

  constructor(id, type, desc, summary){

    this.id = id
    this.desc = desc
    this.type = type
    this.summary = summary
    this.wordCount = {}
    let wordList = this.summary.split(" ");
    this.gene$ = of(this)

    var letterRE = new RegExp('(\\w+)')

    for(let wordNotTrim of wordList){
      let word = letterRE.exec(wordNotTrim)[1]
if(! (word.toLowerCase() in this.banWordDict)){
      if(word in this.wordCount){
        this.wordCount[word] += 1
      }
      else{
        this.wordCount[word] = 1
      }
    }
    }

    this.wordArray = []



Object.keys(this.wordCount).map(

(k)=>{
  this.wordArray.push({word:k,value:this.wordCount[k]})

}


)

this.wordArray.sort((a,b)=>{
  return b.value - a.value
})
}

  printToConsole = ()=>{
    console.log(this.id,this.desc,this.type)
    console.log(this.summary)
  }

processWord(word){


let wordMod = ""

return wordMod;

}


  }
