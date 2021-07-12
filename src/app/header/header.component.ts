import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../core/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router,private tokenService:TokenStorageService) { }

  ngOnInit(): void {
  }

  logout(){
    this.tokenService.signOut();
    this.route.navigate(['']);
  }

}
