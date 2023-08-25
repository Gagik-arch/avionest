export class Timer {
  miliseconds= 0;
  #interval;

  constructor() {
    this.miliseconds = 0;
  }

  onRelease(action) {
    this.#interval = setInterval(() => {
        this.miliseconds = this.miliseconds + 1000;
        action(this.miliseconds);
    }, 1000);
  }

  stop() {
    clearInterval(this.#interval);

    return this.miliseconds;
  }
}
