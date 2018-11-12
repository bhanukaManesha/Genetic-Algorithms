class Population {
  
    private population_array:Array<Word> = []
    private target_word:string;
    private pop_size:number;

    private mutation_rate:number;

    private mating_pool:Array<Word>;

    constructor(mutation_rate:number,pop_size:number,target_word:string){

        this.target_word = target_word;
        this.mating_pool = []
        this.pop_size = pop_size;

        this.mutation_rate = mutation_rate;
        //Create population array
        for (let i = 0; i < pop_size; i++) { 
            let initial_word = []
            for (let i = 0; i < target_word.length; i++) { 
                initial_word.push(this.newChar())
            }
            this.population_array.push(new Word(this.target_word,initial_word.join("")))
        }

        // console.log(this.population_array)
        

    }

    naturalSelection(){
        let newPopulation = []
        for (let i = 0; i < this.population_array.length; i++) { 
            let max = this.mating_pool.length;
            let min = 0;
            let index1 = Math.floor(Math.random() * (+max - +min)) + +min; 
            let index2 = Math.floor(Math.random() * (+max - +min)) + +min; 

            // console.log(this.mating_pool)
            let word1 = this.mating_pool[index1]
            let word2 = this.mating_pool[index2]

            // // Crossover with random length
            let maxLength = word1.getLength();
            let minLength = 0;

            let randomWordIndex = Math.floor(Math.random() * (+maxLength - +minLength)) + +minLength; 
            let newWordArray = word1.getWord().slice(0,randomWordIndex).concat(word2.getWord().slice(randomWordIndex,maxLength))

        
            //Mutation
            for (let i = 0; i < newWordArray.length; i++) { 
                let rand = Math.random()
                if ( rand < this.mutation_rate){
                    newWordArray[i] = this.newChar()
                }
            }

            let newWord = newWordArray.join('')
            
            newPopulation.push(new Word(this.target_word,newWord))

        }

        this.population_array = newPopulation

    }

    calculateFitness(){
        // Calculate the fitness
        // let max_fitness = 0;
        for (let i = 0; i < this.population_array.length; i++) {
            this.population_array[i].calculateWordFitness()
            // if (this.population_array[i].getFitness() > max_fitness){
                // max_fitness = this.population_array[i].getFitness()
            // }
        }

        let max_word = new Word(this.target_word,this.target_word)
        max_word.calculateWordFitness()
        let max_fitness = max_word.getFitness()

        // console.log(max_fitness)

        // Normalized the fitness
        for (let i = 0; i < this.population_array.length; i++) {
            this.population_array[i].setNormalizedFitness((this.population_array[i].getFitness())/max_fitness)
        }
        this.generateMatingPool()



    }

    generateMatingPool(){
        this.mating_pool = []
        for (let i = 0; i < this.population_array.length; i++) {
            for (let j = 0; j < Math.floor(this.population_array[i].getNormalizedFitness()*100); j++) {
                this.mating_pool.push(this.population_array[i])
            }
            
        }
        console.log(this.mating_pool.length)

        

    }

    newChar = () => {
        let max = 122;
        let min = 63;
        let c = Math.floor(Math.random() * (+max - +min)) + +min; 
        if (c === 63) { c = 32}
        if (c === 64) { c = 46}

        return String.fromCharCode(c);
    }

    averagefitness(){
        let total_fitness = 0;
        for (let i = 0; i < this.population_array.length; i++) {
            // console.log(this.population_array[i])
            total_fitness += this.population_array[i].getNormalizedFitness()
            
        }
        
        return total_fitness/this.pop_size;
    }

    maxfitness(){
        let max_fitness = this.population_array[0].getNormalizedFitness()
        for (let i = 0; i < this.population_array.length; i++) {
            // console.log(this.population_array[i])
            if (this.population_array[i].getNormalizedFitness() > max_fitness){
                max_fitness = this.population_array[i].getNormalizedFitness();
            }
            
        }
        
        return max_fitness
    }

    minfitness(){
        let min_fitness = this.population_array[0].getNormalizedFitness()
        for (let i = 0; i < this.population_array.length; i++) {
            // console.log(this.population_array[i])
            if (this.population_array[i].getNormalizedFitness() < min_fitness){
                min_fitness = this.population_array[i].getNormalizedFitness();
            }
            
        }
        
        return min_fitness
    }

    getBestWord():string{
        let best_word = this.population_array[0]
        for (let i = 0; i < this.population_array.length; i++) {
            if (this.population_array[i].getFitness() > best_word.getFitness()){
                best_word = this.population_array[i]
            }
            
        }
        return best_word.getWord().join('')
    }
    evaluate(best_word:string):boolean{
        return this.target_word === best_word ? false : true
    }
}
