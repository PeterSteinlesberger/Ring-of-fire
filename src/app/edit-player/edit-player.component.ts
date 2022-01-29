import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

allProfilePictures = ['woman.PNG', 'woman1.PNG', 'woman2.PNG', 'woman3.PNG', 'woman4.PNG', 'man.PNG', 'man1.PNG', 'man2.PNG', 'man3.PNG', 'man4.PNG', 'man5.PNG'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { }


  ngOnInit(): void {
  }

}
