class App {
  constructor(presentContainer, titleContainer) {
    this.presentContainer = presentContainer;
    this.titleContainer = titleContainer;
    
    this.presents = [];
    this._fillPresentContainer();
  } 
  
  _fillPresentContainer() {
    for (const source of PRESENT_SOURCES) {
      const present = new Present(this.presentContainer, source);
      this.presents.push(present);
    }
  }
}


