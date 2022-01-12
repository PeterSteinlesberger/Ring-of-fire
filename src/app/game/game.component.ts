import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: any;
  game!: Game;

  constructor() { }


  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(!this.pickCardAnimation) {
  this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;
this.game.playedCards.push(this.currentCard);

    setTimeout(() => {
      this.pickCardAnimation = false;
    }, 1500);
    }
  }
}
