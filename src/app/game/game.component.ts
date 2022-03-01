import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  gameId!: string;
  gameOver = false;
  @Input() notEnoughPlayer = false;
  miniInfo = false;
  editPlayerInfo = false;


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }



  ngOnInit(): void {
   
    this.newGame();
    /**
     * Get gameId by URL
     */
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];
      console.log(this.gameId);
      /**
       * Initializing firestore
       */
      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.playerImages = game.playerImages;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
          this.notEnoughPlayer = this.game.players.length < 2;  // Minimum 2 players required
        });
    });
  }

  newGame() {
    this.game = new Game();
  }

/**
 * This function take cards when there are carss in the stack left, and show the player animation for the current player
 * 
 */
  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else {
      if (!this.notEnoughPlayer) {
        if (!this.game.pickCardAnimation) {
          this.game.currentCard = this.game.stack.pop();
          this.game.pickCardAnimation = true;
          this.game.currentPlayer++;
          this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
          this.saveGame();
          this.pushPlayedCards();
        }
      }
    }
  }

  /**
   * This function push the current card to the played card stack  
   * 
   */
  pushPlayedCards() {
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 1300);
  }

 
  showMiniInfo() {
    this.miniInfo = true;
  }


  hideMiniInfo() {
    this.miniInfo = false;
  }

  showEditPlayerInfo() {
    this.editPlayerInfo = true;
  }

  hideEditPlayerInfo() {
    this.editPlayerInfo = false;
  }

  /**
   * This function delete a player
   * 
   */
  editPlayer(playerId: number) {
    console.log('Edit Player', playerId);
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.playerImages.splice(playerId, 1);
        } else {
          this.game.playerImages[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  /**
   * This function open the add-player dialog and add a player
   * 
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerImages.push('man1.PNG');
        this.saveGame();
      }
    });
  }

  /**
   * This function save the game on firestore
   * 
   */
  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }
}
