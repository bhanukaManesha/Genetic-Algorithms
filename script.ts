let loop;

class Main{
  public mutation_rate:number;
  public population_size:number;
  public target_word:string;
  private average_fitness:number;
  private max_fitness:number;
  private min_fitness:number;
  private total_generations:number;
  private best_word:string;

  private population:Population;

  constructor() { 
    this.mutation_rate= 0.03;
    this.population_size= 1000;
    this.target_word = "The Quick Brown Fox Jumps Over The Lazy Dog"
    this.average_fitness=0;
    this.total_generations=0;
    this.best_word = "";
    
    this.population = new Population(this.mutation_rate,this.population_size,this.target_word)

    // this.genetic_algorithm(this.mutation_rate,this.population_size,this.target_word)

  }


  genetic_algorithm = () => {

      // this.population = new Population(mutation_rate,population_size,target_word)
        let reached:boolean = true
      
        this.population.calculateFitness()
        this.average_fitness = this.population.averagefitness() * 100
        this.max_fitness = this.population.maxfitness() * 100
        this.min_fitness = this.population.minfitness() * 100
        this.best_word = this.population.getBestWord()
        reached = this.population.evaluate(this.best_word)
        this.population.naturalSelection()
        this.total_generations++
        
        this.updateView();

        if (this.target_word == this.best_word){
          clearInterval(loop)
        }


  }

  updateView(){

    let target_word_HTML:HTMLElement = document.getElementById('target_word')!
    let evolving_word_HTML:HTMLElement = document.getElementById('evolving_word')!
    let total_generation_HTML:HTMLElement = document.getElementById('total_generations')!
    let population_size_HTML:HTMLElement = document.getElementById('population_size')!
    let average_fitness_HTML:HTMLElement = document.getElementById('average_fitness')!
    let max_fitness_HTML:HTMLElement = document.getElementById('max_fitness')!
    let min_fitness_HTML:HTMLElement = document.getElementById('min_fitness')!
    let mutation_rate_HTML:HTMLElement = document.getElementById('mutation_rate')!

    target_word_HTML.textContent = this.target_word;
    evolving_word_HTML.textContent = this.best_word;
    total_generation_HTML.textContent = this.total_generations.toString();
    population_size_HTML.textContent = this.population_size.toString();
    average_fitness_HTML.textContent = this.average_fitness.toString();
    max_fitness_HTML.textContent = this.max_fitness.toString();
    min_fitness_HTML.textContent = this.min_fitness.toString();
    mutation_rate_HTML.textContent = (this.mutation_rate*100).toString();


    
    




    






  }

}
  
window.onload = function() {
  const main = new Main();
  loop = setInterval(() => {main.genetic_algorithm()},100)

}





