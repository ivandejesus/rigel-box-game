import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rounds: number = 1;
  boxColor: any = ['white', 'red'];
  previousSelectedColor: string = null;

  ngOnInit() { }

  private getSelectedBoxAndStartTheGame(selectedColor: string): void {
    if (this.hasReachedDeciderLevel(selectedColor)) {
      this.checkDeciderLevelResult(selectedColor);
      return;
    }

    switch(selectedColor) {
      case 'white' :
        this.handleWhiteColor();
        break;

      case 'red':
        this.handleRedColor();
        break;

      case 'black':
        this.handleBlackColor();
        break;

      case 'orange':
        this.handleOrangeColor();
        break;

      case 'green':
        this.handleGreenColor();
        break;
      default:
    }
    this.previousSelectedColor = selectedColor;
  }

  private hasReachedDeciderLevel(selectedColor: string): boolean {
    return this.rounds > 3 && this.previousSelectedColor !== 'black' && (selectedColor == 'green' || selectedColor == 'orange');
  }

  private checkDeciderLevelResult(selectedColor: string): void {
    if (this.previousSelectedColor !== selectedColor) {
      this.gameOverAndReset();
    } else if (this.previousSelectedColor == selectedColor) {
      this.winTheGameAndReset();
    }
  }

  private gameOverAndReset(): void {
    alert('Game Over');
    this.boxColor = ['white', 'red'];
    this.rounds = 1;
  }

  private winTheGameAndReset(): void {
    alert('You Win');
    this.boxColor = ['white', 'red'];
    this.rounds = 1;
  }

  private handleWhiteColor(): void {
    if (this.rounds == 1) {
      this.boxColor = ['white', 'orange'];
      this.rounds++;
    } else if (this.rounds == 2) {
      this.boxColor = ['black', 'red'];
      this.rounds++;
    }
  }

  private handleRedColor(): void {
    if (this.rounds == 1) {
      this.boxColor = ['black', 'red'];
      this.rounds++;
    } else {
      this.gameOverAndReset();
    }
  }

  private handleBlackColor(): void {
    this.boxColor = ['green', 'orange', 'black'];
    this.rounds++;
  }

  private handleOrangeColor(): void {
    if (this.rounds == 2) {
      this.boxColor = ['green', 'orange', 'black'];
      this.rounds++;
    } else if (this.rounds >= 3) {
      this.boxColor = ['green', 'orange'];
      this.rounds++;
    }
  }

  private handleGreenColor(): void {
    if (this.rounds >= 3) {
      this.boxColor = ['green', 'orange'];
      this.rounds++;
    }
  }
}
