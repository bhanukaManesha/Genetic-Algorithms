class Word {

    private target_word:string;
    private word_fitness:number;
    private word:Array<String> = []
    private normalize_fitness:number;
    

    constructor(target_word:string,initial_word:string){
        
        this.target_word = target_word;
        this.word_fitness = 0;
        this.normalize_fitness = 0;

        for (let i = 0; i < initial_word.length; i++) { 
                this.word.push(initial_word[i])
            }
    }


    calculateWordFitness(){

         for (let i = 0; i < this.target_word.length; i++) { 
            for (let j = 0; j < this.target_word.length; j++) { 
                if (this.target_word[i] === this.word[j]) {
                    this.word_fitness+=1
                }else{
                    this.word_fitness+=0.05
                }
            }
        }

        for (let i = 0; i < this.target_word.length; i++) { 
            if (this.target_word[i] === this.word[i]){
                this.word_fitness+=10
            }
        }



        
        // console.log(this.word_fitness)
    }

    getFitness(){
        return this.word_fitness;
    }

    setNormalizedFitness(normal:number){
        this.normalize_fitness = normal;
    }

    getNormalizedFitness(){
        return this.normalize_fitness;
    }

    getLength(){
        return this.word.length;
    }

    getWord() {
        return this.word
    }
    
}